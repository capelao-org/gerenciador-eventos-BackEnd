import express from "express";
import EventoController from "../controller/eventoController.js";

const routes = express.Router();

routes.get("/evento", EventoController.getEventos);
routes.get("/evento/:id", EventoController.getEvento);

routes.post("/evento", EventoController.postEvento);

routes.put("/evento/:id", EventoController.putEvento);

routes.delete("/evento/:id", EventoController.deleteEvento);

export default routes;