import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, RefreshCw, Send, Sparkles, X } from "lucide-react";
import type { AiChat } from "../hooks/useAiChat";
import { useLang } from "../i18n";
import AiAccessForm from "./AiAccessForm";
import MarkdownText from "./MarkdownText";

/**
 * The collapsible AI Trainer panel: transparency notice, conversation log,
 * suggested questions, access-code form and input. The conversation itself
 * lives in `useAiChat`, owned by the parent so other sections (study,
 * glossary) can ask the trainer a question too.
 */
export default function AiTrainerPanel({
  open,
  onClose,
  chat,
}: {
  open: boolean;
  onClose: () => void;
  chat: AiChat;
}) {
  const { t } = useLang();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Keep the latest message in view.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages, chat.isLoading]);

  const submit = () => {
    const text = input;
    if (!text.trim()) return;
    setInput("");
    void chat.send(text);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div 
          id="ai_sidebar"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: typeof window !== "undefined" && window.innerWidth < 640 ? Math.min(380, window.innerWidth - 32) : 380, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="border-l border-slate-800 bg-slate-900/65 flex-shrink-0 flex flex-col overflow-hidden h-full z-10"
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950" id="sidebar_header">
            <div className="flex items-center gap-2">
              <div className="bg-cyan-500/10 p-1.5 rounded text-cyan-400" id="sidebar_header_icon">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-xs font-mono text-cyan-400 tracking-wider uppercase">{t("chat.title")}</h3>
            </div>
            <button 
              id="close_sidebar_icon_btn"
              type="button"
              aria-label={t("a11y.closeTrainer")}
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-200 rounded hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Transparency notice (OWASP LLM09 overreliance): always visible. */}
          <p className="flex gap-2 px-4 py-2 text-[11px] leading-snug text-slate-400 border-b border-slate-800 bg-slate-950/60" id="ai_disclaimer">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
            <span>{t("chat.disclaimer")}</span>
          </p>

          {/* Chat messages */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-500"
            id="chat_messages_area"
            // A chat log: reachable by keyboard to scroll it, and new
            // messages are announced politely to screen readers.
            role="log"
            aria-label={t("a11y.chatLog")}
            tabIndex={0}
          >
            {chat.messages.map((msg, i) => {
              const isTrainer = msg.sender === "trainer";
              const isSystem = msg.sender === "system";

              return (
                <div 
                  key={msg.id} 
                  id={`msg_${i}`}
                  className={`flex ${isTrainer ? "justify-start" : isSystem ? "justify-center" : "justify-end"}`}
                >
                  <div 
                    id={`msg_bubble_${i}`}
                    className={`max-w-[85%] rounded p-3 text-xs leading-relaxed ${isTrainer ? "bg-slate-950 text-slate-300 border border-slate-800" : isSystem ? "bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-center" : "bg-cyan-700 text-white font-medium shadow-md shadow-cyan-600/10"}`}
                  >
                    {isTrainer ? (
                      <MarkdownText text={msg.text} />
                    ) : (
                      <p>{msg.text}</p>
                    )}
                    <span className={`block text-[9px] mt-1 text-right font-mono select-none ${!isTrainer && !isSystem ? "text-cyan-100" : "text-slate-400"}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}
            {chat.isLoading && (
              <div className="flex justify-start" id="chat_loading_indicator">
                <div className="bg-slate-950 border border-slate-800 rounded p-3 flex items-center gap-2" id="chat_loading_bubble">
                  <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
                  <span className="text-xs text-slate-400 font-mono">{t("chat.processing")}</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggested chips based on context */}
          <div className="px-3 py-2 border-t border-slate-800/60 bg-slate-950/40" id="suggested_chips_box">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-1.5 pl-1">{t("chat.askTrainer")}</span>
            <div className="flex flex-wrap gap-1.5" id="suggested_chips_list">
              <button 
                id="chip_threats"
                onClick={() => chat.send(t("chat.chipThreatsPrompt"))}
                className="bg-slate-800 hover:bg-slate-700 hover:text-cyan-400 border border-slate-700 hover:border-cyan-900/30 rounded px-2 py-1 text-[10px] text-slate-300 transition-colors"
              >
                {t("chat.chipThreats")}
              </button>
              <button 
                id="chip_edr"
                onClick={() => chat.send(t("chat.chipEdrPrompt"))}
                className="bg-slate-800 hover:bg-slate-700 hover:text-cyan-400 border border-slate-700 hover:border-cyan-900/30 rounded px-2 py-1 text-[10px] text-slate-300 transition-colors"
              >
                {t("chat.chipEdr")}
              </button>
              <button 
                id="chip_rto"
                onClick={() => chat.send(t("chat.chipRtoPrompt"))}
                className="bg-slate-800 hover:bg-slate-700 hover:text-cyan-400 border border-slate-700 hover:border-cyan-900/30 rounded px-2 py-1 text-[10px] text-slate-300 transition-colors"
              >
                {t("chat.chipRto")}
              </button>
              <button 
                id="chip_sle"
                onClick={() => chat.send(t("chat.chipSlePrompt"))}
                className="bg-slate-800 hover:bg-slate-700 hover:text-cyan-400 border border-slate-700 hover:border-cyan-900/30 rounded px-2 py-1 text-[10px] text-slate-300 transition-colors"
              >
                {t("chat.chipSle")}
              </button>
              <button 
                id="chip_due"
                onClick={() => chat.send(t("chat.chipDuePrompt"))}
                className="bg-slate-800 hover:bg-slate-700 hover:text-cyan-400 border border-slate-700 hover:border-cyan-900/30 rounded px-2 py-1 text-[10px] text-slate-300 transition-colors"
              >
                {t("chat.chipDue")}
              </button>
              <button 
                id="chip_agreements"
                onClick={() => chat.send(t("chat.chipAgreementsPrompt"))}
                className="bg-slate-800 hover:bg-slate-700 hover:text-cyan-400 border border-slate-700 hover:border-cyan-900/30 rounded px-2 py-1 text-[10px] text-slate-300 transition-colors"
              >
                {t("chat.chipAgreements")}
              </button>
            </div>
          </div>

          {chat.locked && (
            <AiAccessForm
              onSaved={chat.unlock}
            />
          )}

          {/* Chat Input form */}
          <div className="p-3 border-t border-slate-800 bg-slate-950" id="chat_input_panel">
            <form 
              id="chat_form"
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
              className="flex gap-2"
            >
              <input 
                id="chat_text_input"
                type="text"
                aria-label={t("a11y.chatInput")}
                value={input}
                disabled={chat.isLoading}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("chat.placeholder")}
                className="flex-1 bg-slate-900 border border-slate-800 focus:border-cyan-500/50 rounded px-3 py-2 text-xs outline-none text-slate-100 placeholder-slate-500 transition-colors"
              />
              <button 
                id="chat_submit_btn"
                type="submit"
                aria-label={t("a11y.sendMessage")}
                disabled={chat.isLoading || !input.trim()}
                className="bg-cyan-700 hover:bg-cyan-600 disabled:bg-slate-800 text-white disabled:text-slate-600 font-bold p-2 rounded transition-colors"
              >
                <Send className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
