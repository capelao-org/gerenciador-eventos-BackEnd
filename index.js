import express from 'express';
import cors from 'cors';
import routes from "./routes/indexRoutes.js"
import dotenv from "dotenv";
import db from "./config/dbConfig.js"
import './model/index.js'; 
dotenv.config();

db.authenticate()
  .then(() => console.log("✅ Conectado ao RDS"))
  .catch(err => console.error("❌ Erro:", err));


await db.sync({ alter: true });

const app = express();

app.use(cors({
  origin: 'http://127.0.0.1:5500' //colocar seu ip e porta que esta rodando o frontend
}));

app.use(express.json())

routes(app);

const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});