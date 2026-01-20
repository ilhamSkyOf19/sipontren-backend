import z, { ZodType } from "zod";
import {
  CreateFasilitasType,
  UpdateFasilitasType,
} from "../models/fasilitas-model";

export class FasilitasValidation {
  // ================ SCHEMA DASAR ================

  private static fasilitasSchema = z
    .string()
    .min(3, { message: "nama fasilitas minimal 3 karakter" })
    .max(50, { message: "nama fasilitas maksimal 50 karakter" });

  private static keteranganSchema = z
    .string()
    .min(5, { message: "keterangan minimal 5 karakter" })
    .max(70, { message: "keterangan maksimal 70 karakter" });

  // ================ CREATE ================

  static readonly CREATE = z
    .object({
      fasilitas: this.fasilitasSchema,
      keterangan: this.keteranganSchema,
    })
    .strict() satisfies ZodType<CreateFasilitasType>;

  // ================ UPDATE ================

  static readonly UPDATE = z
    .object({
      fasilitas: this.fasilitasSchema.optional(),
      keterangan: this.keteranganSchema.optional(),
    })
    .strict() satisfies ZodType<UpdateFasilitasType>;
}
