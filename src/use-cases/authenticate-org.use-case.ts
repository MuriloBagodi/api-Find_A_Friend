import { OrgsRepository } from '@/repository/orgs.repository'
import { Org } from '@prisma/client'
import { InvalidCredentialsError } from './errors/org-invalid-credentials.error'
import { compare } from 'bcryptjs'

interface AuthenticateOrgUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateOrgUseCaseResponse {
  org: Org
}

export class AuthenticateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const isPasswordMatches = await compare(password, org.password)

    if (!isPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { org }
  }
}
