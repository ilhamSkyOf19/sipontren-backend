import prisma from "../lib/prismaClient";
import {
  CreatePendaftaranType,
  ResponsePendaftaranType,
  toResponsePendaftaranType,
} from "../models/pendaftaran-model";
import { ResponseMessage } from "../types/types";

export class PendaftaranService {
  // create
  static async create(
    req: CreatePendaftaranType,
  ): Promise<ResponsePendaftaranType> {
    // call prisma
    const response = await prisma.pendaftaran.create({
      data: {
        ...req,
        aktif: false,
      },
    });

    return response;
  }

  //   read
  static async readAll(): Promise<ResponsePendaftaranType[]> {
    const response = await prisma.pendaftaran.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return response;
  }

  // update aktif
  static async updateAktifById(
    id: number,
    aktif: boolean,
  ): Promise<ResponsePendaftaranType> {
    // call prisma
    const response = await prisma.pendaftaran.update({
      where: { id },
      data: { aktif },
    });

    return response;
  }

  // cek find data aktif
  static async findAktif(): Promise<ResponsePendaftaranType | null> {
    const response = await prisma.pendaftaran.findFirst({
      where: { aktif: true },
    });

    if (!response) return null;

    return toResponsePendaftaranType(response);
  }

  // delete
  static async deleteById(id: number): Promise<ResponseMessage> {
    // call prisma
    const response = await prisma.pendaftaran.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
      message: "success delete",
    };
  }
}
