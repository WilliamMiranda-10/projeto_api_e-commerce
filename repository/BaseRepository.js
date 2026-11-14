import AppError from "../errors/AppError.js";
import { validateDatabaseIdentifiers } from "../utils/validateDatabaseIdentifiers.js";
import pool from "./db.js";

class BaseRepository {
  async getAll(table, columnsArray) {
    validateDatabaseIdentifiers(table, columnsArray);

    const results = (
      await pool.query(`SELECT ${columnsArray.join(", ")} FROM ${table}`)
    ).rows;
    return results;
  }

  async getById(table, columnsArray, id) {
    validateDatabaseIdentifiers(table, columnsArray);
    const queryText = `SELECT ${columnsArray.join(
      ", "
    )} FROM ${table} WHERE id = $1`;
    const results = (await pool.query(queryText, [id])).rows[0];
    return results;
  }

  async insertInto(table, columnsArray, valuesArray) {
    if (columnsArray.length === 0) {
      throw new Error("É necessário informar pelo menos uma coluna.");
    }

    validateDatabaseIdentifiers(table, columnsArray);

    if (columnsArray.length !== valuesArray.length) {
      throw new Error("A quantidade de colunas e valores não corresponde.");
    }

    const client = await pool.connect();

    try {
      const flagsArray = Array.from(new Array(columnsArray.length).keys()).map(
        (element) => `$${element + 1}`
      );

      const queryText = `INSERT INTO ${table} (${columnsArray.join(
        ", "
      )}) VALUES (${flagsArray.join(", ")}) RETURNING *`;

      const result = await client.query(queryText, valuesArray);

      return result.rows;
    } finally {
      client.release();
    }
  }

  async update(table, body, id) {
    const columns = Object.keys(body);
    const values = Object.values(body);

    if (columns.length === 0) {
      throw new AppError("Nenhum campo informado para atualização.", 400);
    }

    if (columns.includes("id")) {
      throw new AppError("O campo id não pode ser atualizado.", 400);
    }

    validateDatabaseIdentifiers(table, columns);

    const client = await pool.connect();
    try {
      const setQuery = columns
        .map((col, index) => `${col} = $${index + 1}`)
        .join(", ");

      const queryText = `UPDATE ${table} SET ${setQuery} WHERE id = $${
        columns.length + 1
      } RETURNING *`;
      values.push(id);

      const result = await client.query(queryText, values);

      if (result.rowCount === 0) {
        throw new AppError("Registro não encontrado para atualização.", 404);
      }
      return result.rows;
    } finally {
      client.release();
    }
  }

  async delete(table, id) {
    validateDatabaseIdentifiers(table, ["id"]);
    const client = await pool.connect();

    try {
      const queryText = `DELETE FROM ${table} WHERE id = $1`;

      await client.query(queryText, [id]);
    } finally {
      client.release();
    }
  }
}

export default BaseRepository;
