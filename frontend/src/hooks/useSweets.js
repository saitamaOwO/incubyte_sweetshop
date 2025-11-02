"use client"

import { useState, useCallback } from "react"
import { sweetsService } from "../services/sweetsService"

export const useSweets = () => {
  const [sweets, setSweets] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState(null)

  const fetchSweets = useCallback(async (page = 1, pageSize = 12, category = "") => {
    try {
      setLoading(true)
      const response = await sweetsService.getAllSweets(page, pageSize, category)
      setSweets(response.data)
      setPagination(response.pagination)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const searchSweets = useCallback(async (query, minPrice = 0, maxPrice = 999999) => {
    try {
      setLoading(true)
      const response = await sweetsService.searchSweets(query, minPrice, maxPrice)
      setSweets(response.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const purchaseSweet = useCallback(async (id, quantity) => {
    try {
      return await sweetsService.purchaseSweet(id, quantity)
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [])

  return {
    sweets,
    loading,
    error,
    pagination,
    fetchSweets,
    searchSweets,
    purchaseSweet,
  }
}
