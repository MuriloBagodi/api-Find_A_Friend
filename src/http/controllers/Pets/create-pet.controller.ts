import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createPetController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const petBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energy_level: z.string(),
    environment: z.string(),
    org_id: z.string(),
  })

  const body = petBodySchema.parse(req.body)

  const createPetUseCase = makeCreatePetUseCase()

  try {
    const { pet } = await createPetUseCase.execute(body)

    res.status(201).send(pet)
  } catch (err) {
    res.status(409).send({ message: err })
  }
}
