import z, { ZodType } from "zod";
import { CreateAlumniType, UpdateAlumniType } from "../models/alumni-model";

export class AlumniValidation {

    // create
    static readonly CREATE = z.object({
        name: z.string({
            error: (val) => val.input === undefined ? 'nama harus diisi' : 'nama harus berupa string'
        })
            .min(3, { message: 'nama minimal 3 karakter' }),

        angkatan: z.string({
            error: (val) => val.input === undefined ? 'angkatan harus diisi' : 'angkatan harus berupa string'
        })
            .min(2, { message: 'angkatan minimal 2 karakter' }),

        description: z.string({
            error: (val) => val.input === undefined ? 'deskripsi harus diisi' : 'deskripsi harus berupa string'
        })
            .min(5, { message: 'deskripsi minimal 5 karakter' }),
    }).strict() as ZodType<CreateAlumniType>;



    // update
    static readonly UPDATE = z.object({
        name: z.string({
            error: (val) => val.input === undefined ? 'nama harus diisi' : 'nama harus berupa string'
        })
            .min(3, { message: 'nama minimal 3 karakter' })
            .optional(),

        angkatan: z.string({
            error: (val) => val.input === undefined ? 'angkatan harus diisi' : 'angkatan harus berupa string'
        })
            .min(2, { message: 'angkatan minimal 2 karakter' })
            .optional(),

        description: z.string({
            error: (val) => val.input === undefined ? 'deskripsi harus diisi' : 'deskripsi harus berupa string'
        })
            .min(5, { message: 'deskripsi minimal 5 karakter' })
            .optional(),
    }).strict() as ZodType<UpdateAlumniType>;
}
