import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs.repository'
import { Decimal } from '@prisma/client/runtime/library'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []
  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    return org || null
  }

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    return org || null
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: crypto.randomUUID(),
      ...data,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      created_at: new Date(),
    }
    this.items.push(org)

    return org
  }
}
