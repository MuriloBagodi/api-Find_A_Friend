import { makeOrg } from '@/tests/factory/make-org.factory'
import request from 'supertest'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'

import { app } from '@/app'

describe('Authenticate Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should authenticate an org', async () => {
    const org = makeOrg()

    const orgsResponse = await request(app.server).post('/orgs').send(org)

    const response = await request(app.server).post('/orgs/authenticate').send({
      email: org.email,
      password: org.password,
    })

    expect(orgsResponse.status).toBe(201)

    expect(response.status).toBe(200)
    expect(response.body.token).toEqual(expect.any(String))
  })
})
