import mongoose, { Schema } from "mongoose";
import { IAlumni } from "../models/alumni-model";

const AlumniSchema = new Schema<IAlumni>(
  {
    name: { type: String, required: true },
    angkatan: { type: String, required: true },
    description: { type: String, required: true },
    img_alumni: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAlumni>("Alumni", AlumniSchema);
