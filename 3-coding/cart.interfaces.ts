export interface Discount {
  type: "fixed" | "percentage";
  amount: number;
  max?: number;
}

export interface Condition {
  type: "contains";
  product_id: number;
}

export interface Reward {
  product_id: number;
  quantity: number;
}

export interface CartItem {
  product_id: number;
  quantity: number;
  price: number;
}

export interface CartDiscount {
  name: string;
  type: string;
  amount: number;
  max?: number;
}

export interface CartFreebie {
  name: string;
  condition: Condition;
  reward: Reward;
}
