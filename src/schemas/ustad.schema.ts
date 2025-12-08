import { Schema, model } from "mongoose";
import { IUstad } from "../models/ustad-model";

// schema
const ustadSchema = new Schema<IUstad>(
  {
    name: { type: String, required: true },
    jenis_kelamin: {
      type: String,
      enum: ["laki_laki", "perempuan"],
      required: true,
    },
    tempat_lahir: { type: String, required: true },
    tanggal_lahir: { type: String, required: true },
    alamat: { type: String, required: true },
    no_telepon: { type: String, required: true },
    jabatan: { type: String, required: true },
    ustad_img: { type: String, required: true },
    url_ustad_img: { type: String, required: true },
  },
  {
    timestamps: true, // otomatis membuat createdAt & updatedAt
  }
);

// model
const UstadModel = model<IUstad>("Ustad", ustadSchema);

export default UstadModel;
