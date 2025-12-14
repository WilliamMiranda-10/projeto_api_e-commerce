const body = {
  name: "Iphone",
  price_in_cents: 3599,
  size: "256gb",
};

// const id = '11sx1s321xdsw23x1320'

// const columns = Object.keys(body)
// const valores = Object.values(body)

// const query = columns.map((col, index)=> `${col} = $${index + 1}`)

// valores.push(id)

// console.log(query, valores);

// console.log("Valores do objeto:", valores.join(', '))

// console.log(columns)

const columnsArray = ["name", "price_in_cents", "size"];
const valuesArray = columnsArray.reduce((acc, colunmsName) => {
  acc.push(body[colunmsName]);
  return acc;
}, []);

const valuesArray2 = columnsArray.map((colunmsName) => body[colunmsName]);

console.log(valuesArray2);



