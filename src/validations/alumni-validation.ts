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
      img_alumni: z.string(),
    })
    .strict() as ZodType<CreateAlumniType>;

  // UPDATE – semua field optional kecuali _id
  static readonly UPDATE = z
    .object({
      _id: z.string(),
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
      img_alumni: z.string().optional(),
    })
    .strict() as ZodType<UpdateAlumniType>;
}
