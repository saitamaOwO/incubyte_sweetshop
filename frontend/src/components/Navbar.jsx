"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"

export const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          SweetShop Premium
        </Link>

        <button className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>

        <div className={`navbar-menu ${isOpen ? "active" : ""}`}>
          <Link to="/" className="navbar-link">
            Home
          </Link>

          {user ? (
            <>
              <span className="navbar-user">Welcome, {user.name}</span>
              {user.isAdmin && (
                <Link to="/admin" className="navbar-link admin">
                  Admin
                </Link>
              )}
              <button onClick={onLogout} className="navbar-btn logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-btn">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}