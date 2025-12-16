import {
  CreateStudentType,
  FileStudent,
  ResponseStudentType,
  UpdateStudentType,
  toResponseStudentType,
} from "../models/student-model";
import { StudentModel } from "../schemas/student.scehma";
import { ResponseData, ResponseMessage } from "../types/types";
import { FileService } from "./file.service";

export class StudentService {
  // create
  static async create(
    req: CreateStudentType,
    file: FileStudent
  ): Promise<ResponseStudentType> {
    const student = new StudentModel({
      ...req,
      usia: Number(req.usia),
      anak_ke: Number(req.anak_ke),
      jumlah_saudara: Number(req.jumlah_saudara),
      ...file,
    });

    const savedStudent = await student.save();

    // generate URL untuk file
    const fileFields: (keyof FileStudent)[] = [
      "foto_formal",
      "fc_akta_kelahiran",
      "foto_kk",
      "fc_ktp",
      "fc_kis_kip",
    ];
    fileFields.forEach((field) => {
      if (savedStudent[field]) {
        savedStudent[
          field
        ] = `${process.env.BASE_URL}/uploads/student/${savedStudent[field]}`;
      }
    });

    return toResponseStudentType(savedStudent.toObject());
  }

  // read
  static async read(): Promise<ResponseStudentType[]> {
    const students = await StudentModel.find().exec();

    return students.map((student) => {
      const obj = student.toObject();
      const fileFields: (keyof FileStudent)[] = [
        "foto_formal",
        "fc_akta_kelahiran",
        "foto_kk",
        "fc_ktp",
        "fc_kis_kip",
      ];
      fileFields.forEach((field) => {
        if (obj[field])
          obj[field] = `${process.env.BASE_URL}/uploads/student/${obj[field]}`;
      });
      return toResponseStudentType(obj);
    });
  }

  // detail
  static async detail(id: string): Promise<ResponseData<ResponseStudentType>> {
    const student = await StudentModel.findById(id).exec();
    if (!student) {
      return { success: false, message: "student not found" };
    }

    const obj = student.toObject();
    const fileFields: (keyof FileStudent)[] = [
      "foto_formal",
      "fc_akta_kelahiran",
      "foto_kk",
      "fc_ktp",
      "fc_kis_kip",
    ];
    fileFields.forEach((field) => {
      if (obj[field])
        obj[field] = `${process.env.BASE_URL}/uploads/student/${obj[field]}`;
    });

    return {
      success: true,
      message: "berhasil membaca student",
      data: toResponseStudentType(obj),
    };
  }

  // update
  static async update(
    id: string,
    req: UpdateStudentType,
    file: FileStudent
  ): Promise<ResponseData<ResponseStudentType>> {
    const student = await StudentModel.findById(id).exec();
    if (!student) return { success: false, message: "student not found" };

    // delete file lama jika ada yang baru
    for (const key of Object.keys(file) as (keyof FileStudent)[]) {
      if (file[key]) await FileService.deleteFormPath(student[key], "student");
    }

    // update
    const updated = await StudentModel.findByIdAndUpdate(
      id,
      {
        ...req,
        usia: req.usia ? Number(req.usia) : student.usia,
        anak_ke: req.anak_ke ? Number(req.anak_ke) : student.anak_ke,
        jumlah_saudara: req.jumlah_saudara
          ? Number(req.jumlah_saudara)
          : student.jumlah_saudara,
        ...file,
      },
      { new: true }
    ).exec();

    if (!updated) return { success: false, message: "student not found" };

    const obj = updated.toObject();
    const fileFields: (keyof FileStudent)[] = [
      "foto_formal",
      "fc_akta_kelahiran",
      "foto_kk",
      "fc_ktp",
      "fc_kis_kip",
    ];
    fileFields.forEach((field) => {
      if (obj[field])
        obj[field] = `${process.env.BASE_URL}/uploads/student/${obj[field]}`;
    });

    return {
      success: true,
      message: "berhasil update student",
      data: toResponseStudentType(obj),
    };
  }

  // delete
  static async delete(id: string): Promise<ResponseMessage> {
    const studentRes = await StudentModel.findById(id).exec();
    if (!studentRes) return { success: false, message: "student not found" };

    // delete semua file
    const fileFields: (keyof FileStudent)[] = [
      "foto_formal",
      "fc_akta_kelahiran",
      "foto_kk",
      "fc_ktp",
      "fc_kis_kip",
    ];
    for (const field of fileFields) {
      await FileService.deleteFormPath(studentRes[field], "student");
    }

    await StudentModel.findByIdAndDelete(id).exec();

    return { success: true, message: "berhasil delete student" };
  }

  // search by name
  static async searchByName(
    name: string
  ): Promise<ResponseData<ResponseStudentType[]>> {
    const students = await StudentModel.find({
      nama_lengkap: { $regex: name, $options: "i" },
    }).exec();
    const data = students.map((student) => {
      const obj = student.toObject();
      const fileFields: (keyof FileStudent)[] = [
        "foto_formal",
        "fc_akta_kelahiran",
        "foto_kk",
        "fc_ktp",
        "fc_kis_kip",
      ];
      fileFields.forEach((field) => {
        if (obj[field])
          obj[field] = `${process.env.BASE_URL}/uploads/student/${obj[field]}`;
      });
      return toResponseStudentType(obj);
    });
    return { success: true, message: "berhasil membaca student", data };
  }
}
