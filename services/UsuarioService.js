import UsuarioModel from '../model/usuarioModel.js';
import APIerror from "../utils/Error.js"
import * as bcrypt from 'bcrypt'; 

export default class UsuarioService {
    static async criarUsuario(usuarioReq) {
        if (!usuarioReq.nome || !usuarioReq.senha || !usuarioReq.usuario) {
            throw APIerror.badRequest("nome, senha e usuario sao obrigatorios")
        }

        let usuarioExistente = await UsuarioModel.findOne({ where: {usuario: usuarioReq.usuario}})
        if (usuarioExistente) {
            throw APIerror.badRequest("Usuario ja em uso")
        }

        if (usuarioReq.role) {
            throw APIerror.badRequest("pode nao man")
        }
        

        usuarioReq.senha = await encryptarSenha(usuarioReq.senha);            
        const novoUsuario = await UsuarioModel.create(usuarioReq);
        return novoUsuario;
    }

    static async updateUsuario(req, atualizacao) {

        const idProcurado = req.params.id;

        if (idProcurado !== req.usuario.id && req.usuario.role !== "admin" ) {
            throw APIerror.badRequest("pode nao man")
        }

        const usuarioAchado = await UsuarioModel.findOne({ where: { id: idProcurado } });
        await usuarioAchado.update(atualizacao);
        await usuarioAchado.save();
        return usuarioAchado
    }
}

const encryptarSenha = async (senhaRAW) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(senhaRAW, salt);
}