import { NextFunction, Request, Response } from "express";
import { ResponseData } from "../types/types";
import { PamfletService } from "../services/pamflet.service";

export class PamfletController {
    // create 
    static async create(req: Request, res: Response<ResponseData<{ id: number; img: string }>>, next: NextFunction) {
        try {
            // cek file 
            if (req.file === undefined) {
                return res.status(400).json({
                    success: false,
                    message: "File is required"
                })
            }


            // get service
            const response = await PamfletService.create(req.file.filename);




            return res.status(200).json({
                success: true,
                message: 'success created',
                data: response

            })
        } catch (error) {
            // error handler
            console.log(error)
            next(error)
        }
    }

    // read 
    static async read(_req: Request, res: Response<ResponseData<{ id: number; img: string }[]>>, next: NextFunction) {
        try {
            // get service 
            const response = await PamfletService.read();

            return res.status(200).json({
                success: true,
                message: 'success read pamflet',
                data: response
            })
        } catch (error) {
            // error handler
            console.log(error)
            next(error)
        }
    }


    // upadte 
    static async update(req: Request<{ id: string }>, res: Response<ResponseData<{ id: number; img: string }>>, next: NextFunction) {
        try {

            // get id 
            const id = req.params.id;

            // cek file 
            if (req.file === undefined) {
                return res.status(400).json({
                    success: false,
                    message: "File is required"
                })
            }

            // get service 
            const response = await PamfletService.update(+id, req.file.filename);

            return res.status(200).json({
                success: true,
                message: 'success update pamflet',
                data: response
            })
        } catch (error) {
            // error handler
            console.log(error)
            next(error)
        }
    }

    // delete 
    static async delete(req: Request<{ id: string }>, res: Response<ResponseData<{ id: number; img: string }>>, next: NextFunction) {
        try {
            // get id 
            const id = req.params.id;

            // get service 
            const response = await PamfletService.delete(id);

            return res.status(200).json({
                success: true,
                message: 'success delete pamflet',
                data: response
            })
        } catch (error) {
            // error handler
            console.log(error)
            next(error)
        }
    }
}