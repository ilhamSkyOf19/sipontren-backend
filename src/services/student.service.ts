import prisma from "../lib/prismaClient";
import {
  CreateStudentType,
  FileStudent,
  ResponseStudentType,
  ResponseStudentWithMetaType,
  UpdateStudentType,
  toResponseStudentType,
} from "../models/student-model";
import { FilterData, ResponseData, ResponseMessage } from "../types/types";
import { getEndOfToday, getStartOfToday, toEndOfDay } from "../utils/utils";
import { FileService } from "./file.service";

export class StudentService {
  // CREATE
  static async create(
    req: CreateStudentType,
    file: FileStudent,
  ): Promise<ResponseStudentType> {
    const student = await prisma.student.create({
      data: {
        ...req,
        usia: Number(req.usia),
        anak_ke: Number(req.anak_ke),
        jumlah_saudara: Number(req.jumlah_saudara),
        ...file,
        tanggal_lahir: new Date(req.tanggal_lahir),
      },
    });

    return toResponseStudentType({
      ...student,
      tanggal_lahir: student.tanggal_lahir,
      nama_lengkap_wali: student.nama_lengkap_wali || "-",
    });
  }

  // READ ALL
  static async read({
    from,
    search,
    to,
    page = "1",
    jenis_kelamin,
  }: FilterData): Promise<ResponseStudentWithMetaType> {
    const pageSize = 5;
    const currentPage = +page < 1 ? 1 : +page;

    // filter reusable
    const whereCondition = {
      AND: [
        // SEARCH NAMA
        search
          ? {
              OR: [{ nama_lengkap: { contains: search } }],
            }
          : {},

        // FILTER TANGGAL
        {
          createdAt: {
            gte: from ? new Date(from) : getStartOfToday(),
            lte: to ? toEndOfDay(to) : getEndOfToday(),
          },
        },

        // FILTER JENIS KELAMIN (opsional)
        jenis_kelamin
          ? {
              jenis_kelamin: jenis_kelamin,
            }
          : {},
      ],
    };

    // total data
    const totalData = await prisma.student.count({
      where: whereCondition,
    });

    // get total page
    const totalPage = Math.ceil(totalData / pageSize);

    // ambil data per halaman
    const students = await prisma.student.findMany({
      where: whereCondition,
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    });

    return {
      data: students.map((item) =>
        toResponseStudentType({
          ...item,
          tanggal_lahir: item.tanggal_lahir,
          nama_lengkap_wali: item.nama_lengkap_wali || "-",
        }),
      ),
      meta: {
        currentPage,
        totalData,
        totalPage,
        pageSize,
      },
    };
  }

  // DETAIL
  static async detail(id: number): Promise<ResponseData<ResponseStudentType>> {
    const student = await prisma.student.findUnique({
      where: { id },
    });

    if (!student) return { success: false, message: "student not found" };

    return {
      success: true,
      message: "berhasil membaca student",
      data: toResponseStudentType({
        ...student,
        tanggal_lahir: student.tanggal_lahir,
        nama_lengkap_wali: student.nama_lengkap_wali || "-",
      }),
    };
  }

  // UPDATE
  static async update(
    id: number,
    req: UpdateStudentType,
    file: Partial<FileStudent>,
  ): Promise<ResponseData<ResponseStudentType>> {
    const student = await prisma.student.findUnique({ where: { id } });
    if (!student) return { success: false, message: "student not found" };

    // hapus file lama jika ada file baru
    for (const key of Object.keys(file) as (keyof FileStudent)[]) {
      if (file[key] && student[key]) {
        await FileService.deleteFormPath(student[key], "student");
      }
    }

    const updated = await prisma.student.update({
      where: { id },
      data: {
        ...req,
        usia: req.usia ? Number(req.usia) : student.usia,
        anak_ke: req.anak_ke ? Number(req.anak_ke) : student.anak_ke,
        jumlah_saudara: req.jumlah_saudara
          ? Number(req.jumlah_saudara)
          : student.jumlah_saudara,
        ...file,
      },
    });

    return {
      success: true,
      message: "berhasil update student",
      data: toResponseStudentType({
        ...updated,
        tanggal_lahir: updated.tanggal_lahir,
        nama_lengkap_wali: student.nama_lengkap_wali || "-",
      }),
    };
  }

  // DELETE
  static async delete(id: number): Promise<ResponseMessage> {
    const student = await prisma.student.findUnique({ where: { id } });
    if (!student) return { success: false, message: "student not found" };

    // hapus semua file
    const fileFields: (keyof FileStudent)[] = [
      "foto_formal",
      "fc_akta_kelahiran",
      "foto_kk",
      "fc_ktp",
      "fc_kis_kip",
    ];

    for (const field of fileFields) {
      if (student[field]) {
        await FileService.deleteFormPath(student[field], "student");
      }
    }

    await prisma.student.delete({ where: { id } });

    return { success: true, message: "berhasil delete student" };
  }

  // SEARCH BY NAME
  static async searchByName(
    name: string,
  ): Promise<ResponseData<ResponseStudentType[]>> {
    const students = await prisma.student.findMany({
      where: {
        nama_lengkap: { contains: name },
      },
    });

    return {
      success: true,
      message: "berhasil membaca student",
      data: students.map((item) =>
        toResponseStudentType({
          ...item,
          tanggal_lahir: item.tanggal_lahir,
          nama_lengkap_wali: item.nama_lengkap_wali || "-",
        }),
      ),
    };
  }

  // get count student by jenis kelamin
  static async getCountByJenisKelamin(
    from: string,
    to: string,
  ): Promise<{
    laki_laki: number;
    perempuan: number;
  }> {
    const response = await prisma.student.groupBy({
      by: ["jenis_kelamin"],
      _count: { _all: true },
      where: {
        createdAt: {
          gte: new Date(from),
          lte: toEndOfDay(to),
        },
      },
    });

    return {
      laki_laki:
        response.find((d) => d.jenis_kelamin === "laki_laki")?._count._all ?? 0,
      perempuan:
        response.find((d) => d.jenis_kelamin === "perempuan")?._count._all ?? 0,
    };
  }

  // get all data by from & to
  static async getDataByFromTo(
    from: string,
    to: string,
  ): Promise<
    Omit<
      ResponseStudentType,
      "foto_formal" | "fc_akta_kelahiran" | "foto_kk" | "fc_ktp" | "fc_kis_kip"
    >[]
  > {
    // call prisma
    const response = await prisma.student.findMany({
      where: {
        createdAt: {
          gte: new Date(from),
          lte: toEndOfDay(to),
        },
      },
    });

    return response.map((item) =>
      toResponseStudentType({
        ...item,
        tanggal_lahir: item.tanggal_lahir,
        nama_lengkap_wali: item.nama_lengkap_wali || "-",
      }),
    );
  }
}
