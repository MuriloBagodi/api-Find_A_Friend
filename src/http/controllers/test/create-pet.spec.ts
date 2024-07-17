import request from 'supertest'
import { describe, beforeAll, afterAll, it } from 'vitest'

import { app } from '@/app'
import { makeOrg } from '@/tests/factory/make-org.factory'
import { makePet } from '@/tests/factory/make-pet.factory'

describe('Create Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a new pet', async () => {
    const org = makeOrg()

    await request(app.server).post('/orgs').send(org).expect(201)

    const authResponse = await request(app.server)
      .post('/orgs/authenticate')
      .send({ email: org.email, password: org.password })
      .expect(200)

    await request(app.server)
      .post('/pet/create')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ org_id: org.id }))
      .expect(201)
  })
})
