import { Pet } from '@prisma/client'

import { PetsRepository } from '@/repository/pets.repository'
import { OrgsRepository } from '@/repository/orgs.repository'
import { OrgNotFoundError } from './errors/org-not-found.error'

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
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    energy_level,
    environment,
    org_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(org_id)

    if (!org) {
      throw new OrgNotFoundError()
    }
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
