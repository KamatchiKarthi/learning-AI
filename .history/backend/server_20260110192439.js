
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import errorHanlder from "./middleware/errorHandler.js";
import AuthRouter from "./routes/authRoutes.js";
import DocumentRouter from "./routes/documentRoutes.js";
import flashcardRouter from "./routes/flashCardRoutes.js";
import AIRouter from "./routes/aiRoutes.js";
import QuizRouter from "./routes/quizRoutes.js";
import ProgressRouter from "./routes/progressRouter.js";


const app = express();

//allowed origin

//Handle CORS
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigin = [
        process.env.CLIENT_URL,
        "http://localhost:7000",
        "http://localhost:8000",
      ];
      if (!origin) return callback(null, true);
      if (allowedOrigin.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
//Connect DB
connectDB();

console.log("process", process.env.CLIENT_URL);
//parse json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// //Server upload folder
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//routes
app.use("/api/auth", AuthRouter);
app.use("/api/document", DocumentRouter);
app.use("/api/flashcard", flashcardRouter);
app.use("/api/ai", AIRouter);
app.use("/api/quiz", QuizRouter);
app.use("/api/progress", ProgressRouter);

//error handler
app.use(errorHanlder);

//404error
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route Not Found",
    statusCode: 404,
  });
});
app.get("/", (req, res) => {
  res.send("Welcome To AI Platform API");
});

// //generic error
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//     console.error(err);
//     res.status(500).json({
//         success: false,
//         error: err.message || 'Something went wrong',
//         statusCode: 500,
//     });
// });

//start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
