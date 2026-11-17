/**
 * Portfolio content — sourced from https://ubi-sec.github.io/, the github.com/ubi-sec
 * profile + repositories, and the published résumé. Edit values here; every section reads from this file.
 */
import resumeAsset from "@/assets/abaidullah-resume.pdf.asset.json";
import profileAsset from "@/assets/abaidullah-profile.jpg.asset.json";

export const profile = {
  name: "Abaidullah",
  handle: "ubi.sec",
  brand: "UBI.SEC",
  title: "Red Team Student",
  titleLead: "Advanced",
  roles: ["Red Teaming", "Penetration Testing", "Offensive Security", "Ethical Hacking", "Cybersecurity"],
  focus: ["Red Teaming", "Web App Security", "Active Directory", "CTF Player"],
  intro:
    "I am a passionate cybersecurity professional focused on offensive security and adversary emulation. Currently building expertise in Active Directory attacks, penetration testing methodologies, and ethical hacking techniques.",
  location: "Faisalabad, Pakistan",
  email: "abaidullahali92@gmail.com",
  availability: "Available for Internships & Junior Opportunities",
  status: "eJPT track",
  motto: "Learn. Exploit. Secure.",
  resumeUrl: resumeAsset.url,
  resumeFileName: "Abaidullah-Resume.pdf",
  photoUrl: profileAsset.url,
};

export const socials = {
  github: "https://github.com/ubi-sec",
  linkedin: "https://www.linkedin.com/in/abaid-ullah-1229492ba/",
  hackthebox: "https://profile.hackthebox.com/profile/01a02c04-9cd2-702d-9252-3274354377aa",
  tryhackme: "https://tryhackme.com/p/ABAIDULLAH",
  instagram: "https://instagram.com/abaid.sec",
  tiktok: "https://tiktok.com/@ubaid.328",
  mastodon: "https://mastodon.social/@Abaidullah",
  email: `mailto:${profile.email}`,
};

export const about = {
  short:
    "I'm Abaidullah, a red team student passionate about offensive security — web app pentesting, Active Directory and Python tooling. Learning by doing through labs, CTFs and authorized testing.",

paragraphs: [
    "My journey in cybersecurity began in 2024 with a single moment of curiosity that quickly transformed into an unwavering passion for offensive security. I was fascinated by how systems, no matter how complex, could be understood, analyzed, and yes, broken. That initial spark led me down a path of relentless learning, where I discovered that effective penetration testing isn't about memorizing exploits — it's about developing a mindset that sees systems the way attackers do, while maintaining the ethics of a defender.",
    
    "Today, I focus on web application penetration testing, red teaming techniques, and Active Directory exploitation, while also building practical Python tools that automate security workflows. I believe in learning by doing, which is why I constantly train on platforms like TryHackMe, Hack The Box, PicoCTF, and OWASP Juice Shop through hands-on labs and CTF challenges.",
    
    "My skills have been tested in real-world competitive environments, where I secured a Top 30 position at the Faisalabad Hackathon and Rank 16 at the Lahore Advance Hackathon. These experiences taught me to think on my feet, adapt to unexpected challenges, and deliver results under pressure — skills that directly translate to real-world red team operations.",
    
    "Beyond offensive security, I've built a strong defensive foundation in network security, Linux, and Blue Team concepts like SIEM and security monitoring — a dual perspective that I believe makes me a more effective red teamer, because the best attackers are those who truly understand how defenders think."
],

target: "Target: eJPT within the next 12 months. Building real skills, not just certificates.",

stats: [                                    // ← یہاں "stats:" لگایا (یا "milestones:")
    { value: "2024", label: "Started journey" },
    { value: "Top 16", label: "Lahore hackathon" },
    { value: "eJPT", label: "12-month target" },
    { value: "15", label: "Certs completed" },
],

traits: [
    { title: "Analytical by habit", text: "Comfortable working through complex problems methodically." },
    { title: "Always learning", text: "Weekly practice on TryHackMe, HTB, and PicoCTF." },
    { title: "Documentation-minded", text: "Writes clear notes and reports for every engagement." },
],
};

export type SkillKey =
  | "linux" | "python" | "sql" | "nmap" | "burp" | "wireshark" | "bash" | "metasploit" | "siem" | "kali" | "docker" | "bloodhound";

export const arsenal: { key: SkillKey; label: string }[] = [
  { key: "linux", label: "Linux" },
  { key: "python", label: "Python" },
  { key: "sql", label: "SQL" },
  { key: "nmap", label: "Nmap" },
  { key: "burp", label: "Burp Suite" },
  { key: "wireshark", label: "Wireshark" },
  { key: "kali", label: "Kali Linux" },
  { key: "metasploit", label: "Metasploit" },
  { key: "siem", label: "SIEM" },
];

export const skillGroups = [
  { title: "Languages", items: ["Python", "Bash", "SQL"] },
  { title: "Offensive tools", items: ["Burp Suite", "Nmap", "Metasploit", "BloodHound", "Wireshark", "Docker"] },
  { title: "Domains", items: ["Web App Security", "Red Teaming", "Privilege Escalation", "Automation", "Active Directory"] },
  { title: "Offensive security — developing", items: ["Penetration Testing", "Ethical Hacking", "Red Teaming", "Vulnerability Assessment", "CTF / Security Labs"] },
  { title: "Cybersecurity foundation", items: ["Linux Command Line & Bash", "SQL Basics", "Network Security Fundamentals", "NIST Cybersecurity Framework", "Wireshark"] },
  { title: "Blue Team / security operations", items: ["SIEM Concepts", "Threat & Vulnerability Assessment Basics", "Security Monitoring & Incident Response Fundamentals"] },
];

export type Issuer = "google" | "cisco" | "ibm" | "python" | "htb";
export type Cert = { title: string; short: string; issuer: Issuer; issuerName: string; status: "Completed" | "In progress"; text: string };

export const certifications: Cert[] = [
  { title: "Google Cybersecurity Professional Certificate", short: "Google Cybersecurity Professional", issuer: "google", issuerName: "Google", status: "Completed", text: "Security fundamentals, networks, Linux, SQL and incident detection." },
  { title: "Cisco Ethical Hacker", short: "Ethical Hacker", issuer: "cisco", issuerName: "Cisco", status: "Completed", text: "Introduces ethical hacking methodology and penetration-testing concepts." },
  { title: "IBM Ethical Hacking with Open Source Tools", short: "Ethical Hacking", issuer: "ibm", issuerName: "IBM", status: "Completed", text: "Professional Certificate — studying open-source offensive-security tools and techniques." },
  { title: "Cisco Introduction to Cyber Security", short: "Intro to Cybersecurity", issuer: "cisco", issuerName: "Cisco", status: "Completed", text: "Foundational course on cybersecurity concepts and common threats." },
  { title: "Cisco Help Desk Technician", short: "Help Desk Tech", issuer: "cisco", issuerName: "Cisco", status: "Completed", text: "IT support fundamentals, troubleshooting and customer-facing technical skills." },
  { title: "Python Essentials 1", short: "Essentials 1", issuer: "python", issuerName: "Python Institute", status: "Completed", text: "Python programming fundamentals — syntax, data types and control flow." },
  { title: "Hack The Box Academy", short: "HTB Academy", issuer: "htb", issuerName: "Hack The Box", status: "In progress", text: "Structured offensive-security courses and hands-on labs — 6 courses completed." },
  
];

export type Project = { id: string; title: string; tag: string; text: string; url: string; image?: "scanner" };
export const projects: Project[] = [
  {
    id: "scanner",
    title: "UBI.SEC Web Vulnerability Scanner",
    tag: "#01 • Python // Offensive",
    text: "Modular Python-based web vulnerability scanner built for authorized testing. Detects common web flaws with clean reporting and extensible architecture.",
    url: "https://github.com/ubi-sec/ubi-sec-web-scaner",
    image: "scanner",
  },
  {
    id: "web-vul",
    title: "Web Vulnerability Scanner (v1)",
    tag: "#02 • Python // Tooling",
    text: "A tool created by ubi.sec to scan websites for vulnerabilities and report them with proper details.",
    url: "https://github.com/ubi-sec/web-vul-scanner",
  },
  {
    id: "writeups",
    title: "CTF & Lab Writeups",
    tag: "#03 • Labs // Practice",
    text: "Documented solutions from TryHackMe, HackTheBox, PicoCTF and Juice Shop. Focus on web exploitation, privilege escalation and attack paths.",
    url: "https://github.com/ubi-sec",
  },
];

export const ctfStats = [
  { value: 6, label: "HTB Courses" },
  { value: 16, label: "Exercises" },
  { value: 5, label: "Certificates" },
  { value: 1, label: "In Progress" },
  { value: 7, label: "Hands-on Labs" },
  { value: 4, suffix: " mo", label: "Home Lab Practice" },
];

export const hackathons = [
  { rank: "Rank 16", event: "Lahore Advance Hackathon" },
  { rank: "Top 30", event: "Faisalabad Hackathon" },
];

export const platforms = [
  { name: "Hack The Box", key: "htb" as const, stat: "6", label: "Courses completed", url: socials.hackthebox },
  { name: "TryHackMe", key: "thm" as const, stat: "Active", label: "Learning path in progress", url: socials.tryhackme },
];

export const writeups = [
  { platform: "TryHackMe", title: "Web Vulnerability Analysis — Web Security", tag: "WEB", date: "Oct 2026" },
  { platform: "PicoCTF", title: "SQL Injection Bypass — Database Security", tag: "SQL", date: "Sep 2026" },
  { platform: "HackTheBox", title: "Privilege Escalation — Linux / Windows", tag: "PRIVESC", date: "Aug 2026" },
];

export const labTopics = [
  "Reconnaissance", "Enumeration", "Network Security Testing", "Web Security Testing", "Vulnerability Assessment",
  "Linux Security", "Windows Security Fundamentals", "Privilege Escalation Practice", "CTF Exercises", "Red Team Fundamentals",
];

export const experience = [
  {
    role: "Cybersecurity Labs & Hands-on Practice",
    org: "Self-directed learning journey",
    period: "Ongoing",
    points: [
      "Practicing security concepts through hands-on labs, CTF-style exercises, and guided training environments.",
      "Building practical familiarity with Linux command-line workflows, network analysis, security monitoring and vulnerability assessment.",
      "Applying and documenting security concepts using the NIST Cybersecurity Framework.",
      "Developing foundational SOC skills through Hack The Box SOC Level 1 training.",
    ],
  },
  {
  role: "Hackathon Participant, Top 30",
  org: "National Textile University (NTU), Faisalabad, Ignite Hackathon",
  period: "2026", // apna asli saal likho
  points: [
    "Secured a Top 30 position in a hackathon organized by Ignite at National Textile University, Faisalabad.",
    "Worked under time pressure to design, build, and present a working solution: [apne project ka naam aur kya karta tha].",
    "Collaborated with teammates on [tumhara hissa: coding / security / design / presentation].",
  ],
},
{
  role: "Hackathon Participant, Top 16",
  org: "University of Central Punjab (UCP), Lahore",
  period: "2026", // apna asli saal likho
  points: [
    "Ranked in the Top 16 at a hackathon held at the University of Central Punjab, Lahore.",
    "Built and pitched [apne project ka naam aur kya masla hal karta tha] within the competition deadline.",
    "Strengthened teamwork, problem-solving, and presentation skills in a competitive environment.",
  ],
},
];

export const education = [{ degree: "Matric (Pakistan)", school: "Govt Boys High School 199RB Gatwala" }];

export const careerTarget =
  "Open to Cybersecurity Internships & Junior Roles — Red Team, Penetration Testing, SOC Analyst, IT Security and GRC.";

export const recentActivity = [
  { label: "Practice", text: "Practicing penetration-testing labs and CTF exercises", when: "This week" },
  { label: "Training", text: "Completed 6 courses on Hack The Box Academy", when: "Recently" },
  { label: "Internship", text: "Selected for a 3-month Red Team Internship at CyberTech, focusing on AD exploitation and adversary emulation.", when: "Ongoing (3 Months)" },
];

export const logbook = [
  { date: "Oct 2026", title: "From SETOOLKIT to Red Team Mindset", text: "How launching Social-Engineer Toolkit in 2024 changed the way I approach offensive security." },
  { date: "Sep 2026", title: "Building a Modular Web Vulnerability Scanner", text: "Design decisions and lessons learned while developing the UBI.SEC scanner." },
  { date: "Aug 2026", title: "Lessons from Local Hackathons", text: "What competing in Faisalabad & Lahore taught me about methodology under pressure." },
];

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "projects", label: "Projects" },
  { id: "ctf", label: "CTF" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;
