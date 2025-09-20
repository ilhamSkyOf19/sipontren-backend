import prisma from "../lib/prismaClient";
import { CreateUstadType, ResponseUstadType, toResponseUstadType } from "../models/ustad-model";

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
}