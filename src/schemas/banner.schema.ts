import { Schema, model, Document } from "mongoose";

// Interface TypeScript
export interface IBanner extends Document {
  banner: string;
  createdAt: Date;
  updatedAt: Date;
}

// Schema Mongoose
const BannerSchema = new Schema<IBanner>(
  {
    banner: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // otomatis buat createdAt dan updatedAt
  }
);

// Model
export const BannerModel = model<IBanner>("Banner", BannerSchema);
