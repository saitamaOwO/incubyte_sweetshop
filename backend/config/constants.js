export const TOKEN_EXPIRY_TIME = {
  ACCESS_TOKEN: "15m",
  REFRESH_TOKEN: "7d",
}

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access-secret-key-change-in-production"
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "refresh-secret-key-change-in-production"

export const RATE_LIMITS = {
  FRONTEND: {
    windowMs: 15 * 60 * 1000,
    max: 100,
  },
  AUTH: {
    windowMs: 15 * 60 * 1000,
    max: 5,
  },
  ADMIN: {
    windowMs: 1 * 60 * 1000,
    max: 50,
  },
}

export const SWEET_CATEGORIES = ["Chocolate", "Candy", "Toffee", "Gummies", "Lollipops", "Caramels", "Pralines"]
