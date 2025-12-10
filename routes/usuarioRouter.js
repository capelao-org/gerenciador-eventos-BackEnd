import express from "express"
import UsuarioController from "../controller/usuarioController.js"

const routes = express.Router();

routes.get("/usuarios", UsuarioController.getUsuarios);
routes.get("/usuarios/:id", UsuarioController.getUsuario);

routes.post("/usuarios", UsuarioController.postUsuario);

routes.put("/usuarios/:id", UsuarioController.putUsuario);

routes.delete("/usuarios/:id", UsuarioController.deleteUsuario);

export default routes;