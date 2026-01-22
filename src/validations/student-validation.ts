import z, { ZodType } from "zod";
import { CreateStudentType, UpdateStudentType } from "../models/student-model";

export class StudentValidation {
  // ================= SCHEMA DASAR =================

  private static stringSchema = (msg: string, max: number = 255) =>
    z
      .string(`${msg} harus diisi`)
      .trim()
      .min(1, `${msg} harus diisi`)
      .max(max, `${msg} maksimal ${max} karakter`);

  private static numberSchema = (
    msg: string,
    min: number = 0,
    max: number = 999,
  ) =>
    z
      .number(`${msg} harus diisi`)
      .min(min, `${msg} minimal ${min}`)
      .max(max, `${msg} maksimal ${max}`);

  private static enumSekolah = z.enum(
    ["SD", "SMP", "SMA"],
    "Sekolah harus diisi",
  );

  private static enumKelamin = z.enum(
    ["laki_laki", "perempuan"],
    "Jenis kelamin harus diisi",
  );

  private static phoneSchema = z
    .string("Nomor telepon harus diisi")
    .trim()
    .min(10, "Nomor telepon minimal 10 digit")
    .max(14, "Nomor telepon maksimal 15 digit");

  private static dateSchema = z.string("Tanggal lahir harus diisi");

  // ================= CREATE =================

  static readonly CREATE = z
    .object({
      jenis_sekolah: this.enumSekolah,

      nisn: this.stringSchema("NISN", 15),
      nik: this.stringSchema("NIK", 20),

      nama_lengkap: this.stringSchema("Nama lengkap", 100),

      jenis_kelamin: this.enumKelamin,

      usia: this.numberSchema("Usia", 3, 25),

      tempat_lahir: this.stringSchema("Tempat lahir", 100),

      tanggal_lahir: this.dateSchema,

      alamat: this.stringSchema("Alamat", 150),

      anak_ke: this.numberSchema("Anak ke", 1, 20),

      jumlah_saudara: this.numberSchema("Jumlah saudara", 0, 20),

      asal_sekolah: this.stringSchema("Asal sekolah", 150),

      alamat_sekolah_asal: this.stringSchema("Alamat sekolah asal", 150),

      nama_lengkap_ayah: this.stringSchema("Nama ayah", 100),

      nama_lengkap_ibu: this.stringSchema("Nama ibu", 100),

      nama_lengkap_wali: z
        .string()
        .max(100, "Nama wali maksimal 100 karakter")
        .optional(),

      no_telepon: this.phoneSchema,
    })
    .strict() satisfies ZodType<CreateStudentType>;

  // ================= UPDATE =================

  static readonly UPDATE = z
    .object({
      jenis_sekolah: this.enumSekolah.optional(),

      nisn: this.stringSchema("NISN", 15).optional(),
      nik: this.stringSchema("NIK", 20).optional(),

      nama_lengkap: z
        .string("Nama lengkap harus diisi")
        .trim()
        .min(3, "Nama minimal 3 karakter")
        .max(100, "Nama maksimal 100 karakter")
        .optional(),

      jenis_kelamin: this.enumKelamin.optional(),

      usia: this.numberSchema("Usia", 3, 25).optional(),

      tempat_lahir: this.stringSchema("Tempat lahir", 100).optional(),

      tanggal_lahir: this.dateSchema.optional(),

      alamat: this.stringSchema("Alamat", 150).optional(),

      anak_ke: this.numberSchema("Anak ke", 1, 20).optional(),

      jumlah_saudara: this.numberSchema("Jumlah saudara", 0, 20).optional(),

      asal_sekolah: this.stringSchema("Asal sekolah", 150).optional(),

      alamat_sekolah_asal: this.stringSchema(
        "Alamat sekolah asal",
        150,
      ).optional(),

      nama_lengkap_ayah: this.stringSchema("Nama ayah", 100).optional(),

      nama_lengkap_ibu: this.stringSchema("Nama ibu", 100).optional(),

      nama_lengkap_wali: z
        .string()
        .max(100, "Nama wali maksimal 100 karakter")
        .optional(),

      no_telepon: this.phoneSchema.optional(),
    })
    .strict() satisfies ZodType<UpdateStudentType>;

  // query pendaftaran
  static readonly QUERY = z.object({
    from: this.dateSchema,
    to: this.dateSchema,
  });
}
