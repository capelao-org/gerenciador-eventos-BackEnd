import express from 'express';
import cors from 'cors';
import routes from "./routes/indexRoutes.js"
import dotenv from "dotenv";
import db from "./config/dbConfig.js"
dotenv.config();

await db.sync({ alter: true });

const app = express();

app.use(cors({
  origin: 'http://127.0.0.1:5500' //colocar seu ip e porta que esta rodando o frontend
}));

routes(app);

const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});