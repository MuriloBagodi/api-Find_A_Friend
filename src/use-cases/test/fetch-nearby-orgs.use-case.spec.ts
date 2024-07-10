import { InMemoryOrgsRepository } from '@/repository/in-memory/in-memory-orgs.repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { makeOrg } from '@/tests/factory/make-org.factory'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/org-invalid-credentials.error'
import { FetchNearbyUseCase } from '../fetch-nearby-orgs.use-case'

let orgsRepository: InMemoryOrgsRepository
let sut: FetchNearbyUseCase
describe('Fetch Nearby Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    // sut -> System under test
    sut = new FetchNearbyUseCase(orgsRepository)
  })

  it('Should be able to fetch nearby organizations', async () => {
    const org = await orgsRepository.create(makeOrg())

    const { orgs } = await sut.execute({
      userLatitude: org.latitude.toNumber(),
      userLongitude: org.longitude.toNumber(),
    })

    expect(orgs).toEqual([org])
  })

  // TODO: Need to create a new test to validate if the user can create a org with the same email || Expect Error
})
