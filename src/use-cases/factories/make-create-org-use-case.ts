import { PrismaOrgsRepository } from '@/repository/prisma/prisma-orgs.repository'
import { CreateOrgUseCase } from '@/use-cases/create-org.use-case'

export function makeCreateOrgUseCase() {
  return new CreateOrgUseCase(new PrismaOrgsRepository())
}
