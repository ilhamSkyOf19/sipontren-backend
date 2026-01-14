export type IAdmin = {
  id: number; // ObjectId dari MongoDB
  name: string;
  email: string;
  password: string;
  role: "admin"; // hanya admin
  createdAt?: Date; // otomatis dari mongoose timestamps
  updatedAt?: Date;
};

export type CreateAdminType = Omit<
  IAdmin,
  "id" | "createdAt" | "updatedAt" | "role"
>;

export type UpdateAdminType = Partial<Omit<IAdmin, "role">>;

export type ResponseAdminType = Omit<IAdmin, "password">;

export const toResponseAdminType = (admin: IAdmin): ResponseAdminType => {
  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    createdAt: admin.createdAt ?? new Date(),
    updatedAt: admin.updatedAt ?? new Date(),
  };
};
