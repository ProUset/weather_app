const geminiService = require('../services/geminiService');

async function chat(req, res, next) {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }
    const reply = await geminiService.sendMessage(messages);
    res.json({ reply });
  } catch (err) {
    next(err);
  }
}

module.exports = { chat };
