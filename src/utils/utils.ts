// generate excel
import { IStudent, ResponseStudentType } from "../models/student-model";
import ExcelJS from "exceljs";

export function getStartOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0); // mulai 00:00:00
  return d;
}

export const getTodayLocal = (date: Date = new Date()): string => {
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().split("T")[0];
};

// get iso
export function getNowLocalISO(): string {
  const now = new Date();

  // ambil offset lokal dalam menit
  const offset = now.getTimezoneOffset(); // misal WIB: -420 menit
  const localTime = new Date(now.getTime() - offset * 60 * 1000);

  return localTime.toISOString().slice(0, 19); // "YYYY-MM-DDTHH:MM:SS"
}

export function getEndOfToday() {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d;
}

// get start month
export function getStartOfCurrentMonth(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
}

// get end month
export function getEndOfCurrentMonth(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);
}

export const toStartOfDay = (date: string) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

export const toEndOfDay = (date: string) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

// format date text
export const formatDateID = (date?: Date): string => {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

export async function exportStudentExcel(
  data: Omit<
    ResponseStudentType,
    "foto_formal" | "fc_akta_kelahiran" | "foto_kk" | "fc_ktp" | "fc_kis_kip"
  >[],
) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Data Siswa");

  // Header
  worksheet.columns = [
    { header: "Jenis Sekolah", key: "jenis_sekolah", width: 15 },
    { header: "NISN", key: "nisn", width: 18 },
    { header: "NIK", key: "nik", width: 18 },
    { header: "Nama Lengkap", key: "nama_lengkap", width: 25 },
    { header: "Jenis Kelamin", key: "jenis_kelamin", width: 15 },
    { header: "Usia", key: "usia", width: 10 },
    { header: "Tempat Lahir", key: "tempat_lahir", width: 20 },
    { header: "Tanggal Lahir", key: "tanggal_lahir", width: 15 },
    { header: "Alamat", key: "alamat", width: 30 },
    { header: "No Telepon", key: "no_telepon", width: 18 },
  ];

  // Data rows
  data.forEach((item) => {
    worksheet.addRow({
      ...item,
      tanggal_lahir: formatDateID(item.tanggal_lahir),
      jenis_kelamin:
        item.jenis_kelamin === "laki_laki" ? "Laki-laki" : "Perempuan",
    });
  });

  // Styling header
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = {
      bold: true,
      color: { argb: "FFFFFFFF" },
    };

    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF2563EB" }, // biru
    };

    cell.alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  return workbook.xlsx.writeBuffer();
}
