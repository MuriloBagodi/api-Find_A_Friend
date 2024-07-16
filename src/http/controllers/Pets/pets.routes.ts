import { FastifyInstance } from 'fastify'
import { createPetController } from './create-pet.controller'
import { verifyJWT } from '@/http/middleware/verifyJwt'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT] }, createPetController)
}
