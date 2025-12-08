import { z, ZodType } from "zod";
import { CreateStudentType, UpdateStudentType } from "../models/student-model";

export class StudentValidation {
  // CREATE – angka sebagai number, lainnya string
  static readonly CREATE = z
    .object({
      jenis_sekolah: z.enum(["SD", "SMP", "SMA"]),
      nisn: z.string(),
      nik: z.string(),
      nama_lengkap: z.string().min(3),
      jenis_kelamin: z.enum(["laki_laki", "perempuan"]),
      usia: z.number(),
      tempat_lahir: z.string(),
      tanggal_lahir: z.string(),
      alamat: z.string(),
      anak_ke: z.number(),
      jumlah_saudara: z.number(),
      asal_sekolah: z.string(),
      alamat_sekolah_asal: z.string(),
      nama_lengkap_ayah: z.string(),
      nama_lengkap_ibu: z.string(),
      nama_lengkap_wali: z.string(),
      no_telepon: z.string(),
    })
    .strict() as ZodType<CreateStudentType>;

  // UPDATE – semua optional, angka tetap number
  static readonly UPDATE = z
    .object({
      jenis_sekolah: z.enum(["SD", "SMP", "SMA"]).optional(),
      nisn: z.string().optional(),
      nik: z.string().optional(),
      nama_lengkap: z.string().min(3).optional(),
      jenis_kelamin: z.enum(["laki_laki", "perempuan"]).optional(),
      usia: z.number().optional(),
      tempat_lahir: z.string().optional(),
      tanggal_lahir: z.string().optional(),
      alamat: z.string().optional(),
      anak_ke: z.number().optional(),
      jumlah_saudara: z.number().optional(),
      asal_sekolah: z.string().optional(),
      alamat_sekolah_asal: z.string().optional(),
      nama_lengkap_ayah: z.string().optional(),
      nama_lengkap_ibu: z.string().optional(),
      nama_lengkap_wali: z.string().optional(),
      no_telepon: z.string().optional(),
    })
    .strict() as ZodType<UpdateStudentType>;
}
