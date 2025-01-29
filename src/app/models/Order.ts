export interface OrderDto {
  id?: number;
  userId: number;
  orderTime: string;
  totalPrice: number;
  items: OrderItemDto[];
}

export interface OrderItemDto {
  productId: number;
  quantity: number;
  singleProductPrice: number;
}
