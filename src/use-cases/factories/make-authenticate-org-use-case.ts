import { PrismaOrgsRepository } from '@/repository/prisma/prisma-orgs.repository'
import { AuthenticateOrgUseCase } from '../authenticate-org.use-case'

export function makeAuthenticateOrgUseCase() {
  return new AuthenticateOrgUseCase(new PrismaOrgsRepository())
}
