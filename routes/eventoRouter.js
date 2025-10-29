import express from "express";
import EventoController from "../controller/eventoController.js";

const routes = express.Router();

routes.get("/evento", EventoController.getEvento);

routes.post("/evento", EventoController.postEvento);

routes.put("/evento", EventoController.putEvento);

routes.delete("/evento", EventoController.deleteEvento);

export default routes;