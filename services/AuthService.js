import jsonwebtoken from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import dontenv from 'dotenv';

import Usuario from '../model/usuarioModel.js';

dontenv.config();

class AuthService{

    static entrar = async (usuarioEntrando, senha) => {
        const usuario = await Usuario.findOne({ where: { usuario: usuarioEntrando } })

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
            {id: usuario.id, nome: usuario.nome, role: usuario.role},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        const id = usuario.id;

        return {
            resposta: { token, id},
            estado: 200
        };
    }

    
}

export default AuthService;