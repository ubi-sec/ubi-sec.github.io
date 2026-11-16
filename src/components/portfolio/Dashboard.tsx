import { useEffect, useRef, useState } from "react";
import {
  User, Settings, Trophy, Code2, Flag, Briefcase, Activity, Share2, ArrowRight, MoreHorizontal, Send, ShieldCheck, Handshake, UserCog, ChevronLeft, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { about, arsenal, certifications, ctfStats, profile, projects, recentActivity, socials } from "@/data/portfolio";
import { HudCard, CardHeader } from "./Hud";
import { issuerIcons, skillIcons, socialIcons } from "./icons";
import { useFx } from "./fx";
import scannerImg from "@/assets/scanner-laptop.jpg";
import trophyImg from "@/assets/ctf-trophy.jpg";

function ViewAll({ href, label = "View All" }: { href: string; label?: string }) {
  return (
    <a href={href} className="flex items-center gap-1 text-sm text-primary hover:text-primary-glow hover:underline">
      {label} <ArrowRight className="size-3.5" />
    </a>
  );
}

function AboutCard() {
  return (
    <HudCard className="md:col-span-1" data-reveal>
      <CardHeader icon={<User />} title="About Me" />
      <div className="flex gap-3">
        <p className="flex-1 text-xs leading-relaxed text-muted-foreground sm:text-[13px]">{about.short}</p>
        <div className="relative size-28 shrink-0 self-center">
          <div className="ring-dashed absolute -inset-2" />
          <div className="ring-holo absolute inset-0 overflow-hidden">
            <img src={profile.photoUrl} alt="Portrait of Abaidullah" loading="lazy" width={1066} height={1600} className="h-full w-full object-cover object-top saturate-50" />
            <div className="absolute inset-0 bg-primary/15 mix-blend-color" />
          </div>
        </div>
      </div>
      <Button asChild variant="neon-outline" size="pill" className="mt-4">
        <a href="#about">Know More <ArrowRight /></a>
      </Button>
    </HudCard>
  );
}

function SkillsCard() {
  return (
    <HudCard data-reveal>
      <CardHeader icon={<Settings />} title="Skills & Arsenal" action={<ViewAll href="#skills" />} />
      <ul className="grid grid-cols-5 gap-2">
        {arsenal.map(({ key, label }) => {
          const Icon = skillIcons[key];
          return (
            <li key={key} className="flex flex-col items-center gap-1.5 rounded-md p-1.5 text-center transition-colors hover:bg-primary/10">
              <Icon className="size-7 text-primary drop-shadow-[0_0_6px_var(--color-primary)]" aria-hidden />
              <span className="text-[11px] leading-tight text-foreground/90">{label}</span>
            </li>
          );
        })}
        <li>
          <a href="#skills" className="flex flex-col items-center gap-1.5 rounded-md p-1.5 text-center hover:bg-primary/10">
            <MoreHorizontal className="size-7 text-primary" aria-hidden />
            <span className="text-[11px] text-foreground/90">More...</span>
          </a>
        </li>
      </ul>
    </HudCard>
  );
}

function CertsCard() {
  return (
    <HudCard data-reveal>
      <CardHeader icon={<Trophy />} title="Certifications" action={<ViewAll href="#certifications" />} />
      <ul className="grid grid-cols-3 gap-2">
        {certifications.slice(0, 6).map((c) => {
          const Icon = issuerIcons[c.issuer];
          return (
            <li key={c.title} className="tile p-2" title={`${c.title} — ${c.status}`}>
              <Icon className="h-6 text-xl text-primary" aria-hidden />
              <p className="mt-1 text-[11px] font-semibold leading-tight text-foreground">{c.issuerName === "Python Institute" ? "Python" : c.issuerName}</p>
              <p className="text-[10px] leading-tight text-muted-foreground">{c.short}</p>
            </li>
          );
        })}
      </ul>
    </HudCard>
  );
}

function ProjectsCard() {
  const [i, setI] = useState(0);
  const { enabled } = useFx();
  useEffect(() => {
    if (!enabled) return;
    const t = setInterval(() => setI((v) => (v + 1) % projects.length), 6500);
    return () => clearInterval(t);
  }, [enabled]);
  const p = projects[i] ?? projects[0]!;
  return (
    <HudCard data-reveal>
      <CardHeader icon={<Code2 />} title="Projects" action={<ViewAll href="#projects" />} />
      <div className="tile flex gap-3 p-2" aria-live="polite">
        <img src={scannerImg} alt="Laptop running a web vulnerability scan" loading="lazy" width={944} height={704} className="h-28 w-28 shrink-0 rounded object-cover sm:w-32" />
        <div className="min-w-0">
          <p className="font-display text-base font-bold leading-tight text-foreground">{p.title}</p>
          <p className="mt-1.5 line-clamp-3 text-xs text-muted-foreground">{p.text}</p>
          <Button asChild variant="neon-outline" size="pill" className="mt-2 h-7">
            <a href={p.url} target="_blank" rel="noreferrer">View Project <ArrowRight /></a>
          </Button>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-center gap-3">
        <button type="button" aria-label="Previous project" onClick={() => setI((v) => (v - 1 + projects.length) % projects.length)} className="text-muted-foreground hover:text-primary">
          <ChevronLeft className="size-4" />
        </button>
        {projects.map((pr, idx) => (
          <button
            key={pr.id}
            type="button"
            aria-label={`Show ${pr.title}`}
            aria-current={idx === i}
            onClick={() => setI(idx)}
            className={`h-1.5 rounded-full transition-all ${idx === i ? "w-6 bg-primary shadow-glow" : "w-1.5 bg-muted-foreground/50"}`}
          />
        ))}
        <button type="button" aria-label="Next project" onClick={() => setI((v) => (v + 1) % projects.length)} className="text-muted-foreground hover:text-primary">
          <ChevronRight className="size-4" />
        </button>
      </div>
    </HudCard>
  );
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setN(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (t: number) => {
        const k = Math.min((t - start) / 1200, 1);
        setN(Math.round((1 - Math.pow(1 - k, 3)) * value));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return <span ref={ref} className="whitespace-nowrap font-semibold text-primary">{n}{suffix}</span>;
}

function CtfCard() {
  return (
    <HudCard data-reveal>
      <CardHeader icon={<Flag />} title="CTF & Achievements" />
      <div className="flex gap-4">
        <div className="flex w-32 shrink-0 flex-col items-center">
          <img src={trophyImg} alt="Glowing CTF trophy" loading="lazy" width={816} height={816} className="h-28 w-28 object-contain" />
          <Button asChild variant="neon-outline" size="pill" className="mt-2 h-7">
            <a href="#ctf">View Details <ArrowRight /></a>
          </Button>
        </div>
        <ul className="space-y-1.5 text-[13px] text-foreground/90">
          {ctfStats.map((s) => (
            <li key={s.label} className="flex items-center gap-2 whitespace-nowrap">
              <ShieldCheck className="size-3.5 text-primary" aria-hidden />
              <Counter value={s.value} suffix={"suffix" in s ? s.suffix : ""} /> {s.label}
            </li>
          ))}
        </ul>
      </div>
    </HudCard>
  );
}

function ExperienceCard() {
  return (
    <HudCard data-reveal>
      <CardHeader icon={<Briefcase />} title="Experience & Internships" action={<ViewAll href="#experience" label="Details" />} />
      <ul className="space-y-5">
        <li className="flex items-start gap-4">
          <UserCog className="mt-0.5 size-8 shrink-0 text-primary" aria-hidden />
          <p className="text-sm text-foreground">Cybersecurity Learning Journey<br /><span className="text-muted-foreground">( Self Learner — labs, CTFs & training )</span></p>
        </li>
        <li className="flex items-start gap-4">
          <Handshake className="mt-0.5 size-8 shrink-0 text-primary" aria-hidden />
          <p className="text-sm text-foreground">Open to Cybersecurity Internship<br />&amp; Junior Roles</p>
        </li>
      </ul>
    </HudCard>
  );
}

function ActivityCard() {
  return (
    <HudCard danger data-reveal>
      <CardHeader icon={<Activity />} title="Recent Activity" />
      <ul className="space-y-3">
        {recentActivity.map((a) => (
          <li key={a.text} className="flex items-start gap-3 text-[13px]">
            <span className="pulse-dot mt-1.5 shrink-0" aria-hidden />
            <span className="flex-1 text-foreground/90"><span className="text-primary">{a.label}:</span> {a.text}</span>
            <span className="shrink-0 text-xs text-muted-foreground">{a.when}</span>
          </li>
        ))}
      </ul>
    </HudCard>
  );
}

const connect = [
  { label: "GitHub", href: socials.github, Icon: socialIcons.github },
  { label: "LinkedIn", href: socials.linkedin, Icon: socialIcons.linkedin },
  { label: "Hack The Box", href: socials.hackthebox, Icon: socialIcons.hackthebox },
  { label: "TryHackMe", href: socials.tryhackme, Icon: socialIcons.tryhackme },
  { label: "Instagram", href: socials.instagram, Icon: socialIcons.instagram },
];

function ConnectCard() {
  return (
    <HudCard data-reveal>
      <CardHeader icon={<Share2 />} title="Connect With Me" />
      <ul className="flex justify-between gap-2">
        {connect.map(({ label, href, Icon }) => (
          <li key={label}>
            <a href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} className="tile grid size-11 place-items-center text-foreground hover:text-primary">
              <Icon className="size-6" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-4 rounded-md border border-primary/50 p-3 text-center">
        <p className="text-sm text-foreground">Let's build <span className="text-primary">something secure</span> together.</p>
        <Button asChild variant="neon-outline" size="pill" className="mt-2">
          <a href="#contact"><Send /> Contact Me <ArrowRight /></a>
        </Button>
      </div>
    </HudCard>
  );
}

/** The command-center grid that mirrors the reference layout. */
export function Dashboard() {
  return (
    <section aria-label="Overview" className="grid gap-4 px-4 py-6 sm:px-6 md:grid-cols-2 2xl:grid-cols-4">
      <AboutCard />
      <SkillsCard />
      <CertsCard />
      <ProjectsCard />
      <CtfCard />
      <ExperienceCard />
      <ActivityCard />
      <ConnectCard />
    </section>
  );
}
