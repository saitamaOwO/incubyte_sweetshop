"use client"

import { useState, useEffect } from "react"
import { useSweets } from "../hooks/useSweets"
import { SweetCard } from "../components/SweetCard"
import "./Home.css"

export const Home = ({ user, onPurchaseSuccess }) => {
  const { sweets, loading, pagination, fetchSweets, searchSweets } = useSweets()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (searchQuery) {
      searchSweets(searchQuery)
    } else {
      fetchSweets(currentPage, 12, selectedCategory)
    }
  }, [currentPage, selectedCategory, searchQuery])

  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    setSelectedCategory("")
  }

  const categories = ["Chocolate", "Candy", "Toffee", "Gummies", "Lollipops", "Caramels", "Pralines"]

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to SweetShop Premium</h1>
          <p>Discover our exquisite collection of handcrafted sweets</p>
        </div>
      </section>

      <section className="filters">
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search sweets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              Search
            </button>
          </form>
        </div>

        <div className="categories">
          <button
            className={`category-btn ${!selectedCategory ? "active" : ""}`}
            onClick={() => {
              setSelectedCategory("")
              setCurrentPage(1)
            }}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => {
                setSelectedCategory(cat)
                setCurrentPage(1)
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="sweets-grid">
        {loading ? (
          <div className="loading">Loading sweets...</div>
        ) : sweets.length === 0 ? (
          <div className="empty">No sweets found</div>
        ) : (
          sweets.map((sweet) => (
            <SweetCard
              key={sweet._id}
              sweet={sweet}
              onPurchase={async (id, quantity) => {
                // Handle purchase
                onPurchaseSuccess && onPurchaseSuccess(sweet)
              }}
            />
          ))
        )}
      </section>

      {pagination && pagination.totalPages > 1 && (
        <div className="pagination">
          {pagination.hasPreviousPage && (
            <button onClick={() => setCurrentPage(currentPage - 1)} className="page-btn">
              Previous
            </button>
          )}

          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`page-btn ${page === currentPage ? "active" : ""}`}
            >
              {page}
            </button>
          ))}

          {pagination.hasNextPage && (
            <button onClick={() => setCurrentPage(currentPage + 1)} className="page-btn">
              Next
            </button>
          )}
        </div>
      )}
    </div>
  )
}