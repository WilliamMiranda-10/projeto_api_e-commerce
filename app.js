import "dotenv/config";
import express from "express";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import purchaseRouter from "./routes/purchasesRoutes.js";
import { authMiddlewares } from "./middlewares/authMiddleware.js";
import loginRouter from "./routes/loginRoutes.js";

const app = express();
app.use(express.json());
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/purchases", purchaseRouter);
app.use("/profile", authMiddlewares, (req, res) => {
  res.json({
    message: "Acesso permitido",
    user: req.user,
  });
});
app.use("/", loginRouter);

const port = 3000;

app.listen(port, () => console.log(`Api rodando na porta: ${port}`));

