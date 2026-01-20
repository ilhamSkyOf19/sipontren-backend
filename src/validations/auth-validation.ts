import z, { ZodType } from "zod";
import { LoginType } from "../models/auth-model";

export class AuthValidation {
  // login
  static readonly LOGIN = z
    .object({
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
    .strict() satisfies ZodType<LoginType>;
}
