import prisma from "../lib/prismaClient";
import {
  CreateJumlahAlumniType,
  ResponseJumlahAlumniType,
  toResponseJumlahAlumniType,
  UpdateJumlahAlumniType,
} from "../models/jumlahAlumni";

export class JumlahAlumniService {
  // get count student by jenis kelamin
  static async read(): Promise<ResponseJumlahAlumniType> {
    const data = await prisma.jumlah_alumni.findFirst();

    if (!data)
      return {
        id: 0,
        laki_laki: 0,
        perempuan: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

    return toResponseJumlahAlumniType(data);
  }

  // update
  static async setData({
    laki_laki,
    perempuan,
  }: Omit<
    UpdateJumlahAlumniType,
    "id"
  >): Promise<ResponseJumlahAlumniType | null> {
    const response = await prisma.jumlah_alumni.upsert({
      where: { id: 1 },
      create: {
        id: 1,
        laki_laki: laki_laki ?? 0,
        perempuan: perempuan ?? 0,
      },
      update: {
        laki_laki,
        perempuan,
      },
    });

    return toResponseJumlahAlumniType(response);
  }
}
