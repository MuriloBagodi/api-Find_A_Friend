/* eslint-disable camelcase */
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterOrgUseCase {
  name: string
  email: string
  password: string
  author_name: string
  latitude: number
  longitude: number
}

export async function registerUseCase({
  name,
  email,
  password,
  author_name,
  latitude,
  longitude,
}: RegisterOrgUseCase) {
  const passwordHash = await hash(password, 6)

  const orgWithSameEmail = await prisma.org.findUnique({
    where: {
      email,
    },
  })

  if (orgWithSameEmail) {
    throw new Error('Email already exists !')
  }

  await prisma.org.create({
    data: {
      name,
      email,
      password: passwordHash,
      author_name,
      latitude,
      longitude,
    },
  })
}
