import z, { ZodType } from "zod";
import { CreateAlumniType, UpdateAlumniType } from "../models/alumni-model";

export class AlumniValidation {
  // CREATE – semua field wajib kecuali _id
  static readonly CREATE = z
    .object({
      name: z.string().min(3, { message: "nama minimal 3 karakter" }),
      angkatan: z.string().min(2, { message: "angkatan minimal 2 karakter" }),
      description: z
        .string()
        .min(5, { message: "deskripsi minimal 5 karakter" }),
    })
    .strict() as ZodType<Omit<CreateAlumniType, "img_alumni">>;

  // UPDATE – semua field optional kecuali _id
  static readonly UPDATE = z
    .object({
      name: z
        .string()
        .min(3, { message: "nama minimal 3 karakter" })
        .optional(),
      angkatan: z
        .string()
        .min(2, { message: "angkatan minimal 2 karakter" })
        .optional(),
      description: z
        .string()
        .min(5, { message: "deskripsi minimal 5 karakter" })
        .optional(),
    })
    .strict() as ZodType<Omit<UpdateAlumniType, "img_alumni" | "_id">>;
}
