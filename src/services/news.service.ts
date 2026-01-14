import {
  CreateNewsType,
  NewsFilterType,
  ResponseNewsType,
  UpdateNewsType,
  toResponseNews,
} from "../models/news-model";
import { ResponseData, ResponseMessage } from "../types/types";
import { FileService } from "./file.service";
import { prisma } from "../lib/prismaClient";

export class NewsService {
  // =======================
  // CREATE
  // =======================
  static async create(
    req: CreateNewsType,
    thumbnail: string
  ): Promise<ResponseData<ResponseNewsType>> {
    const created = await prisma.news.create({
      data: {
        category: req.category,
        title: req.title,
        content: req.content,
        thumbnail,
      },
    });

    return {
      success: true,
      message: "Berhasil membuat news",
      data: toResponseNews(created),
    };
  }

  // =======================
  // READ ALL (TODAY)
  // =======================
  static async read(): Promise<ResponseData<ResponseNewsType[]>> {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const newsList = await prisma.news.findMany({
      where: {
        createdAt: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
      orderBy: { createdAt: "desc" },
      take: 8,
    });

    return {
      success: true,
      message: "Berhasil membaca semua news",
      data: newsList.map(toResponseNews),
    };
  }

  // =======================
  // READ BY FILTER
  // =======================
  static async readByFilter(
    filter: NewsFilterType = "today"
  ): Promise<ResponseData<ResponseNewsType[]>> {
    const now = new Date();
    let startDate: Date;

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    switch (filter) {
      case "today":
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        break;

      case "week":
        startDate = new Date();
        startDate.setDate(now.getDate() - now.getDay());
        startDate.setHours(0, 0, 0, 0);
        break;

      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        startDate.setHours(0, 0, 0, 0);
        break;

      default:
        startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
    }

    const newsList = await prisma.news.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { createdAt: "desc" },
      take: 8,
    });

    return {
      success: true,
      message: "Berhasil membaca news",
      data: newsList.map(toResponseNews),
    };
  }

  // =======================
  // DETAIL
  // =======================
  static async detail(id: number): Promise<ResponseData<ResponseNewsType>> {
    const news = await prisma.news.findUnique({
      where: { id },
    });

    if (!news) {
      return {
        success: false,
        message: "News not found",
      };
    }

    return {
      success: true,
      message: "Berhasil mengambil detail news",
      data: toResponseNews(news),
    };
  }

  // =======================
  // UPDATE
  // =======================
  static async update(
    id: number,
    req: UpdateNewsType,
    thumbnail?: string
  ): Promise<ResponseData<ResponseNewsType>> {
    const existing = await prisma.news.findUnique({
      where: { id },
    });

    if (!existing) {
      return {
        success: false,
        message: "News not found",
      };
    }

    let finalThumbnail = existing.thumbnail;

    if (thumbnail) {
      await FileService.deleteFormPath(existing.thumbnail, "news");
      finalThumbnail = thumbnail;
    }

    const updated = await prisma.news.update({
      where: { id },
      data: {
        ...req,
        thumbnail: finalThumbnail,
      },
    });

    return {
      success: true,
      message: "Berhasil update news",
      data: toResponseNews(updated),
    };
  }

  // =======================
  // DELETE
  // =======================
  static async delete(id: number): Promise<ResponseMessage> {
    const news = await prisma.news.findUnique({
      where: { id },
    });

    if (!news) {
      return {
        success: false,
        message: "News not found",
      };
    }

    await prisma.news.delete({
      where: { id },
    });

    await FileService.deleteFormPath(news.thumbnail, "news");

    return {
      success: true,
      message: "Berhasil delete news",
    };
  }
}
