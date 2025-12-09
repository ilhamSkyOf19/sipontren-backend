import {
  CreateAdminType,
  ResponseAdminType,
  toResponseAdminType,
} from "../models/admin-model";
import bcryptjs from "bcryptjs";
import { AdminModel } from "../schemas/admin.schema";

export class AdminService {
  // CREATE ADMIN
  static async create(req: CreateAdminType): Promise<ResponseAdminType> {
    // Hash password
    const passwordHash = bcryptjs.hashSync(req.password, 10);

    // Create to DB
    const admin = await AdminModel.create({
      name: req.name,
      email: req.email,
      password: passwordHash,
      role: "admin",
    });

    // Convert to response format
    return toResponseAdminType(admin);
  }
}
