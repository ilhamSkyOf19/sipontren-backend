import {
  CreateNewsType,
  ResponseNewsType,
  UpdateNewsType,
  toResponseNews,
} from "../models/news-model";
import { NewsModel } from "../schemas/news.shcema";
import { ResponseData, ResponseMessage } from "../types/types";
import { FileService } from "./file.service";

export class NewsService {
  // CREATE
  static async create(
    req: CreateNewsType,
    thumbnail: string
  ): Promise<ResponseData<ResponseNewsType>> {
    const created = await NewsModel.create({
      category: req.category,
      title: req.title,
      content: req.content,
      thumbnail,
    });

    // generate url
    const url_thumbnail = `${process.env.BASE_URL}/uploads/news/${thumbnail}`;

    return {
      success: true,
      message: "Berhasil membuat news",
      data: toResponseNews({
        ...created.toObject(),
        url_thumbnail,
      }),
    };
  }

  // READ ALL
  static async read(): Promise<ResponseData<ResponseNewsType[]>> {
    const newsList = await NewsModel.find().sort({ createdAt: -1 });

    const data = newsList.map((news) => {
      const url_thumbnail = `${process.env.BASE_URL}/uploads/news/${news.thumbnail}`;
      return toResponseNews({
        ...news.toObject(),
        url_thumbnail,
      });
    });

    return {
      success: true,
      message: "Berhasil membaca semua news",
      data,
    };
  }

  // DETAIL
  static async detail(_id: string): Promise<ResponseData<ResponseNewsType>> {
    const news = await NewsModel.findById(_id);

    if (!news) {
      return {
        success: false,
        message: "News not found",
      };
    }

    const url_thumbnail = `${process.env.BASE_URL}/uploads/news/${news.thumbnail}`;

    return {
      success: true,
      message: "Berhasil mengambil detail news",
      data: toResponseNews({
        ...news.toObject(),
        url_thumbnail,
      }),
    };
  }

  // UPDATE
  static async update(
    _id: string,
    req: UpdateNewsType,
    thumbnail?: string
  ): Promise<ResponseData<ResponseNewsType>> {
    const existing = await NewsModel.findById(_id);

    if (!existing) {
      return {
        success: false,
        message: "News not found",
      };
    }

    // Jika ada thumbnail baru → hapus lama
    let finalThumbnail = existing.thumbnail;
    if (thumbnail) {
      await FileService.deleteFormPath(existing.thumbnail, "news");
      finalThumbnail = thumbnail;
    }

    // Update database
    await NewsModel.updateOne(
      { _id },
      {
        ...req,
        thumbnail: finalThumbnail,
      }
    );

    // Ambil data terbaru
    const updated = await NewsModel.findById(_id);
    const url_thumbnail = `${process.env.BASE_URL}/uploads/news/${finalThumbnail}`;

    return {
      success: true,
      message: "Berhasil update news",
      data: toResponseNews({
        ...updated!.toObject(),
        url_thumbnail,
      }),
    };
  }

  // DELETE
  static async delete(_id: string): Promise<ResponseMessage> {
    const news = await NewsModel.findById(_id);

    if (!news) {
      return {
        success: false,
        message: "News not found",
      };
    }

    // Delete DB
    await NewsModel.deleteOne({ _id });

    // Delete file
    await FileService.deleteFormPath(news.thumbnail, "news");

    return {
      success: true,
      message: "Berhasil delete news",
    };
  }
}
