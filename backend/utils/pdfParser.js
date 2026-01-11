// import { PDFParse } from "pdf-parse";
import pkg from "pdf-parse";
const { PDFParse } = pkg;

export const extractTextFromPDF = async (buffer) => {
  try {
    // const dataBuffer = await readFile(buffer);
    //pdf-parse expects a Unit8Array, not a buffer
    const parser = new PDFParse(new Uint8Array(buffer));

    const data = await parser.getText();

    return {
      text: data.text,
      numPages: data.total,
      info: data,
    };
  } catch (error) {
    console.error("PDF parsing error:", error);
    throw new Error("Failed to extract text from pdf");
  }
};
