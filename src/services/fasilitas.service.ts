import { FileService } from "./file.service";
import {
  CreateFasilitasType,
  UpdateFasilitasType,
  ResponseFasilitasType,
  toResponseFasilitasType,
  FilterData,
  ResponseFasilitasWithMetaType,
} from "../models/fasilitas-model";
import prisma from "../lib/prismaClient";

export class FasilitasService {
  // create
  static async create(
    data: CreateFasilitasType & { images: string },
  ): Promise<ResponseFasilitasType> {
    const response = await prisma.fasilitas.create({
      data: {
        fasilitas: data.fasilitas,
        keterangan: data.keterangan,
        images: data.images,
      },
    });

    return toResponseFasilitasType(response);
  }

  // =====================
  // READ ALL
  // =====================
  static async read({
    search,
    page = "1",
  }: FilterData): Promise<ResponseFasilitasWithMetaType> {
    const pageSize = 5;
    const currentPage = +page < 1 ? 1 : +page;

    // total data
    const totalData = await prisma.fasilitas.count({
      where: {
        fasilitas: {
          contains: search,
        },
      },
    });

    // get total page
    const totalPage = Math.ceil(totalData / pageSize);

    const response = await prisma.fasilitas.findMany({
      where: {
        fasilitas: {
          contains: search,
        },
      },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    });

    return {
      data: response.map(toResponseFasilitasType),
      meta: {
        currentPage,
        totalPage,
        totalData,
        pageSize,
      },
    };
  }
  // read detail
  static async detail(id: string): Promise<ResponseFasilitasType> {
    const response = await prisma.fasilitas.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!response) throw new Error("Fasilitas not found");

    return toResponseFasilitasType(response);
  }

  // update
  static async update(
    id: string,
    data: UpdateFasilitasType & { images?: string },
  ): Promise<ResponseFasilitasType> {
    const oldData = await prisma.fasilitas.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!oldData) throw new Error("Fasilitas not found");

    const response = await prisma.fasilitas.update({
      where: {
        id: Number(id),
      },
      data,
    });

    // hapus file lama jika images diganti
    if (data.images && data.images !== oldData.images) {
      await FileService.deleteFormPath(oldData.images, "fasilitas");
    }

    return toResponseFasilitasType(response);
  }

  // delete
  static async delete(id: string): Promise<ResponseFasilitasType> {
    const response = await prisma.fasilitas.delete({
      where: {
        id: Number(id),
      },
    });

    // delete image file
    await FileService.deleteFormPath(response.images, "fasilitas");

    return toResponseFasilitasType(response);
  }

  // get count
  static async getCount(): Promise<number> {
    return prisma.fasilitas.count();
  }
}
