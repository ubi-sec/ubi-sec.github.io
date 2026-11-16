import type { ComponentType } from "react";
import {
  SiLinux, SiPython, SiWireshark, SiKalilinux, SiBurpsuite, SiGnubash, SiDocker, SiMetasploit,
  SiGoogle, SiCisco, SiHackthebox, SiTryhackme, SiInstagram, SiTiktok, SiMastodon, SiGithub,
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { Database, Radar, Activity, Dog, Mail } from "lucide-react";
import type { Issuer, SkillKey } from "@/data/portfolio";

type IconC = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

export const skillIcons: Record<SkillKey, IconC> = {
  linux: SiLinux,
  python: SiPython,
  sql: Database,
  nmap: Radar,
  burp: SiBurpsuite,
  wireshark: SiWireshark,
  bash: SiGnubash,
  metasploit: SiMetasploit,
  siem: Activity,
  kali: SiKalilinux,
  docker: SiDocker,
  bloodhound: Dog,
};

function IbmMark({ className }: { className?: string }) {
  return (
    <span className={`font-display font-black tracking-tighter leading-none ${className ?? ""}`} aria-hidden>
      IBM
    </span>
  );
}

export const issuerIcons: Record<Issuer, IconC> = {
  google: SiGoogle,
  cisco: SiCisco,
  ibm: IbmMark,
  python: SiPython,
  htb: SiHackthebox,
};

export const socialIcons = {
  github: SiGithub,
  linkedin: FaLinkedin,
  hackthebox: SiHackthebox,
  tryhackme: SiTryhackme,
  instagram: SiInstagram,
  tiktok: SiTiktok,
  mastodon: SiMastodon,
  email: Mail,
} satisfies Record<string, IconC>;
