const world = "world";

import { Cart } from "./cart";

// Example usage:
const cart = Cart.create("123");
cart.add("001", 2);
cart.add("002", 1);
console.log("Initial Cart:", cart.getItems());

cart.update("001", 5);
console.log("Updated Cart:", cart.getItems());

cart.remove("002");
console.log("Cart after removing product 002:", cart.getItems());

cart.destroy();
