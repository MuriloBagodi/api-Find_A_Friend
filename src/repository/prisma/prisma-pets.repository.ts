import { prisma } from '@/lib/prisma'
import { Pet, Prisma } from '@prisma/client'
import { FindAllParams, PetsRepository } from '../pets.repository'

export class PrismaPetsRepository implements PetsRepository {
  findById(id: string): Promise<Pet | null> {
    const pet = prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  findAll(data: FindAllParams): Promise<Pet[]> {
    const pets = prisma.pet.findMany({
      where: {
        age: data.age,
        size: data.size,
        energy_level: data.energy_level,
        org: {
          city: {
            contains: data.city,
            mode: 'insensitive',
          },
        },
      },
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data })

    return pet
  }
}
