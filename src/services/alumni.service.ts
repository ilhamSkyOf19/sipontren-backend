import prisma from "../lib/prismaClient";
import { CreateAlumniType, ResponseAlumniType, toResponseAlumniType, UpdateAlumniType } from "../models/alumni-model";
import { ResponseData, ResponseMessage } from "../types/types";
import { FileService } from "./file.service";

export class AlumniService {

    // create
    static async create(req: CreateAlumniType, img_alumni: string): Promise<ResponseAlumniType> {

        const response = await prisma.alumni.create({
            data: {
                name: req.name,
                angkatan: req.angkatan,
                description: req.description,
                img_alumni
            }
        });


        return toResponseAlumniType({
            ...response
        });
    }

    // read
    static async read(): Promise<ResponseAlumniType[]> {
        const response = await prisma.alumni.findMany();

        const data = response.map((alumni) => ({
            ...alumni
        }))
        return data.map((alumni) => toResponseAlumniType(alumni));
    }

    // detail
    static async detail(id: number): Promise<ResponseData<ResponseAlumniType>> {
        const response = await prisma.alumni.findFirst({
            where: { id }
        });

        if (!response) return {
            success: false,
            message: "Alumni not found",
        };


        return {
            success: true,
            message: "Success read detail alumni",
            data: toResponseAlumniType({
                ...response,
            })
        };
    }

    // update
    static async update(id: number, img_alumni: string, req: UpdateAlumniType): Promise<ResponseData<ResponseAlumniType>> {
        const alumni = await this.detail(id);

        if (!alumni.success) return alumni;

        // delete old file if new one provided
        if (img_alumni) {
            await FileService.deleteFormPath(alumni.data.img_alumni, 'img_alumni');
        }

        const response = await prisma.alumni.update({
            where: { id },
            data: {
                ...req,
                img_alumni: img_alumni ? img_alumni : alumni.data.img_alumni
            }
        });


        return {
            success: true,
            message: "Success update alumni",
            data: toResponseAlumniType({
                ...response,
            })
        };
    }

    // delete
    static async delete(id: number): Promise<ResponseMessage> {
        const alumni = await this.detail(id);

        if (!alumni.success) return alumni;

        // delete file
        await FileService.deleteFormPath(alumni.data.img_alumni, 'img_alumni');

        await prisma.alumni.delete({ where: { id } });

        return {
            success: true,
            message: "Success delete alumni"
        };
    }
}
