import express from "express";
import EventoController from "../controller/eventoController.js";
import AtividadeController from "../controller/atividadeController.js";

const routes = express.Router();

routes.get("/evento", EventoController.getEventos);
routes.get("/evento/:id", EventoController.getEvento);
routes.get("/evento/:id_evento/atividade", AtividadeController.getAtividades)
routes.get("/evento/:id_evento/atividade/:id", AtividadeController.getAtividade)

routes.post("/evento", EventoController.postEvento);
routes.post("/evento/:id_evento/atividade/", AtividadeController.postAtividade);

routes.put("/evento/:id", EventoController.putEvento);

routes.delete("/evento/:id", EventoController.deleteEvento);

export default routes;