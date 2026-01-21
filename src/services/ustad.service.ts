import {
  IUstad,
  CreateUstadType,
  UpdateUstadType,
  ResponseUstadType,
  toResponseUstadType,
  FilterData,
  ResponseUstadWithMetaType,
} from "../models/ustad-model";
import { ResponseData, ResponseMessage } from "../types/types";
import { FileService } from "./file.service";
import { prisma } from "../lib/prismaClient";

export class UstadService {
  // =====================
  // CREATE
  // =====================
  static async create(
    req: CreateUstadType,
    ustad_img: string,
  ): Promise<ResponseUstadType> {
    const ustad = await prisma.ustad.create({
      data: {
        ...req,
        ustad_img,
      },
    });

    return toResponseUstadType(ustad);
  }

  // =====================
  // READ ALL
  // =====================
  static async read({
    search,
    page = "1",
  }: FilterData): Promise<ResponseUstadWithMetaType> {
    const pageSize = 5;
    const currentPage = +page < 1 ? 1 : +page;

    // total data
    const totalData = await prisma.ustad.count({
      where: {
        name: {
          contains: search,
        },
      },
    });

    // get total page
    const totalPage = Math.ceil(totalData / pageSize);

    const response = await prisma.ustad.findMany({
      where: {
        name: {
          contains: search,
        },
      },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    });

    return {
      data: response.map(toResponseUstadType),
      meta: {
        currentPage,
        totalPage,
        totalData,
        pageSize,
      },
    };
  }
  // =====================
  // DETAIL
  // =====================
  static async detail(id: number): Promise<ResponseData<ResponseUstadType>> {
    const ustad = await prisma.ustad.findUnique({
      where: { id },
    });

    if (!ustad) {
      return { success: false, message: "Ustad not found" };
    }

    return {
      success: true,
      message: "success read detail ustad",
      data: toResponseUstadType(ustad as IUstad),
    };
  }

  // =====================
  // UPDATE
  // =====================
  static async update(
    id: number,
    req: UpdateUstadType,
    ustad_img?: string,
  ): Promise<ResponseData<ResponseUstadType>> {
    const ustad = await prisma.ustad.findUnique({
      where: { id },
    });

    if (!ustad) {
      return { success: false, message: "Ustad not found" };
    }

    // hapus file lama jika upload baru
    if (ustad_img && ustad.ustad_img) {
      await FileService.deleteFormPath(ustad.ustad_img, "ustad_img");
    }

    const updated = await prisma.ustad.update({
      where: { id },
      data: {
        ...req,
        ustad_img: ustad_img ?? ustad.ustad_img,
      },
    });

    return {
      success: true,
      message: "success update ustad",
      data: toResponseUstadType(updated),
    };
  }

  // =====================
  // DELETE
  // =====================
  static async delete(id: number): Promise<ResponseMessage> {
    const ustad = await prisma.ustad.findUnique({
      where: { id },
    });

    if (!ustad) {
      return { success: false, message: "Ustad not found" };
    }

    if (ustad.ustad_img) {
      await FileService.deleteFormPath(ustad.ustad_img, "ustad_img");
    }

    await prisma.ustad.delete({
      where: { id },
    });

    return {
      success: true,
      message: "success delete ustad",
    };
  }

  // =====================
  // GET COUNT
  // =====================

  static async getCountByJenisKelamin(): Promise<{
    laki_laki: number;
    perempuan: number;
  }> {
    const response = await prisma.ustad.groupBy({
      by: ["jenis_kelamin"],
      _count: { _all: true },
    });

    return {
      laki_laki:
        response.find((d) => d.jenis_kelamin === "laki_laki")?._count._all ?? 0,
      perempuan:
        response.find((d) => d.jenis_kelamin === "perempuan")?._count._all ?? 0,
    };
  }
}
