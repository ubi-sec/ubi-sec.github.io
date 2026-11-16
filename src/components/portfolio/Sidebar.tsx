import { profile, socials } from "@/data/portfolio";
import { socialIcons } from "./icons";
import dragon from "@/assets/dragon-emblem.png";

export const quickLinks = [
  { label: "GitHub", href: socials.github, icon: socialIcons.github },
  { label: "LinkedIn", href: socials.linkedin, icon: socialIcons.linkedin },
  { label: "Hack The Box", href: socials.hackthebox, icon: socialIcons.hackthebox },
  { label: "TryHackMe", href: socials.tryhackme, icon: socialIcons.tryhackme },
  { label: "Instagram", href: socials.instagram, icon: socialIcons.instagram },
  { label: "Email", href: socials.email, icon: socialIcons.email },
];

export function ShieldLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 46" className={className} aria-hidden>
      <path d="M20 2 37 8v14c0 11-7.5 18.5-17 22C10.5 40.5 3 33 3 22V8Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M13 15c4-4 12-4 15 1-3-1-6-1-8 1 3 0 6 2 6 5-2-2-5-2-7-1 2 1 4 4 3 7-2-3-6-5-9-5 1-3 0-6 0-8Z" fill="currentColor" />
    </svg>
  );
}

function WireMountains() {
  return (
    <svg viewBox="0 0 200 120" className="w-full text-primary/60" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="0.6">
        <path d="M0 120 40 60 70 85 105 25 140 70 165 50 200 90 200 120Z" fill="url(#mtn)" />
        <path d="M40 60 55 120M40 60 25 120M105 25 90 120M105 25 120 120M105 25 70 85M105 25 140 70M140 70 150 120M165 50 175 120M70 85 80 120M0 120 70 85 140 70 200 90" />
        <path d="M20 100 60 95 100 105 140 95 180 105" opacity="0.6" />
      </g>
      <defs>
        <linearGradient id="mtn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[210px] flex-col border-r border-sidebar-border bg-sidebar/90 backdrop-blur-xl lg:flex">
      <a href="#home" className="flex items-center gap-2 px-5 pt-5 text-primary" aria-label="UBI.SEC home">
        <ShieldLogo className="h-9 w-9 drop-shadow-[0_0_8px_currentColor]" />
        <span className="font-display text-xl font-bold tracking-wide text-foreground">{profile.brand}</span>
      </a>

      <div className="mx-4 mt-6 flex flex-col items-center rounded-lg border border-sidebar-border bg-background/40 px-3 py-4 text-center">
        <img src={dragon} alt="UBI.SEC dragon emblem" width={816} height={816} className="h-24 w-24 object-contain drop-shadow-[0_0_14px_var(--color-primary)]" />
        <p className="mt-2 font-display text-xl font-bold text-primary text-glow">{profile.handle}</p>
        <p className="mt-1 text-xs text-primary/90">Hack • Learn • Build</p>
      </div>

      <nav aria-label="Quick links" className="mt-6 px-5">
        <p className="font-display text-sm font-semibold text-primary">Quick Links</p>
        <ul className="mt-3 space-y-1">
          {quickLinks.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-md px-2 py-1.5 text-sm text-sidebar-foreground/85 transition-colors hover:bg-primary/10 hover:text-primary"
              >
                <Icon className="size-4 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <a href="#contact" className="mx-4 mt-5 flex items-start gap-2 rounded-lg border border-sidebar-border bg-background/40 p-3 text-xs leading-relaxed text-sidebar-foreground/90 transition-colors hover:border-primary/60">
        <span className="pulse-dot mt-1 shrink-0" />
        {profile.availability}
      </a>

      <div className="mt-auto">
        <WireMountains />
        <p className="px-5 pb-6 -mt-6 font-display text-lg font-semibold leading-tight text-danger drop-shadow-[0_0_8px_var(--color-danger)]">
          Red Team
          <br />
          Never Sleeps...
        </p>
      </div>
    </aside>
  );
}
