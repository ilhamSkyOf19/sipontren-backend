// Alumni Interface (MongoDB)
export type IAlumni = {
  _id: string; // MongoDB ObjectId (wajib)
  name: string;
  angkatan: string;
  description: string;
  img_alumni: string;
  createdAt: string; // timestamps wajib ada
  updatedAt: string;
};

// CREATE – tanpa _id (dibuat oleh MongoDB)
export type CreateAlumniType = {
  name: string;
  angkatan: string;
  description: string;
  img_alumni: string;
};

// UPDATE – semua optional kecuali _id
export type UpdateAlumniType = Partial<CreateAlumniType> & {
  _id: string; // wajib
};

// RESPONSE – dikirim kembali ke FE
export type ResponseAlumniType = {
  _id: string;
  name: string;
  angkatan: string;
  description: string;
  img_alumni: string;
  createdAt: string;
  updatedAt: string;
};

// Mapper: Mongoose Document → Response DTO
export const toResponseAlumniType = (alumni: IAlumni): ResponseAlumniType => {
  return {
    _id: alumni._id,
    name: alumni.name,
    angkatan: alumni.angkatan,
    description: alumni.description,
    img_alumni: alumni.img_alumni,
    createdAt: alumni.createdAt,
    updatedAt: alumni.updatedAt,
  };
};
