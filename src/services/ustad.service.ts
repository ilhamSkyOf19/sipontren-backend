import {
  IUstad,
  CreateUstadType,
  UpdateUstadType,
  ResponseUstadType,
  toResponseUstadType,
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
    ustad_img: string
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
  static async read(): Promise<ResponseUstadType[]> {
    const ustads = await prisma.ustad.findMany();
    return ustads.map((ustad) => toResponseUstadType(ustad as IUstad));
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
    ustad_img?: string
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
}
