import { prisma } from '@/lib/prisma'
import { Pet, Prisma } from '@prisma/client'

export class PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({ data })

    return pet
  }
}
