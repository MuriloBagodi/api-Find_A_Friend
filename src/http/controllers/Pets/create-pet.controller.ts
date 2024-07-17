import { OrgNotFoundError } from '@/use-cases/errors/org-not-found.error'
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

  const org_id = req.user.sub

  try {
    const { pet } = await createPetUseCase.execute({ ...body, org_id })

    res.status(201).send(pet)
  } catch (err) {
    if (err instanceof OrgNotFoundError) {
      return res.status(404).send({ message: err.message })
    }

    console.error(err)

    return res.status(500).send({ message: 'Internal server error' })
  }
}
