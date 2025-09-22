import { NextFunction, Request, Response } from "express";
import { CreateNewsType, ResponseNewsType, UpdateNewsType } from "../models/news-model";
import { ResponseData, ResponseMessage, TokenRequest } from "../types/types";
import { NewsService } from "../services/news.service";
import { NewsValidation } from "../validations/news-validation";
import { zodValidation } from "../middlewares/zod-middleware";
import { validation } from "../services/validation.service";
import { FileService } from "../services/file.service";

export class NewsController {

    // create 
    static async create(req: TokenRequest<{}, {}, CreateNewsType>, res: Response<ResponseData<ResponseNewsType>>, next: NextFunction) {
        try {

            // get body 
            const rawBody = req.body

            // cek file 
            if (req.file === undefined) {
                return res.status(400).json({
                    success: false,
                    message: "File is required"
                })
            }


            // cek body & validation 
            const body = validation<CreateNewsType>(NewsValidation.CREATE, rawBody)

            // cek validation 
            if (!body.success) {
                // cek file and deletezzz 
                if (req.file) {
                    await FileService.deleteFile(req.file?.path)
                }

                return res.status(400).json({
                    success: false,
                    message: body.message
                })
            }


            // get service 
            const response = await NewsService.create(body.data, req.file?.filename);


            // return response 
            return res.status(200).json(response)

        } catch (error) {
            // cek error 
            next(error)
        }
    }


    // read
    static async read(_req: Request, res: Response<ResponseData<ResponseNewsType[]>>, next: NextFunction) {
        try {
            // get service 
            const response = await NewsService.read();


            // return response 
            return res.status(200).json(response)

        } catch (error) {
            // cek error 
            next(error)
        }
    }

    // read detail 
    static async detail(req: TokenRequest<{ id: string }>, res: Response<ResponseData<ResponseNewsType>>, next: NextFunction) {
        try {

            // get params id 
            const id = req.params.id;


            // get service 
            const response = await NewsService.detail(Number(id));

            // return response 
            return res.status(200).json({
                success: true,
                message: "success read detail news",
                data: response
            })

        } catch (error) {
            // cek error
            console.log(error);
            next(error);
        }
    }


    // update detail 
    static async update(req: TokenRequest<{ id: string }>, res: Response<ResponseData<ResponseNewsType>>, next: NextFunction) {
        try {

            // cek params id 
            const id = req.params.id;

            // cek news 
            const news = await NewsService.detail(Number(id));

            // cek news 
            if (!news) {
                // cek file 
                if (req.file) {
                    await FileService.deleteFile(req.file?.path)
                }
                return res.status(400).json({
                    success: false,
                    message: 'news not found'
                })
            }

            // cek body 
            const body = validation<UpdateNewsType>(NewsValidation.UPDATE, req.body);


            // cek body
            if (!body.success) {
                // cek file 
                if (req.file) {
                    await FileService.deleteFile(req.file?.path)
                }

                return res.status(400).json({
                    success: false,
                    message: body.message
                })
            }



            // get service 
            const response = await NewsService.update(Number(id), body.data, req.file?.filename);


            // cek response 
            if (!response.success) {
                return res.status(400).json({
                    success: false,
                    message: ''
                })
            }


            // return 
            return res.status(200).json({
                success: true,
                message: 'succes updated',
                data: response.data
            })




        } catch (error) {
            // cek error 
            console.log(error)
            next(error)
        }
    }


    // delete 
    static async delete(req: TokenRequest<{ id: string }>, res: Response<ResponseMessage>, next: NextFunction) {
        try {

            // get params id 
            const id = req.params.id;


            // get service 
            const response = await NewsService.delete(id);


            // return response 
            return res.status(200).json(response)

        } catch (error) {
            // cek error 
            next(error)
        }
    }
}