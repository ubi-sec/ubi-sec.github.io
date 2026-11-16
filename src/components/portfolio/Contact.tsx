import { useEffect, useState, type FormEvent } from "react";
import { Copy, Mail, MapPin, Send, ArrowUp } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { profile, socials } from "@/data/portfolio";
import { HudCard, SectionHeading } from "./Hud";
import { socialIcons } from "./icons";

const fieldCls =
  "w-full rounded-md border border-input bg-background/60 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:shadow-glow";

const allSocials = [
  { label: "GitHub", href: socials.github, Icon: socialIcons.github },
  { label: "LinkedIn", href: socials.linkedin, Icon: socialIcons.linkedin },
  { label: "Hack The Box", href: socials.hackthebox, Icon: socialIcons.hackthebox },
  { label: "TryHackMe", href: socials.tryhackme, Icon: socialIcons.tryhackme },
  { label: "Instagram", href: socials.instagram, Icon: socialIcons.instagram },
  { label: "TikTok", href: socials.tiktok, Icon: socialIcons.tiktok },
  { label: "Mastodon", href: socials.mastodon, Icon: socialIcons.mastodon },
];

/** Builds the mailto link the contact form opens. Exported for tests. */
export function buildMailto(to: string, f: { name: string; email: string; subject: string; message: string }) {
  const subject = f.subject.trim() || `Portfolio contact from ${f.name.trim()}`;
  const body = `${f.message.trim()}\n\n— ${f.name.trim()} (${f.email.trim()})`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please add your name, a valid email and a message.");
      return;
    }
    window.location.href = buildMailto(profile.email, form);
    toast.success("Opening your email app with the message ready to send.");
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      toast.success("Email address copied");
    } catch {
      toast.error(`Copy failed — the address is ${profile.email}`);
    }
  };

  return (
    <section id="contact" className="px-4 py-16 sm:px-6 xl:px-10" aria-label="Contact">
      <SectionHeading index="08" title="Get In Touch" kicker="I'm actively looking for Red Team, penetration-testing and cybersecurity internship or junior opportunities. If there's a fit, I'd like to hear from you." />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-4" data-reveal>
          <HudCard interactive={false}>
            <p className="flex items-center gap-2 text-sm text-muted-foreground"><Mail className="size-4 text-primary" /> Email</p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <a href={socials.email} className="font-display text-lg text-foreground hover:text-primary break-all">{profile.email}</a>
              <Button variant="neon-ghost" size="sm" onClick={copyEmail} aria-label="Copy email address"><Copy /> Copy</Button>
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4 text-primary" /> {profile.location}</p>
          </HudCard>
          <HudCard interactive={false}>
            <p className="eyebrow">// Social channels</p>
            <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {allSocials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noreferrer" className="tile flex items-center gap-2 px-3 py-2 text-sm hover:text-primary">
                    <Icon className="size-4" aria-hidden /> {label}
                  </a>
                </li>
              ))}
            </ul>
          </HudCard>
        </div>

        <HudCard interactive={false} data-reveal>
          <form onSubmit={submit} className="grid gap-4" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm">Name<input className={fieldCls} value={form.name} onChange={set("name")} autoComplete="name" required maxLength={100} placeholder="Your name" /></label>
              <label className="grid gap-1.5 text-sm">Email<input type="email" className={fieldCls} value={form.email} onChange={set("email")} autoComplete="email" required maxLength={200} placeholder="you@company.com" /></label>
            </div>
            <label className="grid gap-1.5 text-sm">Subject<input className={fieldCls} value={form.subject} onChange={set("subject")} maxLength={150} placeholder="Internship opportunity" /></label>
            <label className="grid gap-1.5 text-sm">Message<textarea className={`${fieldCls} min-h-36`} value={form.message} onChange={set("message")} required maxLength={3000} placeholder="Tell me about the role or project..." /></label>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" variant="neon" size="xl"><Send /> Send Message</Button>
              <p className="text-xs text-muted-foreground">Opens your email app, addressed to {profile.email}.</p>
            </div>
          </form>
        </HudCard>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-8 border-t border-primary/40 bg-background/80 backdrop-blur">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent shadow-glow" />
      <div className="flex flex-col items-center gap-3 px-6 py-5 text-sm text-muted-foreground lg:flex-row lg:justify-between">
        <p>{profile.name} <span className="mx-2 text-primary/50">|</span> Cybersecurity Portfolio <span className="mx-2 text-primary/50">|</span> {profile.brand}</p>
        <p className="font-mono tracking-[0.4em] text-primary">// EXPLORE / LEARN / HACK / SECURE</p>
        <p>Made with <span className="text-danger">♥</span> for Cybersecurity</p>
      </div>
      <p className="pb-5 text-center font-mono text-[11px] tracking-widest text-muted-foreground/70">© 2026 ABAIDULLAH • AUTHORIZED SECURITY RESEARCH ONLY • eJPT TRACK</p>
    </footer>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-full border border-primary bg-background/80 text-primary shadow-glow backdrop-blur transition-all hover:bg-primary hover:text-primary-foreground ${show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
