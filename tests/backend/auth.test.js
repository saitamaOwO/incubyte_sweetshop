import request from "supertest"
import app from "../../backend/server.js"
import User from "../../backend/models/User.js"

describe("Authentication Endpoints", () => {
  beforeAll(async () => {
    // Clear users collection
    await User.deleteMany({})
  })

  afterAll(async () => {
    await User.deleteMany({})
  })

  describe("POST /api/auth/register", () => {
    test("should register a new customer", async () => {
      const res = await request(app).post("/api/auth/register").send({
        name: "John Doe",
        email: "john@example.com",
        phoneNumber: "1234567890",
        password: "password123",
      })

      expect(res.status).toBe(201)
      expect(res.body.error).toBe(false)
      expect(res.body.user).toBeDefined()
      expect(res.body.accessToken).toBeDefined()
    })

    test("should not register with invalid email", async () => {
      const res = await request(app).post("/api/auth/register").send({
        name: "Jane Doe",
        email: "invalid-email",
        phoneNumber: "1234567890",
        password: "password123",
      })

      expect(res.status).toBe(400)
      expect(res.body.error).toBe(true)
    })

    test("should not register with duplicate email", async () => {
      await request(app).post("/api/auth/register").send({
        name: "User One",
        email: "duplicate@example.com",
        phoneNumber: "1111111111",
        password: "password123",
      })

      const res = await request(app).post("/api/auth/register").send({
        name: "User Two",
        email: "duplicate@example.com",
        phoneNumber: "2222222222",
        password: "password123",
      })

      expect(res.status).toBe(400)
      expect(res.body.error).toBe(true)
    })

    test("should not register with short password", async () => {
      const res = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "test@example.com",
        phoneNumber: "1234567890",
        password: "short",
      })

      expect(res.status).toBe(400)
      expect(res.body.error).toBe(true)
    })

    test("should not register with invalid phone number", async () => {
      const res = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "test@example.com",
        phoneNumber: "invalid",
        password: "password123",
      })

      expect(res.status).toBe(400)
      expect(res.body.error).toBe(true)
    })
  })

  describe("POST /api/auth/login", () => {
    beforeAll(async () => {
      await request(app).post("/api/auth/register").send({
        name: "Login Test",
        email: "login@example.com",
        phoneNumber: "9876543210",
        password: "password123",
      })
    })

    test("should login with valid credentials", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "login@example.com",
        password: "password123",
      })

      expect(res.status).toBe(200)
      expect(res.body.error).toBe(false)
      expect(res.body.user).toBeDefined()
      expect(res.body.accessToken).toBeDefined()
    })

    test("should not login with wrong password", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "login@example.com",
        password: "wrongpassword",
      })

      expect(res.status).toBe(401)
      expect(res.body.error).toBe(true)
    })

    test("should not login with non-existent user", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "nonexistent@example.com",
        password: "password123",
      })

      expect(res.status).toBe(401)
      expect(res.body.error).toBe(true)
    })

    test("should login with phone number", async () => {
      const res = await request(app).post("/api/auth/login").send({
        phoneNumber: "9876543210",
        password: "password123",
      })

      expect(res.status).toBe(200)
      expect(res.body.error).toBe(false)
    })

    test("should not login without email and phone", async () => {
      const res = await request(app).post("/api/auth/login").send({
        password: "password123",
      })

      expect(res.status).toBe(400)
      expect(res.body.error).toBe(true)
    })
  })
})