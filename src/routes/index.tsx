import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shield, Terminal, Github, Linkedin, Mail, MapPin, ExternalLink, Cloud, Cpu, Server, Lock, ArrowUpRight } from "lucide-react";
import headshot from "@/assets/headshot.png.asset.json";
import { useReveal } from "@/hooks/use-reveal";

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
    "Application Security",
    "OWASP Top 10",
    "Authentication & Authorization",
    "API Security",
    "Security Testing",
  ],
  "Tools & Platforms": [
    "Git",
    "GitHub",
    "Docker",
    "Linux",
    "PowerShell",
    "Flask",
    "Streamlit",
    "Wireshark",
    "VS Code",
    "Postman",
    "Jupyter Notebook",
  ],
  "Cloud & Infrastructure": [
    "AWS",
    "Azure",
    "Active Directory",
    "Windows Server",
    "Nutanix AHV",
    "Virtualization",
    "PowerShell Remoting",
  ],
  "Frameworks & Libraries": ["Pandas", "NumPy", "Chart.js", "REST APIs"],
  "Security Concepts": [
    "MITRE ATT&CK",
    "Zero Trust Architecture",
    "Network Security",
    "Log Analysis",
    "Vulnerability Management",
    "Secure Software Development Lifecycle (SSDLC)",
  ],
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
  {
    role: "LLM Security Researcher",
    org: "OpenAI Research Project",
    period: "Feb 2026 – Mar 2026",
    bullets: [
      "Evaluated Large Language Model security through adversarial prompt testing and red-team style assessments",
      "Developed and executed 50+ security-focused test cases analyzing hallucinations, prompt injection, and policy bypass behavior",
      "Documented security findings and model weaknesses through structured reporting",
      "Investigated AI safety and secure deployment considerations for generative AI systems",
    ],
  },
  {
    role: "Undergraduate Researcher",
    org: "NSWC Crane Division / Purdue Applied Research Institute (PARI)",
    period: "Aug 2025 – Jan 2026",
    bullets: [
      "Collaborated on a generative AI/ML system to synthesize realistic RF environments from Software Defined Radio (SDR) data",
      "Applied Generative Adversarial Networks (GANs) and diffusion models to RF signal analysis and cyber deception research",
      "Collected and analyzed real-world RF datasets using low-cost SDR hardware",
      "Worked alongside Purdue researchers and Department of Defense partners on cybersecurity-focused research initiatives",
    ],
  },
];

const leadership = [
  {
    role: "Co-Founder & Vice President",
    org: "Purdue LeetCode Club",
    period: "May 2026 – Present",
    bullets: [
      "Co-founded Purdue University's LeetCode Club to help students prepare for technical interviews and strengthen data structures and algorithms skills",
      "Organize coding workshops, technical interview preparation sessions, and collaborative problem-solving events",
      "Coordinate club operations, member recruitment, and executive board initiatives",
      "Foster a community focused on software engineering, cybersecurity, and technical career development",
    ],
  },
  {
    role: "Technology & Logistics Chair",
    org: "Gujarati Club Association at Purdue",
    period: "June 2026 – Present",
    bullets: [
      "Coordinate event logistics and operational planning for cultural and professional development events",
      "Manage technology resources and support event execution",
      "Guide committee members through event planning, scheduling, and organizational processes",
      "Track attendance and assist with member engagement initiatives",
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
            <a href="#leadership" className="hover:text-primary transition-colors">leadership</a>
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
      <section id="top" className="relative bg-hero overflow-hidden">
        <FloatingOrbs />
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-32 grid lg:grid-cols-[1.6fr_1fr] gap-12 lg:gap-16 items-center relative">
          <div style={{ animation: "reveal-up 800ms cubic-bezier(0.22,1,0.36,1) both" }}>
          <div className="font-mono text-xs text-primary mb-6 flex items-center gap-2">
            <span className="relative inline-flex">
              <span className="inline-block w-2 h-2 rounded-full bg-primary" />
              <span className="absolute inset-0 rounded-full pulse-ring" />
            </span>
            <span>STATUS: Available for Summer 2027 internships</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] max-w-4xl">
            <span className="text-gradient">Anjali Patel</span>
          </h1>
          <p
            className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed"
            style={{ animation: "reveal-up 900ms 120ms cubic-bezier(0.22,1,0.36,1) both" }}
          >
            Cybersecurity & security engineering student building practical defenses across{" "}
            <span className="text-foreground">cloud</span>,{" "}
            <span className="text-foreground">endpoints</span>, and{" "}
            <span className="text-foreground">industrial control systems</span>.
          </p>

          <div
            className="mt-8 font-mono text-sm text-muted-foreground"
            style={{ animation: "reveal-up 900ms 220ms cubic-bezier(0.22,1,0.36,1) both" }}
          >
            <span className="text-primary">$</span> <TypeLine text="locate anjali --role security-engineer" />
          </div>

          <div
            className="mt-6 flex flex-wrap items-center gap-4 text-sm font-mono text-muted-foreground"
            style={{ animation: "reveal-up 900ms 320ms cubic-bezier(0.22,1,0.36,1) both" }}
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary" /> Purdue University
            </span>
            <span className="text-border">/</span>
            <span>B.S. Computer & Information Technology</span>
            <span className="text-border">/</span>
            <span>Minor in Criminology</span>
          </div>

          <div
            className="mt-10 flex flex-wrap gap-3"
            style={{ animation: "reveal-up 900ms 420ms cubic-bezier(0.22,1,0.36,1) both" }}
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition glow hover:-translate-y-0.5 duration-300"
            >
              <Terminal className="w-4 h-4 transition-transform group-hover:rotate-12" /> View Projects
            </a>
            <a
              href="https://github.com/Anjaliiipatel"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-border bg-surface hover:border-primary/50 hover:-translate-y-0.5 transition-all duration-300"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/anjali-patelll/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-border bg-surface hover:border-primary/50 hover:-translate-y-0.5 transition-all duration-300"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>

          {/* Current roles strip */}
          <div className="mt-16 grid sm:grid-cols-2 gap-4">
            {[
              { label: "Currently @", value: "Rolls-Royce", sub: "Systems Security Engineering Intern" },
              { label: "Apprentice @", value: "UpToStudy", sub: "Cybersecurity Apprentice" },
            ].map((r, i) => (
              <div
                key={r.value}
                className="p-5 rounded-lg border border-border bg-surface/60 backdrop-blur shadow-card hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
                style={{ animation: `reveal-up 900ms ${520 + i * 120}ms cubic-bezier(0.22,1,0.36,1) both` }}
              >
                <div className="text-xs font-mono text-primary uppercase tracking-wider">{r.label}</div>
                <div className="mt-1 text-lg font-semibold">{r.value}</div>
                <div className="text-sm text-muted-foreground">{r.sub}</div>
              </div>
            ))}
          </div>
          </div>

          {/* Headshot */}
          <div
            className="relative mx-auto lg:mx-0 w-full max-w-sm float"
            style={{ animation: "reveal-up 1000ms 200ms cubic-bezier(0.22,1,0.36,1) both, float-y 6s ease-in-out 1s infinite" }}
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 to-accent/20 blur-2xl rounded-full" />
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-primary/40 shadow-card glow group">
              <img
                src={headshot.url}
                alt="Anjali Patel headshot"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              {/* scanline */}
              <div
                className="absolute inset-x-0 h-24 pointer-events-none bg-gradient-to-b from-transparent via-primary/20 to-transparent"
                style={{ animation: "scan 4s linear infinite" }}
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-primary/20 rounded-2xl pointer-events-none" />
            </div>
            <div className="mt-4 font-mono text-xs text-muted-foreground text-center lg:text-left">
              <span className="text-primary">$</span> whoami → anjali.patel
              <span className="blink-caret text-primary">█</span>
            </div>
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
                <div className="text-muted-foreground text-xs ml-5">+ AWS Certified Cloud Practitioner (in progress)</div>
                <div className="text-muted-foreground text-xs ml-5">+ Microsoft AZ-900 Azure Fundamentals (in progress)</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" label="02" title="Featured Projects">
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, idx) => {
            const Icon = p.icon;
            return (
              <RevealCard key={p.title} delay={idx * 90}>
              <article
                className="group relative h-full p-6 rounded-xl border border-border bg-surface hover:border-primary/50 transition-all duration-300 shadow-card hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-10px_oklch(0.82_0.17_175/0.25)]"
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
              </RevealCard>
            );
          })}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" label="03" title="Technical Experience">
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

      {/* LEADERSHIP */}
      <Section id="leadership" label="04" title="Leadership Experience">
        <div className="space-y-4">
          {leadership.map((e) => (
            <div
              key={e.role + e.org}
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
      <Section id="skills" label="05" title="Technical Skills">
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
      <Section id="contact" label="06" title="Let's Connect">
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
              {"\n"}
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
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id={id} className="max-w-6xl mx-auto px-6 py-24 scroll-mt-20">
      <div
        ref={ref}
        className="reveal"
        style={visible ? { opacity: 1, transform: "translateY(0)" } : undefined}
      >
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-sm text-primary">{label}.</span>
          <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
          <div className="flex-1 h-px bg-border" />
        </div>
        {children}
      </div>
    </section>
  );
}

function RevealCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="reveal"
      style={
        visible
          ? { opacity: 1, transform: "translateY(0)", transitionDelay: `${delay}ms` }
          : { transitionDelay: `${delay}ms` }
      }
    >
      {children}
    </div>
  );
}

function TypeLine({ text }: { text: string }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 38);
    return () => clearInterval(id);
  }, [text]);
  return (
    <span>
      {out}
      <span className="blink-caret text-primary">█</span>
    </span>
  );
}

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute -top-32 -left-20 w-[28rem] h-[28rem] rounded-full bg-primary/10 blur-3xl"
        style={{ animation: "float-y 9s ease-in-out infinite" }}
      />
      <div
        className="absolute top-40 -right-24 w-[24rem] h-[24rem] rounded-full bg-accent/15 blur-3xl"
        style={{ animation: "float-y 11s ease-in-out 1.5s infinite" }}
      />
    </div>
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
