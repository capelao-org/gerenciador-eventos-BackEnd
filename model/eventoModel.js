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
        urlImagemCapa: {
            type: DataTypes.STRING,
            defaultValue: "https://uploads-eventos.s3.us-east-2.amazonaws.com/usuarios/6f34aaa8-b33f-48a2-9806-aa922bb6b7ea.jpeg"
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    }
)

export default EventoModel;