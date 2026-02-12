import {where} from 'sequelize';
import UsuarioModel from '../model/usuarioModel.js';
import * as bcrypt from 'bcrypt'; 

import UsuarioService from "../services/UsuarioService.js"

class UsuarioController {
    // puxa usuario por especifico id
    static async getUsuario(req, res) {
        try {
            const idProcurado = req.params.id;
            const usuarioAchado = await UsuarioModel.findOne({ where: { id: idProcurado, ativo: true } });

            res.status(200).send(usuarioAchado);
        }
        catch {
            res.status(400);
        }
    }
    // puxa tds os usuarios
    static async getUsuarios(req, res) {
        try {
            const usuariosAchados = await UsuarioModel.findAll({ attributes: ["nome", "usuario",  "id", "urlImagemPerfil"], where: { ativo: true } });

            res.status(200).send(usuariosAchados);
        }
        catch {
            res.status(400);
        }
    }

    static async postUsuario(req, res) {
        try {
            const novoUsuario = await UsuarioService.criarUsuario(req.body)
            res.status(201).json({ message: "Criado com sucesso!", UsuarioModel: novoUsuario });
        }
        catch (error) {
            return res.status(error.statusCode || 500).json({
                erro: error.message
        });
        }
    }

    static async putUsuario(req, res) {
        try {
            const usuarioAtualizado = await UsuarioService.updateUsuario(req, req.body)
            
            res.status(200).json({ message: "Usuário atualizado", Usuario: usuarioAtualizado });
        }
        catch (error) {
            return res.status(error.statusCode || 500).json({
                erro: error.message
        });
        }
    }

    static async deleteUsuario(req, res) {
        try {
            const idProcurado = req.params.id;
            const usuarioAchado = await UsuarioModel.findOne({ where: { id: idProcurado } });
            usuarioAchado.ativo = false
            res.status(200).json({ message: "Usuário deletado" });
        }
        catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao deletar` });
        }
    }


    static encryptarSenha = async (senhaRAW) => {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        return bcrypt.hash(senhaRAW, salt);
    }
}

export default UsuarioController;