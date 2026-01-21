import Usuario from './usuarioModel.js';
import Evento from './eventoModel.js';
import UsuarioEvento from './UsuarioEventoModel.js';

// Usuario <-> Evento (N:N)
Usuario.belongsToMany(Evento, {
  through: UsuarioEvento,
  foreignKey: 'usuarioId',
  otherKey: 'eventoId'
});

Evento.belongsToMany(Usuario, {
  through: UsuarioEvento,
  foreignKey: 'eventoId',
  otherKey: 'usuarioId'
});


export {
  Usuario,
  Evento,
  UsuarioEvento
};