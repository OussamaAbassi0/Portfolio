"use client";

import { useEffect, useRef, useState } from "react";
import type { Dict, Locale } from "@/content";
import { ArrowIcon } from "./Icons";

type Step = "greeting" | "name" | "email" | "type" | "budget" | "need" | "confirm" | "done";

interface Msg {
  id: number;
  role: "bot" | "user";
  text: string;
}

let uid = 0;

export default function Chat({ d, locale }: { d: Dict; locale: Locale }) {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState<Step>("greeting");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const push = (role: "bot" | "user", text: string) =>
    setMsgs((m) => [...m, { id: ++uid, role, text }]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [msgs, busy]);

  const start = () => {
    setStarted(true);
    push("bot", d.chat.steps.greeting);
    setTimeout(() => {
      push("bot", d.chat.steps.name);
      setStep("name");
    }, 550);
  };

  const askLlm = async (question: string) => {
    setBusy(true);
    const id = ++uid;
    setMsgs((m) => [...m, { id, role: "bot", text: "" }]);
    try {
      const res = await fetch("/api/chat/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId, question, locale }),
      });
      const reader = res.body?.getReader();
      const dec = new TextDecoder();
      let acc = "";
      while (reader) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMsgs((m) => m.map((x) => (x.id === id ? { ...x, text: acc } : x)));
      }
      if (!acc) throw new Error("empty");
    } catch {
      setMsgs((m) =>
        m.map((x) =>
          x.id === id
            ? {
                ...x,
                text:
                  locale === "fr"
                    ? "Je n'ai pas pu répondre. Laissez-moi vos coordonnées, Oussama vous répond sous 24 h."
                    : "I couldn't answer that. Leave your details and Oussama will reply within 24 hours.",
              }
            : x,
        ),
      );
    } finally {
      setBusy(false);
      // On revient toujours au parcours : le but reste de capturer le lead.
      setTimeout(() => push("bot", d.chat.steps[stepKey(step)] ?? d.chat.steps.name), 500);
    }
  };

  const stepKey = (s: Step): keyof Dict["chat"]["steps"] =>
    (["name", "email", "type", "budget", "need", "confirm", "greeting"] as const).includes(
      s as never,
    )
      ? (s as keyof Dict["chat"]["steps"])
      : "name";

  const send = async (raw: string) => {
    const value = raw.trim();
    if (!value || busy || step === "done") return;

    push("user", value);
    setInput("");

    // Question libre plutôt qu'une réponse : on bascule sur le LLM
    const isQuestion =
      value.endsWith("?") ||
      /^(qui|que|quoi|comment|pourquoi|combien|quel|est-ce|peux|peut|what|how|why|who|can|do|does)\b/i.test(
        value,
      );
    if (isQuestion && step !== "need") {
      await askLlm(value);
      return;
    }

    setBusy(true);
    try {
      const res = await fetch("/api/chat/step", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId, step, value, locale }),
      });
      const data = (await res.json()) as {
        sessionId: string | null;
        nextStep: Step;
        retry: boolean;
      };
      if (data.sessionId) setSessionId(data.sessionId);

      if (data.retry) {
        push("bot", step === "email" ? d.chat.invalidEmail : d.chat.steps[stepKey(step)]);
        return;
      }

      setStep(data.nextStep);
      const next = data.nextStep;
      if (next === "done") {
        push("bot", d.chat.steps.confirm);
      } else {
        push("bot", d.chat.steps[stepKey(next)]);
      }
    } catch {
      push(
        "bot",
        locale === "fr"
          ? "Un problème réseau est survenu. Le formulaire à gauche fonctionne aussi."
          : "A network problem occurred. The form on the left works too.",
      );
    } finally {
      setBusy(false);
    }
  };

  const options =
    step === "type" ? d.contact.types : step === "budget" ? d.contact.budgets : null;

  return (
    <div className="glass flex min-h-[26rem] flex-col rounded-card p-6 md:p-7">
      <div className="flex items-center justify-between">
        <p className="label flex items-center gap-2">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-cyan" />
          </span>
          {d.chat.kicker}
        </p>
        {started && (
          <button
            type="button"
            onClick={() => {
              setStarted(false);
              setMsgs([]);
              setStep("greeting");
              setSessionId(null);
            }}
            className="font-mono text-[11px] uppercase tracking-widest text-faint transition-colors hover:text-magenta"
          >
            {d.chat.restart}
          </button>
        )}
      </div>

      {!started ? (
        <div className="flex flex-1 flex-col justify-center py-6">
          <p className="max-w-[42ch] leading-relaxed text-dim">{d.chat.intro}</p>
          <button
            type="button"
            onClick={start}
            className="mt-7 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-white transition-transform duration-200 active:scale-[0.97]"
            style={{ background: "var(--aurora)" }}
          >
            {d.chat.start}
            <ArrowIcon className="size-4" />
          </button>
        </div>
      ) : (
        <>
          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            aria-label={d.chat.kicker}
            className="mt-5 flex-1 space-y-3 overflow-y-auto pr-1"
            style={{ maxHeight: "22rem" }}
          >
            {msgs.map((m) => (
              <div
                key={m.id}
                className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto text-white"
                    : "border border-white/10 bg-void/60 text-dim"
                }`}
                style={m.role === "user" ? { background: "var(--aurora)" } : undefined}
              >
                {m.text || <span className="text-faint">{d.chat.thinking}</span>}
              </div>
            ))}
          </div>

          {step !== "done" && (
            <div className="mt-4">
              {options ? (
                <div className="flex flex-wrap gap-2">
                  {options.map((o) => (
                    <button
                      key={o.value}
                      type="button"
                      disabled={busy}
                      onClick={() => send(o.label)}
                      className="min-h-11 rounded-full border border-white/12 px-4 py-2.5 text-sm text-dim transition-colors hover:border-white/30 hover:text-bright disabled:opacity-50"
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    send(input);
                  }}
                  className="flex items-end gap-2"
                >
                  <label htmlFor="chat-input" className="sr-only">
                    {d.chat.placeholder}
                  </label>
                  <textarea
                    id="chat-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        send(input);
                      }
                    }}
                    rows={1}
                    disabled={busy}
                    placeholder={d.chat.placeholder}
                    className="chat-input min-h-11 flex-1 resize-none rounded-field border border-white/12 bg-void/60 px-4 py-3 text-[15px] text-bright placeholder:text-faint/70 focus:border-magenta/60 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={busy || !input.trim()}
                    aria-label={d.chat.send}
                    className="grid size-11 shrink-0 place-items-center rounded-full text-white transition-transform duration-200 active:scale-95 disabled:opacity-40"
                    style={{ background: "var(--aurora)" }}
                  >
                    <ArrowIcon className="size-4" />
                  </button>
                </form>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
