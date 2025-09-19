import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";


// multer config 
type MulterConfig = {
    uploadPaths?: Record<string, string> // path upload file 
    allowedMimeTypes?: RegExp // allowed mime type file 
}



// multer upload 
export const createMulterUploader = (
    config: MulterConfig = {},
) => {

    // destruc
    const { uploadPaths = {}, allowedMimeTypes = /jpeg|jpg|png|pdf/ } = config;


    // storage 
    const storage = multer.diskStorage({

        // destination file 
        destination: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {

            // path
            const folder = uploadPaths[file.fieldname] || 'uploads/other';

            // cek folder 
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, { recursive: true });
            }

            // callback
            cb(null, folder);
        },

        // filename 
        filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {

            // generate uniqe suffix
            const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

            cb(null, file.fieldname + "-" + suffix + path.extname(file.originalname));
        }
    })

    const fileFilter = (
        req: Request,
        file: Express.Multer.File,
        cb: FileFilterCallback
    ) => {
        const extname = allowedMimeTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedMimeTypes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error("File type not allowed!"));
        }
    };


    // upload 
    const uploader = multer({
        storage,
        fileFilter,
        limits: { fileSize: 2 * 1024 * 1024 }
    });

    // return object 
    return {
        single: (filed: string) => uploader.single(filed),
        array: (filed: string, limit?: number) => uploader.array(filed, limit),
        fields: (fileds: { name: string, limit?: number }[]) => uploader.fields(fileds),
    }

}