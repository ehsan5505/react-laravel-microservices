import { OrderItemProps } from "./order_item";

export interface OrderProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  total: number;
  orders: OrderItemProps[];
}
