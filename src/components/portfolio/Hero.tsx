import { Download, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/portfolio";
import heroImg from "@/assets/hero-hacker.jpg";
import { HeroGlobe } from "./HeroGlobe";

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden border-b border-border" aria-label="Introduction">
      <img
        src={heroImg}
        alt="Hooded hacker at a laptop in front of a neon green city skyline"
        width={1920}
        height={912}
        fetchPriority="high"
        className="absolute inset-y-0 right-0 -z-20 h-full w-full object-cover object-[75%_30%] opacity-50 md:w-[130%] md:max-w-none md:object-[center_28%] md:opacity-100"
      />
      <div className="hero-fade-x absolute inset-0 -z-10" />
      <div className="hero-fade-y absolute inset-0 -z-10" />

      <HeroGlobe className="pointer-events-none absolute -right-28 top-6 -z-10 hidden h-[360px] w-[360px] md:block xl:-right-16 xl:top-4 xl:h-[420px] xl:w-[420px]" />

      <div className="absolute right-6 top-5 z-10 hidden border-l-2 border-primary bg-background/40 pl-3 pr-2 py-1 font-mono text-sm backdrop-blur-sm md:block" data-hero-item>
        <p className="text-foreground">
          STATUS <span className="text-primary">→</span> <span className="text-primary">{profile.status.toUpperCase()}</span>
        </p>
        <p className="mt-1 flex items-center gap-2 text-muted-foreground">
          {profile.location} <span className="inline-block size-2 bg-primary shadow-glow" />
        </p>
      </div>

      <div className="relative px-5 pb-12 pt-10 sm:px-8 md:pb-14 md:pt-10 xl:px-12">
        <p data-hero-item className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-background/60 px-3 py-1.5 text-sm text-foreground backdrop-blur">
          <Home className="size-4 text-primary" aria-hidden /> <span className="cursor-blink">Hello, I'm</span>
        </p>
        <h1 data-hero-item className="mt-4 font-display text-6xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl xl:text-8xl">
          <span className="text-foreground">Abaid</span>
          <span className="text-primary text-glow">ullah</span>
        </h1>
        <p data-hero-item className="mt-3 font-display text-3xl font-bold sm:text-4xl">
          <span className="text-foreground">{profile.titleLead} </span>
          <span className="text-primary text-glow">{profile.title}</span>
        </p>
        <ul data-hero-item className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm tracking-wider text-muted-foreground sm:text-base" aria-label="Focus areas">
          {profile.focus.map((f, i) => (
            <li key={f} className="flex items-center gap-3">
              {i > 0 && <span className="size-1.5 rounded-full bg-primary" aria-hidden />}
              <span className={i === 1 ? "text-primary" : ""}>{f}</span>
            </li>
          ))}
        </ul>
        <p data-hero-item className="mt-6 max-w-lg border-l-2 border-primary pl-4 text-base leading-relaxed text-foreground/90 sm:text-lg">
          {profile.intro}
        </p>
        <div data-hero-item className="mt-8 flex flex-wrap gap-4">
          <Button asChild variant="neon" size="xl">
            <a href={profile.resumeUrl} download={profile.resumeFileName}>
              <Download /> Download Resume
            </a>
          </Button>
          <Button asChild variant="neon-outline" size="xl">
            <a href="#projects">
              View Projects <ArrowRight />
            </a>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 hidden border border-primary/40 bg-background/70 px-5 py-3 backdrop-blur md:block" data-hero-item>
        <p className="font-display text-lg italic text-foreground">“{profile.motto}” <span className="ml-2 font-bold not-italic text-primary">//</span></p>
      </div>
    </section>
  );
}
