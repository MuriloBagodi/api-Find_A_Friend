import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets.repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: crypto.randomUUID(),
      ...data,
    }
    this.items.push(pet)

    return pet
  }

  async findById(id: string) {
    return this.items.find((pet) => pet.id === id) ?? null
  }
}
