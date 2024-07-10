import { PrismaPetsRepository } from '@/repository/prisma/prisma-pets.repository'
import { CreatePetUseCase } from '../create-pet.use-case'
import { PrismaOrgsRepository } from '@/repository/prisma/prisma-orgs.repository'

export function makeCreatePetUseCase() {
  return new CreatePetUseCase(
    new PrismaPetsRepository(),
    new PrismaOrgsRepository(),
  )
}
