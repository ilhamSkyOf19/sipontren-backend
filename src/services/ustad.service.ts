import prisma from "../lib/prismaClient";
import { CreateUstadType, ResponseUstadType, toResponseUstadType, UpdateUstadType } from "../models/ustad-model";
import { ResponseData, ResponseMessage } from "../types/types";
import { FileService } from "./file.service";

export class UstadService {

    // create 
    static async create(req: CreateUstadType, ustad_img: string): Promise<ResponseUstadType> {

        // get response 
        const response = await prisma.ustad.create({
            data: {
                name: req.name,
                jenis_kelamin: req.jenis_kelamin,
                tempat_lahir: req.tempat_lahir,
                tanggal_lahir: req.tanggal_lahir,
                alamat: req.alamat,
                no_telepon: req.no_telepon,
                jabatan: req.jabatan,
                ustad_img: ustad_img
            }
        });


        // generate url 
        const url_ustad_img = `${process.env.BASE_URL}/ustad_img/${response.ustad_img}`


        // response 
        return toResponseUstadType({
            ...response,
            url_ustad_img
        });
    }


    // read
    static async read(): Promise<ResponseUstadType[]> {

        const response = await prisma.ustad.findMany();

        // generate url
        const data: ResponseUstadType[] = response.map((item: Omit<ResponseUstadType, 'url_ustad_img'>) => {

            // generate url 
            const url_ustad_img = `${process.env.BASE_URL}/ustad_img/${item.ustad_img}`
            // return 
            return {
                ...item,
                url_ustad_img
            }


        })


        // return 
        return data.map((ustad) => toResponseUstadType(ustad))
    }


    // read detial
    static async detail(id: number): Promise<ResponseData<ResponseUstadType>> {

        // get response 
        const response = await prisma.ustad.findFirst({
            where: {
                id
            }
        })

        // cek response 
        if (!response) return {
            success: false,
            message: "Ustad not found",
        }

        // generate url thumbnail 
        const url_ustad_img = `${process.env.BASE_URL}/ustad_img/${response.ustad_img}`


        // return
        return {
            success: true,
            message: "success read detail ustad",
            data: toResponseUstadType({
                ...response,
                url_ustad_img
            })
        }
    }


    // update 
    static async update(id: number, ustad_img: string, req: UpdateUstadType): Promise<ResponseData<ResponseUstadType>> {

        // get ustad 
        const ustad = await this.detail(id);


        // cek ustad 
        if (!ustad.success) return ustad;


        // cek file 
        if (ustad_img) {
            // delete file 
            await FileService.deleteFormPath(ustad.data.ustad_img, 'ustad_img');
        }


        // update 
        const response = await prisma.ustad.update({
            where: {
                id
            },
            data: {
                ...req,
                ustad_img: ustad_img ? ustad_img : ustad.data.ustad_img
            }
        })


        // generate url img ustad
        const url_ustad_img = `${process.env.BASE_URL}/ustad_img/${response.ustad_img}`


        // return
        return {
            success: true,
            message: "success update ustad",
            data: toResponseUstadType({
                ...response,
                url_ustad_img
            })
        }

    }


    // delete 
    static async delete(id: number): Promise<ResponseMessage> {

        // get ustad 
        const ustad = await this.detail(id);

        // cek ustad 
        if (!ustad.success) return ustad;


        // delete file 
        await FileService.deleteFormPath(ustad.data.ustad_img, 'ustad_img');


        // delete ustad 
        await prisma.ustad.delete({
            where: {
                id
            }
        })


        // return 
        return {
            success: true,
            message: "success delete ustad"
        }

    }




}