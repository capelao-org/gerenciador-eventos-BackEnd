import Evento from "../model/Evento.js";
import Atividade from "../model/Atividade.js";

export async function responderPergunta(pergunta) {
  const texto = pergunta.toLowerCase();

  const evento = await Evento.findOne();
  const atividades = await Atividade.findAll();

  if (!evento) {
    return "Nenhum evento cadastrado no sistema.";
  }

  // 🔹 EVENTO
  if (texto.includes("evento") || texto.includes("sobre o evento")) {
    return evento.descricao;
  }

  if (texto.includes("data") || texto.includes("quando")) {
    return `O evento acontece em ${evento.data}.`;
  }

  if (texto.includes("local") || texto.includes("onde")) {
    return `O evento será realizado em ${evento.local}.`;
  }

  if (texto.includes("horário") || texto.includes("hora")) {
    return `O evento começa às ${evento.horario}.`;
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
