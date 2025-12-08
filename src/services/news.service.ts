import prisma from "../lib/prismaClient";
import {
  CreateNewsType,
  ResponseNewsType,
  toResponseNews,
  UpdateNewsType,
} from "../models/news-model";
import { ResponseData, ResponseMessage } from "../types/types";
import { FileService } from "./file.service";

export class NewsService {
  // create
  static async create(
    req: CreateNewsType,
    thumbnail: string
  ): Promise<ResponseData<ResponseNewsType>> {
    // get response
    const response = await prisma.news.create({
      data: {
        category: req.category,
        title: req.title,
        content: req.content,
        thumbnail: thumbnail,
      },
    });

    // url thumbnail
    const url_thumbnail = `${process.env.BASE_URL}/uploads/news/${response.thumbnail}`;

    return {
      success: true,
      message: "berhasil membuat news",
      data: toResponseNews({
        ...response,
        url_thumbnail,
      }),
    };
  }

  // read
  static async read(): Promise<ResponseData<ResponseNewsType[]>> {
    // response
    const response = await prisma.news.findMany();

    // initialization data
    const data = response.map((news) => {
      const url_thumbnail = `${process.env.BASE_URL}/uploads/news/${news.thumbnail}`;
      return {
        ...news,
        url_thumbnail,
      };
    });

    // return response
    return {
      success: true,
      message: "berhasil membaca news",
      data: data.map((news) => toResponseNews(news)),
    };
  }

  // read detail
  static async detail(id: number): Promise<ResponseNewsType> {
    // get news by id
    const response = await prisma.news.findUniqueOrThrow({
      where: {
        id,
      },
    });

    // return response
    return toResponseNews(response);
  }

  // update
  static async update(
    id: number,
    req: UpdateNewsType,
    thumbnail: string | undefined
  ): Promise<ResponseData<ResponseNewsType>> {
    // cek news
    const news = await this.detail(id);

    // cek thumbnail
    if (!news) {
      return {
        success: false,
        message: "news not found",
      };
    }

    // cek thumbnail
    if (thumbnail !== undefined) {
      // delete file form path
      await FileService.deleteFormPath(news.thumbnail, "news");
    }

    // update news
    const response = await prisma.news.update({
      where: {
        id,
      },
      data: {
        category: req.category,
        title: req.title,
        content: req.content,
        thumbnail: thumbnail,
      },
    });

    // generate url thumbnail
    const url_thumbnail = `${process.env.BASE_URL}/news/${response.thumbnail}`;

    // return response
    return {
      success: true,
      message: "berhasil update news",
      data: toResponseNews({
        ...response,
        url_thumbnail,
      }),
    };
  }

  // delete
  static async delete(id: string): Promise<ResponseMessage> {
    // cek news
    const news = await this.detail(Number(id));

    // cek news
    if (!news) {
      return {
        success: false,
        message: "news not found",
      };
    }

    // delete news
    await prisma.news.delete({
      where: {
        id: Number(id),
      },
    });

    // delete file
    await FileService.deleteFormPath(news.thumbnail, "news");

    // return response
    return {
      success: true,
      message: "berhasil delete news",
    };
  }
}
