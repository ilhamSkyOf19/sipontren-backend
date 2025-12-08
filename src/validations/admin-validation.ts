import z, { ZodType } from "zod";
import { CreateAdminType } from "../models/admin-model";

export class AdminValidation {
  // create
  static readonly CREATE = z
    .object({
      name: z.string({
        error: (val) =>
          val.input === undefined
            ? "name harus diisi"
            : "name harus berupa string",
      }),
      email: z.email({
        error: (val) =>
          val.input === undefined
            ? "email harus diisi"
            : "email harus berupa email",
      }),
      password: z.string({
        error: (val) =>
          val.input === undefined
            ? "password harus diisi"
            : "password harus berupa string",
      }),
    })
    .strict() as ZodType<CreateAdminType>;
}
