import fs from "fs";
import Document from "../model/document.js";
import { extractTextFromPDF } from "../utils/pdfParser.js";
import { textChunkFunc } from "../utils/textChunker.js";
import { Types } from "mongoose";
import FlashCard from "../model/flashCard.js";
import Quiz from "../model/quiz.js";
import { put as BlobPut } from "@vercel/blob";
import { getBlobBuffer } from "../utils/blobResponse.js";

const processPDF = async (id, path) => {
  try {
    const buffer = await getBlobBuffer(path);

    const { text } = await extractTextFromPDF(buffer);

    //create chunk
    const chunks = textChunkFunc({ text: text });

    await Document.findByIdAndUpdate(id, {
      extactedText: text,
      chunks: chunks,
      status: "ready",
    });
  } catch (err) {
    console.error(`Error processing document ${id}:`, err);
    await Document.findByIdAndUpdate(id, {
      status: "failed",
    });
  }
};

//@desc   upload PDF docs
//route   POST api/documents/upload
//@access Private
export const uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "Please upload a PDF file",
        statusCode: 400,
      });
    }

    const { title } = req.body;

    if (!title) {
      // delete uploaded file if title is not there
      await fs.unlink(req.file.path, (err) => {
        if (err) throw err;
      });
      return res.status(400).json({
        success: false,
        error: "Please provide a document title",
        statusCode: 400,
      });
    }

    //construct the url for uploaded file
    // const baseUrl: string = `http://localhost:${process.env.PORT || 8000}`;
    // const fileUrl: string = `${baseUrl}/uploads/documents/${req.file.filename}`;
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = `${uniqueSuffix}-${req.file.originalname}`;
    const blobResult = await BlobPut(fileName, req.file.buffer, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      contentType: req.file.mimetype,
    });

    //create document record
    const document = await Document.create({
      userId: req.user._id,
      title,
      fileName: fileName,
      filePath: blobResult.url,
      fileSize: req.file.size,
      status: "processing",
    });

    //process PDF in bg
    processPDF(document._id.toString(), blobResult.url).catch((err) => {
      console.error("PDF Processing error", err);
    });

    res.status(201).json({
      success: true,
      data: document,
      message: "Document uploaded sucessfully.Processing in progress...",
    });
  } catch (error) {
    //clean up error file
    if (req.file) {
      await fs.unlink(req.file.path, () => {});
    }
    next(error);
  }
};

//@desc   Get all users documents
//route   GET api/documents/
//@access Private
export const getDocuments = async (req, res, next) => {
  try {
    const documents = await Document.aggregate([
      { $match: { userId: new Types.ObjectId(req.user._id) } },
      {
        $lookup: {
          from: "flashcards",
          localField: "_id",
          foreignField: "documentId",
          as: "flashcardSets",
        },
      },
      {
        $lookup: {
          from: "quizzes",
          localField: "_id",
          foreignField: "documentId",
          as: "quizzes",
        },
      },
      {
        $addFields: {
          flashcardCount: { $size: "$flashcardSets" },
          quizCount: { $size: "$quizzes" },
        },
      },
      {
        $project: {
          extractedText: 0,
          chunks: 0,
          flashcardSets: 0,
          quizzes: 0,
        },
      },
      {
        $sort: { uploadDate: -1 },
      },
    ]);

    res.status(200).json({
      success: true,
      count: documents.length,
      data: documents,
    });
  } catch (error) {
    next(error);
  }
};

//@desc   Get single users document
//route   GET api/documents/:id
//@access Private
export const getDocument = async (req, res, next) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!document) {
      return res.status(404).json({
        success: false,
        error: "Document not found",
        statusCode: 404,
      });
    }

    //Get counts of associated flashcards and quizzes
    const flashcardCount = await FlashCard.countDocuments({
      documentId: document?._id,
      userId: req.user._id,
    });
    const quizCount = await Quiz.countDocuments({
      documentId: document?._id,
      userId: req.user._id,
    });

    //update last accessed
    document.lastAccessed = new Date(Date.now());
    await document.save();

    //combine document data with counts
    const documentData = document.toObject();
    documentData.flashcardCount = flashcardCount;
    documentData.quizCount = quizCount;

    res.status(200).json({
      success: true,
      data: documentData,
    });
  } catch (error) {
    next(error);
  }
};

// @desc  Delete docs
//route   DELETE api/documents/:id
//@access Private
export const deleteDocument = async (req, res, next) => {
  try {
    const document = await Document.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        error: "Document not found",
        statusCode: 404,
      });
    }

    //Delete file from fileSystem
    await fs.unlink(document.filePath, () => {});

    //Delete document
    await document.deleteOne();

    res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
