import { ResponseJumlahAlumniType } from "./jumlahAlumni";

export type DashboardResponse = {
  ustad: {
    laki_laki: number;
    perempuan: number;
  };
  jumlahAlumni: ResponseJumlahAlumniType;
  fasilitas: number;
  berita: {
    berita: number;
    artikel: number;
  };
};
