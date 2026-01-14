import { prisma } from "../lib/prismaClient";
import { FileService } from "./file.service";

export class BannerService {
  // CREATE
  static async create(banner: string): Promise<{ id: number; img: string }> {
    const response = await prisma.banner.create({
      data: { banner },
    });

    return {
      id: response.id,
      img: response.banner,
    };
  }

  // READ ALL
  static async read(): Promise<{ id: number; img: string }[]> {
    const response = await prisma.banner.findMany({
      orderBy: { createdAt: "desc" },
    });

    return response.map((item) => ({
      id: item.id,
      img: item.banner,
    }));
  }

  // READ DETAIL
  static async detail(id: number): Promise<{ id: number; img: string }> {
    const response = await prisma.banner.findUnique({
      where: { id },
    });

    if (!response) throw new Error("Banner not found");

    return {
      id: response.id,
      img: response.banner,
    };
  }

  // UPDATE
  static async update(
    id: number,
    banner: string
  ): Promise<{ id: number; img: string }> {
    const oldBanner = await this.detail(id);

    const response = await prisma.banner.update({
      where: { id },
      data: { banner },
    });

    // hapus file lama
    await FileService.deleteFormPath(oldBanner.img, "banner");

    return {
      id: response.id,
      img: response.banner,
    };
  }

  // DELETE
  static async delete(id: number): Promise<{ id: number; img: string }> {
    const banner = await this.detail(id);

    await prisma.banner.delete({
      where: { id },
    });

    // delete file
    await FileService.deleteFormPath(banner.img, "banner");

    return {
      id,
      img: banner.img,
    };
  }
}
