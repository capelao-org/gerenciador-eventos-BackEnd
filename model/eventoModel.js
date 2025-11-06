import { DataTypes } from '@sequelize/core';
import db from "../config/dbConfig.js"

const EventoModel = db.define("Evento",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING,
        },
        dataInicial: {
            type: DataTypes.DATEONLY,
        },
        dataFinal: {
            type: DataTypes.DATEONLY,
        },
        descricao: {
            type: DataTypes.STRING,
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    }
)

export default EventoModel;