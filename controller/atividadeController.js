import { where } from "sequelize";
import AtividadeModel from "../model/atividadeModel.js"

class AtividadeController {
    static async getAtividade(req, res) {
        try{
            const idProcurado = req.params.id;
            const atividadeAchado = await AtividadeModel.findOne({ where: { id: idProcurado}})

            res.status(200).send(atividadeAchado)
        }
        catch {
            res.status(400)
        }
    }

    static async getAtividades(req, res) {
        try{
            const eventoAchado = await AtividadeModel.findAll({ where: {ativo: true, id_evento: req.params.id_evento}});

            res.status(200).send(eventoAchado);
        }
        catch {
            res.status(400);
        }
    }

    static async postAtividade(req, res) {
        try {
            const novoAtividade = await AtividadeModel.create(req.body);
            res.status(201).json({message: "Criado com sucesso!", AtividadeModel: novoAtividade})
        } catch (error) {
            res.status(500).json({ message: `${error.message} - falha ao  cadastrar`});
        }
    }

    static async putAtividade(req, res) {
        try {
            const idProcurado = req.params.id;
            const atividadeAchado = await EventoModel.findOne({ where: { id: idProcurado}})
            await atividadeAchado.update(req.body);
            await atividadeAchado.save();
            res.status(200).json({massage: "evento atualizado"});
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao listar`});
        }
    }

    static async deleteAtividade(req, res) {
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

export default AtividadeController;