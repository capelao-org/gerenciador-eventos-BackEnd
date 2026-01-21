
export default class rolesVerficar {
    static adminRole (req, res, next) {
        if (req.usuario.role !== "admin") {
            return res.status(403).json( {message : "acesso restrito"} )
        }
        next()
    }

    
}
