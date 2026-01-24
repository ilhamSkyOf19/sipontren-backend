import prisma from "../lib/prismaClient";
import {
  CreatePrestasiType,
  UpdatePrestasiType,
  ResponsePrestasiType,
  ResponsePrestasiWithMetaType,
  FilterPrestasiData,
  toResponsePrestasiType,
} from "../models/prestasi-model";
import { ResponseData, ResponseMessage } from "../types/types";
import { FileService } from "./file.service";

export class PrestasiService {
  // =======================
  // CREATE
  // =======================
  static async create(
    req: Omit<CreatePrestasiType, "photo">,
    photo: string,
  ): Promise<ResponsePrestasiType> {
    const response = await prisma.prestasi.create({
      data: {
        ...req,
        photo,
      },
    });

    return toResponsePrestasiType(response);
  }

  // =======================
  // READ ALL
  // =======================
  static async read({
    search,
    category_prestasi,
    jenis_kelamin,
    page = "1",
    tahun_prestasi,
  }: FilterPrestasiData): Promise<ResponsePrestasiWithMetaType> {
    const pageSize = 5;
    const currentPage = +page < 1 ? 1 : +page;

    const where = {
      ...(category_prestasi && { category_prestasi }),
      ...(jenis_kelamin && { jenis_kelamin }),
      ...(tahun_prestasi && { tahun_prestasi: +tahun_prestasi }),
      ...(search && {
        OR: [
          { nama: { contains: search } },
          { prestasi: { contains: search } },
        ],
      }),
    };

    const totalData = await prisma.prestasi.count({ where });
    const totalPage = Math.ceil(totalData / pageSize);

    const response = await prisma.prestasi.findMany({
      where,
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    });

    return {
      data: response.map(toResponsePrestasiType),
      meta: {
        currentPage,
        totalPage,
        totalData,
        pageSize,
      },
    };
  }

  // get count
  static async getCount(): Promise<{
    internasional: number;
    nasional: number;
    provinsi: number;
    kabupaten: number;
    kecamatan: number;
  } | null> {
    // cal prisma
    const response = await prisma.prestasi.groupBy({
      by: ["category_prestasi"],
      _count: { _all: true },
    });

    // cek
    if (!response) return null;

    return {
      internasional:
        response.find((d) => d.category_prestasi === "internasional")?._count
          ._all ?? 0,
      nasional:
        response.find((d) => d.category_prestasi === "nasional")?._count._all ??
        0,
      provinsi:
        response.find((d) => d.category_prestasi === "provinsi")?._count._all ??
        0,
      kabupaten:
        response.find((d) => d.category_prestasi === "kabupaten")?._count
          ._all ?? 0,
      kecamatan:
        response.find((d) => d.category_prestasi === "kecamatan")?._count
          ._all ?? 0,
    };
  }

  // =======================
  // DETAIL
  // =======================
  static async detail(id: number): Promise<ResponseData<ResponsePrestasiType>> {
    const response = await prisma.prestasi.findUnique({
      where: { id },
    });

    if (!response) {
      return {
        success: false,
        message: "Prestasi not found",
      };
    }

    return {
      success: true,
      message: "Success read detail prestasi",
      data: toResponsePrestasiType(response),
    };
  }

  // =======================
  // UPDATE
  // =======================
  static async update(
    id: number,
    photo: string,
    req: Omit<UpdatePrestasiType, "photo" | "id">,
  ): Promise<ResponseData<ResponsePrestasiType>> {
    const prestasi = await prisma.prestasi.findUnique({
      where: { id },
    });

    if (!prestasi) {
      return {
        success: false,
        message: "Prestasi not found",
      };
    }

    const oldPhoto = prestasi.photo;

    if (photo && photo !== oldPhoto) {
      await FileService.deleteFormPath(oldPhoto, "prestasi");
    }

    const response = await prisma.prestasi.update({
      where: { id },
      data: {
        ...req,
        photo: photo || oldPhoto,
      },
    });

    return {
      success: true,
      message: "Success update prestasi",
      data: toResponsePrestasiType(response),
    };
  }

  // =======================
  // DELETE
  // =======================
  static async delete(id: number): Promise<ResponseMessage> {
    const prestasi = await prisma.prestasi.findUnique({
      where: { id },
    });

    if (!prestasi) {
      return {
        success: false,
        message: "Prestasi not found",
      };
    }

    await FileService.deleteFormPath(prestasi.photo, "prestasi");

    await prisma.prestasi.delete({
      where: { id },
    });

    return {
      success: true,
      message: "Success delete prestasi",
    };
  }
}
