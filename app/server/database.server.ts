import { PrismaClient } from '@prisma/client'

interface CustomNodeJsGlobal extends NodeJS.Global {
    prisma: PrismaClient
}

declare const global: CustomNodeJsGlobal

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export { prisma }