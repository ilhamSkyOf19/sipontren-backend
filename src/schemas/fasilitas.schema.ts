import { model, Schema } from "mongoose";
import { IFasilitas } from "../models/fasilitas-model";

const FasilitasSchema = new Schema<IFasilitas>(
  {
    fasilitas: { type: String, required: true },
    keterangan: { type: String, required: true },
    images: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// model
export const FasilitasModel = model<IFasilitas>("Fasilitas", FasilitasSchema);
