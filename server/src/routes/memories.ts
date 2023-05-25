import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../server'

export const memoriesRoutes = async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/memories', async (request) => {
    const memories = await prisma.memory.findMany({
      where: {
        userId: request.user.sub,
      },
      orderBy: {
        createAt: 'asc',
      },
    })

    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        excerpt: memory.content.substring(0, 115).concat('...'),
      }
    })
  })

  app.get('/memories/:id', async (request, reply) => {
    const paramsSchemas = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchemas.parse(request.params)

    const memory = await prisma.memory.findFirstOrThrow({
      where: {
        id,
      },
    })

    if (memory.userId !== request.user.sub && !memory.isPublic) {
      return reply.status(401).send()
    }

    return memory
  })

  app.post('/memories', async (request) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    console.log(request.body)
    const { content, coverUrl, isPublic } = bodySchema.parse(request.body)

    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic: isPublic || false,
        userId: request.user.sub,
      },
    })

    return memory
  })

  app.patch('/memories/:id', async (request, reply) => {
    const paramsSchemas = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchemas.parse(request.params)

    const bodySchema = z.object({
      content: z.string().optional(),
      isPublic: z.coerce.boolean().default(false).optional(),
      coverUrl: z.string().optional(),
    })

    const { content, isPublic, coverUrl } = bodySchema.parse(request.body)

    const memory = await prisma.memory.findFirstOrThrow({
      where: {
        id,
      },
    })

    if (memory.userId !== request.user.sub) {
      return reply.status(401).send()
    }

    const updateMemory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic,
      },
    })

    return updateMemory
  })

  app.delete('/memories/:id', async (request) => {
    const paramsSchemas = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchemas.parse(request.params)

    await prisma.memory.findFirstOrThrow({
      where: {
        id,
      },
    })

    await prisma.memory.delete({
      where: {
        id,
      },
    })
  })
}
