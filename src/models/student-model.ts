// Student Interface (MongoDB)
export type IStudent = {
  _id: string; // MongoDB ObjectId sebagai string
  jenis_sekolah: "SD" | "SMP" | "SMA";
  nisn: string;
  nik: string;
  nama_lengkap: string;
  jenis_kelamin: "laki_laki" | "perempuan";
  usia: number;
  tempat_lahir: string;
  tanggal_lahir: string; // ISO string
  alamat: string;
  no_telepon: string;
  anak_ke: number;
  jumlah_saudara: number;
  asal_sekolah: string;
  alamat_sekolah_asal: string;
  nama_lengkap_ayah: string;
  nama_lengkap_ibu: string;
  nama_lengkap_wali: string;

  // files
  foto_formal: string;
  fc_akta_kelahiran: string;
  foto_kk: string;
  fc_ktp: string;
  fc_kis_kip: string;

  // timestamps
  createdAt: string; // ISO string dari mongoose timestamps
  updatedAt: string;
};

// Create student type
export type CreateStudentType = Omit<
  IStudent,
  | "_id"
  | "createdAt"
  | "updatedAt"
  | "foto_formal"
  | "fc_akta_kelahiran"
  | "foto_kk"
  | "fc_ktp"
  | "fc_kis_kip"
>;

// Update student type
export type UpdateStudentType = Partial<
  Omit<IStudent, "_id" | "createdAt" | "updatedAt">
>;

// Response type
export type ResponseStudentType = IStudent;

// To response (mengubah mongoose document menjadi ResponseStudentType)
export const toResponseStudentType = (
  student: IStudent
): ResponseStudentType => {
  return {
    ...student,
    _id: student._id.toString(),
  };
};

export type FileStudent = {
  foto_formal: string;
  fc_akta_kelahiran: string;
  foto_kk: string;
  fc_ktp: string;
  fc_kis_kip: string;
};
