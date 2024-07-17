import request from 'supertest'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'

import { app } from '@/app'
import { makeOrg } from '@/tests/factory/make-org.factory'
import { makePet } from '@/tests/factory/make-pet.factory'

describe('Get Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get a pet by id', async () => {
    const org = makeOrg()
    const pet = makePet({ org_id: org.id })

    await request(app.server).post('/orgs').send(org).expect(201)

    const authResponse = await request(app.server)
      .post('/orgs/authenticate')
      .send({ email: org.email, password: org.password })
      .expect(200)

    const createPetResponse = await request(app.server)
      .post('/pet/create')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(pet)
      .expect(201)

    const response = await request(app.server).get(
      `/pet/${createPetResponse.body.id}`,
    )

    expect(response.statusCode).toEqual(200)
  })
})
