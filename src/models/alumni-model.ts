import { Alumni } from "../generated/prisma";

// create
export type CreateAlumniType = {
    name: string;
    angkatan: string;
    description: string;
};

// update
export type UpdateAlumniType = Partial<CreateAlumniType>;

// response
export type ResponseAlumniType = CreateAlumniType & {
    id: number;
    img_alumni: string;
    createdAt: Date;
    updatedAt: Date;
};

// to response
export const toResponseAlumniType = (alumni: Alumni): ResponseAlumniType => {
    return {
        id: alumni.id,
        name: alumni.name,
        angkatan: alumni.angkatan,
        description: alumni.description,
        img_alumni: alumni.img_alumni,
        createdAt: alumni.createdAt,
        updatedAt: alumni.updatedAt
    };
};
