import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exist.error'

const bodySchema = z.object({
  name: z.string(),
  author_name: z.string(),
  email: z.string(),
  whatsapp: z.string(),
  password: z.string(),
  cep: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  neighborhood: z.string().optional(),
  street: z.string().optional(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
})

export async function createOrgController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const body = bodySchema.parse(request.body)

  const createOrgUseCase = makeCreateOrgUseCase()

  try {
    const { org } = await createOrgUseCase.execute(body)

    return reply.status(201).send(org)
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(400).send({ message: error.message })
    }
  }
}
