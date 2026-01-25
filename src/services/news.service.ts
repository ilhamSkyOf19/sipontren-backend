import {
  CreateLinkBeritaInputType,
  CreateNewsType,
  FilterData,
  NewsFilterType,
  ResponseNewsType,
  ResponseNewsWithMetaType,
  UpdateNewsType,
  toResponseNews,
} from "../models/news-model";
import { ResponseData, ResponseMessage } from "../types/types";
import { FileService } from "./file.service";
import { prisma } from "../lib/prismaClient";
import {
  getEndOfToday,
  getStartOfToday,
  toEndOfDay,
  toStartOfDay,
} from "../utils/utils";

export class NewsService {
  // =======================
  // CREATE (WITH LINK_BERITA)
  // =======================
  static async create(
    req: CreateNewsType,
    thumbnail: string,
  ): Promise<ResponseData<ResponseNewsType>> {
    const response = await prisma.$transaction(async (tx) => {
      // 1. create news
      const news = await tx.news.create({
        data: {
          category: req.category,
          title: req.title,
          content: req.content,
          thumbnail,
        },
      });

      // 2. create link berita (jika ada)
      if (req.link_berita && req.link_berita.length > 0) {
        await tx.link_berita.createMany({
          data: req.link_berita.map((item) => ({
            label: item.label,
            link: item.link,
            newsId: news.id,
          })),
        });
      }

      // 3. ambil ulang dengan relasi
      return tx.news.findUnique({
        where: { id: news.id },
        include: { link_berita: true },
      });
    });

    return {
      success: true,
      message: "Berhasil membuat news",
      data: toResponseNews(response!),
    };
  }

  // =======================
  // READ ALL (PAGINATION)
  // =======================
  static async read({
    from,
    search,
    to,
    page = "1",
  }: FilterData): Promise<ResponseNewsWithMetaType> {
    const pageSize = 5;
    const currentPage = +page < 1 ? 1 : +page;

    const whereCondition = {
      AND: [
        search
          ? {
              OR: [{ title: { contains: search } }],
            }
          : {},
        {
          createdAt: {
            gte: from ? toStartOfDay(from) : getStartOfToday(),
            lte: to ? toEndOfDay(to) : getEndOfToday(),
          },
        },
      ],
    };

    const totalData = await prisma.news.count({
      where: whereCondition,
    });

    const totalPage = Math.ceil(totalData / pageSize);

    const newsList = await prisma.news.findMany({
      where: whereCondition,
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
      include: {
        link_berita: true, // ⬅️ RELASI
      },
    });

    return {
      data: newsList.map(toResponseNews),
      meta: {
        currentPage,
        totalData,
        totalPage,
        pageSize,
      },
    };
  }

  // =======================
  // READ BY FILTER (HOME)
  // =======================
  static async readByFilter(
    filter: NewsFilterType = "today",
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
      include: {
        link_berita: true, // ⬅️ RELASI
      },
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
      include: {
        link_berita: true, // ⬅️ RELASI
      },
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
  // UPDATE (TANPA SYNC LINK)
  // =======================
  static async update(
    id: number,
    req: Omit<UpdateNewsType, "link_berita" | "update_link_berita">,
    thumbnail?: string,
    link_berita?: CreateLinkBeritaInputType[],
  ): Promise<ResponseData<ResponseNewsType>> {
    const response = await prisma.$transaction(async (tx) => {
      // 1️⃣ cek existing
      const existing = await tx.news.findUnique({
        where: { id },
      });

      if (!existing) {
        throw new Error("NEWS_NOT_FOUND");
      }

      // 2️⃣ handle thumbnail
      let finalThumbnail = existing.thumbnail;

      if (thumbnail) {
        await FileService.deleteFormPath(existing.thumbnail, "news");
        finalThumbnail = thumbnail;
      }

      // 3️⃣ update news
      const updated = await tx.news.update({
        where: { id },
        data: {
          ...req,
          thumbnail: finalThumbnail,
        },
      });

      // 4️⃣ create link berita (jika ada)
      if (link_berita && link_berita.length > 0) {
        await tx.link_berita.createMany({
          data: link_berita.map((item) => ({
            label: item.label,
            link: item.link,
            newsId: updated.id,
          })),
        });
      }

      // 5️⃣ ambil ulang dengan relasi
      return tx.news.findUnique({
        where: { id: updated.id },
        include: {
          link_berita: true,
        },
      });
    });

    return {
      success: true,
      message: "Berhasil update news",
      data: toResponseNews(response!),
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

    // link_berita otomatis kehapus (onDelete: Cascade)
    await prisma.news.delete({
      where: { id },
    });

    await FileService.deleteFormPath(news.thumbnail, "news");

    return {
      success: true,
      message: "Berhasil delete news",
    };
  }

  // =====================
  // GET COUNT BY CATEGORY
  // =====================
  static async getCountByCategory(): Promise<{
    berita: number;
    artikel: number;
  }> {
    const response = await prisma.news.groupBy({
      by: ["category"],
      _count: { _all: true },
    });

    return {
      berita: response.find((d) => d.category === "berita")?._count._all ?? 0,
      artikel: response.find((d) => d.category === "artikel")?._count._all ?? 0,
    };
  }
}
