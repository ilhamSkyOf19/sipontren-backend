export type IAdmin = {
  _id?: string; // ObjectId dari MongoDB
  name: string;
  email: string;
  password: string;
  role: "admin"; // hanya admin
  createdAt?: Date; // otomatis dari mongoose timestamps
  updatedAt?: Date;
};

export type CreateAdminType = Omit<
  IAdmin,
  "_id" | "createdAt" | "updatedAt" | "role"
>;

export type UpdateAdminType = Partial<Omit<IAdmin, "_id" | "role">> & {
  _id: string;
};

export type ResponseAdminType = Omit<IAdmin, "password"> & {
  _id: string;
};

export const toResponseAdminType = (
  admin: IAdmin & { _id: string }
): ResponseAdminType => {
  return {
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    createdAt: admin.createdAt ?? new Date(),
    updatedAt: admin.updatedAt ?? new Date(),
  };
};
