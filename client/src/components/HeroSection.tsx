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
    const interval = setInterval(() => {
      setDisplayText(fullName.slice(0, i + 1));
      i++;
      if (i >= fullName.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(blink);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadCV = () => {
    const a = document.createElement('a');
    a.href = '#';
    a.download = 'Veronque-Andrie-CV.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 hero-grid-bg opacity-40" />
      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_50%,rgba(34,197,94,0.08)_0%,transparent_60%)]" />
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
                  { v: '16+', l: 'Certs' },
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
