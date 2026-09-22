import { useEffect, useState } from 'react';
import { ArrowRight, Github, Linkedin, Mail, MapPin, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import profileImage from '@assets/image_1777644687711.png';

export default function HeroSection() {
  const [displayText, setDisplayText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const fullName = 'Veronque Andrie';

  useEffect(() => {
    let i = 0;
    let deleting = false;
    let pauseTimer: ReturnType<typeof setTimeout> | null = null;

    const tick = () => {
      if (!deleting) {
        i++;
        setDisplayText(fullName.slice(0, i));
        if (i >= fullName.length) {
          deleting = false;
          pauseTimer = setTimeout(() => {
            deleting = true;
            loop();
          }, 1800);
          return;
        }
      } else {
        i--;
        setDisplayText(fullName.slice(0, i));
        if (i <= 0) {
          deleting = false;
          pauseTimer = setTimeout(() => {
            loop();
          }, 600);
          return;
        }
      }
      loop();
    };

    let rafId: ReturnType<typeof setTimeout>;
    const loop = () => {
      const delay = deleting ? 45 : 80;
      rafId = setTimeout(tick, delay);
    };

    loop();

    return () => {
      clearTimeout(rafId);
      if (pauseTimer) clearTimeout(pauseTimer);
    };
  }, []);

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(blink);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadCV = () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Veronque Andrie — CV</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  :root{--green:#111;--green-dim:#333;--bg:#fff;--surface:#f7f7f7;--surface2:#efefef;--border:#d4d4d4;--text:#0a0a0a;--muted:#555;--accent:#111;}
  body{background:var(--bg);color:var(--text);font-family:'Space Grotesk',sans-serif;font-size:13px;line-height:1.6;padding:0;}
  .page{max-width:860px;margin:0 auto;padding:40px 48px;min-height:100vh;}
  /* HEADER */
  .header{border-bottom:1px solid var(--border);padding-bottom:24px;margin-bottom:28px;position:relative;}
  .header::before{content:'';position:absolute;bottom:-1px;left:0;width:120px;height:1px;background:var(--green);box-shadow:0 0 8px var(--green);}
  .header-top{display:flex;justify-content:space-between;align-items:flex-start;gap:24px;}
  .name{font-size:38px;font-weight:800;letter-spacing:-1px;color:var(--text);line-height:1.1;}
  .name span{color:var(--green);}
  .role{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--green);letter-spacing:.25em;text-transform:uppercase;margin-top:6px;}
  .tagline{font-size:12px;color:var(--muted);margin-top:8px;max-width:420px;line-height:1.5;}
  .contacts{text-align:right;font-family:'JetBrains Mono',monospace;font-size:10.5px;color:var(--muted);line-height:1.9;}
  .contacts a{color:var(--green);text-decoration:none;}
  .badge-row{display:flex;gap:8px;margin-top:14px;flex-wrap:wrap;}
  .badge{background:var(--surface2);border:1px solid var(--border);color:var(--green);font-family:'JetBrains Mono',monospace;font-size:9.5px;padding:3px 10px;border-radius:3px;letter-spacing:.12em;text-transform:uppercase;}
  /* SECTIONS */
  .section{margin-bottom:26px;}
  .section-label{font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--green);letter-spacing:.35em;text-transform:uppercase;margin-bottom:10px;display:flex;align-items:center;gap:8px;}
  .section-label::after{content:'';flex:1;height:1px;background:var(--border);}
  /* EXPERIENCE */
  .exp-item{display:grid;grid-template-columns:90px 1fr;gap:12px;margin-bottom:16px;}
  .exp-year{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--green);padding-top:2px;text-align:right;line-height:1.4;}
  .exp-body{}
  .exp-role{font-size:11px;font-weight:700;color:var(--green);letter-spacing:.08em;text-transform:uppercase;font-family:'JetBrains Mono',monospace;}
  .exp-title{font-size:13px;font-weight:600;color:var(--text);margin:2px 0;}
  .exp-desc{font-size:11.5px;color:var(--muted);line-height:1.55;}
  /* PROJECTS */
  .projects-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
  .proj-card{background:var(--surface);border:1px solid var(--border);border-radius:4px;padding:11px 13px;}
  .proj-name{font-size:12px;font-weight:700;color:var(--text);margin-bottom:4px;}
  .proj-desc{font-size:10.5px;color:var(--muted);line-height:1.5;}
  /* SKILLS */
  .skills-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;}
  .skill-pill{background:var(--surface2);border:1px solid var(--border);border-radius:3px;padding:5px 9px;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--muted);text-align:center;}
  /* CERTS */
  .certs-list{display:grid;grid-template-columns:1fr 1fr;gap:6px;}
  .cert-item{background:var(--surface);border:1px solid var(--border);border-radius:3px;padding:8px 11px;}
  .cert-name{font-size:10.5px;font-weight:600;color:var(--text);line-height:1.4;margin-bottom:2px;}
  .cert-org{font-family:'JetBrains Mono',monospace;font-size:9.5px;color:var(--green);letter-spacing:.05em;}
  .cert-date{font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--muted);}
  /* EDUCATION */
  .edu-row{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;}
  .edu-deg{font-size:14px;font-weight:700;color:var(--text);}
  .edu-school{font-size:12px;color:var(--muted);margin-top:3px;}
  .edu-year{font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--green);text-align:right;white-space:nowrap;padding-top:3px;}
  /* FOOTER */
  .cv-footer{margin-top:32px;padding-top:16px;border-top:1px solid var(--border);display:flex;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--border);}
  .cv-footer span{color:var(--muted);}
  @media print{.page{padding:28px 36px;}}
</style>
</head>
<body>
<div class="page">

  <div class="header">
    <div class="header-top">
      <div>
        <div class="name">Veronque <span>Andrie</span></div>
        <div class="role">&lt; andrieVerdev /&gt; — Software Developer</div>
        <div class="tagline">Full-stack developer specializing in React, Next.js, Node.js, and cloud technologies. Experienced in developing scalable web applications, IoT systems, and AI-powered solutions. Passionate about building reliable software and continuously learning modern technologies.</div>
        <div class="badge-row">
          <span class="badge">IoT</span>
          <span class="badge">Full-Stack</span>
          <span class="badge">AI / ML</span>
          <span class="badge">Computer Vision</span>
          <span class="badge">Embedded Systems</span>
        </div>
      </div>
      <div class="contacts">
        <div>github.com/<a href="https://github.com/andrieVerdev">andrieVerdev</a></div>
        <div>Philippines</div>
        <div style="margin-top:8px;color:var(--green);">Available for Freelance</div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-label">00 / Professional Summary</div>
    <p style="font-size:12.5px;color:#333;line-height:1.7;max-width:720px;">
      Full-stack developer specializing in React, Next.js, Node.js, and cloud technologies (Azure · AWS · GCP). Developed and maintained 8+ academic and freelance software projects ranging from IoT-based monitoring systems to AI-powered web applications. Microsoft Azure Certified with hands-on experience in multi-cloud deployment, DevOps workflows, and hardware integration using Arduino and Raspberry Pi. Committed to writing scalable, maintainable code and continuously adopting modern technologies.
    </p>
  </div>

  <div class="section">
    <div class="section-label">01 / Education</div>
    <div class="edu-row">
      <div>
        <div class="edu-deg">Bachelor of Science in Information Technology</div>
        <div class="edu-school">Cabuyao, Laguna, Philippines</div>
      </div>
      <div class="edu-year">2023 — Present</div>
    </div>
  </div>

  <div class="section">
    <div class="section-label">02 / Experience</div>
    <div class="exp-item">
      <div class="exp-year">2025–2026</div>
      <div class="exp-body">
        <div class="exp-role">Programmer — Thesis</div>
        <div class="exp-title">IoT-Enabled Smart Agriculture and Real-Time Monitoring</div>
        <div class="exp-desc">Designed and developed full-stack modules for an IoT-based smart agriculture system using React, Node.js, and Arduino sensors. Integrated real-time data monitoring dashboards with live sensor feeds, reducing manual data collection by replacing paper-based methods entirely.</div>
      </div>
    </div>
    <div class="exp-item">
      <div class="exp-year">2025</div>
      <div class="exp-body">
        <div class="exp-role">Project Leader</div>
        <div class="exp-title">Progressive Responsive Website (Academic Project)</div>
        <div class="exp-desc">Led a team of 4 in building a fully responsive multi-page website using HTML, CSS, and JavaScript. Managed Git workflow and code reviews on GitHub, delivering the project on schedule with zero merge conflicts across 50+ commits.</div>
      </div>
    </div>
    <div class="exp-item">
      <div class="exp-year">Mid 2025</div>
      <div class="exp-body">
        <div class="exp-role">Web Designer</div>
        <div class="exp-title">Simate Web Application — Filipino Web Development Peers</div>
        <div class="exp-desc">Designed and delivered responsive UI components for a web application serving a Filipino developer community. Collaborated remotely with a cross-functional team, improving overall design consistency and mobile responsiveness across 10+ pages.</div>
      </div>
    </div>
    <div class="exp-item">
      <div class="exp-year">2024</div>
      <div class="exp-body">
        <div class="exp-role">Project Leader</div>
        <div class="exp-title">Unicast Event Planning Management System</div>
        <div class="exp-desc">Led a 5-member team in architecting and building a full event management system with intelligent scheduling algorithms and automated notifications. Presented to a panel of faculty evaluators and received commendation for system design and technical execution.</div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-label">03 / Projects</div>
    <div class="projects-grid">
      <div class="proj-card"><div class="proj-name">EVACS-SYSTEM</div><div class="proj-desc">IT Solutions Access Control System with real-time check-in/out tracking, visitor management, and activity logging.</div></div>
      <div class="proj-card"><div class="proj-name">QR Attendance System</div><div class="proj-desc">QR-code-based contactless attendance tracking with real-time scan decoding, dashboard, and CSV export.</div></div>
      <div class="proj-card"><div class="proj-name">Facial Recognition AI</div><div class="proj-desc">Computer vision system using deep learning models for high-accuracy face detection and biometric authentication.</div></div>
      <div class="proj-card"><div class="proj-name">Library Management System</div><div class="proj-desc">Digital library solution with automated inventory tracking, member portal, and intelligent search capabilities.</div></div>
      <div class="proj-card"><div class="proj-name">TaskTracker</div><div class="proj-desc">Task management system with categorized tracking, real-time status updates, and data visualization.</div></div>
      <div class="proj-card"><div class="proj-name">Study Buddy</div><div class="proj-desc">Collaborative academic app connecting students for peer learning, study groups, and resource sharing.</div></div>
      <div class="proj-card"><div class="proj-name">Laguna Tourist Spot Guide</div><div class="proj-desc">Interactive web travel guide for Laguna showcasing landmarks and cultural sites with location maps.</div></div>
      <div class="proj-card"><div class="proj-name">Fluppy Bird</div><div class="proj-desc">Side-scrolling game featuring physics-based movement, challenging obstacles, and responsive controls.</div></div>
    </div>
  </div>

  <div class="section">
    <div class="section-label">04 / Skills</div>
    <div class="skills-grid">
      <div class="skill-pill">JavaScript</div><div class="skill-pill">TypeScript</div><div class="skill-pill">Python</div><div class="skill-pill">C++</div>
      <div class="skill-pill">React</div><div class="skill-pill">Next.js</div><div class="skill-pill">Node.js</div><div class="skill-pill">Flutter</div>
      <div class="skill-pill">Tailwind CSS</div><div class="skill-pill">HTML5 / CSS3</div><div class="skill-pill">Dart</div><div class="skill-pill">Vite</div>
      <div class="skill-pill">PostgreSQL</div><div class="skill-pill">MongoDB</div><div class="skill-pill">MySQL</div><div class="skill-pill">Firebase</div>
      <div class="skill-pill">Git / GitHub</div><div class="skill-pill">Docker</div><div class="skill-pill">Linux</div><div class="skill-pill">Arduino</div>
      <div class="skill-pill">Raspberry Pi</div><div class="skill-pill">Figma</div><div class="skill-pill">AWS Cloud</div><div class="skill-pill">Azure</div>
    </div>
  </div>

  <div class="section">
    <div class="section-label">05 / Certifications (18)</div>
    <div class="certs-list">
      <div class="cert-item"><div class="cert-name">Microsoft Certified: Azure Fundamentals</div><div class="cert-org">Microsoft</div><div class="cert-date">May 2025</div></div>
      <div class="cert-item"><div class="cert-name">Plan and Prepare to Develop AI Solutions on Azure</div><div class="cert-org">Microsoft</div><div class="cert-date">Sep 2025</div></div>
      <div class="cert-item"><div class="cert-name">Introduction to Site Reliability Engineering</div><div class="cert-org">Microsoft</div><div class="cert-date">Oct 2025</div></div>
      <div class="cert-item"><div class="cert-name">Discover Data Analysis</div><div class="cert-org">Microsoft</div><div class="cert-date">Sep 2025</div></div>
      <div class="cert-item"><div class="cert-name">Fundamentals of Machine Learning and AI</div><div class="cert-org">AWS Training &amp; Certification</div><div class="cert-date">Mar 2026</div></div>
      <div class="cert-item"><div class="cert-name">AWS Certified Cloud Practitioner Domain 1 Review</div><div class="cert-org">AWS Training &amp; Certification</div><div class="cert-date">Nov 2025</div></div>
      <div class="cert-item"><div class="cert-name">Managing Change when Moving to Google Cloud</div><div class="cert-org">Google Cloud</div><div class="cert-date">2025</div></div>
      <div class="cert-item"><div class="cert-name">MLOps for Generative AI</div><div class="cert-org">Google Cloud</div><div class="cert-date">Nov 2025</div></div>
      <div class="cert-item"><div class="cert-name">Introduction to Responsible AI</div><div class="cert-org">Google Cloud</div><div class="cert-date">Nov 2025</div></div>
      <div class="cert-item"><div class="cert-name">AI Ready ASEAN: Hour of Code Training</div><div class="cert-org">ASEAN Foundation &amp; Google.org</div><div class="cert-date">Oct 2025</div></div>
      <div class="cert-item"><div class="cert-name">AI Ready ASEAN: Hour of Code Campaign</div><div class="cert-org">ASEAN Foundation &amp; Google.org</div><div class="cert-date">Jun 2025</div></div>
      <div class="cert-item"><div class="cert-name">C++ Essentials 1</div><div class="cert-org">Cisco Networking Academy</div><div class="cert-date">Sep 2025</div></div>
      <div class="cert-item"><div class="cert-name">AI at Work: Analyze Customer Reviews</div><div class="cert-org">Cisco Networking Academy</div><div class="cert-date">Sep 2025</div></div>
      <div class="cert-item"><div class="cert-name">Trigger GitHub Actions with Feature-Based Development</div><div class="cert-org">GitHub</div><div class="cert-date">Dec 2025</div></div>
      <div class="cert-item"><div class="cert-name">Beyond the Black Box: Explainable AI in Game Dev</div><div class="cert-org">West Visayas State University</div><div class="cert-date">Oct 2025</div></div>
      <div class="cert-item"><div class="cert-name">Digital Twins: Modeling Reality for Smarter Systems</div><div class="cert-org">West Visayas State University</div><div class="cert-date">Nov 2025</div></div>
      <div class="cert-item"><div class="cert-name">A Beginner's Journey into Blockchain &amp; Cryptocurrency</div><div class="cert-org">West Visayas State University</div><div class="cert-date">Nov 2025</div></div>
      <div class="cert-item"><div class="cert-name">Installing and Configuring Computer Systems</div><div class="cert-org">TESDA — NITESD</div><div class="cert-date">Jun 2026</div></div>
    </div>
  </div>

  <div class="cv-footer">
    <span>Veronque Andrie · andrieVerdev · Philippines</span>
    <span>Generated ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
  </div>

</div>
</body>
</html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Veronque-Andrie-CV.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 hero-grid-bg opacity-40" />
      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_50%,rgba(168,85,247,0.12)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-20 items-center">

          {/* LEFT — Text */}
          <div className="space-y-8 animate-hero-blur-fade">
            {/* Available badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-xs font-mono font-bold text-primary uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Available for freelance work
            </div>

            {/* Name */}
            <div>
              <h1 className="font-heading font-black leading-[0.9] tracking-tighter text-foreground" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}>
                {displayText}
                <span className={`inline-block w-[4px] h-[0.85em] ml-1 bg-primary align-middle transition-opacity duration-100 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`} />
              </h1>
              <p className="mt-4 font-mono text-sm md:text-base font-bold uppercase tracking-[0.28em] text-primary">
                Software Developer
              </p>
            </div>

            {/* Info row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-medium">
              <a
                href="https://web.facebook.com/ucpncofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-primary transition-colors duration-200 group"
                data-testid="link-university"
              >
                <MapPin className="w-3.5 h-3.5 text-primary/70 group-hover:text-primary transition-colors" />
                University of Cabuyao, Philippines
              </a>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>BS Information Technology</span>
            </div>

            {/* Bio */}
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Building intelligent systems at the intersection of software and hardware.
              Passionate about IoT, computer vision, robotics, and modern web architecture.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                className="gap-2 rounded-md px-8 font-bold shadow-lg shadow-primary/20"
                onClick={() => scrollTo('projects')}
                data-testid="button-view-work"
              >
                View Work <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 rounded-md px-8 font-bold border-border/60"
                onClick={() => scrollTo('contact')}
                data-testid="button-contact"
              >
                <Mail className="w-4 h-4" /> Contact
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="gap-2 rounded-md px-6 font-bold text-muted-foreground"
                onClick={downloadCV}
                data-testid="button-download-cv"
              >
                <Download className="w-4 h-4" /> CV
              </Button>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://github.com/andrieVerdev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
                data-testid="link-github"
              >
                <Github className="w-4 h-4 group-hover:text-primary transition-colors" />
                andrieVerdev
              </a>
              <span className="w-px h-4 bg-border" />
              <a
                href="#"
                className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
                data-testid="link-linkedin"
              >
                <Linkedin className="w-4 h-4 group-hover:text-primary transition-colors" />
                LinkedIn
              </a>
            </div>
          </div>

          {/* RIGHT — ID Terminal Card */}
          <div className="flex justify-center animate-hero-blur-fade" style={{ animationDelay: '300ms' }}>
            <div className="relative w-[320px]">

              {/* Ambient glow behind card */}
              <div className="absolute -inset-6 bg-primary/10 rounded-3xl blur-3xl opacity-60 animate-pulse" />

              {/* Main card */}
              <div className="relative rounded-2xl border border-primary/30 bg-background/80 backdrop-blur-md shadow-2xl shadow-primary/10 overflow-hidden">

                {/* Top HUD bar */}
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-primary/20 bg-primary/5">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] font-bold">SYS_IDENT</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[9px] text-primary/60 uppercase tracking-widest">STATUS:</span>
                    <span className="font-mono text-[9px] text-primary font-bold uppercase tracking-widest">LIVE</span>
                  </div>
                </div>

                {/* Photo area */}
                <div className="relative flex justify-center pt-6 pb-4 px-6">
                  {/* Outer rotating segmented ring */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="absolute w-[220px] h-[220px] animate-[spin_12s_linear_infinite]" viewBox="0 0 220 220">
                      <circle cx="110" cy="110" r="104" fill="none" stroke="currentColor" strokeWidth="1.5"
                        strokeDasharray="8 6" className="text-primary/30" />
                    </svg>
                    <svg className="absolute w-[200px] h-[200px] animate-[spin_8s_linear_infinite_reverse]" viewBox="0 0 200 200">
                      <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" strokeWidth="1"
                        strokeDasharray="4 12" className="text-primary/20" />
                    </svg>
                  </div>

                  {/* Photo circle */}
                  <div className="relative w-44 h-44 rounded-full overflow-hidden border-2 border-primary/50 shadow-lg shadow-primary/30">
                    <img
                      src={profileImage}
                      alt="Veronque Andrie"
                      className="w-full h-full object-cover object-top"
                    />
                    {/* Scan line */}
                    <div className="absolute inset-0 hero-scan-line pointer-events-none" />
                    {/* Bottom gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
                  </div>

                  {/* Corner HUD brackets on the photo container */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-primary/70" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-primary/70" />
                  <div className="absolute bottom-2 left-4 w-6 h-6 border-b-2 border-l-2 border-primary/70" />
                  <div className="absolute bottom-2 right-4 w-6 h-6 border-b-2 border-r-2 border-primary/70" />
                </div>

                {/* Data rows */}
                <div className="px-5 pb-2 space-y-1.5">
                  {[
                    { key: 'NAME', val: 'Veronque Andrie' },
                    { key: 'ALIAS', val: 'andrieVerdev' },
                    { key: 'DEGREE', val: 'BS Information Technology' },
                    { key: 'ORIGIN', val: 'Philippines · UC' },
                  ].map((row) => (
                    <div key={row.key} className="flex items-baseline gap-3">
                      <span className="font-mono text-[9px] text-primary/50 uppercase tracking-[0.2em] w-14 shrink-0">{row.key}</span>
                      <span className="w-full h-px bg-primary/10 shrink" />
                      <span className="font-mono text-[11px] text-foreground/80 font-semibold whitespace-nowrap">{row.val}</span>
                    </div>
                  ))}
                </div>

                {/* Access bar */}
                <div className="mx-5 my-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[9px] text-primary/60 uppercase tracking-widest">CLEARANCE</span>
                    <span className="font-mono text-[9px] text-primary font-bold">LVL 04 · FULL</span>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-sm ${i < 10 ? 'bg-primary' : 'bg-primary/20'}`}
                        style={{ opacity: i < 10 ? 0.4 + i * 0.06 : 1 }}
                      />
                    ))}
                  </div>
                </div>

                {/* Bottom strip */}
                <div className="flex items-center justify-between px-5 py-2.5 border-t border-primary/10 bg-primary/[0.03]">
                  <span className="font-mono text-[9px] text-primary/40 tracking-widest">ID_VERIFIED</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} className={`w-0.5 rounded-full bg-primary/30`}
                        style={{ height: Math.random() > 0.5 ? '12px' : '6px' }} />
                    ))}
                  </div>
                  <span className="font-mono text-[9px] text-primary/40 tracking-widest">PH · 2025</span>
                </div>
              </div>

              {/* Stat pills beside card */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[
                  { v: '8+', l: 'Projects' },
                  { v: '17+', l: 'Certs' },
                  { v: '13', l: 'Repos' },
                ].map((s) => (
                  <div key={s.l} className="text-center py-3 rounded-lg border border-border/50 bg-card/50 hover-elevate transition-all">
                    <p className="text-xl font-black text-primary leading-none">{s.v}</p>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent animate-pulse" />
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">scroll</p>
        </div>
      </div>
    </section>
  );
}
