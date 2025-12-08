import mongoose, { Schema } from "mongoose";
import { INews } from "../models/news-model";

const NewsSchema = new Schema<INews>(
  {
    category: {
      type: String,
      enum: ["berita", "artikel"],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    url_thumbnail: {
      type: String,
    },
  },
  {
    timestamps: true, // <-- otomatis generate createdAt & updatedAt
    versionKey: false,
  }
);

export const NewsModel = mongoose.model<INews>("News", NewsSchema);
