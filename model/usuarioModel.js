import { Attribute, Model } from "@sequelize/core";
import db from "../config/dbConfig.js"
import { DataTypes } from "sequelize";

export default class Usuario extends Model {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    id;
    
    @Attribute(DataTypes.STRING)
    nome;
    
    @Attribute(DataTypes.STRING)
    senha;
}