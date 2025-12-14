import "dotenv/config";
import express from "express";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js"
import purchaseRouter from "./routes/purchasesRoutes.js"

const app = express();
app.use(express.json());
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/purchases", purchaseRouter)


const port = 3000;

app.listen(port, () => console.log("Api rodando na porta ", port));



