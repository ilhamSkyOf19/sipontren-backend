// src/services/link-berita.service.ts

import {
  CreateLinkBeritaType,
  UpdateLinkBeritaType,
  ResponseLinkBeritaType,
  toResponseLinkBerita,
} from "../models/linkBerita-model";
import { ResponseData, ResponseMessage } from "../types/types";
import { prisma } from "../lib/prismaClient";

export class LinkBeritaService {
  // =======================
  // CREATE
  // =======================
  static async create(
    req: CreateLinkBeritaType,
  ): Promise<ResponseData<ResponseLinkBeritaType>> {
    // pastikan news ada
    const news = await prisma.news.findUnique({
      where: { id: req.newsId },
    });

    if (!news) {
      return {
        success: false,
        message: "News not found",
      };
    }

    const response = await prisma.link_berita.create({
      data: {
        label: req.label,
        link: req.link,
        newsId: req.newsId,
      },
    });

    return {
      success: true,
      message: "Success create link berita",
      data: toResponseLinkBerita(response),
    };
  }

  // =======================
  // READ BY NEWS ID
  // =======================
  static async readByNews(
    newsId: number,
  ): Promise<ResponseData<ResponseLinkBeritaType[]>> {
    const response = await prisma.link_berita.findMany({
      where: { newsId },
      orderBy: { createdAt: "asc" },
    });

    return {
      success: true,
      message: "Success read link berita",
      data: response.map(toResponseLinkBerita),
    };
  }

  // =======================
  // DETAIL
  // =======================
  static async detail(
    id: number,
  ): Promise<ResponseData<ResponseLinkBeritaType>> {
    const response = await prisma.link_berita.findUnique({
      where: { id },
    });

    if (!response) {
      return {
        success: false,
        message: "Link berita not found",
      };
    }

    return {
      success: true,
      message: "Success read detail link berita",
      data: toResponseLinkBerita(response),
    };
  }

  // =======================
  // UPDATE
  // =======================
  static async update(
    req: UpdateLinkBeritaType,
  ): Promise<ResponseData<ResponseLinkBeritaType>> {
    const linkBerita = await prisma.link_berita.findUnique({
      where: { id: req.id },
    });

    if (!linkBerita) {
      return {
        success: false,
        message: "Link berita not found",
      };
    }

    const response = await prisma.link_berita.update({
      where: { id: req.id },
      data: {
        label: req.label,
        link: req.link,
      },
    });

    return {
      success: true,
      message: "Success update link berita",
      data: toResponseLinkBerita(response),
    };
  }

  // =======================
  // DELETE
  // =======================
  static async delete(id: number): Promise<ResponseMessage> {
    const linkBerita = await prisma.link_berita.findUnique({
      where: { id },
    });

    if (!linkBerita) {
      return {
        success: false,
        message: "Link berita not found",
      };
    }

    await prisma.link_berita.delete({
      where: { id },
    });

    return {
      success: true,
      message: "Success delete link berita",
    };
  }
}
