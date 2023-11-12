import {
  Discount,
  Condition,
  Reward,
  CartItem,
  CartDiscount,
  CartFreebie,
} from "./cart.interfaces";

export class Cart {
  private customer_id: string;
  private items: CartItem[] = [];
  private discounts: CartDiscount[] = [];
  private freebies: CartFreebie[] = [];

  constructor(customer_id: string) {
    this.customer_id = customer_id;
  }

  static create(customer_id: string): Cart {
    return new Cart(customer_id);
  }

  add(product_id: number, quantity: number): void {
    const existingItem = this.items.find(
      (item) => item.product_id === product_id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product_id, quantity });
    }
  }

  update(product_id: number, quantity: number): void {
    const itemIndex = this.items.findIndex(
      (item) => item.product_id === product_id
    );

    if (itemIndex !== -1) {
      this.items[itemIndex].quantity = quantity;
    }
  }

  remove(product_id: number): void {
    this.items = this.items.filter((item) => item.product_id !== product_id);
  }

  destroy(): void {
    this.items = [];
  }

  has(product_id: number): boolean {
    return this.items.some((item) => item.product_id === product_id);
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  count(): CartItem[] {
    return this.items.map((item) => ({
      product_id: item.product_id,
      quantity: item.quantity,
    }));
  }

  quantity(): number {
    return this.items.length;
  }

  total(): number {
    let total = this.items.reduce((acc, item) => acc + item.quantity, 0);

    for (const discount of this.discounts) {
      if (discount.type === "fixed") {
        total -= Math.min(discount.amount, total);
      } else if (discount.type === "percentage") {
        total *=
          (100 - Math.min(discount.amount, discount.max || Infinity)) / 100;
      }
    }

    return total;
  }

  addDiscount(name: string, discount: Discount): void {
    this.discounts.push({
      name,
      type: discount.type,
      amount: discount.amount,
      max: discount.max,
    });
  }

  removeDiscount(name: string): void {
    this.discounts = this.discounts.filter(
      (discount) => discount.name !== name
    );
  }

  addFreebie(name: string, condition: Condition, reward: Reward): void {
    if (condition.type === "contains" && this.has(condition.product_id)) {
      this.items.push({
        product_id: reward.product_id,
        quantity: reward.quantity,
      });
    }

    this.freebies.push({ name, condition, reward });
  }
}
