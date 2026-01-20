import express from "express"
import UsuarioController from "../controller/usuarioController.js"
import upload from "../middlewares/upload.js";

const routes = express.Router();

const upload = require("../middlewares/upload");

router.put("/usuario/:id/imagem", upload.single("imagem"), UsuarioController.putImagemPerfil);

router.post("/usuario", upload.single("imagem"), UsuarioController.postUsuario);
router.put("/usuario/:id", upload.single("imagem"), UsuarioController.putUsuario);

routes.get("/usuarios", UsuarioController.getUsuarios);
routes.get("/usuarios/:id", UsuarioController.getUsuario);

routes.post("/usuarios", UsuarioController.postUsuario);

routes.put("/usuarios/:id", UsuarioController.putUsuario);

routes.delete("/usuarios/:id", UsuarioController.deleteUsuario);

export default routes;