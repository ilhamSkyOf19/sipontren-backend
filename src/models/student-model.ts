import { Student } from "../generated/prisma";


export type FileStudent = {
    foto_formal: string;
    fc_akta_kelahiran: string;
    foto_kk: string;
    fc_ktp: string;
    fc_kis_kip: string
}



export type CreateStudentType = {
    jenis_sekolah: "SD" | "SMP" | "SMA";  // dari enum Sekolah
    nisn: string;
    nik: string;
    nama_lengkap: string;
    jenis_kelamin: "laki_laki" | "perempuan"; // asumsi enum Jenis_Kelamin
    usia: string;
    tempat_lahir: string;
    tanggal_lahir: string; // bisa diganti Date kalau di DB kamu pakai DateTime
    alamat: string;
    no_telepon: string;
    anak_ke: string;
    jumlah_saudara: string;
    asal_sekolah: string;
    alamat_sekolah_asal: string;
    nama_lengkap_ayah: string;
    nama_lengkap_ibu: string;
    nama_lengkap_wali: string;
};


// update 
export type UpdateStudentType = Partial<CreateStudentType>;


// response 
export type ResponseStudentType = Omit<CreateStudentType, 'usia' | 'anak_ke' | 'jumlah_saudara'> & {
    usia: number;
    anak_ke: number;
    jumlah_saudara: number;
    foto_formal: string;
    fc_akta_kelahiran: string;
    foto_kk: string;
    fc_ktp: string;
    fc_kis_kip: string;
    id: number
};


// to response 
export const toResponseStudentType = (student: Student): ResponseStudentType => {
    return {
        id: student.id,
        jenis_sekolah: student.jenis_sekolah,
        nisn: student.nisn,
        nik: student.nik,
        no_telepon: student.no_telepon,
        nama_lengkap: student.nama_lengkap,
        jenis_kelamin: student.jenis_kelamin,
        usia: student.usia,
        tempat_lahir: student.tempat_lahir,
        tanggal_lahir: student.tanggal_lahir,
        alamat: student.alamat,
        anak_ke: student.anak_ke,
        jumlah_saudara: student.jumlah_saudara,
        asal_sekolah: student.asal_sekolah,
        alamat_sekolah_asal: student.alamat_sekolah_asal,
        nama_lengkap_ayah: student.nama_lengkap_ayah,
        nama_lengkap_ibu: student.nama_lengkap_ibu,
        nama_lengkap_wali: student.nama_lengkap_wali,
        foto_formal: student.foto_formal,
        fc_akta_kelahiran: student.fc_akta_kelahiran,
        foto_kk: student.foto_kk,
        fc_ktp: student.fc_ktp,
        fc_kis_kip: student.fc_kis_kip
    }
}