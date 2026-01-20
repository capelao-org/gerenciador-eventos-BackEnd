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

    // ✅ CREATE com imagem (urlImagemPerfil)
  static async postUsuario(req, res) {
    try {
      // ✅ criptografa senha
      req.body.senha = await UsuarioController.encryptarSenha(req.body.senha);

      // ✅ se veio arquivo, monta a URL
      const urlImagemPerfil = req.file ? `/uploads/${req.file.filename}` : null;

      // ✅ junta body + imagem (se tiver), sem quebrar default
      const dados = {
        ...req.body,
        ...(urlImagemPerfil ? { urlImagemPerfil } : {}),
      };

      const novoUsuario = await UsuarioModel.create(dados);

      return res.status(201).json({ message: "Criado com sucesso!", UsuarioModel: novoUsuario });
    } catch (error) {
      return res.status(500).json({ message: `${error.message} - falha ao cadastrar` });
    }
  }

    // ✅ UPDATE com imagem (urlImagemPerfil)
  static async putUsuario(req, res) {
    try {
      const idProcurado = req.params.id;
      const usuarioAchado = await UsuarioModel.findOne({ where: { id: idProcurado } });

      if (!usuarioAchado) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      // ✅ se vier senha no update, criptografa antes de salvar
      if (req.body.senha) {
        req.body.senha = await UsuarioController.encryptarSenha(req.body.senha);
      }

      // ✅ se veio arquivo, monta a URL
      const urlImagemPerfil = req.file ? `/uploads/${req.file.filename}` : null;

      // ✅ junta body + imagem (se tiver)
      const dadosAtualizacao = {
        ...req.body,
        ...(urlImagemPerfil ? { urlImagemPerfil } : {}),
      };

      await usuarioAchado.update(dadosAtualizacao);

      return res.status(200).json({ message: "Usuário atualizado", usuario: usuarioAchado });
    } catch (erro) {
      return res.status(500).json({ message: `${erro.message} - falha ao atualizar` });
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