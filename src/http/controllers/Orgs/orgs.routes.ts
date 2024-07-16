import { FastifyInstance } from 'fastify'
import { createOrgController } from './create-org.controller'
import { authenticate } from './authentication.controller'
import { verifyJWT } from '@/http/middleware/verifyJwt'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', { onRequest: [verifyJWT] }, createOrgController)
  app.post('/authenticate', authenticate)
}
