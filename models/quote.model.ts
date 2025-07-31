import { Schema, model } from "mongoose";

const quoteSchema = new Schema(
  {
    text: { type: String, required: true, unique: true },
    author: { type: String, default: "Unknown" },
  },
  { timestamps: false }
);

export const Quote = model("Quote", quoteSchema);
