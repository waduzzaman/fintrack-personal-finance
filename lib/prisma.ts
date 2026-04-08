import { PrismaClient } from '@prisma/client'
import path from 'path'
import { pathToFileURL } from 'url'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const databaseUrl = process.env.DATABASE_URL
const normalizedDatabaseUrl = (() => {
  if (!databaseUrl?.startsWith('file:')) return databaseUrl

  const filePath = databaseUrl.slice('file:'.length)
  if (path.isAbsolute(filePath) || filePath.startsWith('///')) {
    return databaseUrl
  }

  return pathToFileURL(path.resolve(process.cwd(), filePath)).href
})()

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
    datasources: {
      db: {
        url: normalizedDatabaseUrl,
      },
    },
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
