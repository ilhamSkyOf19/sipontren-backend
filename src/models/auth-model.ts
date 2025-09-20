// payload 
export type payloadType = {
    id: number;
    email: string;
    name: string;
    role: 'admin'
}





// register 
export type RegisterType = {
    name: string;
    email: string;
    password: string;
}



// login
export type LoginType = {
    email: string;
    password: string;
}


