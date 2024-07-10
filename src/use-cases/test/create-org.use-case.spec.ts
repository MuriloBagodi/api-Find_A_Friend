import { InMemoryOrgsRepository } from '@/repository/in-memory/in-memory-orgs.repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { CreateOrgUseCase } from '../create-org.use-case'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase
describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    // sut -> System under test
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('Should be able to create a Organization', async () => {
    const { org } = await sut.execute({
      name: 'test',
      author_name: 'testador',
      email: 'test@email.com',
      whatsapp: '123456789',
      password: '123456',
      cep: '04134-021',
      state: 'sp',
      city: 'sp',
      neighborhood: 'vila gumercindo',
      street: 'rua vigário',
      latitude: -23.558347947116278,
      longitude: -46.595886060347915,
    })

    expect(org.id).toEqual(expect.any(String))
  })

  // TODO: Need to create a new test to validate if the user can create a org with the same email || Expect Error
})
