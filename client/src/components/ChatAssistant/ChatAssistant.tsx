import {useState, useRef, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {toast} from "react-toastify";
import {sendMessage} from "../../services/chatApi";
import type {ChatMessage} from "../../types/chat";

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({top: listRef.current.scrollHeight, behavior: "smooth"});
  }, [messages, loading]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const userMsg: ChatMessage = {role: "user", content: text};
    const updated = [...messages, userMsg];
    setMessages(updated);
    setLoading(true);
    try {
      const reply = await sendMessage(updated);
      setMessages((prev) => [...prev, {role: "assistant", content: reply}]);
    } catch {
      toast.error("Failed to get response from AI");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl hover:bg-white/20 transition-colors"
        aria-label="Open chat"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{opacity: 0, scale: 0.9, y: 20}}
            animate={{opacity: 1, scale: 1, y: 0}}
            exit={{opacity: 0, scale: 0.9, y: 20}}
            transition={{duration: 0.2}}
            className="fixed bottom-20 right-6 z-50 w-80 sm:w-96 h-[500px] max-h-[70vh] rounded-2xl bg-gray-900/90 backdrop-blur-2xl border border-white/20 shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <span className="text-sm font-semibold text-white">AI Assistant</span>
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close chat"
              >
                <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth">
              {messages.length === 0 && !loading && (
                <div className="flex flex-col items-center justify-center h-full text-center text-white/50">
                  <svg className="w-10 h-10 mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="text-sm">Ask me anything!</p>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-blue-500/80 text-white rounded-br-md"
                        : "bg-white/10 text-white/90 rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-white/90 px-4 py-3 rounded-2xl rounded-bl-md text-sm">
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{animationDelay: "0ms"}} />
                      <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{animationDelay: "150ms"}} />
                      <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{animationDelay: "300ms"}} />
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-white/10 p-3">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  disabled={loading}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="p-2 rounded-xl bg-blue-500/80 hover:bg-blue-500 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-7 7m7-7l7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
