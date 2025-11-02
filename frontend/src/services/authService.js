const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

export const authService = {
  async register(name, email, phoneNumber, password) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name, email, phoneNumber, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }

    return response.json()
  },

  async login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }

    const data = await response.json()
    localStorage.setItem("accessToken", data.accessToken)
    return data
  },

  async logout() {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    })
    localStorage.removeItem("accessToken")
  },

  async getCurrentUser() {
    const token = localStorage.getItem("accessToken")
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch user")
    }

    return response.json()
  },
}
