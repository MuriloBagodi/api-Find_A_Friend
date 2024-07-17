import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchPets(req: FastifyRequest, res: FastifyReply) {
  const searchPetsBodySchema = z.object({
    city: z.string(),
    page: z.coerce.number(),
    age: z.string().optional(),
    size: z.string().optional(),
    energy_level: z.string().optional(),
    environment: z.string().optional(),
  })

  const { city, page, age, size, energy_level, environment } =
    searchPetsBodySchema.parse(req.query)

  try {
    const searchPetsUseCase = makeSearchPetsUseCase()

    const { pets } = await searchPetsUseCase.execute({
      city,
      page,
      age,
      size,
      energy_level,
      environment,
    })

    res.status(201).send(pets)
  } catch (err) {
    res.status(400).send(err)
  }
}
