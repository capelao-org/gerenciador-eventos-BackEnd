import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../config/s3.js";
import crypto from "crypto";

import UsuarioModel from "../model/usuarioModel.js";

export default class upload{
    static async uploadImagem(req, res) {
        if (!req.file) {
            return res.status(400).json({ erro: "Nenhuma imagem enviada" });
        }
    
        const extensao = req.file.mimetype.split("/")[1];
        const nomeArquivo = `${crypto.randomUUID()}.${extensao}`;
    
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `usuarios/${nomeArquivo}`,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        });
    
        await s3.send(command);
    
        const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/usuarios/${nomeArquivo}`;
    
        // Exemplo: salvar no banco
        // await UsuarioModel.update(
        //   { foto: url },
        //   { where: { id: req.params.id } }
        // );
    
        return res.status(200).json({
            message: "Imagem enviada com sucesso",
            url
        });
    }

    static async ImagemUsuario(req, res) {
        if (!req.file) {
            return res.status(400).json({ erro: "Nenhuma imagem enviada" });
        }
    
        const extensao = req.file.mimetype.split("/")[1];
        const nomeArquivo = `${crypto.randomUUID()}.${extensao}`;
    
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `usuarios/${nomeArquivo}`,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        });
    
        await s3.send(command);
    
        const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/usuarios/${nomeArquivo}`;

        // await UsuarioService.updateUsuario(req, {urlImagemPerfil: url})


    
        // Exemplo: salvar no banco
        await UsuarioModel.update(
          { urlImagemPerfil: url },
          { where: { id: req.params.id } }
        );
    
        return res.status(200).json({
            message: "Imagem de perfil atualizada com sucesso",
            url
        });
    }
}
