import express from 'express';
import routes from "./routes/indexRoutes.js"
import dotenv from "dotenv";
import db from "./config/dbConfig.js"
dotenv.config();

await db.sync({ alter: true });

const app = express();
routes(app);

const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});