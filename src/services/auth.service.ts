import prisma from "../lib/prismaClient";
import { LoginType, PayloadType } from "../models/auth-model";
import { ResponseData } from "../types/types";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
  // LOGIN
  static async login(req: LoginType): Promise<ResponseData<string>> {
    // cari admin berdasarkan email
    const admin = await prisma.admin.findUnique({
      where: {
        email: req.email,
      },
    });

    // cek admin
    if (!admin) {
      return {
        success: false,
        message: "email or password not match",
      };
    }

    // compare password
    const isMatch = await bcryptjs.compare(req.password, admin.password);
    if (!isMatch) {
      return {
        success: false,
        message: "email or password not match",
      };
    }

    // generate payload (id dari MySQL)
    const payload: PayloadType = {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: "admin",
    };

    // generate JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
      expiresIn: "1d",
    });

    return {
      success: true,
      message: "success",
      data: token,
    };
  }
}
