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
        },
        senha: {
            type: DataTypes.STRING,
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    }
)

export default UsuarioModel;
