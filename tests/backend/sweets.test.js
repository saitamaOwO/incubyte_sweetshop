import request from "supertest"
import app from "../../backend/server.js"
import Sweet from "../../backend/models/Sweet.js"

describe("Sweets Endpoints", () => {
  let sweetId
  let token

  beforeAll(async () => {
    await Sweet.deleteMany({})
    const sweet = await Sweet.create({
      name: "Chocolate Bar",
      category: "Chocolate",
      price: 5.99,
      quantity: 100,
      description: "Delicious chocolate",
      imageUrl: "https://example.com/chocolate.jpg",
    })

    sweetId = sweet._id
  })

  afterAll(async () => {
    await Sweet.deleteMany({})
  })

  describe("GET /api/sweets", () => {
    test("should fetch all sweets", async () => {
      const res = await request(app).get("/api/sweets")

      expect(res.status).toBe(200)
      expect(res.body.error).toBe(false)
      expect(Array.isArray(res.body.data)).toBe(true)
      expect(res.body.pagination).toBeDefined()
    })

    test("should fetch sweets with pagination", async () => {
      const res = await request(app).get("/api/sweets").query({ page: 1, pageSize: 12 })

      expect(res.status).toBe(200)
      expect(res.body.pagination.page).toBe(1)
      expect(res.body.pagination.pageSize).toBe(12)
    })

    test("should fetch sweets with category filter", async () => {
      const res = await request(app).get("/api/sweets").query({ category: "Chocolate" })

      expect(res.status).toBe(200)
      expect(res.body.data.length).toBeGreaterThan(0)
    })
  })

  describe("GET /api/sweets/:id", () => {
    test("should fetch a sweet by ID", async () => {
      const res = await request(app).get(`/api/sweets/${sweetId}`)

      expect(res.status).toBe(200)
      expect(res.body.error).toBe(false)
      expect(res.body.data._id).toBe(sweetId.toString())
    })

    test("should return 404 for invalid ID", async () => {
      const res = await request(app).get("/api/sweets/invalidid")

      expect(res.status).toBe(400)
      expect(res.body.error).toBe(true)
    })
  })

  describe("GET /api/sweets/search", () => {
    test("should search sweets by name", async () => {
      const res = await request(app).get("/api/sweets/search").query({ query: "Chocolate" })

      expect(res.status).toBe(200)
      expect(res.body.data.length).toBeGreaterThan(0)
    })

    test("should search with price range", async () => {
      const res = await request(app).get("/api/sweets/search").query({ minPrice: 0, maxPrice: 10 })

      expect(res.status).toBe(200)
      expect(Array.isArray(res.body.data)).toBe(true)
    })
  })

  describe("POST /api/sweets/:id/purchase", () => {
    test("should purchase a sweet", async () => {
      const res = await request(app).post(`/api/sweets/${sweetId}/purchase`).send({ quantity: 5 })

      expect(res.status).toBeOneOf([200, 401])
    })

    test("should not purchase with invalid quantity", async () => {
      const res = await request(app).post(`/api/sweets/${sweetId}/purchase`).send({ quantity: 0 })

      expect(res.status).toBeOneOf([400, 401])
    })
  })
})