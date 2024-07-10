import { prisma } from '@/lib/prisma'
import { OrgsRepository } from '@/repository/orgs.repository'
import { Org, Prisma } from '@prisma/client'

export class PrismaOrgsRepository implements OrgsRepository {
  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({ where: { email } })

    return org
  }

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = await prisma.org.create({ data })

    return org
  }

  async findById(id: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({ where: { id } })

    return org
  }

  async findManyNearby(latitude: number, longitude: number): Promise<Org[]> {
    const orgs = await prisma.$queryRaw<Org[]>`SELECT * from orgs
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10`

    return orgs
  }
}
