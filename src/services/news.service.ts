import prisma from "../lib/prismaClient";
import { CreateNewsType, ResponseNewsType, toResponseNews } from "../models/news-model";
import { ResponseData } from "../types/types";

export class NewsService {

    // create 
    static async create(req: CreateNewsType): Promise<ResponseData<ResponseNewsType>> {

        // get response
        const response = await prisma.news.create({
            data: {
                category: req.category,
                title: req.title,
                content: req.content
            }
        })

        return {
            success: true,
            message: 'berhasil membuat news',
            data: toResponseNews(response)
        }
    }
}