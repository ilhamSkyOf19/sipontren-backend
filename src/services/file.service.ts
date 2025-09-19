import fs from 'fs/promises';
import { ResponseMessage } from '../types/types';
import path from 'path';


export class FileService {

    // delete 
    static async deleteFile(path: string): Promise<void> {
        try {

            // cek file
            await fs.access(path);

            // cek file
            await fs.unlink(path);


            console.log('File deleted successfully');
        } catch (error) {
            // cek error 
            console.log(error);
            console.warn('file not found')
        }
    }


    // delete form path 
    static async deleteFormPath(fileName: string, filePath: string): Promise<ResponseMessage> {

        // cek file path
        if (!filePath || !fileName) return {
            success: false,
            message: 'File not exist'
        }

        // path file 
        const filePathFull = path.join(
            __dirname,
            `../../public/uploads/${filePath}/${fileName}`);

        // delete file 
        try {

            // cek file 
            await fs.access(filePathFull);
            // delete file 
            await fs.unlink(filePathFull);


            return {
                success: true,
                message: 'File deleted successfully'
            }

        } catch (error) {
            // cek error 
            console.log(error);
            return {
                success: false,
                message: 'File not found or failed to delete'
            }
        }
    }
}