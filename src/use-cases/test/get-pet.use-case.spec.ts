import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryPetsRepository } from '@/repository/in-memory/in-memory-pets.repository'
import { GetPetUseCase } from '../get-pet.use-case'
import { makePet } from '@/tests/factory/make-pet.factory'
import { InMemoryOrgsRepository } from '@/repository/in-memory/in-memory-orgs.repository'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: GetPetUseCase
describe('Get Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    // sut -> System under test
    sut = new GetPetUseCase(petsRepository)
  })

  it('Should be able to get pet by id', async () => {
    const pet = await petsRepository.create(makePet())

    const { pet: petResult } = await sut.execute({ id: pet.id })

    expect(petResult).toEqual(pet)
  })
})
