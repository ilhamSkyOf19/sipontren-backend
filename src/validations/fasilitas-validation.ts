import z, { ZodType } from "zod";
import {
  CreateFasilitasType,
  UpdateFasilitasType,
} from "../models/fasilitas-model";

export class FasilitasValidation {
  // CREATE – semua field wajib (tanpa _id & images)
  static readonly CREATE = z
    .object({
      fasilitas: z
        .string()
        .min(3, { message: "nama fasilitas minimal 3 karakter" }),
      keterangan: z
        .string()
        .min(5, { message: "keterangan minimal 5 karakter" }),
    })
    .strict() as ZodType<CreateFasilitasType>;

  // UPDATE – semua field optional (tanpa _id & images)
  static readonly UPDATE = z
    .object({
      fasilitas: z
        .string()
        .min(3, { message: "nama fasilitas minimal 3 karakter" })
        .optional(),
      keterangan: z
        .string()
        .min(5, { message: "keterangan minimal 5 karakter" })
        .optional(),
    })
    .strict() as ZodType<UpdateFasilitasType>;
}
