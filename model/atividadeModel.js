import { DataTypes } from '@sequelize/core';
import db from "../config/dbConfig.js"
import EventoModel from './eventoModel.js';

const AtividadeModel = db.define("Atividade",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_evento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: EventoModel,
                key: "id"
            }
        },
        titulo: {
            type: DataTypes.STRING,
        },
        descricao: {
            type: DataTypes.STRING,
        },
        urlImagemAtividade: {
            type: DataTypes.STRING,
            defaultValue: "https://uploads-eventos.s3.us-east-2.amazonaws.com/usuarios/6f34aaa8-b33f-48a2-9806-aa922bb6b7ea.jpeg"
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        } 
    }
)


EventoModel.hasMany(AtividadeModel, { foreignKey: "id_evento" });
AtividadeModel.belongsTo(EventoModel, { foreignKey: "id_evento" });

export default AtividadeModel;