import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, Loader, AlertTriangle } from "lucide-react";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY ?? "",
  dangerouslyAllowBrowser: true,
});

const ShipmateChat = ({ onClose, selectedVessel, tasks }) => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Ready to assist with **${selectedVessel.name}** (${selectedVessel.hull}). Ask me about maintenance tasks, parts to order, scheduling conflicts, or technical guidance.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const taskSummary = tasks
    .map(
      (t) =>
        `- [Day ${t.startDay}–${t.startDay + t.duration - 1}] ${t.name} (${t.division}, ${t.system}, crew: ${t.requirements.crew ?? "N/A"})`
    )
    .join("\n");

  const systemPrompt = `You are Shipmate, a submarine maintenance assistant embedded in the ${selectedVessel.name} (${selectedVessel.hull}) maintenance planning system at NAVSUBBASE New London.

Current vessel: ${selectedVessel.name} | ${selectedVessel.hull} | ${selectedVessel.type} | ${selectedVessel.pier} | Status: ${selectedVessel.status}

Active maintenance schedule:
${taskSummary || "No tasks scheduled."}

Your role:
- Answer questions about scheduled maintenance tasks, resource conflicts, and crew requirements
- Suggest parts, consumables, and tools needed for listed maintenance items
- Provide technical guidance on submarine systems (hydraulics, electrical, sonar, weapons, reactor-adjacent)
- Help draft work requests or CSMP entries
- Flag potential scheduling conflicts or safety concerns

Keep responses concise and actionable. Use naval/submarine terminology. Format lists with dashes.`;

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setError("");

    const userMsg = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading("...");

    const apiMessages = updatedMessages
      .filter((m) => typeof m.content === "string")
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const stream = await client.messages.stream({
        model: "claude-opus-4-6",
        max_tokens: 1024,
        system: systemPrompt,
        messages: apiMessages,
      });

      let full = "";
      setLoading("");
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      for await (const chunk of stream) {
        if (
          chunk.type === "content_block_delta" &&
          chunk.delta.type === "text_delta"
        ) {
          full += chunk.delta.text;
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = { role: "assistant", content: full };
            return next;
          });
        }
      }
    } catch (err) {
      setLoading("");
      const msg = err?.message ?? "Unknown error";
      if (msg.includes("api_key") || msg.includes("API key") || msg.includes("authentication")) {
        setError("No API key configured. Add VITE_ANTHROPIC_API_KEY to your .env file.");
      } else {
        setError(`Error: ${msg}`);
      }
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const renderContent = (content) => {
    // Simple markdown: bold, bullet lines, code
    return content
      .split("\n")
      .map((line, i) => {
        const boldified = line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
        if (line.startsWith("- ") || line.startsWith("• ")) {
          return (
            <li
              key={i}
              className="ml-4 list-disc"
              dangerouslySetInnerHTML={{ __html: boldified.replace(/^[-•] /, "") }}
            />
          );
        }
        if (line.trim() === "") return <br key={i} />;
        return (
          <p key={i} dangerouslySetInnerHTML={{ __html: boldified }} />
        );
      });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[420px] max-h-[600px] flex flex-col bg-slate-900 border border-slate-600 rounded-xl shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700 bg-slate-800 rounded-t-xl">
        <div className="flex items-center gap-2.5">
          <div className="bg-blue-500/20 border border-blue-500/40 rounded-lg p-1.5">
            <Bot className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Shipmate</p>
            <p className="text-[10px] text-gray-500">{selectedVessel.name} · {selectedVessel.hull}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-300 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 min-h-0" style={{ maxHeight: "440px" }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`shrink-0 mt-0.5 rounded-full p-1.5 ${
              msg.role === "assistant"
                ? "bg-blue-500/20 border border-blue-500/40"
                : "bg-slate-700 border border-slate-600"
            }`}>
              {msg.role === "assistant"
                ? <Bot className="w-3 h-3 text-blue-400" />
                : <User className="w-3 h-3 text-gray-400" />
              }
            </div>
            <div className={`max-w-[320px] rounded-lg px-3 py-2 text-sm leading-relaxed ${
              msg.role === "assistant"
                ? "bg-slate-800 border border-slate-700 text-gray-200"
                : "bg-blue-600 text-white"
            }`}>
              {msg.role === "assistant"
                ? <div className="space-y-0.5">{renderContent(msg.content)}</div>
                : <p>{msg.content}</p>
              }
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-2.5">
            <div className="shrink-0 mt-0.5 bg-blue-500/20 border border-blue-500/40 rounded-full p-1.5">
              <Bot className="w-3 h-3 text-blue-400" />
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2">
              <Loader className="w-4 h-4 text-gray-400 animate-spin" />
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <p className="text-xs text-red-300">{error}</p>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-slate-700 px-3 py-3 flex items-end gap-2">
        <textarea
          ref={inputRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Ask about maintenance, parts, scheduling…"
          className="flex-1 bg-slate-800 border border-slate-600 text-sm text-gray-200 placeholder-gray-500 rounded-lg px-3 py-2 resize-none focus:outline-none focus:border-blue-500 max-h-24"
          style={{ lineHeight: "1.5" }}
        />
        <button
          onClick={send}
          disabled={!input.trim() || !!loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed p-2 rounded-lg transition shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ShipmateChat;
