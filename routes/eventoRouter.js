import express from "express";
import EventoController from "../controller/eventoController.js";
import AtividadeController from "../controller/atividadeController.js";

const routes = express.Router();

const upload = require("../middlewares/upload");


router.post("/eventos", upload.single("imagem"), EventoController.postEvento);
router.put("/eventos/:id", upload.single("imagem"), EventoController.putEvento);


routes.get("/evento", EventoController.getEventos);
routes.get("/evento/:id", EventoController.getEvento);

const upload = require("../middlewares/upload");

router.post("/atividades", upload.single("imagem"), AtividadeController.postAtividade);
router.put("/atividades/:id", upload.single("imagem"), AtividadeController.putAtividade);


routes.get("/evento/:id_evento/atividade", AtividadeController.getAtividades)
routes.get("/evento/:id_evento/atividade/:id", AtividadeController.getAtividade)

routes.post("/evento", EventoController.postEvento);
routes.post("/evento/:id_evento/atividade/", AtividadeController.postAtividade);

routes.put("/evento/:id", EventoController.putEvento);

routes.delete("/evento/:id", EventoController.deleteEvento);

export default routes;