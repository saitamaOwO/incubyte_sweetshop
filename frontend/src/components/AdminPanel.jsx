"use client"

import { useState } from "react"
import "./AdminPanel.css"

export const AdminPanel = ({ onAddSweet, onUpdateSweet, onDeleteSweet, sweets }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "Chocolate",
    price: "",
    quantity: "",
    description: "",
    imageUrl: "",
  })
  const [editingId, setEditingId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)

      if (editingId) {
        await onUpdateSweet(editingId, formData)
      } else {
        await onAddSweet(formData)
      }

      setFormData({
        name: "",
        category: "Chocolate",
        price: "",
        quantity: "",
        description: "",
        imageUrl: "",
      })
      setEditingId(null)
    } catch (err) {
      alert(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="admin-panel">
      <h2>Admin Dashboard</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          name="name"
          placeholder="Sweet Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-input"
        />

        <select name="category" value={formData.category} onChange={handleChange} className="form-input">
          <option value="Chocolate">Chocolate</option>
          <option value="Candy">Candy</option>
          <option value="Toffee">Toffee</option>
          <option value="Gummies">Gummies</option>
          <option value="Lollipops">Lollipops</option>
          <option value="Caramels">Caramels</option>
          <option value="Pralines">Pralines</option>
        </select>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          required
          className="form-input"
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          className="form-input"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="form-input"
        />

        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          required
          className="form-input"
        />

        <button type="submit" disabled={isLoading} className="submit-btn">
          {isLoading ? "Processing..." : editingId ? "Update Sweet" : "Add Sweet"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null)
              setFormData({
                name: "",
                category: "Chocolate",
                price: "",
                quantity: "",
                description: "",
                imageUrl: "",
              })
            }}
            className="cancel-btn"
          >
            Cancel Edit
          </button>
        )}
      </form>

      <div className="sweets-list">
        <h3>Manage Sweets</h3>
        {sweets.map((sweet) => (
          <div key={sweet._id} className="sweet-item">
            <span>
              {sweet.name} - ${sweet.price}
            </span>
            <div className="sweet-actions">
              <button onClick={() => setEditingId(sweet._id)} className="edit-btn">
                Edit
              </button>
              <button onClick={() => onDeleteSweet(sweet._id)} className="delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
