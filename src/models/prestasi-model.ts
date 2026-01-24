export type CategoryPrestasi =
  | "internasional"
  | "nasional"
  | "provinsi"
  | "kabupaten"
  | "kecamatan";

export type JenisKelamin = "laki_laki" | "perempuan";

export type IPrestasi = {
  id: number;
  category_prestasi: CategoryPrestasi;
  nama: string;
  tahun_prestasi: number;
  prestasi: string;
  photo: string;
  jenis_kelamin: JenisKelamin;
  createdAt: Date;
  updatedAt: Date;
};

export type CreatePrestasiType = {
  category_prestasi: CategoryPrestasi;
  nama: string;
  tahun_prestasi: number;
  prestasi: string;
  jenis_kelamin: JenisKelamin;
};

export type UpdatePrestasiType = Partial<CreatePrestasiType> & {
  id: number;
};

export type ResponsePrestasiType = {
  id: number;
  category_prestasi: CategoryPrestasi;
  nama: string;
  tahun_prestasi: number;
  prestasi: string;
  photo: string;
  jenis_kelamin: JenisKelamin;
  createdAt: Date;
  updatedAt: Date;
};

export type ResponsePrestasiWithMetaType = {
  data: ResponsePrestasiType[];
  meta: {
    currentPage: number;
    totalPage: number;
    totalData: number;
    pageSize: number;
  };
};

export const toResponsePrestasiType = (
  prestasi: IPrestasi,
): ResponsePrestasiType => {
  return {
    id: prestasi.id,
    category_prestasi: prestasi.category_prestasi,
    nama: prestasi.nama,
    tahun_prestasi: prestasi.tahun_prestasi,
    prestasi: prestasi.prestasi,
    photo: prestasi.photo,
    jenis_kelamin: prestasi.jenis_kelamin,
    createdAt: prestasi.createdAt,
    updatedAt: prestasi.updatedAt,
  };
};

export type FilterPrestasiData = {
  search?: string;
  category_prestasi?: CategoryPrestasi;
  jenis_kelamin?: JenisKelamin;
  tahun_prestasi?: string;
  page?: string;
};
