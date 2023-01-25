import { prisma } from '../src/database/connection'

async function main() {
  await prisma.employee.create({
    data: {
      email: 'admin@admin.com',
      name: 'user-admin',
      // Password is 'passwordsuperadmin'
      password: '$2a$10$I38sNDsmz6WLn7QmIjGlZeR8DIhTzNvhMZ9MEtnuMMpzRt1F.C3M6',
      role: 3,
    },
  })
  await prisma.applicant.createMany({
    data: [
      {
        email: 'applicant1@applicant.com',
        name: 'Applicant 1',
        // passoword is applicant1
        password: '$2a$10$Q2E7nVraHnd5eAPtuJ5DpeUaFAa3EkXwTHHtEIXbhceSayw3.z0B6',
        age: 22,
        experiences: 'some experiences...',
      },
      {
        email: 'applicant2@applicant.com',
        name: 'Applicant 2',
        // passoword is applicant2
        password: '$2a$10$byhmIzEuJJAB7x.x6lTovOaH4RoCbm5HT.uvEVWKbtGVIAM1xL9tG',
        age: 32,
        experiences: 'many experiences...',
      },
    ],
  })
}

main()
  .then(() => console.log('Register done with success!'))
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
