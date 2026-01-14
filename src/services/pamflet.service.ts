import { prisma } from "../lib/prismaClient";
import { FileService } from "./file.service";

export class PamfletService {
  // CREATE
  static async create(pamflet: string): Promise<{ id: number; img: string }> {
    const response = await prisma.pamflet.create({
      data: { pamflet },
    });

    return {
      id: response.id,
      img: response.pamflet,
    };
  }

  // READ ALL
  static async read(): Promise<{ id: number; img: string }[]> {
    const response = await prisma.pamflet.findMany({
      orderBy: { createdAt: "desc" },
    });

    return response.map((item) => ({
      id: item.id,
      img: item.pamflet,
    }));
  }

  // READ DETAIL
  static async detail(id: string): Promise<{ id: number; img: string }> {
    const response = await prisma.pamflet.findUnique({
      where: { id: +id },
    });

    if (!response) throw new Error("Pamflet not found");

    return {
      id: response.id,
      img: response.pamflet,
    };
  }

  // UPDATE
  static async update(
    id: string,
    pamflet: string
  ): Promise<{ id: number; img: string }> {
    const oldPamflet = await this.detail(id);

    const response = await prisma.pamflet.update({
      where: { id: +id },
      data: { pamflet },
    });

    // delete old file
    await FileService.deleteFormPath(oldPamflet.img, "pamflet");

    return {
      id: response.id,
      img: response.pamflet,
    };
  }

  // DELETE
  static async delete(id: string): Promise<{ id: number; img: string }> {
    const pamflet = await this.detail(id);

    await prisma.pamflet.delete({
      where: { id: +id },
    });

    // delete file
    await FileService.deleteFormPath(pamflet.img, "pamflet");

    return {
      id: +id,
      img: pamflet.img,
    };
  }
}
