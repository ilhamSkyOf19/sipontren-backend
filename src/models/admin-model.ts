import { Admin } from "../generated/prisma"


// create 
export type CreateAdminType = {
    name: string
    email: string
    password: string
}


// update 
export type UpdateAdminType = Partial<CreateAdminType> & {
    id: number;
}


// response 
export type ResponseAdminType = Omit<CreateAdminType, 'password'> & {
    id: number
    createAt: Date
    updateAt: Date
}



// to response 
export const toResponseAdminType = (admin: Admin): ResponseAdminType => {
    return {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        createAt: admin.createAt,
        updateAt: admin.updateAt

    }
}