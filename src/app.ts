import fastify from 'fastify'
import { orgsRoutes } from './http/controllers/Orgs/orgs.routes'
import { petsRoutes } from './http/controllers/Pets/pets.routes'

export const app = fastify()

app.register(orgsRoutes)
app.register(petsRoutes)
