import { Cart } from "./cart";

const cart = Cart.create("customer1");

/// Positive cases
cart.add(1, 2);
cart.add(2, 1);
console.log("Items in the cart:", cart.count());
console.log("Total before discount:", cart.total());

cart.addDiscount("discount1", { type: "fixed", amount: 1 });
console.log("Total after discount:", cart.total());

cart.addFreebie(
  "freebie1",
  { type: "contains", product_id: 1 },
  { product_id: 3, quantity: 1 }
);
console.log("Items after applying freebie:", cart.count());

/// Negative cases
console.log("Is product 4 in the cart?", cart.has(4));

cart.update(4, 1);
console.log("Items after updating non-existing item:", cart.count());

cart.remove(4);
console.log("Items after removing non-existing item:", cart.count());

cart.removeDiscount("discount2");
console.log(
  "Total after trying to remove non-existing discount:",
  cart.total()
);

// Destroy the cart and check if it's empty
cart.destroy();
console.log("Is the cart empty?", cart.isEmpty());
