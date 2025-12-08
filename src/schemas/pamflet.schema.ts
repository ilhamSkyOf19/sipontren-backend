import { Schema, model, Document } from "mongoose";

// Interface TypeScript
export interface IPamflet extends Document {
  pamflet: string;
  createdAt: Date;
  updatedAt: Date;
}

// Schema Mongoose
const PamfletSchema = new Schema<IPamflet>(
  {
    pamflet: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // otomatis buat createdAt dan updatedAt
  }
);

// Model
export const PamfletModel = model<IPamflet>("Pamflet", PamfletSchema);
