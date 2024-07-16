import { PrismaOrgsRepository } from '@/repository/prisma/prisma-orgs.repository'
import { FetchNearbyUseCase } from '../fetch-nearby-orgs.use-case'

export function makeFetchNearByOrgsUseCase() {
  return new FetchNearbyUseCase(new PrismaOrgsRepository())
}
