import { Cart } from "./cart";

const cart = Cart.create("customer1");

/// Positive cases
cart.add(1, 2);
cart.add(2, 1);
console.log("Items in the cart:", cart.count());
console.log("Total before discount:", cart.total());

cart.addDiscount("discount1", { type: "fixed", amount: 500 });
console.log("Total after discount:", cart.total());

cart.addDiscount("discount2", {
  type: "percentage",
  amount: 50,
  max: 10000,
});
console.log("Total after discount:", cart.total());

cart.removeDiscount("discount2");
console.log("Total after trying to remove discount2:", cart.total());

cart.addFreebie(
  "freebie1",
  { type: "contains", product_id: 1 },
  { product_id: 3, quantity: 1 }
);
console.log("Items after applying freebie:", cart.count());
console.log("total after applying freebie:", cart.total());

/// Negative cases
console.log("Is product 4 in the cart?", cart.has(4));

cart.update(4, 1);
console.log("Items after updating non-existing item:", cart.count());

cart.remove(4);
console.log("Items after removing non-existing item:", cart.count());
cart.removeDiscount("discount3");
console.log(
  "Total after trying to remove non-existing discount:",
  cart.total()
);

cart.destroy();
console.log("cart TotalItem?", cart.count());
console.log("Is the cart empty?", cart.isEmpty());
