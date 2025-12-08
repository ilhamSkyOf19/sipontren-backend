// Ustad Interface (MongoDB)
export interface IUstad {
  _id: string; // MongoDB ObjectId sebagai string
  name: string;
  jenis_kelamin: "laki_laki" | "perempuan";
  tempat_lahir: string;
  tanggal_lahir: string;
  alamat: string;
  no_telepon: string;
  jabatan: string;
  ustad_img: string;
  url_ustad_img: string;
  createdAt: string;
  updatedAt: string;
}

// create type
export type CreateUstadType = {
  name: string;
  jenis_kelamin: "laki_laki" | "perempuan";
  tempat_lahir: string;
  tanggal_lahir: string;
  alamat: string;
  no_telepon: string;
  jabatan: string;
  ustad_img: string;
};

// update type
export type UpdateUstadType = Partial<CreateUstadType> & {
  _id: string;
};

// response type
export type ResponseUstadType = Omit<CreateUstadType, "ustad_img"> & {
  _id: string;
  ustad_img: string;
  url_ustad_img: string;
  createdAt: string;
  updatedAt: string;
};

// to response helper
export const toResponseUstadType = (ustad: IUstad): ResponseUstadType => ({
  _id: ustad._id,
  name: ustad.name,
  jenis_kelamin: ustad.jenis_kelamin,
  tempat_lahir: ustad.tempat_lahir,
  tanggal_lahir: ustad.tanggal_lahir,
  alamat: ustad.alamat,
  no_telepon: ustad.no_telepon,
  jabatan: ustad.jabatan,
  ustad_img: ustad.ustad_img,
  url_ustad_img: ustad.url_ustad_img,
  createdAt: ustad.createdAt,
  updatedAt: ustad.updatedAt,
});
