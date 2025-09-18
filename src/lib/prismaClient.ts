import { PrismaClient } from "../generated/prisma";

// global prisma 
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };


// prisma 
export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
    });


// global prisma 
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma



// export default prisma
export default prisma;