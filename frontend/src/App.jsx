"use client"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./hooks/useAuth"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { AdminPanel } from "./components/AdminPanel"
import "./styles/App.css"

function App() {
  const { user, loading, logout, login, register } = useAuth()

  if (loading) {
    return <div className="loading-screen">Loading...</div>
  }

  return (
    <Router>
      <div className="app">
        <Navbar user={user} onLogout={logout} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login onAuthSuccess={login} />} />
            <Route path="/admin" element={user?.isAdmin ? <AdminPanel /> : <Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App