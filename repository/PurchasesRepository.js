import pool from "./db.js";
import BaseRepository from "./BaseRepository.js";

class PurchasesRepository extends BaseRepository {
  async createPurchases(purchasesData, products) {
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
        const purchasesProductsQuery = ` INSERT INTO purchasesproducts (purchases_id, products_id, product_amount)
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
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}

export default PurchasesRepository;
