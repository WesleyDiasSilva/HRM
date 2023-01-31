import { prisma } from '@/database/connection'
import supertest from 'supertest'
import server from '@/app'

const api = supertest(server)

const credencials = {
  email: 'admin@admin.com',
  password: 'passwordsuperadmin',
}

const job = [
  {
    name: 'Job test',
    description: 'Job created for testing!',
    remote: true,
    value: 4500,
    responsible_id: 1,
  },
  {
    name: 'Job test with id',
    description: 'Job created for testing with id!',
    remote: false,
    value: 7600,
    responsible_id: 1,
  },
]

async function getToken() {
  const response = await api
      .post('/employee/login')
      .send({ email: credencials.email, password: credencials.password })
      const token = response.body.token;
      return token;
}

beforeAll(async () => {
  await prisma.$connect()
  await prisma.job.deleteMany({})
  await prisma.job.createMany({ data: job })
})

afterAll(async () => {
  await prisma.job.deleteMany({})
  await prisma.$disconnect()
})

describe('GET /employee/job', () => {

  it('Should respond with status 200 if sent a token valid!', async () => {
      const token: string = await getToken();
      const result = await api.get('/employee/job').set('Authorization', token)

    expect(result.statusCode).toBe(200)
    expect(result.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          description: expect.any(String),
          remote: expect.any(Boolean),
          value: expect.any(Number),
          responsible_id: expect.any(Number),
          open: expect.any(Boolean),
          applicants: expect.any(Array),
          responsible: {
            name: expect.any(String),
            email: expect.any(String)
          }
        }),
      ]),
    )
  })

  it('Should respond with status 401 if not sent token!', async () => {
    const result = await api.get('/employee/job');
    expect(result.statusCode).toBe(401);
  })

  it("Should respond with status 401 if token is invalid!",  async () => {
    const result = await api.get('/employee/job').set("Authorization", "Bearer TOKEN_INVALID!");
    expect(result.statusCode).toBe(401);
  })
})
