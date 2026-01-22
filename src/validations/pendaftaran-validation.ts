import z, { ZodType } from "zod";
import {
  CreatePendaftaranType,
  UpdatePendaftaranType,
} from "../models/pendaftaran-model";

export class PendaftaranValidation {
  private static dateSchema = z.iso.datetime("harus berupa tanggal");

  //   create
  static readonly CREATE = z
    .object({
      dari: this.dateSchema,
      sampai: this.dateSchema,
    })
    .strict() satisfies ZodType<CreatePendaftaranType>;

  //   updatfe
  static readonly UPDATE = z
    .object({
      dari: this.dateSchema,
      sampai: this.dateSchema,
    })
    .partial()
    .strict() satisfies ZodType<UpdatePendaftaranType>;

  static readonly UPDATE_AKTIF = z
    .object({
      aktif: z.boolean(),
    })
    .strict() satisfies ZodType<{ aktif: boolean }>;
}
