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
              <p className="mt-4 text-lg md:text-xl font-mono text-primary font-semibold tracking-wide">
                {'< '}Mechatronics & Software Engineer{' />'}
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
              <span>4th Year BS Mechatronics Engineering</span>
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

          {/* RIGHT — Photo */}
          <div className="flex flex-col items-center gap-6 animate-hero-blur-fade" style={{ animationDelay: '300ms' }}>
            <div className="relative">
              {/* Outer rotating border */}
              <div className="absolute -inset-3 rounded-2xl border border-primary/20 animate-[spin_20s_linear_infinite] opacity-40" style={{ borderStyle: 'dashed' }} />
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-primary/30 via-transparent to-primary/10 blur-xl" />
              {/* Photo */}
              <div className="relative w-72 h-80 lg:w-80 lg:h-96 rounded-xl overflow-hidden border border-primary/30 shadow-2xl shadow-primary/20">
                <img
                  src={profileImage}
                  alt="Veronque Andrie"
                  className="w-full h-full object-cover object-top"
                />
                {/* Scan overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                <div className="absolute inset-0 hero-scan-line pointer-events-none" />
                {/* Corner brackets */}
                <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-primary" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-primary" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-primary" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-primary" />
                {/* Name tag */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs font-mono text-primary/70 uppercase tracking-widest">ID_VERIFIED</p>
                  <p className="text-sm font-bold text-white/90 mt-0.5">andrieVerdev · PH</p>
                </div>
              </div>
            </div>

            {/* Stat pills under photo */}
            <div className="grid grid-cols-3 gap-3 w-full">
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

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent animate-pulse" />
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">scroll</p>
        </div>
      </div>
    </section>
  );
}
