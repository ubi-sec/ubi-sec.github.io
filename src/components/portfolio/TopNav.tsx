import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Home, User, Wrench, Award, FolderGit2, Flag, Briefcase, Mail, Menu, X, Zap, ZapOff } from "lucide-react";
import { navItems, profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { useFx } from "./fx";
import { quickLinks, ShieldLogo } from "./Sidebar";

const navIcons = { home: Home, about: User, skills: Wrench, certifications: Award, projects: FolderGit2, ctf: Flag, experience: Briefcase, contact: Mail };

export function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const els = navItems.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) setActive(vis.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.2, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

function FxToggle() {
  const { enabled, toggle } = useFx();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Turn off animated effects" : "Turn on animated effects"}
      title={enabled ? "Effects on — click to pause animations" : "Effects off — click to resume animations"}
      className="flex items-center gap-1 rounded-full border border-primary/50 bg-background/50 p-1 transition-shadow hover:shadow-glow"
    >
      <span className={cn("grid size-7 place-items-center rounded-full transition-colors", enabled ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>
        <Zap className="size-4" />
      </span>
      <span className={cn("grid size-7 place-items-center rounded-full transition-colors", !enabled ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>
        <ZapOff className="size-4" />
      </span>
    </button>
  );
}

export function TopNav() {
  const active = useActiveSection();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/75 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
        <a href="#home" className="flex items-center gap-2 text-primary lg:hidden" aria-label="UBI.SEC home">
          <ShieldLogo className="h-8 w-8" />
          <span className="font-display text-lg font-bold text-foreground">{profile.brand}</span>
        </a>

        <nav aria-label="Primary" className="hidden flex-1 items-center justify-center gap-1 xl:flex">
          {navItems.map(({ id, label }) => {
            const Icon = navIcons[id];
            const isActive = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative flex items-center gap-2 rounded-md px-3.5 py-2 text-sm transition-all",
                  isActive ? "border border-primary/60 bg-primary/10 text-primary shadow-glow" : "text-foreground/80 hover:text-primary",
                )}
              >
                <Icon className="size-4" aria-hidden />
                {label}
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3 xl:ml-0">
          <FxToggle />
          <button
            type="button"
            className="grid size-10 place-items-center rounded-md border border-primary/50 text-primary xl:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      {open && createPortal(
        <div id="mobile-menu" className="fixed inset-0 z-50 xl:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button type="button" className="absolute inset-0 bg-background/80 backdrop-blur" aria-label="Close menu" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 right-0 flex w-[82%] max-w-xs flex-col overflow-y-auto border-l border-primary/40 bg-sidebar p-5 animate-in slide-in-from-right">
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-bold text-primary">{profile.handle}</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="grid size-9 place-items-center rounded-md border border-primary/50 text-primary">
                <X className="size-5" />
              </button>
            </div>
            <nav aria-label="Mobile" className="mt-6 space-y-1">
              {navItems.map(({ id, label }) => {
                const Icon = navIcons[id];
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className={cn("flex items-center gap-3 rounded-md px-3 py-2.5", active === id ? "bg-primary/15 text-primary" : "text-foreground/85 hover:text-primary")}
                  >
                    <Icon className="size-4" /> {label}
                  </a>
                );
              })}
            </nav>
            <p className="mt-8 font-display text-sm font-semibold text-primary">Quick Links</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {quickLinks.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer" className="tile flex flex-col items-center gap-1 p-2 text-[11px] text-muted-foreground hover:text-primary">
                  <Icon className="size-5" aria-hidden />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>,
        document.body,
      )}
    </header>
  );
}
