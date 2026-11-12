export const databaseTables = {
  users: ["id", "name", "surname", "email", "password"],
  products: ["id", "name", "price_in_cents", "size"],
  purchases: ["id", "purchases_date", "user_id", "delivery_address"],
  purchasesproducts: ["id", "purchases_id", "products_id", "product_amount"],
};
