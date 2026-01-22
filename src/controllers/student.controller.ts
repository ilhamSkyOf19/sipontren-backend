import { NextFunction, Request, Response } from "express";
import {
  CreateStudentType,
  FileStudent,
  ResponseStudentType,
  ResponseStudentWithMetaType,
  UpdateStudentType,
} from "../models/student-model";
import { FilterData, ResponseData, ResponseMessage } from "../types/types";
import { validation } from "../services/validation.service";
import { StudentValidation } from "../validations/student-validation";
import { FileService } from "../services/file.service";
import { StudentService } from "../services/student.service";
import archiver from "archiver";

export class StudentController {
  // read all students
  static async read(
    req: Request<{}, {}, {}, FilterData>,
    res: Response<ResponseData<ResponseStudentWithMetaType>>,
    next: NextFunction,
  ) {
    try {
      // get query
      const { from, search, to, page, jenis_kelamin } = req.query;

      const response = await StudentService.read({
        from,
        search,
        to,
        page,
        jenis_kelamin,
      });

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
    next: NextFunction,
  ) {
    try {
      const id = req.params.id;

      const response = await StudentService.detail(+id);

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
    next: NextFunction,
  ) {
    try {
      // cek file
      if (!req.files) {
        return res
          .status(400)
          .json({ success: false, message: "File is required" });
      }
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
      // delete file uploaded jika proses create  gagal
      if (req.files && !Array.isArray(req.files)) {
        const files = req.files as Record<string, Express.Multer.File[]>;
        for (const field in files) {
          for (const file of files[field]) {
            await FileService.deleteFile(file.path);
          }
        }
      }

      next(error);
    }
  }

  // update
  static async update(
    req: Request<{ id: string }, {}, UpdateStudentType>,
    res: Response<ResponseData<ResponseStudentType>>,
    next: NextFunction,
  ) {
    try {
      const id = req.params.id;

      const student = await StudentService.detail(+id);

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
        anak_ke: req.body.anak_ke ? Number(req.body.anak_ke) : undefined,
        jumlah_saudara: req.body.jumlah_saudara
          ? Number(req.body.jumlah_saudara)
          : undefined,
        usia: req.body.usia ? Number(req.body.usia) : undefined,
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

      const response = await StudentService.update(+id, body.data, fileStudent);

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
    next: NextFunction,
  ) {
    try {
      const id = req.params.id;

      const response = await StudentService.delete(+id);

      if (!response.success) return res.status(404).json(response);

      return res.status(200).json(response);
    } catch (error) {
      // delete file uploaded jika proses create  gagal
      if (req.files && !Array.isArray(req.files)) {
        const files = req.files as Record<string, Express.Multer.File[]>;
        for (const field in files) {
          for (const file of files[field]) {
            await FileService.deleteFile(file.path);
          }
        }
      }
      next(error);
    }
  }

  // search
  static async search(
    req: Request<{}, {}, {}, { name: string }>,
    res: Response<ResponseData<ResponseStudentType[]>>,
    next: NextFunction,
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

  // download
  static async downloadMultiple(
    req: Request<{}, {}, { dokuments: string[] }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { dokuments } = req.body;

      if (!dokuments || dokuments.length === 0) {
        return res.status(400).json({ message: "No files selected" });
      }

      res.setHeader("Content-Type", "application/zip");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="students.zip"`,
      );

      const archive = archiver("zip", { zlib: { level: 9 } });
      archive.pipe(res);

      for (const file of dokuments) {
        const filePath = FileService.getFilePath("student", file);

        // cek file
        if (!FileService.fileExists(filePath)) {
          console.warn(`File not found: ${filePath}`);
          continue; // skip file jika tidak ada
        }

        // tambahkan file ke zip
        archive.file(filePath, { name: file });
      }

      // finalisasi zip
      await archive.finalize();
    } catch (error) {
      next(error);
    }
  }

  // get count
  static async getCount(
    req: Request<{}, {}, {}, { from: string; to: string }>,
    res: Response<ResponseData<{ laki_laki: number; perempuan: number }>>,
    next: NextFunction,
  ) {
    try {
      // validasi
      const query = validation<{ from: string; to: string }>(
        StudentValidation.QUERY,
        req.query,
      );

      // cek query
      if (!query.success) {
        return res.status(200).json({
          success: false,
          message: "query tidak valid",
        });
      }

      // call service
      const response = await StudentService.getCountByJenisKelamin(
        query.data.from,
        query.data.to,
      );

      // return response
      return res.status(200).json({
        success: true,
        message: "List of students",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  // download file
  static async downloadFiles(
    req: Request<{}, {}, { files: string[] }>,
    res: Response<ResponseData<string>>,
    next: NextFunction,
  ) {
    try {
      // get files from body
      const { files } = req.body;

      // cek files
      if (!files || !Array.isArray(files) || files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No files selected",
        });
      }

      // folder
      const folderPath = "student";

      const archive = await FileService.createZip(files, folderPath);

      // set headers untuk zip download
      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", `attachment; filename=files.zip`);

      // kirim zip ke client
      archive.pipe(res);

      archive.on("error", (err) => {
        console.error(err);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      });
    } catch (error) {
      next(error);
    }
  }
}
