import pool from "./db.js";

class BaseRepository {
  async getAll(table, columnsArray) {
    try {
      const results = (
        await pool.query(`SELECT ${columnsArray.join(", ")} FROM ${table}`)
      ).rows;
      return results;
    } catch (error) {
      throw error;
    }
  }
  async getById(table, columnsArray, id) {
    try {
      const queryText = `SELECT ${columnsArray.join(
        ", "
      )} FROM ${table} WHERE id = $1`;
      const results = (await pool.query(queryText, [id])).rows[0];
      return results;
    } catch (error) {
      throw error;
    }
  }
  async insertInto(table, columnsArray, valuesArray) {
    const client = await pool.connect();
    try {
      const flagsArray = Array.from(new Array(columnsArray.length).keys()).map(
        (element) => `$${element + 1}`
      );
      console.log(flagsArray);
      const queryText = `INSERT INTO ${table} (${columnsArray.join(
        ", "
      )}) VALUES (${flagsArray.join(", ")})`;
      await client.query("BEGIN TRANSACTION");
      await client.query(queryText, valuesArray);
      await client.query("COMMIT");
      console.log("Query:", queryText);
      console.log("ValuesArray", valuesArray);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async updateUser(table, body, id) {
    const client = await pool.connect();

    try {
      const columns = Object.keys(body);
      const values = Object.values(body);

      const setQuery = columns
        .map((col, index) => `${col} = $${index + 1}`)
        .join(", ");

      const queryText = `UPDATE ${table} SET ${setQuery} WHERE id = $${
        columns.length + 1
      }`;
      values.push(id);
      await client.query("BEGIN TRANSACTION");
      await client.query(queryText, values);
      await client.query("COMMIT");

      console.log("Values:", values);
      console.log("SetQuey:::", setQuery);
      console.log("Query::: ", queryText);
      console.log(columns.length + 1);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async deleteUser(table, id) {
    const client = await pool.connect();
    try {
      const queryText = `DELETE FROM ${table} WHERE id = $1`;
      await client.query("BEGIN TRANSACTION");
      await client.query(queryText, [id]);
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}

export default BaseRepository;

