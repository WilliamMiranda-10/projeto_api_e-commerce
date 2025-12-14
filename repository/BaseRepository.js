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

// INSERT INTO users (name, surname, email, password)
// VALUES ('Bruna', 'Alves', 'Bruna10@gmail.com', 'senai6844');

// UPDATE users SET name = 'Vilma', surname = 'Maria', email = 'vilma601@gmail.com', password = '601linha'
// WHERE id = 'c9e007a9-acaa-4ed9-a346-9240207e2f1a'

// DELETE FROM users WHERE id = '9b46f571-74aa-4819-9b50-c2c382df60fa'
