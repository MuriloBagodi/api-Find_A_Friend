/* eslint-disable camelcase */
import { Pet } from '@prisma/client'

import { PetsRepository } from '@/repository/pets.repository'

interface CreatePetUseCaseRequest {
  id?: string
  name: string
  about?: string | null
  age?: string | null
  size?: string | null
  energy_level?: string | null
  environment?: string | null
  org_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    about,
    age,
    size,
    energy_level,
    environment,
    org_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy_level,
      environment,
      org_id,
    })

    return { pet }
  }
}
