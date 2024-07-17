import { makeOrg } from '@/tests/factory/make-org.factory'
import request from 'supertest'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'

import { app } from '@/app'

describe('Create Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create an org', async () => {
    const org = makeOrg()

    const orgsResponse = await request(app.server).post('/orgs').send(org)

    expect(orgsResponse.status).toBe(201)
  })
})
