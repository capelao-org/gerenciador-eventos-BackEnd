import upload from '../controller/uploadController.js';
import express from 'express';


const routes = express.Router();

routes.post('/imagem', upload.uploadImagem);

routes.post('/imagem/usuario/:id', upload.ImagemUsuario);

export default routes;