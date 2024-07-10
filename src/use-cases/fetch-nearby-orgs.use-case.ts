import { Org } from '@prisma/client'

import { OrgsRepository } from '@/repository/orgs.repository'

interface FetchNearbyOrgsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyOrgsUseCaseResponse {
  orgs: Org[]
}

export class FetchNearbyUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyOrgsUseCaseRequest): Promise<FetchNearbyOrgsUseCaseResponse> {
    const orgs = await this.orgsRepository.findManyNearby(
      userLatitude,
      userLongitude,
    )

    return { orgs }
  }
}
