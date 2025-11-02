"use client"

import { useState } from "react"
import { AuthModal } from "../components/AuthModal"
import "./Login.css"

export const Login = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-content">
          <h1>Welcome to SweetShop</h1>
          <p>Choose how you want to continue</p>

          <div className="auth-options">
            <AuthModal
              isLogin={true}
              onClose={() => {}}
              onSubmit={async (data) => {
                // Handle customer login
                await onAuthSuccess(data)
              }}
            />

            <div className="divider">OR</div>

            <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
              {isLogin ? "New Customer? Register" : "Already have account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
