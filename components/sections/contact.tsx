"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { SiWhatsapp } from "react-icons/si";
import { TbArrowRight, TbArrowUpRight, TbCheck, TbDownload, TbPhone } from "react-icons/tb";
import { setCursor } from "@/components/layout/cursor";
import { Reveal, SplitChars } from "@/components/ui/reveal";
import { profile, socials } from "@/data/profile";
import { useMagnetic } from "@/lib/hooks";
import { cn } from "@/utils/cn";

const reasons = ["Full-time role", "Freelance project", "Collaboration", "Just saying hi"];

const hoverLink = {
  onMouseEnter: () => setCursor({ variant: "link" }),
  onMouseLeave: () => setCursor({ variant: "default" }),
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", reason: "", message: "" });
  const [touched, setTouched] = useState(false);
  const [sent, setSent] = useState<null | "email" | "whatsapp">(null);
  const sendRef = useMagnetic<HTMLButtonElement>(0.25);

  const errors = {
    name: form.name.trim().length < 2 ? "Tell me who you are" : "",
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) ? "" : "Needs a valid email",
    message: form.message.trim().length < 10 ? "A sentence or two, please" : "",
  };
  const valid = !errors.name && !errors.email && !errors.message;

  const compose = (channel: "email" | "whatsapp") => {
    setTouched(true);
    if (!valid) return;
    const name = form.name.trim();
    const subject = `${form.reason || "Hello"} — from ${name}`;
    if (channel === "email") {
      const body = `Hi Rahmatullah,\n\n${form.message.trim()}\n\n— ${name}\n${form.email.trim()}`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
      const text = `${subject}\n\n${form.message.trim()}\n\n${name} · ${form.email.trim()}`;
      window.open(`https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    }
    setSent(channel);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    compose("email");
  };

  const cells = [
    ...socials.filter((s) => s.label !== "WhatsApp"),
  ];

  return (
    <section id="contact" className="relative overflow-hidden border-b border-line py-24 sm:py-32">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-gold/8 blur-[150px]" />
      <div className="gridlines pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="border-b border-line pb-10">
          <span className="mono-label">(07) — Contact</span>
          <h2 className="display mt-4 text-[clamp(2.8rem,12vw,10rem)]">
            <SplitChars text="Let's build" className="text-ink" />
            <br />
            <SplitChars text="something" delay={0.14} className="text-gold" />{" "}
            <SplitChars text="real." delay={0.28} className="outline-text" />
          </h2>
        </div>

        <div className="grid gap-14 pt-14 lg:grid-cols-12 lg:gap-10">
          {/* ---------- details ---------- */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-3 border border-linestrong bg-surface px-4 py-3">
                <span className="relative grid h-2 w-2 shrink-0 place-items-center">
                  <span className="pulse-ring absolute inset-0" />
                  <span className="h-2 w-2 rounded-full bg-mint" />
                </span>
                <p className="font-mono text-[0.66rem] tracking-[0.12em] text-dim uppercase">{profile.availability}</p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <a href={`mailto:${profile.email}`} {...hoverLink} className="group mt-10 block">
                <span className="mono-label">Email</span>
                <span className="display mt-2 block text-[clamp(1.3rem,3vw,2.1rem)] break-all normal-case text-ink transition-colors duration-500 group-hover:text-gold">
                  {profile.email}
                </span>
                <span className="mt-3 block h-px w-full origin-left bg-line transition-transform duration-500 group-hover:scale-x-0" />
              </a>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-8 grid grid-cols-2 border-t border-l border-line">
                <a href={`tel:${profile.phone}`} {...hoverLink} className="group border-r border-b border-line p-4 transition-colors hover:bg-surface sm:p-5">
                  <TbPhone className="h-5 w-5 text-gold" aria-hidden />
                  <p className="mono-label mt-3 text-[0.56rem]">Call</p>
                  <p className="mt-1 font-display text-[0.98rem] font-bold text-ink">{profile.phoneDisplay}</p>
                </a>
                <a
                  href={`https://wa.me/${profile.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  {...hoverLink}
                  className="group border-r border-b border-line p-4 transition-colors hover:bg-surface sm:p-5"
                >
                  <SiWhatsapp className="h-5 w-5 text-[#25D366]" aria-hidden />
                  <p className="mono-label mt-3 text-[0.56rem]">WhatsApp</p>
                  <p className="mt-1 flex items-center gap-1 font-display text-[0.98rem] font-bold text-ink">
                    Chat now <TbArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </p>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10">
                <span className="mono-label">Elsewhere</span>
                <div className="mt-4 grid grid-cols-2 border-t border-l border-line">
                  {cells.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        {...hoverLink}
                        className="group relative overflow-hidden border-r border-b border-line p-4"
                      >
                        <span className="absolute inset-0 origin-bottom scale-y-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100" />
                        <span className="relative z-10 flex items-center gap-2 font-display text-base font-bold text-ink transition-colors duration-300 group-hover:text-bg">
                          <Icon className="h-4 w-4" aria-hidden /> {s.label}
                        </span>
                        <span className="relative z-10 mt-1 block truncate font-mono text-[0.6rem] tracking-[0.08em] text-muted transition-colors duration-300 group-hover:text-bg/75">
                          {s.handle} ↗
                        </span>
                      </a>
                    );
                  })}
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noreferrer"
                    {...hoverLink}
                    className="group relative overflow-hidden border-r border-b border-line bg-gold/10 p-4"
                  >
                    <span className="absolute inset-0 origin-bottom scale-y-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100" />
                    <span className="relative z-10 flex items-center gap-2 font-display text-base font-bold text-gold transition-colors duration-300 group-hover:text-bg">
                      <TbDownload className="h-4 w-4" aria-hidden /> Resume
                    </span>
                    <span className="relative z-10 mt-1 block font-mono text-[0.6rem] tracking-[0.08em] text-muted transition-colors duration-300 group-hover:text-bg/75">
                      Download PDF ↓
                    </span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ---------- form ---------- */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <form onSubmit={onSubmit} noValidate className="relative border border-line bg-surface/70 p-6 backdrop-blur-sm sm:p-10">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                  <span className="mono-label">Send a message</span>
                  <span className="font-mono text-[0.58rem] tracking-[0.14em] text-muted uppercase">
                    Opens your email or WhatsApp — prefilled
                  </span>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <Field
                    label="Your name ✳"
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    error={touched ? errors.name : ""}
                    placeholder="Jane Doe"
                    autoComplete="name"
                  />
                  <Field
                    label="Email ✳"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    error={touched ? errors.email : ""}
                    placeholder="jane@company.com"
                    autoComplete="email"
                  />
                </div>

                <div className="mt-9">
                  <span className="mono-label">I'm reaching out about</span>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {reasons.map((r) => (
                      <motion.button
                        key={r}
                        type="button"
                        whileTap={{ scale: 0.94 }}
                        onClick={() => setForm({ ...form, reason: form.reason === r ? "" : r })}
                        aria-pressed={form.reason === r}
                        className={cn(
                          "border px-4 py-2.5 font-mono text-[0.64rem] tracking-[0.14em] uppercase transition-all duration-300",
                          form.reason === r
                            ? "border-gold bg-gold text-bg"
                            : "border-line text-dim hover:border-linestrong hover:text-ink"
                        )}
                      >
                        {r}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="mt-9">
                  <Field
                    label="Message ✳"
                    value={form.message}
                    onChange={(v) => setForm({ ...form, message: v })}
                    error={touched ? errors.message : ""}
                    placeholder="Tell me about the role, the product or the idea…"
                    textarea
                  />
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <button
                    ref={sendRef}
                    type="submit"
                    onMouseEnter={() => setCursor({ variant: "hidden" })}
                    onMouseLeave={() => setCursor({ variant: "default" })}
                    className="group relative inline-flex min-w-[220px] items-center justify-center gap-3 overflow-hidden bg-ink px-8 py-4 font-mono text-[0.7rem] tracking-[0.2em] text-bg uppercase"
                  >
                    <span className="absolute inset-0 origin-bottom scale-y-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100" />
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={sent === "email" ? "sent" : "idle"}
                        initial={{ y: 16, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -16, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-10 flex items-center gap-3 group-hover:text-black"
                      >
                        {sent === "email" ? (
                          <>
                            <TbCheck className="h-4 w-4" aria-hidden /> Mail app opened
                          </>
                        ) : (
                          <>
                            Send via email <TbArrowRight className="h-4 w-4" aria-hidden />
                          </>
                        )}
                      </motion.span>
                    </AnimatePresence>
                  </button>

                  <button
                    type="button"
                    onClick={() => compose("whatsapp")}
                    {...hoverLink}
                    className="inline-flex items-center gap-3 border border-linestrong px-6 py-4 font-mono text-[0.7rem] tracking-[0.2em] text-ink uppercase transition-colors hover:border-[#25D366] hover:text-[#25D366]"
                  >
                    <SiWhatsapp className="h-4 w-4" aria-hidden />
                    {sent === "whatsapp" ? "WhatsApp opened" : "Send via WhatsApp"}
                  </button>
                </div>

                <AnimatePresence>
                  {touched && !valid && (
                    <motion.p
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-5 font-mono text-[0.62rem] tracking-[0.12em] text-coral uppercase"
                    >
                      Please fill the highlighted fields first.
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  textarea,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
  autoComplete?: string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <label className="field block">
      <span className="flex items-baseline justify-between gap-3">
        <motion.span
          animate={{
            fontSize: active ? "11px" : "13px",
            color: focused ? "var(--marigold)" : "var(--muted)",
            letterSpacing: active ? "0.22em" : "0.16em",
          }}
          transition={{ duration: 0.3 }}
          className="font-mono uppercase"
        >
          {label}
        </motion.span>
        <AnimatePresence>
          {error && (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="font-mono text-[0.58rem] tracking-[0.1em] text-coral uppercase"
            >
              {error}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      {textarea ? (
        <textarea
          value={value}
          placeholder={placeholder}
          rows={3}
          aria-invalid={Boolean(error)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}
