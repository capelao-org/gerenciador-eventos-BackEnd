import jsonwebtoken from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import dontenv from 'dotenv';

import Usuario from '../model/usuarioModel.js';

dontenv.config();

class AuthService{

    static entrar = async (nome, senha) => {
        const usuario = await Usuario.findOne({ nome })

        if (!usuario) {
            return "error: credenciais invalidas"
        }

        const existe = await bcrypt.compare(senha, usuario.senha)
        if (!existe) {
            return "error: credenciais invalidas"
        }

        const token = jsonwebtoken.sign(
            {id: usuario.id, nome: usuario.nome},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        return {usuario, token}
    }
}

export default AuthService;