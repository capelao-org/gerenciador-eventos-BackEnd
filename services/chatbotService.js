import Evento from "../model/eventoModel.js";
import Atividade from "../model/atividadeModel.js";

export async function responderPergunta(pergunta, idEvento) {
  const texto = pergunta.toLowerCase();

  const evento = await Evento.findOne({where: {ativo: true, id: idEvento }});
  const atividades = await Atividade.findAll({ where: {ativo: true, id_evento: idEvento}});

  if (!evento) {
    return "Nenhum evento cadastrado no sistema.";
  }

  // 🔹 EVENTO
  if (texto.includes("evento") || texto.includes("sobre o evento")) {
    return evento.descricao;
  }

  if (texto.includes("data") || texto.includes("quando")) {
    return `O evento acontece em ${evento.dataInicial}.`;
  }

  if (texto.includes("local") || texto.includes("onde")) {
    return `O evento será realizado em ${evento.local}.`;
  }

  if (texto.includes("horário") || texto.includes("hora")) {
    return `O evento começa às ${evento.dataInicial}.`;
  }

  // 🔹 ATIVIDADES (geral)
  if (texto.includes("atividades") || texto.includes("programação")) {
    if (atividades.length === 0) {
      return "Não há atividades cadastradas no momento.";
    }

    const lista = atividades
      .map(a => `• ${a.titulo} (${a.horario})`)
      .join("\n");

    return `As atividades do evento são:\n${lista}`;
  }

  // 🔹 ATIVIDADE específica
  for (let atividade of atividades) {
    if (texto.includes(atividade.titulo.toLowerCase())) {
      return `${atividade.titulo}: ${atividade.descricao} (Horário: ${atividade.horario})`;
    }
  }

  // 🔹 TIPO de atividade
  if (texto.includes("palestra") || texto.includes("oficina")) {
    const filtradas = atividades.filter(a =>
      texto.includes(a.tipo.toLowerCase())
    );

    if (filtradas.length === 0) {
      return `Não há ${texto.includes("palestra") ? "palestras" : "oficinas"} cadastradas.`;
    }

    return filtradas
      .map(a => `• ${a.titulo} (${a.horario})`)
      .join("\n");
  }

  // 🔹 RESPOSTA PADRÃO
  return "Posso te ajudar com informações sobre o evento ou sobre as atividades.";
}
