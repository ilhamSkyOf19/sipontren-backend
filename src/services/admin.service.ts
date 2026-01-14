import prisma from "../lib/prismaClient";
import { CreateAdminType, ResponseAdminType } from "../models/admin-model";
import bcryptjs from "bcryptjs";

export class AdminService {
  // CREATE ADMIN
  static async create(req: CreateAdminType): Promise<ResponseAdminType> {
    // hash password
    const passwordHash = bcryptjs.hashSync(req.password, 10);

    // simpan ke MySQL via Prisma
    const admin = await prisma.admin.create({
      data: {
        name: req.name,
        email: req.email,
        password: passwordHash,
        role: "admin",
      },
    });

    // response tanpa password
    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      createdAt: admin.createAt,
      updatedAt: admin.updateAt,
    };
  }
}
