import Usuario from "../model/usuarioModel.js";
import AuthService from "../services/AuthService.js";

class AuthController {
    

    // verifica se o usuario existe e retorna o JWT
    static logar = async (req, res) => {
        const {nome, senha} = req.body;
        const jwt = await AuthService.entrar(nome, senha)
        res.status(200).json(jwt);
    }
}


export default AuthController;