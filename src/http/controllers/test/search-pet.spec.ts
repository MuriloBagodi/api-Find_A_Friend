import request from 'supertest'
import { describe, beforeAll, afterAll, it, expect } from 'vitest'

import { app } from '@/app'
import { makeOrg } from '@/tests/factory/make-org.factory'
import { makePet } from '@/tests/factory/make-pet.factory'

describe('Search Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should search a pet', async () => {
    const org = makeOrg()
    const pet = makePet({ org_id: org.id })

    await request(app.server).post('/orgs').send(org).expect(201)

    const authResponse = await request(app.server)
      .post('/orgs/authenticate')
      .send({ email: org.email, password: org.password })
      .expect(200)

    await request(app.server)
      .post('/pet/create')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(pet)
      .expect(201)

    await request(app.server)
      .post('/pet/create')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ org_id: org.id }))
      .expect(201)

    const response = await request(app.server).get('/pet/search').query({
      city: org.city,
      page: 1,
      size: pet.size,
    })

    expect(response.statusCode).toEqual(201)
    expect(response.body[0].name).toEqual(pet.name)
  })
})
