import AppError from "../errors/AppError.js";
import { validateDatabaseIdentifiers } from "../utils/validateDatabaseIdentifiers.js";
import pool from "./db.js";

class PurchasesRepository {
  async getAllPurchases(id) {
    const queryText = `SELECT * FROM purchases WHERE id = $1 `;

    const result = await pool.query(queryText, [id]);
    return result.rows;
  }

  async createPurchases(purchasesData, products) {
    validateDatabaseIdentifiers("purchases", [
      "purchases_date",
      "user_id",
      "delivery_address",
    ]);
    validateDatabaseIdentifiers("purchasesproducts", [
      "purchases_id",
      "products_id",
      "product_amount",
    ]);
    const client = await pool.connect();

    try {
      await client.query("BEGIN TRANSACTION");

      const columns = ["purchases_date", "user_id", "delivery_address"];
      const values = [
        purchasesData.purchases_date,
        purchasesData.user_id,
        purchasesData.delivery_address,
      ];

      const flags = values.map((_, index) => `$${index + 1}`);

      const purchasesQuery = `INSERT INTO purchases (${columns.join(
        ", "
      )}) VALUES (${flags.join(", ")}) RETURNING id`;

      const purchasesResult = await client.query(purchasesQuery, values);
      const purchaseId = purchasesResult.rows[0].id;

      for (const item of products) {
        const productIdQuery = "SELECT id FROM products WHERE id = $1";
        const productResult = await client.query(productIdQuery, [
          item.product_id,
        ]);

        if (productResult.rowCount === 0) {
          throw new AppError("Produto não encontrado", 404);
        }

        const purchasesProductsQuery = `INSERT INTO purchasesproducts (purchases_id, products_id, product_amount)
         VALUES ($1, $2, $3)`;

        await client.query(purchasesProductsQuery, [
          purchaseId,
          item.product_id,
          item.product_amount,
        ]);
      }

      await client.query("COMMIT");

      return { purchaseId };
    } catch (error) {
      try {
        await client.query("ROLLBACK");
      } catch (rollbackError) {
        console.error("Erro ao executar ROLLBACK:", rollbackError);
      }
      throw error;
    } finally {
      client.release();
    }
  }
}

export default PurchasesRepository;
