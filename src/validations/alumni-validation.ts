import z, { ZodType } from "zod";
import { CreateAlumniType, UpdateAlumniType } from "../models/alumni-model";

export class AlumniValidation {
  // ================= SCHEMA DASAR =================

  private static nameSchema = z
    .string("Nama harus diisi")
    .trim()
    .min(3, { message: "Nama minimal 3 karakter" })
    .max(100, { message: "Nama maksimal 100 karakter" })
    .regex(/^[a-zA-Z\s'.-]+$/, {
      message: "Nama hanya boleh berisi huruf dan tanda umum ( ' . - )",
    });

  private static angkatanSchema = z
    .string()
    .trim()
    .min(2, { message: "Angkatan minimal 2 karakter" })
    .max(20, { message: "Angkatan maksimal 20 karakter" })
    .regex(/^[0-9A-Za-z\s/-]+$/, {
      message: "Format angkatan tidak valid",
    });

  private static descriptionSchema = z
    .string()
    .trim()
    .min(10, { message: "Deskripsi minimal 10 karakter" })
    .max(1000, {
      message: "Deskripsi terlalu panjang ",
    });

  // ================= CREATE =================

  static readonly CREATE = z
    .object({
      name: this.nameSchema,
      angkatan: this.angkatanSchema,
      description: this.descriptionSchema,
    })
    .strict() as ZodType<Omit<CreateAlumniType, "img_alumni">>;

  // ================= UPDATE =================

  static readonly UPDATE = z
    .object({
      name: this.nameSchema.optional(),
      angkatan: this.angkatanSchema.optional(),
      description: this.descriptionSchema.optional(),
    })
    .strict() as ZodType<Omit<UpdateAlumniType, "img_alumni" | "id">>;
}
