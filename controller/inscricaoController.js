import UsuarioModel from '../model/usuarioModel.js';
import Evento from '../model/eventoModel.js';
import APIerror from '../utils/Error.js';
import { where } from 'sequelize';

export default class inscricoes {
    static async inscrever(req, res) {
        try {
            const eventoId  = req.body.eventoId
            const usuarioid = req.usuario.id
    
            const eventoInscrito = await Evento.findOne({where: {id: eventoId}})
            const usuarioAchado = await UsuarioModel.findOne({ where: { id: usuarioid } });
            
            if (!eventoInscrito) {
                throw new APIerror.badRequest("evento nao localizado")
            }

            await usuarioAchado.addEvento(eventoInscrito);

            return res.status(200).json({message: "inscrito com sucesso!"})
        }
        catch (error) {
            return res.status(error.statusCode || 500).json({
                erro: error.message
        });
        }
    }

    static async getUserInscritos(req, res) {
        
    }

    static async getEventosInscritos(req, res) {
    try {
        const { id } = req.params;

      const usuario = await UsuarioModel.findByPk(id, {
        include: {
          model: Evento,
          through: { attributes: [] } 
        }
      });

      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }

      return res.status(200).json(usuario.eventos);

    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
    }
}