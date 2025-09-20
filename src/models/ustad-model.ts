import { Ustad } from "../generated/prisma";

// create 
export type CreateUstadType = {
    name: string;
    jenis_kelamin: 'laki_laki' | 'perempuan';
    tempat_lahir: string;
    tanggal_lahir: string;
    alamat: string;
    no_telepon: string;
    jabatan: string;
}



// update 
export type UpdateUstadType = Partial<CreateUstadType>;


// response 
export type ResponseUstadType = CreateUstadType & {
    id: number;
    ustad_img: string
    url_ustad_img: string
    createAt: Date;
    updateAt: Date
}


// to response 
export const toResponseUstadType = (ustad: Ustad & { url_ustad_img: string }): ResponseUstadType => {
    return {
        id: ustad.id,
        name: ustad.name,
        jenis_kelamin: ustad.jenis_kelamin,
        tempat_lahir: ustad.tempat_lahir,
        tanggal_lahir: ustad.tanggal_lahir,
        alamat: ustad.alamat,
        no_telepon: ustad.no_telepon,
        jabatan: ustad.jabatan,
        ustad_img: ustad.ustad_img,
        url_ustad_img: ustad.url_ustad_img,
        createAt: ustad.createAt,
        updateAt: ustad.updateAt
    }
}