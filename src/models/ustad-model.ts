// Ustad Interface (MongoDB)
export interface IUstad {
  id: number; // MongoDB ObjectId sebagai string
  name: string;
  jenis_kelamin: "laki_laki" | "perempuan";
  tempat_lahir: string;
  tanggal_lahir: string;
  alamat: string;
  no_telepon: string;
  jabatan: string;
  ustad_img: string;
  createdAt: Date;
  updatedAt: Date;
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
  id: number;
};

// response type
export type ResponseUstadType = Omit<CreateUstadType, "ustad_img"> & {
  id: number;
  ustad_img: string;
  createdAt: Date;
  updatedAt: Date;
};

// response with meta
export type ResponseUstadWithMetaType = {
  data: ResponseUstadType[];
  meta: {
    currentPage: number;
    totalPage: number;
    totalData: number;
    pageSize: number;
  };
};

// to response helper
export const toResponseUstadType = (ustad: IUstad): ResponseUstadType => ({
  id: ustad.id,
  name: ustad.name,
  jenis_kelamin: ustad.jenis_kelamin,
  tempat_lahir: ustad.tempat_lahir,
  tanggal_lahir: ustad.tanggal_lahir,
  alamat: ustad.alamat,
  no_telepon: ustad.no_telepon,
  jabatan: ustad.jabatan,
  ustad_img: ustad.ustad_img,
  createdAt: ustad.createdAt,
  updatedAt: ustad.updatedAt,
});

// filter data
export type FilterData = {
  search?: string;
  page?: string;
  limit?: string;
};
