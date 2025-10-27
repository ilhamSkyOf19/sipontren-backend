import prisma from "../lib/prismaClient";
import { FileService } from "./file.service";

export class PamfletService {
    // create 
    static async create(pamflet: string): Promise<{ id: number; img: string; }> {

        // get response 
        const response = await prisma.pamflet.create({ data: { pamflet } });

        // return 
        return { id: response.id, img: response.pamflet };

    }


    // read 
    static async read(): Promise<{ id: number; img: string; }[]> {

        // get response 
        const response = await prisma.pamflet.findMany();

        // return 
        return response.map((item) => ({ id: item.id, img: item.pamflet }));
    }

    // read detail 
    static async detail(id: number): Promise<{ id: number; img: string; }> {

        // get response 
        const response = await prisma.pamflet.findUniqueOrThrow({ where: { id } });

        // return 
        return { id: response.id, img: response.pamflet };
    }


    // update 
    static async update(id: number, pamflet: string): Promise<{ id: number; img: string; }> {


        // cek pamflet
        const dataPamflet = await this.detail(id);


        // get response
        const response = await prisma.pamflet.update({
            where: {
                id
            },
            data: {
                pamflet
            }
        });

        // delete file 
        await FileService.deleteFormPath(dataPamflet.img, 'pamflet');

        // return 
        return { id: response.id, img: response.pamflet };
    }


    // delete 
    static async delete(id: string): Promise<{ id: number; img: string; }> {
        // get pamflet 
        const pamflet = await this.detail(+id);

        // delete file 

        // delete pamflet 
        await prisma.pamflet.delete({ where: { id: +id } });

        await FileService.deleteFormPath(pamflet.img, 'pamflet');

        // return 
        return { id: +id, img: pamflet.img };
    }
}