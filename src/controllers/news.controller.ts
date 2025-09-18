import { NextFunction, Request, Response } from "express";
import { CreateNewsType, ResponseNewsType } from "../models/news-model";
import { ResponseData, ResponseToken } from "../types/types";
import { NewsService } from "../services/news.service";

export class NewsController {

    // create 
    static async create(req: ResponseToken<{}, {}, CreateNewsType>, res: Response<ResponseData<ResponseNewsType>>, next: NextFunction) {
        try {

            // get body 
            const body = req.body


            // get service 
            const response = await NewsService.create(body);


            // return response 
            return res.status(200).json(response)

        } catch (error) {
            // cek error 
            next(error)
        }
    }
}