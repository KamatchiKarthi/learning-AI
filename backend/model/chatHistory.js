import { model, Schema } from "mongoose";

const ChatHistorySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    documentId: {
      type: Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },
    messages: [
      {
        role: {
          type: String,
          enum: ["user", "assistant"],
          reuired: true,
        },
        content: { type: String, reuired: true },
        timestamp: {
          type: Date,
          default: Date.now(),
        },
        releventChunks: {
          type: [Number],
          default: [],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

ChatHistorySchema.index({ userId: 1, documentId: 1 });

const ChatHistory = model("ChatHistory", ChatHistorySchema);

export default ChatHistory;
