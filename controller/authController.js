import Usuario from "../model/usuarioModel.js";
import AuthService from "../services/AuthService.js";

class AuthController {
    
    static logar = async (req, res) => {
        const {nome, senha} = req.body;
        const {resposta, estado} = await AuthService.entrar(nome, senha)
        res.status(Number(estado)).json(resposta);
    }
}


export default AuthController;