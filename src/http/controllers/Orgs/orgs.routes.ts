import { FastifyInstance } from 'fastify'
import { createOrgController } from './create-org.controller'
import { authenticate } from './authentication.controller'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrgController)
  app.post('/authenticate', authenticate)
}
