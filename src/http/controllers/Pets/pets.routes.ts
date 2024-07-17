import { FastifyInstance } from 'fastify'
import { createPetController } from './create-pet.controller'
import { verifyJWT } from '@/http/middleware/verifyJwt'
import { getPet } from './get-pet.controller'
import { searchPets } from './search-pets.controllers'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pet/create', { onRequest: [verifyJWT] }, createPetController)
  app.get('/pet/get', getPet)
  app.get('/pet/search', searchPets)
}
