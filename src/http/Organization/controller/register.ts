/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'
import { registerUseCase } from '@/use-cases/resgister'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerOrg(req: FastifyRequest, res: FastifyReply) {
  const registerOrganizationBodySchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    author_name: z.string(),
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
  })

  const { name, email, password, author_name, latitude, longitude } =
    registerOrganizationBodySchema.parse(req.body)

  const orgWithSameEmail = await prisma.org.findUnique({
    where: {
      email,
    },
  })

  if (orgWithSameEmail) {
    res.status(409).send()
  }
  try {
    await registerUseCase({
      name,
      email,
      password,
      author_name,
      latitude,
      longitude,
    })
    res.status(201).send()
  } catch (err) {
    res.status(409).send()
  }
}
