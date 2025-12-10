import AuthController from "../controller/authController.js";
import express from 'express';

const routes = express.Router();

routes.post('/login', AuthController.logar);

export default routes;