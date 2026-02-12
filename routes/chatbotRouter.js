import { responderPergunta } from "../services/chatbotService.js";

const chatbot = (app) => {
  app.post("/chatbot/:id", async (req, res) => {
    const { pergunta } = req.body;

    if (!pergunta) {
      return res.json({ resposta: "Digite uma pergunta." });
    }

    const resposta = await responderPergunta(pergunta, req.params.id);
    res.json({ resposta });
  });
};

export default chatbot;
