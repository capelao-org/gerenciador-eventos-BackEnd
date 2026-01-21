import express from "express";

import evento from "./eventoRouter.js"
import auth from "./authRouter.js"
import usuario from "./usuarioRouter.js"
import upload from "./uploadRouter.js";
import inscricoes from "./inscricoesRouter.js";
import chatbot from "./chatbotRouter.js";


import { autenticar } from "../middleware/Auth.js";
import { uploadImagem } from "../middleware/uploadMemoria.js";

const routes = (app) => {
     
     app.use(auth)

     chatbot(app);

     app.get("/verificar", autenticar, (req, res) => {
          return res.status(200).send();
     });

     app.use("/upload", uploadImagem.single("imagem"), upload)

     app.use(evento);
     app.use(inscricoes);
     app.use("/usuarios", usuario)
}

export default routes;