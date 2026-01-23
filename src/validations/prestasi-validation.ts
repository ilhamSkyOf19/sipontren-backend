import z, { ZodType } from "zod";
import {
  CreatePrestasiType,
  UpdatePrestasiType,
} from "../models/prestasi-model";

export class PrestasiValidation {
  private static namaSchema = z
    .string("Nama harus diisi")
    .trim()
    .min(3, { message: "Nama minimal 3 karakter" })
    .max(100, { message: "Nama maksimal 100 karakter" })
    .regex(/^[a-zA-Z\s'.-]+$/, {
      message: "Nama hanya boleh berisi huruf dan tanda umum ( ' . - )",
    });

  private static prestasiSchema = z
    .string()
    .trim()
    .min(5, "Prestasi minimal 5 karakter")
    .max(500, "Prestasi terlalu panjang");

  // CREATE
  static readonly CREATE = z
    .object({
      category_prestasi: z.enum([
        "internasional",
        "nasional",
        "provinsi",
        "kabupaten",
        "kecamatan",
      ]),
      nama: this.namaSchema,
      tahun_prestasi: z.number().int().min(1900),
      prestasi: this.prestasiSchema,
      jenis_kelamin: z.enum(["laki_laki", "perempuan"]),
    })
    .strict() as ZodType<Omit<CreatePrestasiType, "photo">>;

  // UPDATE
  static readonly UPDATE = z
    .object({
      category_prestasi: z
        .enum([
          "internasional",
          "nasional",
          "provinsi",
          "kabupaten",
          "kecamatan",
        ])
        .optional(),
      nama: this.namaSchema.optional(),
      tahun_prestasi: z.number().int().optional(),
      prestasi: this.prestasiSchema.optional(),
      jenis_kelamin: z.enum(["laki_laki", "perempuan"]).optional(),
    })
    .strict() as ZodType<Omit<UpdatePrestasiType, "photo" | "id">>;
}
