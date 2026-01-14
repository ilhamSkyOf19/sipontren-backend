import {
  CreateAlumniType,
  UpdateAlumniType,
  ResponseAlumniType,
  toResponseAlumniType,
} from "../models/alumni-model";
import { ResponseData, ResponseMessage } from "../types/types";
import { FileService } from "./file.service";
import { prisma } from "../lib/prismaClient";

export class AlumniService {
  // =======================
  // CREATE
  // =======================
  static async create(
    req: Omit<CreateAlumniType, "img_alumni">,
    img_alumni: string
  ): Promise<ResponseAlumniType> {
    const response = await prisma.alumni.create({
      data: {
        name: req.name,
        angkatan: req.angkatan,
        description: req.description,
        img_alumni,
      },
    });

    return toResponseAlumniType(response);
  }

  // =======================
  // READ ALL
  // =======================
  static async read(): Promise<ResponseAlumniType[]> {
    const response = await prisma.alumni.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    return response.map(toResponseAlumniType);
  }

  // =======================
  // DETAIL
  // =======================
  static async detail(id: number): Promise<ResponseData<ResponseAlumniType>> {
    const response = await prisma.alumni.findUnique({
      where: { id },
    });

    if (!response) {
      return {
        success: false,
        message: "Alumni not found",
      };
    }

    return {
      success: true,
      message: "Success read detail alumni",
      data: toResponseAlumniType(response),
    };
  }

  // =======================
  // UPDATE
  // =======================
  static async update(
    id: number,
    img_alumni: string,
    req: Omit<UpdateAlumniType, "img_alumni" | "id">
  ): Promise<ResponseData<ResponseAlumniType>> {
    const alumni = await prisma.alumni.findUnique({
      where: { id },
    });

    if (!alumni) {
      return {
        success: false,
        message: "Alumni not found",
      };
    }

    const oldImage = alumni.img_alumni;

    // jika ada gambar baru → hapus lama
    if (img_alumni && img_alumni !== oldImage) {
      await FileService.deleteFormPath(oldImage, "img_alumni");
    }

    const response = await prisma.alumni.update({
      where: { id },
      data: {
        ...req,
        img_alumni: img_alumni || oldImage,
      },
    });

    return {
      success: true,
      message: "Success update alumni",
      data: toResponseAlumniType(response),
    };
  }

  // =======================
  // DELETE
  // =======================
  static async delete(id: number): Promise<ResponseMessage> {
    const alumni = await prisma.alumni.findUnique({
      where: { id },
    });

    if (!alumni) {
      return {
        success: false,
        message: "Alumni not found",
      };
    }

    // hapus file gambar
    await FileService.deleteFormPath(alumni.img_alumni, "img_alumni");

    await prisma.alumni.delete({
      where: { id },
    });

    return {
      success: true,
      message: "Success delete alumni",
    };
  }
}
