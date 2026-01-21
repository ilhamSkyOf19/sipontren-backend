import z, { ZodType } from "zod";
import { UpdateJumlahAlumniType } from "../models/jumlahAlumni";

export class JumlahAlumniValidation {
  // number schema
  private static numberSchema = (
    msg: string,
    min: number = 0,
    max: number = 999,
  ) =>
    z
      .number(`${msg} harus diisi`)
      .min(min, `${msg} minimal ${min}`)
      .max(max, `${msg} maksimal ${max}`);

  // update
  static readonly UPDATE = z
    .object({
      laki_laki: this.numberSchema("Laki-laki", 0, 99999),
      perempuan: this.numberSchema("Perempuan", 0, 99999),
    })
    .partial()
    .strict() satisfies ZodType<Omit<UpdateJumlahAlumniType, "id">>;
}
