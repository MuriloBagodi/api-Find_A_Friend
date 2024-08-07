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
  cep: z.string(),
  state: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
})

export async function createOrgController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const body = bodySchema.parse(req.body)

  const createOrgUseCase = makeCreateOrgUseCase()

  try {
    const { org } = await createOrgUseCase.execute(body)

    return res.status(201).send(org)
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return res.status(400).send({ message: error.message })
    }
  }
}
