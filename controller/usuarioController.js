import {where} from 'sequelize';
import UsuarioModel from '../model/usuarioModel.js';
import * as bcrypt from 'bcrypt'; 

class UsuarioController {
    // puxa usuario por especifico id
    static async getUsuario(req, res) {
        try {
            const idProcurado = req.params.id;
            const usuarioAchado = await UsuarioModel.findOne({ where: { id: idProcurado } });

            res.status(200).send(usuarioAchado);
        }
        catch {
            res.status(400);
        }
    }
    // puxa tds os usuarios
    static async getUsuarios(req, res) {
        try {
            const usuariosAchados = await UsuarioModel.findAll();

            res.status(200).send(usuariosAchados);
        }
        catch {
            res.status(400);
        }
    }

    static async postUsuario(req, res) {
        try {
            req.body.senha = await UsuarioController.encryptarSenha(req.body.senha);
            const novoUsuario = await UsuarioModel.create(req.body);
            res.status(201).json({ message: "Criado com sucesso!", UsuarioModel: novoUsuario });
        }
        catch (error) {
            res.status(500).json({ message: `${error.message} - falha ao cadastrar` });
        }
    }

    static async putUsuario(req, res) {
        try {
            const idProcurado = req.params.id;
            const usuarioAchado = await UsuarioModel.findOne({ where: { id: idProcurado } });
            await usuarioAchado.update(req.body);
            await usuarioAchado.save();
            res.status(200).json({ message: "Usuário atualizado" });
        }
        catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao listar` });
        }
    }

    static async deleteUsuario(req, res) {
        try {
            const idProcurado = req.params.id;
            const usuarioAchado = await UsuarioModel.findOne({ where: { id: idProcurado } });
            await usuarioAchado.destroy();
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