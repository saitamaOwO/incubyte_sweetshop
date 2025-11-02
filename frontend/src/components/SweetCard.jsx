"use client"

import { useState } from "react"
import "./SweetCard.css"

export const SweetCard = ({ sweet, onPurchase, onEdit, onDelete, isAdmin }) => {
  const [quantity, setQuantity] = useState(1)
  const [isPurchasing, setIsPurchasing] = useState(false)

  const handlePurchase = async () => {
    try {
      setIsPurchasing(true)
      await onPurchase(sweet._id, quantity)
      setQuantity(1)
    } catch (err) {
      alert(err.message)
    } finally {
      setIsPurchasing(false)
    }
  }

  return (
    <div className="sweet-card">
      <div className="sweet-image-container">
        <img src={sweet.imageUrl || "/placeholder.svg"} alt={sweet.name} className="sweet-image" />
        {sweet.quantity === 0 && <div className="out-of-stock">Out of Stock</div>}
      </div>

      <div className="sweet-details">
        <h3 className="sweet-name">{sweet.name}</h3>
        <p className="sweet-category">{sweet.category}</p>
        {sweet.description && <p className="sweet-description">{sweet.description}</p>}

        <div className="sweet-info">
          <span className="sweet-price">${sweet.price.toFixed(2)}</span>
          <span className="sweet-stock">Stock: {sweet.quantity}</span>
        </div>

        {sweet.rating > 0 && <div className="sweet-rating">Rating: ⭐ {sweet.rating.toFixed(1)}</div>}

        {!isAdmin && sweet.quantity > 0 && (
          <div className="sweet-purchase">
            <input
              type="number"
              min="1"
              max={sweet.quantity}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
              className="quantity-input"
            />
            <button onClick={handlePurchase} disabled={isPurchasing} className="purchase-btn">
              {isPurchasing ? "Purchasing..." : "Add to Cart"}
            </button>
          </div>
        )}

        {isAdmin && (
          <div className="admin-actions">
            <button onClick={() => onEdit(sweet)} className="edit-btn">
              Edit
            </button>
            <button onClick={() => onDelete(sweet._id)} className="delete-btn">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
