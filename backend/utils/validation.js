export const validateEmail = (email) => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}

export const validatePhoneNumber = (phone) => {
  const re = /^\d{10,15}$/
  return re.test(phone)
}

export const validatePrice = (price) => {
  return !isNaN(price) && price > 0
}

export const validateQuantity = (quantity) => {
  return Number.isInteger(quantity) && quantity >= 0
}