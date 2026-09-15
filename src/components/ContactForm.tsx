"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { useGlow } from "@/hooks/useGlow";
import { trackEvent, getCurrentIds } from "@/lib/analytics";

type FormState = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const { ref: submitRef, onMouseMove: onSubmitMouseMove } = useGlow<HTMLButtonElement>();
  const formRef = useRef<HTMLFormElement>(null);
  const hasTrackedView = useRef(false);
  const hasTrackedStart = useRef(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState("");
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; projectType?: string }>({});
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!formRef.current || hasTrackedView.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView.current) {
          hasTrackedView.current = true;
          trackEvent("contact_form_viewed");
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(formRef.current);
    return () => observer.disconnect();
  }, []);

  function markStarted() {
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true;
      trackEvent("contact_form_started");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors: typeof errors = {};
    if (!name.trim()) nextErrors.name = "Name is required.";
    if (!email.trim()) nextErrors.email = "Email is required.";
    else if (!EMAIL_PATTERN.test(email.trim())) nextErrors.email = "Enter a valid email address.";
    if (!projectType.trim()) nextErrors.projectType = "Tell us what you're looking to build.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setState("submitting");
    trackEvent("contact_form_submitted");

    const honeypot = (new FormData(e.currentTarget).get("website") as string) || "";
    const { visitorId, sessionId } = getCurrentIds();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || undefined,
          projectType: projectType.trim(),
          details: details.trim() || undefined,
          website: honeypot,
          visitorId,
          sessionId,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");

      setState("success");
      trackEvent("contact_form_success");
      setName("");
      setEmail("");
      setCompany("");
      setProjectType("");
      setDetails("");
    } catch (err) {
      setState("error");
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMessage(message);
      trackEvent("contact_form_error", { reason: message });
    }
  }

  if (state === "success") {
    return (
      <div
        className="rounded-md border p-8 text-center flex flex-col items-center gap-3"
        style={{ borderColor: "var(--signal)", background: "var(--bg-raised)" }}
        role="status"
        aria-live="polite"
      >
        <CheckCircle size={28} color="var(--signal)" weight="fill" aria-hidden="true" />
        <div className="font-mono text-[15px] font-semibold">Message sent.</div>
        <p className="text-[14px]" style={{ color: "var(--muted)" }}>
          We read every message ourselves and reply directly, usually within a day or two.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="font-mono text-[12px] mt-2 underline underline-offset-2"
          style={{ color: "var(--signal)" }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} className="flex flex-col gap-4 text-left" onSubmit={handleSubmit} onChange={markStarted} noValidate>
      {/* Honeypot: real visitors never see or fill this. Off-screen, not display:none, since some bots skip hidden inputs. */}
      <div style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }} aria-hidden="true">
        <label htmlFor="cf-website">Leave this field empty</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-name" className="font-mono text-[11px] tracking-wide" style={{ color: "var(--muted-dim)" }}>
            NAME
          </label>
          <input
            id="cf-name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded px-3.5 py-2.5 text-[14px] outline-none border transition-colors"
            style={{ background: "var(--bg-raised)", borderColor: errors.name ? "var(--danger)" : "var(--line)", color: "var(--text)" }}
            aria-invalid={!!errors.name}
            aria-describedby="cf-name-error"
          />
          <div id="cf-name-error" className="font-mono text-[11px] min-h-[14px]" style={{ color: "var(--danger)" }}>
            {errors.name}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-email" className="font-mono text-[11px] tracking-wide" style={{ color: "var(--muted-dim)" }}>
            YOUR EMAIL
          </label>
          <input
            id="cf-email"
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded px-3.5 py-2.5 text-[14px] outline-none border transition-colors"
            style={{ background: "var(--bg-raised)", borderColor: errors.email ? "var(--danger)" : "var(--line)", color: "var(--text)" }}
            aria-invalid={!!errors.email}
            aria-describedby="cf-email-error"
          />
          <div id="cf-email-error" className="font-mono text-[11px] min-h-[14px]" style={{ color: "var(--danger)" }}>
            {errors.email}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-company" className="font-mono text-[11px] tracking-wide" style={{ color: "var(--muted-dim)" }}>
          COMPANY / ORGANIZATION <span style={{ color: "var(--muted-dim)" }}>(optional)</span>
        </label>
        <input
          id="cf-company"
          name="company"
          autoComplete="organization"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="rounded px-3.5 py-2.5 text-[14px] outline-none border transition-colors"
          style={{ background: "var(--bg-raised)", borderColor: "var(--line)", color: "var(--text)" }}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-project" className="font-mono text-[11px] tracking-wide" style={{ color: "var(--muted-dim)" }}>
          WHAT ARE YOU LOOKING TO BUILD?
        </label>
        <input
          id="cf-project"
          name="projectType"
          placeholder="e.g. an internal tool, a customer-facing app, workflow automation"
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
          className="rounded px-3.5 py-2.5 text-[14px] outline-none border transition-colors"
          style={{ background: "var(--bg-raised)", borderColor: errors.projectType ? "var(--danger)" : "var(--line)", color: "var(--text)" }}
          aria-invalid={!!errors.projectType}
          aria-describedby="cf-project-error"
        />
        <div id="cf-project-error" className="font-mono text-[11px] min-h-[14px]" style={{ color: "var(--danger)" }}>
          {errors.projectType}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-details" className="font-mono text-[11px] tracking-wide" style={{ color: "var(--muted-dim)" }}>
          ADDITIONAL DETAILS <span style={{ color: "var(--muted-dim)" }}>(optional)</span>
        </label>
        <textarea
          id="cf-details"
          name="details"
          maxLength={2000}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="rounded px-3.5 py-2.5 text-[14px] outline-none border transition-colors resize-y min-h-[96px]"
          style={{ background: "var(--bg-raised)", borderColor: "var(--line)", color: "var(--text)" }}
        />
        <div className="flex justify-end">
          <div className="font-mono text-[11px]" style={{ color: "var(--muted-dim)" }}>
            {details.length} / 2000
          </div>
        </div>
      </div>

      {state === "error" && (
        <div
          className="flex items-start gap-2.5 rounded-md border px-3.5 py-3 font-mono text-[12.5px]"
          style={{ borderColor: "var(--danger)", background: "rgba(229,72,77,0.08)", color: "var(--text)" }}
          role="alert"
        >
          <WarningCircle size={16} color="var(--danger)" weight="bold" aria-hidden="true" className="mt-0.5 shrink-0" />
          {errorMessage}
        </div>
      )}

      <button ref={submitRef} onMouseMove={onSubmitMouseMove} type="submit" className="btn btn-primary w-full justify-center" disabled={state === "submitting"}>
        <span className="btn-shine" aria-hidden="true" />
        {state === "submitting" ? "Sending…" : "Send message"}
        {state !== "submitting" && (
          <span className="btn-icon-circle">
            <ArrowRight size={12} weight="bold" aria-hidden="true" />
          </span>
        )}
      </button>
    </form>
  );
}
