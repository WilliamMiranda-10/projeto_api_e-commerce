import { databaseTables } from "../config/databaseTables.js";

export function validateDatabaseIdentifiers(table, columnsArray) {
  if (!Object.hasOwn(databaseTables, table)) {
    throw new Error("Tabela não permitida.");
  }

  const allowedColumns = databaseTables[table];

  const allColumnsAreAllowed = columnsArray.every((column) =>
    allowedColumns.includes(column)
  );

  if (!allColumnsAreAllowed) {
    throw new Error("Uma ou mais colunas não são permitidas para esta tabela.");
  }
}
