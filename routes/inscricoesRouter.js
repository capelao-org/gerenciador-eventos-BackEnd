import express from "express";
import incricao from "../controller/inscricaoController.js"

import { autenticar } from "../middleware/Auth.js";

const routes = express.Router();

routes.post("/inscricoes", autenticar, incricao.inscrever)

routes.get("/inscricoes/evento/:id", incricao.getUserInscritos)

routes.get("/inscricoes/usuario/:id", incricao.getEventosInscritos)

export default routes;