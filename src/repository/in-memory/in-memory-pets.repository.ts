import { Pet, Prisma } from '@prisma/client'
import { FindAllParams, PetsRepository } from '../pets.repository'
import { InMemoryOrgsRepository } from './in-memory-orgs.repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: crypto.randomUUID(),
      ...data,
    }
    this.items.push(pet)

    return pet
  }

  async findAll(data: FindAllParams) {
    const orgsByCity = this.orgsRepository.items.filter(
      (org) => org.city === data.city,
    )
    const pets = this.items
      .filter((item) => orgsByCity.some((org) => org.id === item.org_id))
      .filter((item) => (data.age ? item.age === data.age : true))
      .filter((item) => (data.size ? item.size === data.size : true))
      .filter((item) =>
        data.energy_level ? item.energy_level === data.energy_level : true,
      )
      .filter((item) =>
        data.environment ? item.environment === data.environment : true,
      )
    console.log()
    return pets.slice((data.page - 1) * 20, data.page * 20)
  }

  async findById(id: string) {
    return this.items.find((pet) => pet.id === id) ?? null
  }
}
