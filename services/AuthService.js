import jsonwebtoken from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import dontenv from 'dotenv';

import Usuario from '../model/usuarioModel.js';

dontenv.config();

class AuthService{

    static entrar = async (nome, senha) => {
        const usuario = await Usuario.findOne({ where: { nome } })

        if (!usuario) {
            return  {
                resposta: { error: "credenciais invalidas" },
                estado: 400
            };
        }

        const existe = await bcrypt.compare(senha, usuario.senha)
        if (!existe) {
            return {
                resposta: { error: "credenciais invalidas" },
                estado: 400
            };
        }

        const token = jsonwebtoken.sign(
            {id: usuario.id, nome: usuario.nome},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        return {
            resposta: { token },
            estado: 200
        };
    }
}

export default AuthService;