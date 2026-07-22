const axios = require('axios');
const { geminiApiKey } = require('../config/env');

const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const SYSTEM_PROMPT = 'You are a helpful AI assistant. Answer questions concisely and accurately.';

function toGeminiMessages(messages) {
  const contents = [];
  for (const msg of messages) {
    contents.push({ role: msg.role === 'assistant' ? 'model' : 'user', parts: [{ text: msg.content }] });
  }
  return contents;
}

async function sendMessage(messages) {
  const history = messages.slice(0, -1);
  const last = messages[messages.length - 1];

  const contents = toGeminiMessages(history);
  contents.push({ role: 'user', parts: [{ text: last.content }] });

  const { data } = await axios.post(`${BASE_URL}?key=${geminiApiKey}`, {
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents,
    generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
  }, { timeout: 30000 });

  const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
  return reply;
}

module.exports = { sendMessage };
