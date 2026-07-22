import axios from "axios";
import type {ChatMessage} from "../types/chat";

const api = axios.create({
  baseURL: "/api/chat",
  timeout: 30000,
});

export async function sendMessage(messages: ChatMessage[]): Promise<string> {
  const {data} = await api.post("/", {messages});
  return data.reply;
}
