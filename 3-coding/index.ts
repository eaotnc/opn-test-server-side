import { Cart } from "./cart";

const cart = Cart.create("customer1");

// WARNING: I just remove ambiguous method .total. then separate it to .totalItem and .totalPrice

/// Positive cases
cart.add(1, 2);
cart.add(2, 1);
console.log("Items in the cart:", cart.count());
console.log("Total before discount:", cart.totalPrice());

cart.addDiscount("discount1", { type: "fixed", amount: 500 });
console.log("Total after discount:", cart.totalPrice());

cart.addDiscount("discount2", { type: "percentage", amount: 50, max: 2000 });
console.log("Total after discount:", cart.totalPrice());

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
  cart.totalItems()
);

cart.destroy();
console.log("cart TotalItem?", cart.totalItems());
console.log("Is the cart empty?", cart.isEmpty());
