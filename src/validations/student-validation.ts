import { z, ZodType } from "zod";
import { CreateStudentType, UpdateStudentType } from "../models/student-model";

export class StudentValidation {
    // CREATE
    static readonly CREATE = z.object({
        jenis_sekolah: z.enum(["SD", "SMP", "SMA"], {
            error: (val) =>
                val.input === undefined
                    ? "jenis_sekolah harus diisi"
                    : "jenis_sekolah tidak sesuai",
        }),
        nisn: z.string({
            error: (val) =>
                val.input === undefined
                    ? "nisn harus diisi"
                    : "nisn harus berupa string",
        }),
        nik: z.string({
            error: (val) =>
                val.input === undefined
                    ? "nik harus diisi"
                    : "nik harus berupa string",
        }),
        nama_lengkap: z.string({
            error: (val) =>
                val.input === undefined
                    ? "nama_lengkap harus diisi"
                    : "nama_lengkap harus berupa string",
        }),
        jenis_kelamin: z.enum(["laki_laki", "perempuan"], {
            error: (val) =>
                val.input === undefined
                    ? "jenis_kelamin harus diisi"
                    : "jenis_kelamin tidak sesuai",
        }),
        usia: z
            .string({
                error: (val) =>
                    val.input === undefined
                        ? "usia harus diisi"
                        : "usia harus berupa string",
            })
            .regex(/^\d+$/, { message: "usia harus berupa angka" }),
        tempat_lahir: z.string({
            error: (val) =>
                val.input === undefined
                    ? "tempat_lahir harus diisi"
                    : "tempat_lahir harus berupa string",
        }),
        tanggal_lahir: z.string({
            error: (val) =>
                val.input === undefined
                    ? "tanggal_lahir harus diisi"
                    : "tanggal_lahir harus berupa string",
        }),
        alamat: z.string({
            error: (val) =>
                val.input === undefined
                    ? "alamat harus diisi"
                    : "alamat harus berupa string",
        }),
        anak_ke: z
            .string({
                error: (val) =>
                    val.input === undefined
                        ? "anak_ke harus diisi"
                        : "anak_ke harus berupa string",
            })
            .regex(/^\d+$/, { message: "anak_ke harus berupa angka" }),
        jumlah_saudara: z
            .string({
                error: (val) =>
                    val.input === undefined
                        ? "jumlah_saudara harus diisi"
                        : "jumlah_saudara harus berupa string",
            })
            .regex(/^\d+$/, { message: "jumlah_saudara harus berupa angka" }),
        asal_sekolah: z.string({
            error: (val) =>
                val.input === undefined
                    ? "asal_sekolah harus diisi"
                    : "asal_sekolah harus berupa string",
        }),
        alamat_sekolah_asal: z.string({
            error: (val) =>
                val.input === undefined
                    ? "alamat_sekolah_asal harus diisi"
                    : "alamat_sekolah_asal harus berupa string",
        }),
        nama_lengkap_ayah: z.string({
            error: (val) =>
                val.input === undefined
                    ? "nama_lengkap_ayah harus diisi"
                    : "nama_lengkap_ayah harus berupa string",
        }),
        nama_lengkap_ibu: z.string({
            error: (val) =>
                val.input === undefined
                    ? "nama_lengkap_ibu harus diisi"
                    : "nama_lengkap_ibu harus berupa string",
        }),
        nama_lengkap_wali: z.string({
            error: (val) =>
                val.input === undefined
                    ? "nama_lengkap_wali harus diisi"
                    : "nama_lengkap_wali harus berupa string",
        }),
    }).strict() as ZodType<CreateStudentType>;

    // UPDATE
    static readonly UPDATE = z.object({
        jenis_sekolah: z.enum(["SD", "SMP", "SMA"], {
            error: (val) =>
                val.input === undefined
                    ? "jenis_sekolah harus diisi"
                    : "jenis_sekolah tidak sesuai",
        }).optional(),
        nisn: z.string({
            error: (val) =>
                val.input === undefined
                    ? "nisn harus diisi"
                    : "nisn harus berupa string",
        }).optional(),
        nik: z.string({
            error: (val) =>
                val.input === undefined
                    ? "nik harus diisi"
                    : "nik harus berupa string",
        }).optional(),
        nama_lengkap: z.string({
            error: (val) =>
                val.input === undefined
                    ? "nama_lengkap harus diisi"
                    : "nama_lengkap harus berupa string",
        }).optional(),
        jenis_kelamin: z.enum(["laki_laki", "perempuan"], {
            error: (val) =>
                val.input === undefined
                    ? "jenis_kelamin harus diisi"
                    : "jenis_kelamin tidak sesuai",
        }).optional(),
        usia: z
            .string({
                error: (val) =>
                    val.input === undefined
                        ? "usia harus diisi"
                        : "usia harus berupa string",
            })
            .regex(/^\d+$/, { message: "usia harus berupa angka" })
            .optional(),
        tempat_lahir: z.string({
            error: (val) =>
                val.input === undefined
                    ? "tempat_lahir harus diisi"
                    : "tempat_lahir harus berupa string",
        }).optional(),
        tanggal_lahir: z.string({
            error: (val) =>
                val.input === undefined
                    ? "tanggal_lahir harus diisi"
                    : "tanggal_lahir harus berupa string",
        }).optional(),
        alamat: z.string({
            error: (val) =>
                val.input === undefined
                    ? "alamat harus diisi"
                    : "alamat harus berupa string",
        }).optional(),
        anak_ke: z
            .string({
                error: (val) =>
                    val.input === undefined
                        ? "anak_ke harus diisi"
                        : "anak_ke harus berupa string",
            })
            .regex(/^\d+$/, { message: "anak_ke harus berupa angka" })
            .optional(),
        jumlah_saudara: z
            .string({
                error: (val) =>
                    val.input === undefined
                        ? "jumlah_saudara harus diisi"
                        : "jumlah_saudara harus berupa string",
            })
            .regex(/^\d+$/, { message: "jumlah_saudara harus berupa angka" })
            .optional(),
        asal_sekolah: z.string({
            error: (val) =>
                val.input === undefined
                    ? "asal_sekolah harus diisi"
                    : "asal_sekolah harus berupa string",
        }).optional(),
        alamat_sekolah_asal: z.string({
            error: (val) =>
                val.input === undefined
                    ? "alamat_sekolah_asal harus diisi"
                    : "alamat_sekolah_asal harus berupa string",
        }).optional(),
        nama_lengkap_ayah: z.string({
            error: (val) =>
                val.input === undefined
                    ? "nama_lengkap_ayah harus diisi"
                    : "nama_lengkap_ayah harus berupa string",
        }).optional(),
        nama_lengkap_ibu: z.string({
            error: (val) =>
                val.input === undefined
                    ? "nama_lengkap_ibu harus diisi"
                    : "nama_lengkap_ibu harus berupa string",
        }).optional(),
        nama_lengkap_wali: z.string({
            error: (val) =>
                val.input === undefined
                    ? "nama_lengkap_wali harus diisi"
                    : "nama_lengkap_wali harus berupa string",
        }).optional(),
    }).strict() as ZodType<UpdateStudentType>;
}
