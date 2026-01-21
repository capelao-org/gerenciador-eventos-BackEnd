import express from "express"
import UsuarioController from "../controller/usuarioController.js"
import role from "../middleware/role.js"
import rolesVerficar from "../middleware/role.js";

import { autenticar } from "../middleware/Auth.js";

const routes = express.Router();

routes.get("", autenticar, UsuarioController.getUsuarios);
routes.get("/:id", autenticar, UsuarioController.getUsuario);

routes.post("", UsuarioController.postUsuario);

// routes.put("/:id", autenticar, UsuarioController.putUsuario);

routes.delete("/:id", autenticar, role.adminRole, UsuarioController.deleteUsuario);

export default routes;