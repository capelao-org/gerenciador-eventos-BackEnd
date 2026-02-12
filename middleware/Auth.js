import jsonwebtoken from 'jsonwebtoken';

import dontenv from 'dotenv';
dontenv.config();

export const autenticar = (req, res, next) => {
    const autHeader = req.headers["authorization"];
    const token = autHeader && autHeader.split(" ")[1]

    if (!token) {
        return res.status(403).json( {message : "sem token de acesso"} )
    }
    
    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).json( {message : "token invalido"} )
    }

}