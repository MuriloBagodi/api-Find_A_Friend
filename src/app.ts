/* eslint-disable camelcase */
import fastify from 'fastify'
import { orgRoutes } from './http/Organization/routes'

export const app = fastify()

app.register(orgRoutes, { prefix: 'org' })
