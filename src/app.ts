/* eslint-disable camelcase */
import fastify from 'fastify'
import { orgsRoutes } from './http/controllers/Orgs/orgs.routes'

export const app = fastify()

app.register(orgsRoutes)
