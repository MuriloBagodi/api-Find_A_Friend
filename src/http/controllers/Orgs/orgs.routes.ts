import { FastifyInstance } from 'fastify'
import { createOrgController } from './create-org.controller'
import { authenticate } from './authentication.controller'
import { fetchNearByOrgs } from './fetch-nearby-orgs.controller'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrgController)
  app.post('/orgs/authenticate', authenticate)
  app.get('/orgs/nearby', fetchNearByOrgs)
}
