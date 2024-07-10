import { PrismaOrgsRepository } from '@/repository/prisma/prisma-orgs.repository'
import { FetchNearbyUseCase } from '@/use-cases/fetch-nearby-orgs.use-case'

export function makeFetchNearbyUseCase() {
  return new FetchNearbyUseCase(new PrismaOrgsRepository())
}
