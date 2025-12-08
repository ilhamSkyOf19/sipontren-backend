import { Schema, model } from "mongoose";
import { IAdmin } from "../models/admin-model";

const AdminSchema = new Schema<IAdmin>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
  },
  {
    timestamps: true, // otomatis createdAt dan updatedAt
  }
);

export const AdminModel = model("Admin", AdminSchema);
