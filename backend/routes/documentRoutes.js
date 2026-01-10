import express from "express";
import protect from "../middleware/auth.js";
import { upload } from "../config/multer.js";
import {
  deleteDocument,
  getDocument,
  getDocuments,
  uploadDocument,
} from "../controller/documentsController.js";

const DocumentRouter = express.Router();

//all routers are protected
DocumentRouter.use(protect);

DocumentRouter.post("/upload", upload.single("file"), uploadDocument);
DocumentRouter.get("/", getDocuments);
DocumentRouter.get("/:id", getDocument);
DocumentRouter.delete("/:id", deleteDocument);
// DocumentRouter.put('/:id', updateDocument);

export default DocumentRouter;
