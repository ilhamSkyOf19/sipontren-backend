import z, { ZodType } from "zod";
import { CreateUstadType, UpdateUstadType } from "../models/ustad-model";

export class UstadValidation {
  // ================= SCHEMA DASAR =================

  private static nameSchema = z
    .string("nama harus diisi")
    .trim()
    .min(3, "nama minimal 3 karakter")
    .max(70, "nama maksimal 70 karakter");

  private static jenisKelaminSchema = z.enum(
    ["laki_laki", "perempuan"],
    "jenis kelamin harus diisi",
  );

  private static tempatLahirSchema = z
    .string("tempat lahir harus diisi")
    .trim()
    .min(3, "tempat lahir minimal 3 karakter")
    .max(50, "tempat lahir maksimal 50 karakter");

  private static tanggalLahirSchema = z
    .string("tanggal lahir harus diisi")
    .trim()
    .min(4, "tanggal lahir tidak boleh kosong");

  private static alamatSchema = z
    .string("alamat harus diisi")
    .trim()
    .min(10, "alamat minimal 10 karakter agar lebih lengkap")
    .max(200, "alamat maksimal 200 karakter");

  private static noTeleponSchema = z
    .string("nomor telepon harus diisi")
    .trim()
    .regex(/^[0-9]+$/, "nomor telepon hanya boleh berisi angka")
    .min(10, "nomor telepon minimal 10 digit")
    .max(14, "nomor telepon maksimal 14 digit");

  private static jabatanSchema = z
    .string("jabatan harus diisi")
    .trim()
    .min(3, "jabatan minimal 3 karakter")
    .max(50, "jabatan maksimal 50 karakter");

  // ================= CREATE =================

  static readonly CREATE = z
    .object({
      name: this.nameSchema,
      jenis_kelamin: this.jenisKelaminSchema,
      tempat_lahir: this.tempatLahirSchema,
      tanggal_lahir: this.tanggalLahirSchema,
      alamat: this.alamatSchema,
      no_telepon: this.noTeleponSchema,
      jabatan: this.jabatanSchema,
    })
    .strict() satisfies ZodType<Omit<CreateUstadType, "ustad_img">>;

  // ================= UPDATE =================

  static readonly UPDATE = z
    .object({
      name: this.nameSchema.optional(),
      jenis_kelamin: this.jenisKelaminSchema.optional(),
      tempat_lahir: this.tempatLahirSchema.optional(),
      tanggal_lahir: this.tanggalLahirSchema.optional(),
      alamat: this.alamatSchema.optional(),
      no_telepon: this.noTeleponSchema.optional(),
      jabatan: this.jabatanSchema.optional(),
    })
    .strict() satisfies ZodType<Omit<UpdateUstadType, "ustad_img" | "id">>;
}
