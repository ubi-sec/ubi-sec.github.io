import { useEffect, useState } from "react";
import { ArrowRight, BadgeCheck, Clock, ExternalLink, GraduationCap, Briefcase, Target, Terminal, Trophy, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  about, certifications, careerTarget, education, experience, hackathons, labTopics, logbook, platforms, profile, projects, recentActivity, skillGroups, socials, writeups,
} from "@/data/portfolio";
import { HudCard, SectionHeading } from "./Hud";
import { issuerIcons, socialIcons } from "./icons";
import scannerImg from "@/assets/scanner-laptop.jpg";

function Typewriter({ words }: { words: string[] }) {
  const [state, setState] = useState({ w: 0, n: words[0]?.length ?? 0, del: false });
  useEffect(() => {
    const word = words[state.w] ?? "";
    const pause = !state.del && state.n === word.length ? 1600 : state.del ? 45 : 90;
    const t = setTimeout(() => {
      setState((s) => {
        const cur = words[s.w] ?? "";
        if (!s.del && s.n === cur.length) return { ...s, del: true };
        if (s.del && s.n === 0) return { w: (s.w + 1) % words.length, n: 0, del: false };
        return { ...s, n: s.n + (s.del ? -1 : 1) };
      });
    }, pause);
    return () => clearTimeout(t);
  }, [state, words]);
  return <span className="cursor-blink text-primary">{(words[state.w] ?? "").slice(0, state.n)}</span>;
}

export function AboutSection() {
  return (
    <section id="about" className="px-4 py-16 sm:px-6 xl:px-10" aria-labelledby="about-title">
      <SectionHeading index="01" title="About Me" />
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4 text-foreground/90" data-reveal>
          {about.paragraphs.map((p) => <p key={p} className="leading-relaxed">{p}</p>)}
          <p className="border-l-2 border-danger pl-4 font-mono text-sm uppercase tracking-wider text-danger">{about.target}</p>
          <dl className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
            {about.stats.map((s) => (
              <div key={s.label} className="tile p-4 text-center">
                <dt className="font-display text-2xl font-bold text-primary text-glow">{s.value}</dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </dl>
          <div className="grid gap-3 pt-2 sm:grid-cols-3">
            {about.traits.map((t) => (
              <div key={t.title} className="tile p-4">
                <p className="font-display font-semibold text-foreground">{t.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4" data-reveal>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-lg border border-primary/50 shadow-glow">
            <img src={profile.photoUrl} alt="Abaidullah standing, wearing a grey polo shirt" loading="lazy" width={1066} height={1600} className="h-full w-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <p className="absolute bottom-3 left-4 font-mono text-sm text-primary">ID://UBI-SEC_01 • {profile.location}</p>
          </div>
          <HudCard interactive={false} innerClassName="p-4 font-mono text-sm">
            <p className="mb-3 flex items-center gap-2 text-xs text-muted-foreground"><Terminal className="size-4 text-primary" /> kali@ubi-sec ~ SYS_LIVE</p>
            <p><span className="text-primary">$</span> whoami</p>
            <p className="text-muted-foreground">abaidullah — red team student</p>
            <p className="mt-2"><span className="text-primary">$</span> cat /etc/hostname</p>
            <p className="text-muted-foreground">kali [faisalabad-pk]</p>
            <p className="mt-2"><span className="text-primary">$</span> status --track</p>
            <p className="text-muted-foreground">eJPT track <span className="text-primary">[ACTIVE]</span></p>
            <p className="mt-2"><span className="text-primary">$</span> focus</p>
            <p><Typewriter words={profile.roles} /></p>
          </HudCard>
        </div>
      </div>
    </section>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="px-4 py-16 sm:px-6 xl:px-10" aria-label="Skills">
      <SectionHeading index="02" title="Skills & Arsenal" kicker="Organised by where I am in my cybersecurity journey — from foundational knowledge, through Blue Team basics, to the offensive skills I'm actively building now." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((g) => (
          <HudCard key={g.title} data-reveal>
            <p className="eyebrow">// {g.title}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li key={s} className="rounded-full border border-primary/35 bg-primary/5 px-3 py-1 text-sm text-foreground">{s}</li>
              ))}
            </ul>
          </HudCard>
        ))}
      </div>
    </section>
  );
}

export function CertificationsSection() {
  return (
    <section id="certifications" className="px-4 py-16 sm:px-6 xl:px-10" aria-label="Certifications">
      <SectionHeading index="03" title="Certifications & Training" kicker="A mix of completed certifications and training currently in progress." />
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {certifications.map((c) => {
          const Icon = issuerIcons[c.issuer];
          const done = c.status === "Completed";
          return (
            <li key={c.title} data-reveal>
              <HudCard className="h-full" innerClassName="flex h-full flex-col p-5">
                <div className="flex items-center justify-between">
                  <Icon className="h-7 text-2xl text-primary" aria-hidden />
                  <span className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${done ? "bg-primary/15 text-primary" : "bg-danger/15 text-danger"}`}>
                    {done ? <BadgeCheck className="size-3.5" /> : <Clock className="size-3.5" />} {c.status}
                  </span>
                </div>
                <p className="mt-4 font-display font-semibold leading-snug text-foreground">{c.title}</p>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{c.text}</p>
                <p className="mt-4 font-mono text-xs uppercase tracking-widest text-primary/80">{c.issuerName}</p>
              </HudCard>
            </li>
          );
        })}
      </ul>
      <div className="mt-6" data-reveal>
        <Button asChild variant="neon-outline">
          <a href={socials.linkedin} target="_blank" rel="noreferrer"><socialIcons.linkedin /> See credentials on LinkedIn <ExternalLink /></a>
        </Button>
      </div>
    </section>
  );
}

export function ProjectsSection() {
  const featured = projects[0]!;
  const rest = projects.slice(1);
  return (
    <section id="projects" className="px-4 py-16 sm:px-6 xl:px-10" aria-label="Projects">
      <SectionHeading index="04" title="Selected Projects" />
      <HudCard data-reveal innerClassName="grid gap-6 p-5 md:grid-cols-[1fr_1.2fr] md:p-6">
        <img src={scannerImg} alt="Laptop showing scan results from the UBI.SEC vulnerability scanner" loading="lazy" width={944} height={704} className="aspect-[4/3] w-full rounded-md border border-primary/30 object-cover" />
        <div className="flex flex-col justify-center">
          <p className="eyebrow">{featured.tag}</p>
          <h3 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">{featured.title}</h3>
          <p className="mt-3 text-muted-foreground">{featured.text}</p>
          <p className="mt-3 font-mono text-sm text-primary/80">github.com/ubi-sec/ubi-sec-web-scaner</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild variant="neon">
              <a href={featured.url} target="_blank" rel="noreferrer"><socialIcons.github /> View on GitHub</a>
            </Button>
          </div>
        </div>
      </HudCard>
      <ul className="mt-4 grid gap-4 md:grid-cols-2">
        {rest.map((p) => (
          <li key={p.id} data-reveal>
            <a href={p.url} target="_blank" rel="noreferrer" className="group block h-full">
              <HudCard className="h-full" innerClassName="p-5">
                <p className="eyebrow">{p.tag}</p>
                <h3 className="mt-2 font-display text-xl font-bold text-foreground group-hover:text-primary">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
                <p className="mt-4 flex items-center gap-1 text-sm text-primary">Open on GitHub <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></p>
              </HudCard>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CtfSection() {
  return (
    <section id="ctf" className="px-4 py-16 sm:px-6 xl:px-10" aria-label="CTF and achievements">
      <SectionHeading index="05" title="CTF & Achievements" kicker="Structured practice across offensive-security fundamentals — no completed work is claimed unless it's real." />
      <div className="grid gap-4 lg:grid-cols-3">
        {platforms.map((p) => {
          const Icon = p.key === "htb" ? socialIcons.hackthebox : socialIcons.tryhackme;
          return (
            <HudCard key={p.name} data-reveal>
              <div className="flex items-center gap-3">
                <Icon className="size-8 text-primary" aria-hidden />
                <p className="font-display text-lg font-semibold">{p.name}</p>
              </div>
              <p className="mt-4 font-display text-4xl font-bold text-primary text-glow">{p.stat}</p>
              <p className="text-sm text-muted-foreground">{p.label}</p>
              <Button asChild variant="neon-outline" size="sm" className="mt-4">
                <a href={p.url} target="_blank" rel="noreferrer">View profile <ExternalLink /></a>
              </Button>
            </HudCard>
          );
        })}
        <HudCard danger data-reveal>
          <div className="flex items-center gap-3">
            <Trophy className="size-8 text-danger" aria-hidden />
            <p className="font-display text-lg font-semibold">Hackathons</p>
          </div>
          <ul className="mt-4 space-y-3">
            {hackathons.map((h) => (
              <li key={h.event}>
                <p className="font-display text-2xl font-bold text-foreground">{h.rank}</p>
                <p className="text-sm text-muted-foreground">{h.event}</p>
              </li>
            ))}
          </ul>
        </HudCard>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <HudCard data-reveal>
          <p className="eyebrow">// CTF writeups</p>
          <ul className="mt-4 divide-y divide-border">
            {writeups.map((w) => (
              <li key={w.title} className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="font-mono text-xs text-primary">{w.platform}</p>
                  <p className="text-sm text-foreground">{w.title}</p>
                </div>
                <div className="text-right">
                  <span className="rounded border border-primary/40 px-2 py-0.5 font-mono text-[11px] text-primary">{w.tag}</span>
                  <p className="mt-1 text-xs text-muted-foreground">{w.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </HudCard>
        <HudCard data-reveal>
          <p className="eyebrow">// Currently learning in labs</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {labTopics.map((t) => (
              <li key={t} className="rounded-full border border-primary/35 bg-primary/5 px-3 py-1 text-sm">{t}</li>
            ))}
          </ul>
        </HudCard>
      </div>
    </section>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="px-4 py-16 sm:px-6 xl:px-10" aria-label="Experience and education">
      <SectionHeading index="06" title="Experience & Education" />
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <ol className="relative space-y-6 border-l border-primary/40 pl-6">
          {experience.map((e) => (
            <li key={e.role} className="relative" data-reveal>
              <span className="absolute -left-[31px] top-1.5 grid size-4 place-items-center rounded-full border border-primary bg-background">
                <span className="size-1.5 rounded-full bg-primary" />
              </span>
              <HudCard interactive={false}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="flex items-center gap-2 font-display text-lg font-semibold"><Briefcase className="size-4 text-primary" /> {e.role}</h3>
                  <span className="font-mono text-xs uppercase text-primary">{e.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{e.org}</p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-foreground/85 marker:text-primary">
                  {e.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </HudCard>
            </li>
          ))}
        </ol>
        <div className="space-y-4">
          <HudCard data-reveal>
            <p className="flex items-center gap-2 font-display text-lg font-semibold"><GraduationCap className="size-5 text-primary" /> Education</p>
            {education.map((ed) => (
              <div key={ed.degree} className="mt-3">
                <p className="text-foreground">{ed.degree}</p>
                <p className="text-sm text-muted-foreground">{ed.school}</p>
              </div>
            ))}
          </HudCard>
          <HudCard data-reveal>
            <p className="flex items-center gap-2 font-display text-lg font-semibold"><Target className="size-5 text-primary" /> Career target</p>
            <p className="mt-3 text-sm text-foreground/85">{careerTarget}</p>
            <Button asChild variant="neon" size="sm" className="mt-4">
              <a href={profile.resumeUrl} download={profile.resumeFileName}>Download full résumé</a>
            </Button>
          </HudCard>
        </div>
      </div>
    </section>
  );
}

export function ActivitySection() {
  return (
    <section id="activity" className="px-4 py-16 sm:px-6 xl:px-10" aria-label="Recent activity and logbook">
      <SectionHeading index="07" title="Recent Activity" />
      <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <HudCard danger data-reveal>
          <ul className="space-y-4">
            {recentActivity.map((a) => (
              <li key={a.text} className="flex items-start gap-3">
                <span className="pulse-dot mt-1.5 shrink-0" />
                <div className="flex-1">
                  <p className="font-mono text-xs uppercase text-primary">{a.label}</p>
                  <p className="text-sm">{a.text}</p>
                </div>
                <span className="text-xs text-muted-foreground">{a.when}</span>
              </li>
            ))}
          </ul>
        </HudCard>
        <ul className="grid gap-4 sm:grid-cols-3">
          {logbook.map((b) => (
            <li key={b.title} data-reveal>
              <HudCard className="h-full" innerClassName="p-4">
                <p className="flex items-center gap-2 font-mono text-xs text-primary"><BookOpen className="size-3.5" /> {b.date}</p>
                <p className="mt-2 font-display font-semibold leading-snug">{b.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
              </HudCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
