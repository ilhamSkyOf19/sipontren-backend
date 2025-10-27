import prisma from "../lib/prismaClient";
import { CreateStudentType, FileStudent, ResponseStudentType, toResponseStudentType, UpdateStudentType } from "../models/student-model";
import { ResponseData, ResponseMessage } from "../types/types";
import { FileService } from "./file.service";

export class StudentService {
    // create 
    static async create(req: CreateStudentType, file: FileStudent): Promise<ResponseStudentType> {
        const response = await prisma.student.create({
            data: {
                jenis_sekolah: req.jenis_sekolah,
                nisn: req.nisn,
                nik: req.nik,
                nama_lengkap: req.nama_lengkap,
                jenis_kelamin: req.jenis_kelamin,
                usia: Number(req.usia),
                tempat_lahir: req.tempat_lahir,
                tanggal_lahir: req.tanggal_lahir,
                alamat: req.alamat,
                anak_ke: Number(req.anak_ke),
                jumlah_saudara: Number(req.jumlah_saudara),
                asal_sekolah: req.asal_sekolah,
                alamat_sekolah_asal: req.alamat_sekolah_asal,
                nama_lengkap_ayah: req.nama_lengkap_ayah,
                nama_lengkap_ibu: req.nama_lengkap_ibu,
                nama_lengkap_wali: req.nama_lengkap_wali,
                no_telepon: req.no_telepon,

                // file upload
                foto_formal: file.foto_formal,
                fc_akta_kelahiran: file.fc_akta_kelahiran,
                foto_kk: file.foto_kk,
                fc_ktp: file.fc_ktp,
                fc_kis_kip: file.fc_kis_kip,
            }
        });

        // return response 

        return toResponseStudentType(response);
    }


    // read 
    static async read(): Promise<ResponseStudentType[]> {
        const students = await prisma.student.findMany();

        if (!students) return [];

        const fileFields: (keyof FileStudent)[] = [
            "foto_formal",
            "fc_akta_kelahiran",
            "foto_kk",
            "fc_ktp",
            "fc_kis_kip",
        ];

        // mapping tiap student
        return students.map((student) => {
            // mapping
            const data = { ...student };

            // mapping file
            for (const field of fileFields) {
                if (student[field]) {
                    data[field] = `${process.env.BASE_URL}/student/${student[field]}`;
                }
            }

            // return
            return data as ResponseStudentType;
        });
    }

    // detail 
    static async detail(id: number): Promise<ResponseData<ResponseStudentType>> {

        const response = await prisma.student.findUnique({
            where: {
                id
            }
        });


        // cek response 
        if (!response) {
            return {
                success: false,
                message: 'student not found'
            }
        }

        // return response 
        return {
            success: true,
            message: 'berhasil membaca student',
            data: toResponseStudentType(response)
        }
    }


    // update 
    static async update(id: number, req: UpdateStudentType, file: FileStudent): Promise<ResponseData<ResponseStudentType>> {


        // cek student 
        const student = await this.detail(id);

        // cek student 
        if (!student.success) {
            return {
                success: false,
                message: 'student not found'
            }
        }



        // cek file 
        for (const key of Object.keys(file) as (keyof FileStudent)[]) {
            // cek file 
            if (file[key]) {
                // delete file 
                await FileService.deleteFormPath(student.data[key], 'student');
            }
        }

        // update
        const response = await prisma.student.update({
            where: {
                id
            },
            data: {
                jenis_sekolah: req.jenis_sekolah,
                nisn: req.nisn,
                nik: req.nik,
                nama_lengkap: req.nama_lengkap,
                jenis_kelamin: req.jenis_kelamin,
                usia: Number(req.usia ?? student.data.usia),
                tempat_lahir: req.tempat_lahir,
                tanggal_lahir: req.tanggal_lahir,
                alamat: req.alamat,
                anak_ke: Number(req.anak_ke ?? student.data.anak_ke),
                jumlah_saudara: Number(req.jumlah_saudara ?? student.data.jumlah_saudara),
                asal_sekolah: req.asal_sekolah,
                alamat_sekolah_asal: req.alamat_sekolah_asal,
                nama_lengkap_ayah: req.nama_lengkap_ayah,
                nama_lengkap_ibu: req.nama_lengkap_ibu,
                nama_lengkap_wali: req.nama_lengkap_wali,
                no_telepon: req.no_telepon,

                // file upload
                foto_formal: file.foto_formal ? file.foto_formal : student.data.foto_formal,
                fc_akta_kelahiran: file.fc_akta_kelahiran ? file.fc_akta_kelahiran : student.data.fc_akta_kelahiran,
                foto_kk: file.foto_kk ? file.foto_kk : student.data.foto_kk,
                fc_ktp: file.fc_ktp ? file.fc_ktp : student.data.fc_ktp,
                fc_kis_kip: file.fc_kis_kip ? file.fc_kis_kip : student.data.fc_kis_kip
            }
        });



        // return response 
        return {
            success: true,
            message: 'berhasil update student',
            data: toResponseStudentType(response)
        }
    }

    // delete 
    static async delete(id: number): Promise<ResponseMessage> {

        // cek student 
        const student = await this.detail(id);

        // cek student 
        if (!student.success) {
            return {
                success: false,
                message: 'student not found'
            }
        }


        // delete file 
        await FileService.deleteFormPath(student.data.foto_formal, 'student');
        await FileService.deleteFormPath(student.data.fc_akta_kelahiran, 'student');
        await FileService.deleteFormPath(student.data.foto_kk, 'student');
        await FileService.deleteFormPath(student.data.fc_ktp, 'student');
        await FileService.deleteFormPath(student.data.fc_kis_kip, 'student');

        // delete student 
        await prisma.student.delete({
            where: {
                id
            }
        });

        // return response 
        return {
            success: true,
            message: 'berhasil delete student'
        }
    }

    static async searchByName(name: string): Promise<ResponseData<ResponseStudentType[]>> {
        const response = await prisma.student.findMany({
            where: {
                nama_lengkap: {
                    contains: name,
                },
            },
        });

        // return response 
        return {
            success: true,
            message: 'berhasil membaca student',
            data: response.map(toResponseStudentType)
        }
    }

}