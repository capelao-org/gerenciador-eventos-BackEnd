import { DataTypes } from '@sequelize/core';
import db from "../config/dbConfig.js"

const UsuarioModel = db.define("Usuario",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        usuario: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "usuario",
        },
        urlImagemPerfil: {
            type: DataTypes.STRING,
            defaultValue: "https://uploads-eventos.s3.us-east-2.amazonaws.com/usuarios/8e918ad7-e660-45ad-854a-c3859873ef14.jpeg"
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    }
)

export default UsuarioModel;
