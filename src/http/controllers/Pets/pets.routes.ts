import { FastifyInstance } from 'fastify'
import { createPetController } from './create-pet.controller'
import { verifyJWT } from '@/http/middleware/verifyJwt'
import { getPet } from './get-pet.controller'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT] }, createPetController)
  app.get('/pet', { onRequest: [verifyJWT] }, getPet)
}
