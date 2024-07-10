import { InMemoryOrgsRepository } from '@/repository/in-memory/in-memory-orgs.repository'
import { describe, beforeEach, it, expect } from 'vitest'
import { AuthenticateOrgUseCase } from '../authenticate-org.use-case'
import { makeOrg } from '@/tests/factory/make-org.factory'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/org-invalid-credentials.error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateOrgUseCase
describe('Authenticate Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    // sut -> System under test
    sut = new AuthenticateOrgUseCase(orgsRepository)
  })

  it('Should be able to authenticate a organization', async () => {
    const org = await orgsRepository.create(
      makeOrg({ password: await hash('123456', 8) }),
    )

    const { org: authenticatedOrg } = await sut.execute({
      email: org.email,
      password: '123456',
    })

    expect(authenticatedOrg).toEqual(org)
  })

  it('Should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'jhondoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able to authenticate with wrong password', async () => {
    const password = '123456'

    const org = await orgsRepository.create(
      makeOrg({ password: await hash(password, 8) }),
    )
    await expect(() =>
      sut.execute({
        email: org.email,
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  // TODO: Need to create a new test to validate if the user can create a org with the same email || Expect Error
})
