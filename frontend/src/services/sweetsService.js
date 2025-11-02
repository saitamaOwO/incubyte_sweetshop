const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

export const sweetsService = {
  async getAllSweets(page = 1, pageSize = 12, category = "") {
    const params = new URLSearchParams({
      page,
      pageSize,
      ...(category && { category }),
    })

    const response = await fetch(`${API_URL}/sweets?${params}`, {
      credentials: "include",
    })

    if (!response.ok) throw new Error("Failed to fetch sweets")
    return response.json()
  },

  async searchSweets(query, minPrice = 0, maxPrice = 999999) {
    const params = new URLSearchParams({
      query,
      minPrice,
      maxPrice,
    })

    const response = await fetch(`${API_URL}/sweets/search?${params}`, {
      credentials: "include",
    })

    if (!response.ok) throw new Error("Failed to search")
    return response.json()
  },

  async getSweetById(id) {
    const response = await fetch(`${API_URL}/sweets/${id}`, {
      credentials: "include",
    })

    if (!response.ok) throw new Error("Failed to fetch sweet")
    return response.json()
  },

  async purchaseSweet(id, quantity) {
    const token = localStorage.getItem("accessToken")
    const response = await fetch(`${API_URL}/sweets/${id}/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify({ quantity }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }

    return response.json()
  },

  async createSweet(sweetData) {
    const token = localStorage.getItem("accessToken")
    const response = await fetch(`${API_URL}/sweets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(sweetData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }

    return response.json()
  },

  async updateSweet(id, sweetData) {
    const token = localStorage.getItem("accessToken")
    const response = await fetch(`${API_URL}/sweets/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(sweetData),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }

    return response.json()
  },

  async deleteSweet(id) {
    const token = localStorage.getItem("accessToken")
    const response = await fetch(`${API_URL}/sweets/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }

    return response.json()
  },

  async restockSweet(id, quantity) {
    const token = localStorage.getItem("accessToken")
    const response = await fetch(`${API_URL}/sweets/${id}/restock`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify({ quantity }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }

    return response.json()
  },
}
