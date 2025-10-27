import { NextFunction, Request, Response } from "express";
import { CreateStudentType, FileStudent, ResponseStudentType, UpdateStudentType } from "../models/student-model";
import { ResponseData, ResponseMessage } from "../types/types";
import { validation } from "../services/validation.service";
import { StudentValidation } from "../validations/student-validation";
import { FileService } from "../services/file.service";
import { StudentService } from "../services/student.service";
import { stat } from "fs";

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
    static async detail(req: Request<{ id: string }>, res: Response<ResponseData<ResponseStudentType>>, next: NextFunction) {
        try {
            // get id params 
            const id = req.params.id;


            // get service 
            const response = await StudentService.detail(Number(id))


            // cek response 
            if (!response.success) {
                return res.status(400).json({
                    success: false,
                    message: response.message
                })
            }


            // return 
            return res.status(200).json({
                success: true,
                message: response.message,
                data: response.data
            })
        } catch (error) {

            // error handler 
            console.log(error)
            next(error)
        }
    }

    // create 
    static async create(req: Request, res: Response<ResponseData<ResponseStudentType>>, next: NextFunction) {
        try {

            // validation body 
            const body = validation<CreateStudentType>(StudentValidation.CREATE, req.body);


            // cek body 
            if (!body.success) {
                if (req.files && !Array.isArray(req.files)) {
                    const files = req.files as Record<string, Express.Multer.File[]>;
                    for (const field in files) {
                        for (const file of files[field]) {
                            await FileService.deleteFile(file.path);
                        }
                    }
                }

                return res.status(400).json({
                    success: false,
                    message: body.message,
                });
            }


            // ambil file yang diupload (jika ada)
            const files = req.files as {
                [fieldname: string]: Express.Multer.File[];
            };

            const fileStudent: FileStudent = {
                foto_formal: files["foto_formal"]?.[0]?.filename || "",
                fc_akta_kelahiran: files["fc_akta_kelahiran"]?.[0]?.filename || "",
                foto_kk: files["foto_kk"]?.[0]?.filename || "",
                fc_ktp: files["fc_ktp"]?.[0]?.filename || "",
                fc_kis_kip: files["fc_kis_kip"]?.[0]?.filename || "",
            };



            // panggil service create student
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
            const id = Number(req.params.id);

            // cek student 
            const student = await StudentService.detail(id);

            // cek student 
            if (!student.success) {

                // delete
                if (req.files && !Array.isArray(req.files)) {
                    const files = req.files as Record<string, Express.Multer.File[]>;
                    for (const field in files) {
                        for (const file of files[field]) {
                            await FileService.deleteFile(file.path);
                        }
                    }
                }

                // return
                return res.status(404).json({
                    success: false,
                    message: "student not found",
                })
            }

            // validasi body
            const body = validation<UpdateStudentType>(StudentValidation.UPDATE, req.body);

            if (!body.success) {

                // rollback hapus file kalau validasi gagal
                if (req.files && !Array.isArray(req.files)) {
                    const files = req.files as Record<string, Express.Multer.File[]>;
                    for (const field in files) {
                        for (const file of files[field]) {
                            await FileService.deleteFile(file.path);
                        }
                    }
                }

                return res.status(400).json({
                    success: false,
                    message: body.message,
                });
            }

            // mapping files ke type FileStudent
            const files = req.files as {
                [fieldname: string]: Express.Multer.File[];
            };

            const fileStudent: FileStudent = {
                foto_formal: files["foto_formal"]?.[0]?.filename || "",
                fc_akta_kelahiran: files["fc_akta_kelahiran"]?.[0]?.filename || "",
                foto_kk: files["foto_kk"]?.[0]?.filename || "",
                fc_ktp: files["fc_ktp"]?.[0]?.filename || "",
                fc_kis_kip: files["fc_kis_kip"]?.[0]?.filename || "",
            };

            // panggil service
            const response = await StudentService.update(id, body.data, fileStudent);

            if (!response.success) {
                return res.status(404).json(response);
            }

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }


    // delete student
    static async delete(
        req: Request<{ id: string }>,
        res: Response<ResponseMessage>,
        next: NextFunction
    ) {
        try {
            const id = Number(req.params.id);

            // panggil service
            const response = await StudentService.delete(id);

            if (!response.success) {
                return res.status(404).json(response);
            }

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }


    // search 
    static async search(req: Request<{}, {}, {}, { name: string }>, res: Response<ResponseData<ResponseStudentType[]>>) {
        try {
            const { name } = req.query;

            // validasi query
            if (!name || typeof name !== "string") {
                return res.status(400).json({
                    success: false,
                    message: "Name is required and must be a string",
                });
            }

            const users = await StudentService.searchByName(name);

            // cek response
            if (!users.success) {
                return res.status(400).json({
                    success: false,
                    message: users.message,
                });
            }



            return res.json({
                success: true,
                message: "Search successful",
                data: users.data,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

}