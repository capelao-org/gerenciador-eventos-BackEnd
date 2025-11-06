import { where } from "sequelize";
import EventoModel from "../model/eventoModel.js"

class EventoController {
    static async getEvento(req, res) {
        try{
            const idProcurado = req.params.id;
            const eventoAchado = await EventoModel.findOne({ where: { id: idProcurado}})

            res.status(200).send(eventoAchado)
        }
        catch {
            res.status(400)
        }
    }

    static async getEventos(req, res) {
        try{
            const eventoAchado = await EventoModel.findAll({ where: {ativo: true}});

            res.status(200).send(eventoAchado);
        }
        catch {
            res.status(400);
        }
    }

    static async postEvento(req, res) {
        try {
            const novoEvento = await EventoModel.create(req.body);
            res.status(201).json({message: "Criado com sucesso!", EventoModel: novoEvento})
        } catch (error) {
            res.status(500).json({ message: `${error.message} - falha ao  cadastrar`});
        }
    }

    static async putEvento(req, res) {
        try {
            const idProcurado = req.params.id;
            const eventoAchado = await EventoModel.findOne({ where: { id: idProcurado}})
            await eventoAchado.update(req.body);
            await eventoAchado.save();
            res.status(200).json({massage: "evento atualizado"});
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao listar`});
        }
    }

    static async deleteEvento(req, res) {
        try {
            const idProcurado = req.params.id;
            const eventoAchado = await EventoModel.findOne({ where: { id: idProcurado}})
            await eventoAchado.update({ativo: false});
            await eventoAchado.save();
            res.status(200).json({massage: "evento deletado"});
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao deletar`});
        } 
    } 
}

export default EventoController;