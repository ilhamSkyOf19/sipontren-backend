import { NextFunction, Request, Response } from "express";
import {
  CreateStudentType,
  FileStudent,
  ResponseStudentType,
  UpdateStudentType,
} from "../models/student-model";
import { ResponseData, ResponseMessage } from "../types/types";
import { validation } from "../services/validation.service";
import { StudentValidation } from "../validations/student-validation";
import { FileService } from "../services/file.service";
import { StudentService } from "../services/student.service";

export class StudentController {
  // read all students
  static async read(
    req: Request,
    res: Response<ResponseData<ResponseStudentType[]>>,
    next: NextFunction
  ) {
    try {
      const response = await StudentService.read();

      return res.status(200).json({
        success: true,
        message: "List of students",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  // detail
  static async detail(
    req: Request<{ id: string }>,
    res: Response<ResponseData<ResponseStudentType>>,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;

      const response = await StudentService.detail(id);

      if (!response.success) {
        return res.status(404).json(response);
      }

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  // create
  static async create(
    req: Request,
    res: Response<ResponseData<ResponseStudentType>>,
    next: NextFunction
  ) {
    try {
      const body = validation<CreateStudentType>(StudentValidation.CREATE, {
        ...req.body,
        anak_ke: Number(req.body.anak_ke),
        jumlah_saudara: Number(req.body.jumlah_saudara),
        usia: Number(req.body.usia),
      });

      if (!body.success) {
        if (req.files && !Array.isArray(req.files)) {
          const files = req.files as Record<string, Express.Multer.File[]>;
          for (const field in files) {
            for (const file of files[field]) {
              await FileService.deleteFile(file.path);
            }
          }
        }
        return res.status(400).json({ success: false, message: body.message });
      }

      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const fileStudent: FileStudent = {
        foto_formal: files["foto_formal"]?.[0]?.filename || "",
        fc_akta_kelahiran: files["fc_akta_kelahiran"]?.[0]?.filename || "",
        foto_kk: files["foto_kk"]?.[0]?.filename || "",
        fc_ktp: files["fc_ktp"]?.[0]?.filename || "",
        fc_kis_kip: files["fc_kis_kip"]?.[0]?.filename || "",
      };

      const response = await StudentService.create(body.data, fileStudent);

      return res.status(201).json({
        success: true,
        message: "Student created successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  // update
  static async update(
    req: Request<{ id: string }, {}, UpdateStudentType>,
    res: Response<ResponseData<ResponseStudentType>>,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;

      const student = await StudentService.detail(id);

      if (!student.success) {
        // delete file uploaded jika student tidak ditemukan
        if (req.files && !Array.isArray(req.files)) {
          const files = req.files as Record<string, Express.Multer.File[]>;
          for (const field in files) {
            for (const file of files[field]) {
              await FileService.deleteFile(file.path);
            }
          }
        }
        return res
          .status(404)
          .json({ success: false, message: "student not found" });
      }

      const body = validation<UpdateStudentType>(StudentValidation.UPDATE, {
        ...req.body,
        anak_ke: Number(req.body.anak_ke),
        jumlah_saudara: Number(req.body.jumlah_saudara),
        usia: Number(req.body.usia),
      });

      if (!body.success) {
        if (req.files && !Array.isArray(req.files)) {
          const files = req.files as Record<string, Express.Multer.File[]>;
          for (const field in files) {
            for (const file of files[field]) {
              await FileService.deleteFile(file.path);
            }
          }
        }
        return res.status(400).json({ success: false, message: body.message });
      }

      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const fileStudent: FileStudent = {
        foto_formal: files["foto_formal"]?.[0]?.filename || "",
        fc_akta_kelahiran: files["fc_akta_kelahiran"]?.[0]?.filename || "",
        foto_kk: files["foto_kk"]?.[0]?.filename || "",
        fc_ktp: files["fc_ktp"]?.[0]?.filename || "",
        fc_kis_kip: files["fc_kis_kip"]?.[0]?.filename || "",
      };

      const response = await StudentService.update(id, body.data, fileStudent);

      if (!response.success) return res.status(404).json(response);

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  // delete
  static async delete(
    req: Request<{ id: string }>,
    res: Response<ResponseMessage>,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;

      const response = await StudentService.delete(id);

      if (!response.success) return res.status(404).json(response);

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  // search
  static async search(
    req: Request<{}, {}, {}, { name: string }>,
    res: Response<ResponseData<ResponseStudentType[]>>,
    next: NextFunction
  ) {
    try {
      const { name } = req.query;
      if (!name || typeof name !== "string") {
        return res.status(400).json({
          success: false,
          message: "Name is required and must be a string",
        });
      }

      const response = await StudentService.searchByName(name);

      if (!response.success) return res.status(400).json(response);

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
