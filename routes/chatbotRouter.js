import { responderPergunta } from "../services/chatbotService.js";

const chatbot = (app) => {
  app.post("/chatbot", async (req, res) => {
    const { pergunta } = req.body;

    if (!pergunta) {
      return res.json({ resposta: "Digite uma pergunta." });
    }

    const resposta = await responderPergunta(pergunta);
    res.json({ resposta });
  });
};

export default chatbot;
