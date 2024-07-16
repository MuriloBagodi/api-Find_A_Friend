import { makeFetchNearByOrgsUseCase } from '@/use-cases/factories/make-fetch-nearby-orgs-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchNearByOrgs(req: FastifyRequest, res: FastifyReply) {
  const fetchNearByOrgsBodySchema = z.object({
    latitude: z.coerce.number(),
    longitude: z.coerce.number(),
  })

  const { latitude, longitude } = fetchNearByOrgsBodySchema.parse(req.query)

  const fetchNearByOrgsUseCase = makeFetchNearByOrgsUseCase()

  try {
    const { orgs } = await fetchNearByOrgsUseCase.execute({
      userLatitude: latitude,
      userLongitude: longitude,
    })

    res.status(200).send({ orgs })
  } catch (err) {
    res.status(400).send({ error: err })
  }
}
