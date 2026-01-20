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
        // ✅ monta url da imagem (se veio arquivo)
        const urlImagemCapa = req.file ? `/uploads/${req.file.filename}` : null;

        // ✅ junta body + imagem (sem quebrar seu default se não mandar imagem)
        const dados = {
            ...req.body,
            ...(urlImagemCapa ? { urlImagemCapa } : {})
        };

        const novoEvento = await EventoModel.create(dados);

        return res.status(201).json({
            message: "Criado com sucesso!",
            EventoModel: novoEvento
        });
  } catch (error) {
    return res.status(500).json({ message: `${error.message} - falha ao cadastrar` });
  }
}


    static async putAtividade(req, res) {
  try {
    const idProcurado = req.params.id;

    const atividadeAchada = await AtividadeModel.findOne({ where: { id: idProcurado } });
    if (!atividadeAchada) return res.status(404).json({ message: "Atividade não encontrada" });

    const urlImagemAtividade = req.file ? `/uploads/${req.file.filename}` : null;

    const dadosAtualizacao = {
      ...req.body,
      ...(urlImagemAtividade ? { urlImagemAtividade } : {})
    };

    await atividadeAchada.update(dadosAtualizacao);

    return res.status(200).json({ message: "atividade atualizada", atividade: atividadeAchada });
  } catch (error) {
    return res.status(500).json({ message: `${error.message} - falha ao atualizar` });
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