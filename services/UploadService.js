import { PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
import { s3 } from "../config/s3.js";
import APIerror from "../utils/Error.js";

export default class uploadService {

    static async uparImg(req) {
        try {

            if (!req.file) {
                return "https://uploads-eventos.s3.us-east-2.amazonaws.com/usuarios/6f34aaa8-b33f-48a2-9806-aa922bb6b7ea.jpeg";
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
    
            return url
        }
        catch (e) {
            throw APIerror.badRequest(`deu ruim aqui: ${e}`)
        }
    }
}