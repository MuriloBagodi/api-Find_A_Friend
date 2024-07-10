import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryPetsRepository } from '@/repository/in-memory/in-memory-pets.repository'
import { InMemoryOrgsRepository } from '@/repository/in-memory/in-memory-orgs.repository'
import { SearchPetsUseCase } from '../search-pets.use-case'
import { makeOrg } from '@/tests/factory/make-org.factory'
import { makePet } from '@/tests/factory/make-pet.factory'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: SearchPetsUseCase
describe('Search Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    // sut -> System under test
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('Should be able to search pets', async () => {
    const org = await orgsRepository.create(makeOrg())
    await petsRepository.create(makePet({ org_id: org.id }))
    await petsRepository.create(makePet({ org_id: org.id }))

    const diffOrg = await orgsRepository.create(makeOrg())

    await petsRepository.create(makePet({ org_id: diffOrg.id }))

    const { pets } = await sut.execute({ city: org.city })

    expect(pets).toHaveLength(2)
  })
})
