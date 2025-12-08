import z, { ZodType } from "zod";
import { CreateUstadType, UpdateUstadType } from "../models/ustad-model";

export class UstadValidation {
  // create
  static readonly CREATE = z
    .object({
      name: z
        .string({
          error: (val) =>
            val.input === undefined
              ? "nama harus diisi"
              : "nama harus berupa string",
        })
        .min(3, { message: "nama minimal 3 karakter" }),

      jenis_kelamin: z.enum(["laki_laki", "perempuan"], {
        error: (val) =>
          val.input === undefined
            ? "jenis kelamin harus diisi"
            : "jenis kelamin tidak sesuai",
      }),

      tempat_lahir: z.string({
        error: (val) =>
          val.input === undefined
            ? "tempat lahir harus diisi"
            : "tempat lahir harus berupa string",
      }),

      tanggal_lahir: z.string({
        error: (val) =>
          val.input === undefined
            ? "tanggal lahir harus diisi"
            : "tanggal lahir harus berupa string",
      }),

      alamat: z.string({
        error: (val) =>
          val.input === undefined
            ? "alamat harus diisi"
            : "alamat harus berupa string",
      }),

      no_telepon: z
        .string({
          error: (val) =>
            val.input === undefined
              ? "nomor telepon harus diisi"
              : "nomor telepon harus berupa string",
        })
        .regex(/^[0-9]+$/, { message: "nomor telepon hanya boleh angka" }),

      jabatan: z.string({
        error: (val) =>
          val.input === undefined
            ? "jabatan harus diisi"
            : "jabatan harus berupa string",
      }),
    })
    .strict() as ZodType<Omit<CreateUstadType, "ustad_img">>;

  // update
  static readonly UPDATE = z
    .object({
      name: z
        .string({
          error: (val) =>
            val.input === undefined
              ? "nama harus diisi"
              : "nama harus berupa string",
        })
        .min(3, { message: "nama minimal 3 karakter" })
        .optional(),

      jenis_kelamin: z
        .enum(["laki_laki", "perempuan"], {
          error: (val) =>
            val.input === undefined
              ? "jenis kelamin harus diisi"
              : "jenis kelamin tidak sesuai",
        })
        .optional(),

      tempat_lahir: z
        .string({
          error: (val) =>
            val.input === undefined
              ? "tempat lahir harus diisi"
              : "tempat lahir harus berupa string",
        })
        .optional(),

      tanggal_lahir: z
        .string({
          error: (val) =>
            val.input === undefined
              ? "tanggal lahir harus diisi"
              : "tanggal lahir harus berupa string",
        })
        .optional(),

      alamat: z
        .string({
          error: (val) =>
            val.input === undefined
              ? "alamat harus diisi"
              : "alamat harus berupa string",
        })
        .optional(),

      no_telepon: z
        .string({
          error: (val) =>
            val.input === undefined
              ? "nomor telepon harus diisi"
              : "nomor telepon harus berupa string",
        })
        .regex(/^[0-9]+$/, { message: "nomor telepon hanya boleh angka" })
        .optional(),

      jabatan: z
        .string({
          error: (val) =>
            val.input === undefined
              ? "jabatan harus diisi"
              : "jabatan harus berupa string",
        })
        .optional(),
    })
    .strict() as ZodType<Omit<UpdateUstadType, "ustad_img" | "_id">>;
}
