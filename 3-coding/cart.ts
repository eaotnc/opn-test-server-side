export class Cart {
  private items: Record<string, number> = {};

  private constructor(private customer_id: string) {}

  static create(customer_id: string): Cart {
    return new Cart(customer_id);
  }

  add(product_id: string, quantity: number): void {
    if (product_id in this.items) {
      this.items[product_id] += quantity;
    } else {
      this.items[product_id] = quantity;
    }
  }

  update(product_id: string, quantity: number): void {
    if (product_id in this.items) {
      this.items[product_id] = quantity;
    } else {
      console.log(`Product with ID ${product_id} not found in the cart.`);
    }
  }

  remove(product_id: string): void {
    if (product_id in this.items) {
      delete this.items[product_id];
    } else {
      console.log(`Product with ID ${product_id} not found in the cart.`);
    }
  }

  destroy(): void {
    this.items = {};
    console.log("Cart destroyed.");
  }

  getItems(): Record<string, number> {
    return this.items;
  }
}
