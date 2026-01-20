import { prisma } from "../lib/prismaClient";
import { FileService } from "./file.service";

export class PamfletService {
  // CREATE
  static async create(
    pamflet: string,
  ): Promise<{ id: number; pamflet: string }> {
    const response = await prisma.pamflet.create({
      data: { pamflet },
    });

    return {
      id: response.id,
      pamflet: response.pamflet,
    };
  }

  // READ ALL
  static async read(): Promise<{ id: number; pamflet: string }[]> {
    const response = await prisma.pamflet.findMany({
      orderBy: { createdAt: "desc" },
    });

    return response.map((item) => ({
      id: item.id,
      pamflet: item.pamflet,
    }));
  }

  // READ DETAIL
  static async detail(id: string): Promise<{ id: number; pamflet: string }> {
    const response = await prisma.pamflet.findUnique({
      where: { id: +id },
    });

    if (!response) throw new Error("Pamflet not found");

    return {
      id: response.id,
      pamflet: response.pamflet,
    };
  }

  // UPDATE
  static async update(
    id: string,
    pamflet: string,
  ): Promise<{ id: number; pamflet: string }> {
    const oldPamflet = await this.detail(id);

    const response = await prisma.pamflet.update({
      where: { id: +id },
      data: { pamflet },
    });

    // delete old file
    await FileService.deleteFormPath(oldPamflet.pamflet, "pamflet");

    return {
      id: response.id,
      pamflet: response.pamflet,
    };
  }

  // DELETE
  static async delete(id: string): Promise<{ id: number; pamflet: string }> {
    const pamflet = await this.detail(id);

    await prisma.pamflet.delete({
      where: { id: +id },
    });

    // delete file
    await FileService.deleteFormPath(pamflet.pamflet, "pamflet");

    return {
      id: +id,
      pamflet: pamflet.pamflet,
    };
  }
}
