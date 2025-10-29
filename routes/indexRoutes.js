import express from "express";

import evento from "./eventoRouter.js"

const routes = (app) => {
     app.use(express.json(), evento);
}

export default routes;