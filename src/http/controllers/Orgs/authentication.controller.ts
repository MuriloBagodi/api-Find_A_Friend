import { InvalidCredentialsError } from '@/use-cases/errors/org-invalid-credentials.error'
import { makeAuthenticateOrgUseCase } from '@/use-cases/factories/make-authenticate-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const authenticateUseCase = makeAuthenticateOrgUseCase()

    const { org } = await authenticateUseCase.execute({ email, password })

    const token = await res.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      },
    )

    res.status(200).send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: err.message })
    }

    throw err
  }
}
