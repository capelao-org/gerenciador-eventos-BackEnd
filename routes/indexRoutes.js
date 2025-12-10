import express from "express";

import evento from "./eventoRouter.js"
import auth from "./authRouter.js"
import usuario from "./usuarioRouter.js"

const routes = (app) => {
     app.use(express.json(), evento);
     app.use(express.json(), auth)
     app.use(express.json(), usuario)
}

export default routes;