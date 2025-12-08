import { Schema, model } from "mongoose";
import { IStudent } from "../models/student-model";

const StudentSchema = new Schema<IStudent>(
  {
    jenis_sekolah: {
      type: String,
      enum: ["SD", "SMP", "SMA"],
      required: true,
    },
    nisn: { type: String, required: true },
    nik: { type: String, required: true },
    nama_lengkap: { type: String, required: true },
    jenis_kelamin: {
      type: String,
      enum: ["laki_laki", "perempuan"],
      required: true,
    },
    usia: { type: Number, required: true },
    tempat_lahir: { type: String, required: true },
    tanggal_lahir: { type: String, required: true },
    alamat: { type: String, required: true },
    no_telepon: { type: String, required: true },
    anak_ke: { type: Number, required: true },
    jumlah_saudara: { type: Number, required: true },
    asal_sekolah: { type: String, required: true },
    alamat_sekolah_asal: { type: String, required: true },
    nama_lengkap_ayah: { type: String, required: true },
    nama_lengkap_ibu: { type: String, required: true },
    nama_lengkap_wali: { type: String, required: true },

    // files
    foto_formal: { type: String, required: true },
    fc_akta_kelahiran: { type: String, required: true },
    foto_kk: { type: String, required: true },
    fc_ktp: { type: String, required: true },
    fc_kis_kip: { type: String, required: true },
  },
  {
    timestamps: true, // otomatis menambahkan createdAt & updatedAt
  }
);

export const StudentModel = model<IStudent>("Student", StudentSchema);
