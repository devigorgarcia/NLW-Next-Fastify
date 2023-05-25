import 'dotenv/config'

import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'
import { resolve } from 'node:path'
import { authRoutes } from './routes/auth'
import { memoriesRoutes } from './routes/memories'
import { uploadRoutes } from './routes/upload'

const app = fastify()

export const prisma = new PrismaClient({
  log: ['query'],
})

app.register(multipart)

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: process.env.SECRET_KEY as string,
})

app.register(authRoutes)
app.register(uploadRoutes)
app.register(memoriesRoutes)

app.get('/', () => {
  return 'Hello World'
})

const port = 3333

app
  .listen({
    port,
  })
  .then(() => {
    console.log(`🚀 Running server on http://localhost:${port}`)
  })
