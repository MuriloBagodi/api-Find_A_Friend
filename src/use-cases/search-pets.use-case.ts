import { Pet } from '@prisma/client'

import { PetsRepository } from '@/repository/pets.repository'

interface SearchPetsUseCaseRequest {
  age?: string
  size?: string
  energy_level?: string
  environment?: string
  city: string
  page: number
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    age,
    size,
    energy_level,
    environment,
    city,
    page,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findAll({
      age,
      size,
      energy_level,
      environment,
      city,
      page,
    })

    return { pets }
  }
}
