import server from '@/app'
import supertest from "supertest";
import { prisma } from "@/database/connection";

const api = supertest(server);

beforeAll(async () => {
  await prisma.$connect();
  await prisma.sessionEmployee.deleteMany({})
})

afterAll(async () => {
  await prisma.$disconnect();
})

describe("POST /employee/login", () => {

  it("Where not exists session in session_employee should respond with status 200 and with token if email and password correct!", async () => {
    const result = await api.post("/employee/login").send({email: "admin@admin.com", password: "passwordsuperadmin"});
    expect(result.statusCode).toBe(200);
    expect(result.body.token).toBeTruthy()
    const sessions = await prisma.sessionEmployee.count();
    expect(sessions).toBe(1);
  });

  it("Where exists session in session_employee should respond with status 200 and with token if email and password correct!", async () => {
    const result = await api.post("/employee/login").send({email: "admin@admin.com", password: "passwordsuperadmin"});
    expect(result.statusCode).toBe(200);
    expect(result.body.token).toBeTruthy();
    const sessions = await prisma.sessionEmployee.count();
    expect(sessions).toBe(1);
  });

  it("Should respond with status 401 if email or password incorrect!", async () => {
    const result = await api.post("/employee/login").send({email: "admin@incorrect.com", password: "passwordsuperadmin"});
    expect(result.statusCode).toBe(401);
  });

  it("Should respond with status 400 if email or password not sent", async () => {
    const result = await api.post("/employee/login").send({ password: "passwordsuperadmin"});
    expect(result.statusCode).toBe(400);
  })
})
 