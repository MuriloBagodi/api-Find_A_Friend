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
}
