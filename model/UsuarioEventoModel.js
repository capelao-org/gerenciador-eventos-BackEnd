import { DataTypes } from '@sequelize/core';
import db from "../config/dbConfig.js"

const UsuarioEventoModel = db.define("UsuarioEvento", {
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    eventoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default UsuarioEventoModel;