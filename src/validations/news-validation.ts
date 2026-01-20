import z, { ZodType } from "zod";
import { CreateNewsType, UpdateNewsType } from "../models/news-model";

// helper sederhana
const minWords = (n: number) => (val: string) =>
  val.trim().split(/\s+/).length >= n;

export class NewsValidation {
  private static titleSchema = z
    .string("title harus diisi")
    .trim()
    .min(5, { message: "title minimal 5 karakter" })
    .max(200, { message: "title maksimal 200 karakter" })
    .refine(minWords(2), {
      message: "title minimal terdiri dari 2 kata",
    });

  private static contentSchema = z
    .string("content harus diisi")
    .trim()
    .min(20, { message: "content minimal 20 karakter" })
    .max(3000, { message: "content maksimal 3000 karakter" })
    .refine(minWords(5), {
      message: "content minimal terdiri dari 5 kata",
    });

  private static categorySchema = z.enum(
    ["berita", "artikel"],
    "category harus diisi",
  );

  // CREATE
  static readonly CREATE = z
    .object({
      title: this.titleSchema,
      content: this.contentSchema,
      category: this.categorySchema,
    })
    .strict() satisfies ZodType<CreateNewsType>;

  // UPDATE
  static readonly UPDATE = z
    .object({
      title: this.titleSchema.optional(),
      content: this.contentSchema.optional(),
      category: this.categorySchema.optional(),
    })
    .strict() satisfies ZodType<UpdateNewsType>;
}
