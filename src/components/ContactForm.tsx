"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type FormState } from "@/app/actions";
import type { Dict, Locale } from "@/content";
import { ArrowIcon } from "./Icons";

const initial: FormState = { status: "idle" };

function Submit({ d }: { d: Dict }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-medium text-white transition-transform duration-200 active:scale-[0.97] disabled:opacity-60"
      style={{ background: "var(--aurora)" }}
    >
      {pending ? d.contact.sending : d.contact.submit}
      {!pending && <ArrowIcon className="size-4" />}
    </button>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-bright">
        {label}
        {hint && <span className="ml-2 font-mono text-[11px] font-normal text-faint">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-[#FF6B7A]">
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls =
  "w-full rounded-field border border-white/12 bg-void/60 px-4 py-3.5 text-[15px] text-bright placeholder:text-faint/70 transition-colors focus:border-magenta/60 focus:outline-none";

export default function ContactForm({ d, locale }: { d: Dict; locale: Locale }) {
  const [state, action] = useActionState(submitContact, initial);
  const [type, setType] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const startedAt = useRef(Date.now());
  const liveRef = useRef<HTMLDivElement>(null);

  const msg = (k?: string) => {
    if (!k) return undefined;
    if (k === "invalidEmail")
      return locale === "fr" ? "Adresse email invalide." : "Invalid email address.";
    if (k === "tooShort")
      return locale === "fr" ? "Un peu plus de détail, s'il vous plaît." : "A little more detail, please.";
    if (k === "sendFailed") return d.contact.error;
    return locale === "fr" ? "Ce champ est requis." : "This field is required.";
  };

  useEffect(() => {
    if (state.status !== "idle" && liveRef.current) liveRef.current.focus();
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div
        ref={liveRef}
        tabIndex={-1}
        role="status"
        className="glass flex min-h-[26rem] flex-col justify-center rounded-card p-8 text-center"
      >
        <span
          aria-hidden
          className="mx-auto grid size-14 place-items-center rounded-full"
          style={{ background: "var(--aurora)" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 12.5l4.5 4.5L19 7.5"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight text-bright">
          {d.contact.success}
        </h3>
        <p className="mx-auto mt-3 max-w-[38ch] leading-relaxed text-dim">
          {d.contact.successBody}
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="glass rounded-card p-6 md:p-8">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="startedAt" value={startedAt.current} />
      {/* Leurre : invisible pour l'humain, rempli par les robots */}
      <div aria-hidden className="absolute left-[-9999px] size-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label={d.contact.fields.name}
          hint={d.contact.required}
          error={msg(state.errors?.name)}
        >
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            aria-invalid={!!state.errors?.name}
            aria-describedby={state.errors?.name ? "name-error" : undefined}
            className={inputCls}
            placeholder={locale === "fr" ? "Jean Dupont" : "Jane Doe"}
          />
        </Field>

        <Field
          id="email"
          label={d.contact.fields.email}
          hint={d.contact.required}
          error={msg(state.errors?.email)}
        >
          <input
            id="email"
            name="email"
            type="email"
            required
            inputMode="email"
            autoComplete="email"
            aria-invalid={!!state.errors?.email}
            aria-describedby={state.errors?.email ? "email-error" : undefined}
            className={inputCls}
            placeholder="nom@entreprise.com"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field id="company" label={d.contact.fields.company} hint={d.contact.optional}>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            className={inputCls}
          />
        </Field>
      </div>

      <fieldset className="mt-6">
        <legend className="mb-3 text-sm font-medium text-bright">
          {d.contact.fields.type}
          <span className="ml-2 font-mono text-[11px] font-normal text-faint">
            {d.contact.required}
          </span>
        </legend>
        <input type="hidden" name="projectType" value={type} />
        <div className="flex flex-wrap gap-2">
          {d.contact.types.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setType(t.value)}
              aria-pressed={type === t.value}
              className={`min-h-11 rounded-full border px-4 py-2.5 text-sm transition-colors ${
                type === t.value
                  ? "border-transparent text-white"
                  : "border-white/12 text-dim hover:border-white/25 hover:text-bright"
              }`}
              style={type === t.value ? { background: "var(--aurora)" } : undefined}
            >
              {t.label}
            </button>
          ))}
        </div>
        {state.errors?.projectType && (
          <p role="alert" className="mt-2 text-sm text-[#FF6B7A]">
            {locale === "fr" ? "Choisissez un type de projet." : "Pick a project type."}
          </p>
        )}
      </fieldset>

      <fieldset className="mt-6">
        <legend className="mb-3 text-sm font-medium text-bright">
          {d.contact.fields.budget}
          <span className="ml-2 font-mono text-[11px] font-normal text-faint">
            {d.contact.optional}
          </span>
        </legend>
        <input type="hidden" name="budgetRange" value={budget} />
        <div className="flex flex-wrap gap-2">
          {d.contact.budgets.map((b) => (
            <button
              key={b.value}
              type="button"
              onClick={() => setBudget(budget === b.value ? "" : b.value)}
              aria-pressed={budget === b.value}
              className={`min-h-11 rounded-full border px-4 py-2.5 text-sm transition-colors ${
                budget === b.value
                  ? "border-magenta/60 text-bright"
                  : "border-white/12 text-dim hover:border-white/25 hover:text-bright"
              }`}
              style={
                budget === b.value
                  ? { background: "color-mix(in oklch, var(--color-magenta) 16%, transparent)" }
                  : undefined
              }
            >
              {b.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <Field
          id="message"
          label={d.contact.fields.message}
          hint={d.contact.required}
          error={msg(state.errors?.message)}
        >
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            aria-invalid={!!state.errors?.message}
            aria-describedby={state.errors?.message ? "message-error" : undefined}
            className={`${inputCls} resize-y`}
            placeholder={
              locale === "fr"
                ? "Le processus qui vous mange votre semaine, ce que vous avez déjà essayé, et à quoi ressemblerait un bon résultat."
                : "The process eating your week, what you've already tried, and what a good outcome looks like."
            }
          />
        </Field>
      </div>

      {state.errors?.form && (
        <p role="alert" className="mt-5 text-sm text-[#FF6B7A]">
          {d.contact.error}
        </p>
      )}

      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Submit d={d} />
        <ul className="flex flex-wrap gap-x-5 gap-y-1">
          {d.contact.guarantees.map((g) => (
            <li key={g} className="font-mono text-[11px] uppercase tracking-widest text-faint">
              {g}
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}
