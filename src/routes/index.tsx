import { createFileRoute } from "@tanstack/react-router";
import { Shield, Terminal, Github, Linkedin, Mail, MapPin, ExternalLink, Cloud, Cpu, Server, Lock, ArrowUpRight } from "lucide-react";
import headshot from "@/assets/headshot.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anjali Patel — Cybersecurity & Security Engineering" },
      { name: "description", content: "Computer & Information Technology student at Purdue specializing in cloud security, threat detection, and ICS security." },
      { property: "og:title", content: "Anjali Patel — Cybersecurity Portfolio" },
      { property: "og:description", content: "Cybersecurity & security engineering portfolio: cloud threat hunting, ICS security, EDR, and enterprise infrastructure." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const projects = [
  {
    title: "Cloud Threat Hunting with MITRE ATT&CK",
    period: "May 2026 – Jun 2026",
    icon: Cloud,
    description:
      "Cloud threat hunting platform that analyzes AWS CloudTrail logs and maps adversary behavior to MITRE ATT&CK for Cloud techniques.",
    highlights: [
      "Detection rules for suspicious AWS activity",
      "Simulated multi-stage cloud compromise with synthetic data",
      "Mapped detections to MITRE ATT&CK techniques",
      "Automated findings & investigation reports",
    ],
    tech: ["Python", "AWS CloudTrail", "MITRE ATT&CK", "Pandas"],
  },
  {
    title: "Secure ICS Telemetry & Detection Platform",
    period: "May 2026 – Present",
    icon: Cpu,
    description:
      "Industrial control system security platform monitoring telemetry, validating communications, and detecting malicious activity in real time.",
    highlights: [
      "HMAC-based telemetry validation",
      "Replay attack detection",
      "Anomaly detection for operational monitoring",
      "Zero Trust & Purdue Model principles",
    ],
    tech: ["Python", "Flask", "Streamlit", "Docker"],
  },
  {
    title: "Mini Endpoint Detection & Response",
    period: "Jun 2026 – Present",
    icon: Shield,
    description:
      "Lightweight endpoint monitoring solution improving visibility into system activity and detecting suspicious behavior.",
    highlights: [
      "Process monitoring functionality",
      "Endpoint security event logging",
      "Modular detection framework",
      "Low-level systems programming in C++",
    ],
    tech: ["C++", "Windows API"],
  },
  {
    title: "Nutanix Enterprise Infrastructure Lab",
    period: "Jan 2026 – Apr 2026",
    icon: Server,
    description:
      "Built and administered an enterprise virtualized environment supporting Windows infrastructure and Active Directory services.",
    highlights: [
      "Managed 2 Nutanix clusters & 7 VMs",
      "Active Directory migration to Windows Server 2025",
      "Configured WSUS & Windows Admin Center",
      "PowerShell Remoting & virtualization best practices",
    ],
    tech: ["Nutanix AHV", "Active Directory", "Windows Server", "PowerShell"],
  },
];

const skills = {
  Languages: ["Python", "Java", "C++", "SQL", "Go", "JavaScript", "TypeScript"],
  Cybersecurity: [
    "Threat Detection",
    "Threat Hunting",
    "Vulnerability Assessment",
    "Security Monitoring",
    "Incident Response",
    "Security Analytics",
    "ICS Security",
  ],
  "Tools & Platforms": ["Git", "Docker", "Linux", "PowerShell", "Flask", "Streamlit", "Wireshark"],
  "Cloud & Infrastructure": ["AWS", "Azure", "Active Directory", "Windows Server", "Nutanix AHV"],
};

const experience = [
  {
    role: "Systems Security Engineering Intern",
    org: "Rolls-Royce",
    period: "May 2026 – Present",
    bullets: [
      "Develop security-focused solutions for industrial control systems",
      "Design telemetry monitoring and threat detection capabilities",
      "Conduct threat modeling and security analysis",
      "Create technical documentation and system architecture designs",
    ],
  },
  {
    role: "Cybersecurity Apprentice",
    org: "UpToStudy",
    period: "Jun 2026 – Present",
    bullets: [
      "Conduct vulnerability assessments and security reviews",
      "Analyze application security risks and attack surfaces",
      "Document findings and remediation recommendations",
      "Produce professional technical security reports",
    ],
  },
];

function Portfolio() {
  return (
    <div className="min-h-screen">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 font-mono text-sm">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-primary">~/</span>
            <span className="text-foreground">anjali.patel</span>
            <span className="text-primary animate-pulse">_</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground font-mono">
            <a href="#about" className="hover:text-primary transition-colors">about</a>
            <a href="#projects" className="hover:text-primary transition-colors">projects</a>
            <a href="#experience" className="hover:text-primary transition-colors">experience</a>
            <a href="#skills" className="hover:text-primary transition-colors">skills</a>
            <a href="#contact" className="hover:text-primary transition-colors">contact</a>
          </div>
          <a
            href="mailto:anjalipatel0621@gmail.com"
            className="hidden sm:inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-md border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" /> get in touch
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative bg-hero">
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-32">
          <div className="font-mono text-xs text-primary mb-6 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-primary glow" />
            <span>STATUS: Available for Summer 2027 internships</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] max-w-4xl">
            <span className="text-gradient">Anjali Patel</span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
            Cybersecurity & security engineering student building practical defenses across{" "}
            <span className="text-foreground">cloud</span>,{" "}
            <span className="text-foreground">endpoints</span>, and{" "}
            <span className="text-foreground">industrial control systems</span>.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm font-mono text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary" /> Purdue University
            </span>
            <span className="text-border">/</span>
            <span>B.S. Computer & Information Technology</span>
            <span className="text-border">/</span>
            <span>Minor in Criminology</span>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition glow"
            >
              <Terminal className="w-4 h-4" /> View Projects
            </a>
            <a
              href="https://github.com/Anjaliiipatel"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-border bg-surface hover:border-primary/50 transition"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/anjali-patelll/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-border bg-surface hover:border-primary/50 transition"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>

          {/* Current roles strip */}
          <div className="mt-16 grid sm:grid-cols-2 gap-4">
            {[
              { label: "Currently @", value: "Rolls-Royce", sub: "Systems Security Engineering Intern" },
              { label: "Apprentice @", value: "UpToStudy", sub: "Cybersecurity Apprentice" },
            ].map((r) => (
              <div key={r.value} className="p-5 rounded-lg border border-border bg-surface/60 backdrop-blur shadow-card">
                <div className="text-xs font-mono text-primary uppercase tracking-wider">{r.label}</div>
                <div className="mt-1 text-lg font-semibold">{r.value}</div>
                <div className="text-sm text-muted-foreground">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" label="01" title="About">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-5 text-lg text-muted-foreground leading-relaxed">
            <p>
              I'm a Computer and Information Technology student at Purdue University pursuing a career in
              cybersecurity and security engineering. My interests span{" "}
              <span className="text-foreground">cloud security</span>,{" "}
              <span className="text-foreground">threat detection</span>,{" "}
              <span className="text-foreground">vulnerability management</span>,{" "}
              <span className="text-foreground">endpoint security</span>, and{" "}
              <span className="text-foreground">ICS security</span>.
            </p>
            <p>
              Through internships, apprenticeships, and independent projects, I've built experience in
              security monitoring, detection engineering, cloud threat hunting, secure system design, and
              enterprise infrastructure administration. I enjoy building practical security solutions that
              help organizations identify, investigate, and respond to cyber threats.
            </p>
          </div>
          <div className="space-y-4">
            <div className="p-5 rounded-lg border border-border bg-surface">
              <div className="text-xs font-mono text-primary mb-3 uppercase tracking-wider">Education</div>
              <div className="font-semibold">Purdue University</div>
              <div className="text-sm text-muted-foreground">B.S. Computer & Information Technology</div>
              <div className="text-sm text-muted-foreground">Minor: Criminology</div>
              <div className="text-xs font-mono text-primary mt-3">Expected May 2028</div>
            </div>
            <div className="p-5 rounded-lg border border-border bg-surface">
              <div className="text-xs font-mono text-primary mb-3 uppercase tracking-wider">Certifications</div>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <Lock className="w-3 h-3 text-primary" /> CompTIA Security+
                  <span className="text-muted-foreground text-xs">(in progress)</span>
                </div>
                <div className="text-muted-foreground text-xs ml-5">+ AWS Security Specialty (planned)</div>
                <div className="text-muted-foreground text-xs ml-5">+ Microsoft Security (planned)</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" label="02" title="Featured Projects">
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => {
            const Icon = p.icon;
            return (
              <article
                key={p.title}
                className="group relative p-6 rounded-xl border border-border bg-surface hover:border-primary/50 transition-all shadow-card hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{p.period}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.description}</p>
                <ul className="space-y-1.5 mb-5">
                  {p.highlights.map((h) => (
                    <li key={h} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary font-mono mt-0.5">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-2 py-1 rounded-md bg-secondary text-secondary-foreground border border-border"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" label="03" title="Experience">
        <div className="space-y-4">
          {experience.map((e) => (
            <div
              key={e.role}
              className="p-6 rounded-xl border border-border bg-surface hover:border-primary/40 transition"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{e.role}</h3>
                  <div className="text-primary font-mono text-sm">{e.org}</div>
                </div>
                <span className="text-xs font-mono text-muted-foreground">{e.period}</span>
              </div>
              <ul className="space-y-2">
                {e.bullets.map((b) => (
                  <li key={b} className="text-sm text-muted-foreground flex gap-2.5">
                    <span className="text-primary font-mono mt-0.5">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" label="04" title="Technical Skills">
        <div className="grid sm:grid-cols-2 gap-5">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="p-6 rounded-xl border border-border bg-surface">
              <div className="text-xs font-mono text-primary uppercase tracking-wider mb-4">
                {category}
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <span
                    key={s}
                    className="text-sm px-3 py-1.5 rounded-md bg-background border border-border hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" label="05" title="Let's Connect">
        <div className="rounded-2xl border border-border bg-surface p-10 md:p-14 text-center shadow-card relative overflow-hidden">
          <div className="absolute inset-0 bg-hero opacity-60 pointer-events-none" />
          <div className="relative">
            <p className="font-mono text-xs text-primary mb-4">
              {"> initiate_connection --target=anjali"}
            </p>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Open to Summer 2027 internships
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Interested in collaborating, mentoring, or recruiting? I'd love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <ContactLink href="mailto:anjalipatel0621@gmail.com" icon={Mail} label="Email" />
              <ContactLink href="https://www.linkedin.com/in/anjali-patelll/" icon={Linkedin} label="LinkedIn" />
              <ContactLink href="https://github.com/Anjaliiipatel" icon={Github} label="GitHub" />
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-border mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
          <span>© {new Date().getFullYear()} Anjali Patel</span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            system online
          </span>
        </div>
      </footer>
    </div>
  );
}

function Section({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-6 py-24 scroll-mt-20">
      <div className="flex items-center gap-4 mb-12">
        <span className="font-mono text-sm text-primary">{label}.</span>
        <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
        <div className="flex-1 h-px bg-border" />
      </div>
      {children}
    </section>
  );
}

function ContactLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group inline-flex items-center gap-2 px-5 py-3 rounded-md bg-background border border-border hover:border-primary hover:text-primary transition-all"
    >
      <Icon className="w-4 h-4" />
      <span className="font-medium">{label}</span>
      {external ? (
        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
      ) : (
        <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
      )}
    </a>
  );
}
