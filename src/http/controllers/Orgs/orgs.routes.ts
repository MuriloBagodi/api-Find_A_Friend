import { FastifyInstance } from 'fastify'
import { createOrgController } from './create-org.controller'
import { authenticate } from './authentication.controller'
import { verifyJWT } from '@/http/middleware/verifyJwt'
import { fetchNearByOrgs } from './fetch-nearby-orgs.controller'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', { onRequest: [verifyJWT] }, createOrgController)
  app.post('/orgs/authenticate', authenticate)
  app.get('/orgs/nearby', fetchNearByOrgs)
}
