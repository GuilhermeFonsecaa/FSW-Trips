import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient }; //escopo global do projeto, para que não abra várias instâncias de prisma client

export const prisma =
    globalForPrisma.prisma ||     //prisma vai estar no global, se não estiver criar um novo
    new PrismaClient({
        log: ["query"],
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma;  //se criar um novo colocar que o global é o que foi criado