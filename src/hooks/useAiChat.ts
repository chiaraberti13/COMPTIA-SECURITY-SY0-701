import { useMemo, useState } from "react";
import { ACCESS_REQUIRED, aiRequestHeaders } from "../aiAccess";
import {
  ApiErrorSchema,
  ChatResponseSchema,
  MAX_HISTORY_TURNS,
  MAX_MESSAGE_CHARS,
  type ChatRequest,
} from "../apiSchemas";
import { useLang } from "../i18n";
import type { ChatMessage } from "../types";

export interface AiChat {
  messages: ChatMessage[];
  isLoading: boolean;
  /** True after the server answered that the AI needs an access code. */
  locked: boolean;
  /** Sends a question to the trainer and appends the answer, or the error. */
  send: (text: string) => Promise<void>;
  /** Marks the AI as locked; the remediation request uses it too. */
  lock: () => void;
  /** Called once the learner has saved an access code. */
  unlock: () => void;
}

const newId = () => Math.random().toString();

/**
 * The AI Trainer conversation: messages, loading state and the access-code
 * lock. Requests and answers go through the shared schemas of
 * src/apiSchemas.ts, like the server side.
 */
export function useAiChat(): AiChat {
  const { t, lang } = useLang();
  // The welcome message is not state: it is rebuilt from the dictionary on
  // every render, so it follows the language without an effect.
  const [welcomeAt] = useState(() => new Date());
  const [conversation, setMessages] = useState<ChatMessage[]>([]);
  const welcomeText = t("chat.welcome");
  // Memoised so the list only changes when the conversation or the language
  // does: the panel scrolls to the bottom on every change of this array.
  const messages = useMemo<ChatMessage[]>(
    () => [{ id: "welcome", sender: "trainer", text: welcomeText, timestamp: welcomeAt }, ...conversation],
    [welcomeText, welcomeAt, conversation]
  );
  const [isLoading, setIsLoading] = useState(false);
  const [locked, setLocked] = useState(false);

  const addSystemMessage = (text: string) =>
    setMessages(prev => [...prev, { id: newId(), sender: "system", text, timestamp: new Date() }]);

  const send = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: newId(),
      sender: "user",
      text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Only what the server keeps is sent: the last turns, each cut to the
      // message limit, so a long conversation never exceeds the body limit.
      const history = messages
        .filter(m => m.id !== "welcome" && m.sender !== "system")
        .slice(-MAX_HISTORY_TURNS)
        .map(m => ({ role: m.sender, content: m.text.slice(0, MAX_MESSAGE_CHARS) }));
      const request: ChatRequest = { message: text, history, lang };

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: aiRequestHeaders(),
        body: JSON.stringify(request)
      });

      const data: unknown = await res.json().catch(() => null);
      const failure = ApiErrorSchema.safeParse(data);
      if (res.status === 401 && failure.success && failure.data.code === ACCESS_REQUIRED) {
        setLocked(true);
        addSystemMessage(t("chat.accessRequired"));
        return;
      }
      if (failure.success) {
        throw new Error(failure.data.error);
      }
      // The answer is untrusted data: anything but { reply: string } is an error.
      const answer = ChatResponseSchema.safeParse(data);
      if (!res.ok || !answer.success) {
        throw new Error(t("chat.invalidAnswer"));
      }

      setMessages(prev => [...prev, {
        id: newId(),
        sender: "trainer",
        text: answer.data.reply,
        timestamp: new Date()
      }]);
    } catch (err: any) {
      addSystemMessage(t("chat.connectionError", { msg: err.message }));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    locked,
    send,
    lock: () => setLocked(true),
    unlock: () => {
      setLocked(false);
      addSystemMessage(t("chat.accessSaved"));
    },
  };
}
