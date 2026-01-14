import prisma from "../lib/prismaClient";
import {
  CreateStudentType,
  FileStudent,
  ResponseStudentType,
  UpdateStudentType,
  toResponseStudentType,
} from "../models/student-model";
import { ResponseData, ResponseMessage } from "../types/types";
import { FileService } from "./file.service";

export class StudentService {
  // CREATE
  static async create(
    req: CreateStudentType,
    file: FileStudent
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
    });
  }

  // READ ALL
  static async read(): Promise<ResponseStudentType[]> {
    const students = await prisma.student.findMany({
      orderBy: { createdAt: "desc" },
    });

    return students.map((item) =>
      toResponseStudentType({
        ...item,
        tanggal_lahir: item.tanggal_lahir,
      })
    );
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
      }),
    };
  }

  // UPDATE
  static async update(
    id: number,
    req: UpdateStudentType,
    file: Partial<FileStudent>
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
    name: string
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
        })
      ),
    };
  }
}
