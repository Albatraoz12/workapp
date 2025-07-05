export interface ExtendedUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  workPlace?: string;
}

export interface ExtendedSession {
  user?: ExtendedUser;
}

export interface OrderItem {
  productName: string;
  supplierName: string;
  orderWhen: string;
  quantity: string;
  storedLocation: "" | number;
}
