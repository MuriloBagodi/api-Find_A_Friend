import { InMemoryOrgsRepository } from '@/repository/in-memory/in-memory-orgs.repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryPetsRepository } from '@/repository/in-memory/in-memory-pets.repository'
import { CreatePetUseCase } from '../create-pet.use-case'
import { OrgsRepository } from '@/repository/orgs.repository'
import { makeOrg } from '@/tests/factory/make-org.factory'
import { makePet } from '@/tests/factory/make-pet.factory'

let petsRepository: InMemoryPetsRepository
let orgsRepository: OrgsRepository
let sut: CreatePetUseCase
describe('Create Org Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    // sut -> System under test
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('Should be able to create a new Pet', async () => {
    const org = await orgsRepository.create(makeOrg())

    const { pet } = await sut.execute(makePet({ org_id: org.id }))

    expect(pet.id).toEqual(expect.any(String))
    expect(petsRepository.items).toHaveLength(1)
  })
})
