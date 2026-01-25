import z, { ZodType } from "zod";
import { CreateNewsType, UpdateNewsType } from "../models/news-model";

// helper sederhana
const minWords = (n: number) => (val: string) =>
  val.trim().split(/\s+/).length >= n;

export class NewsValidation {
  // =======================
  // FIELD SCHEMA
  // =======================

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
    .max(3000, { message: "content maksimal 3000 karakter" });

  private static categorySchema = z.enum(
    ["berita", "artikel"],
    "category harus diisi",
  );

  // update link enum
  private static updateCategorySchema = z.enum(
    ["update", "delete"],
    "category harus diisi",
  );

  // =======================
  // LINK BERITA
  // =======================

  private static linkBeritaSchema = z.object({
    label: z
      .string("label harus diisi")
      .trim()
      .min(2, { message: "label minimal 2 karakter" })
      .max(100, { message: "label maksimal 100 karakter" }),

    link: z.string("link harus diisi").trim(),
  });

  // =======================
  // UPDATE LINK BERITA
  // =======================

  private static updateLinkBeritaSchema = z.object({
    id: z.number(),
    label: z
      .string("label harus diisi")
      .trim()
      .min(2, { message: "label minimal 2 karakter" })
      .max(100, { message: "label maksimal 100 karakter" })
      .optional(),

    link: z.string("link harus diisi").trim().optional(),

    action: this.updateCategorySchema,
  });

  // =======================
  // CREATE
  // =======================
  static readonly CREATE = z
    .object({
      title: this.titleSchema,
      content: this.contentSchema,
      category: this.categorySchema,

      link_berita: z.array(this.linkBeritaSchema).optional(),
    })
    .strict() satisfies ZodType<CreateNewsType>;

  // =======================
  // UPDATE
  // =======================
  static readonly UPDATE = z
    .object({
      title: this.titleSchema.optional(),
      content: this.contentSchema.optional(),
      category: this.categorySchema.optional(),

      link_berita: z.array(this.linkBeritaSchema).optional(),
      update_link_berita: z.array(this.updateLinkBeritaSchema).optional(),
    })
    .strict() satisfies ZodType<UpdateNewsType>;
}
