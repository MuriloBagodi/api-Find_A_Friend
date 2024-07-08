import { FastifyInstance } from 'fastify'
import { registerOrg } from './controller/register'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/register', registerOrg)
}
