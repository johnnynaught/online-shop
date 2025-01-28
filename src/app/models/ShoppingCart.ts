export interface ShoppingCartDto {
  id?: number;
  cartId?: number;
  userId: number;
  productId: number;
  title: string; // Product title/name
  image: string; // URL of the product image
  price: number; // Price of a single unit
  quantity: number; // Quantity of the product in the cart
  subtotalPrice?: number; // Subtotal price (quantity * price)
  message?: string; // For error responses
}
