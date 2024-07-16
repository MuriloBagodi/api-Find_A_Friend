import { PetNotFoundError } from '@/use-cases/errors/pet-not-found.error'
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const routeSchema = z.object({
  id: z.string(),
})

export async function getPet(req: FastifyRequest, res: FastifyReply) {
  const { id } = routeSchema.parse(req.query)
  const getPet = makeGetPetUseCase()

  try {
    const { pet } = await getPet.execute({ id })

    return res.status(200).send(pet)
  } catch (error) {
    if (error instanceof PetNotFoundError) {
      return res.status(404).send({ message: error.message })
    }

    console.error(error)

    return res.status(500).send({ message: 'Internal server error' })
  }
}
