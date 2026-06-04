import { Card } from '@/components/ui/card';
import { Briefcase, Award } from 'lucide-react';
import AnimationWrapper from '@/components/AnimationWrapper';
import aboutPhoto from '@assets/image_1780577599804.png';
import {
  SiAmazonwebservices,
  SiGooglecloud,
  SiGithub,
  SiCisco,
} from 'react-icons/si';

const experiences = [
  {
    year: '2025',
    role: 'Project Leader',
    title: 'Progressive Responsive Website (Academic Project)',
    description: 'Managed project repositories and version control using GitHub. Supervised collaboration, task assignments, and ensured smooth project progression from planning to deployment.',
  },
  {
    year: '2025–2026',
    role: 'Programmer (Undergraduate Thesis)',
    title: 'IoT-Enabled Smart Agriculture and Real-Time Monitoring',
    description: 'Contributed to design and implementation of IoT-based systems for environmental monitoring. Developed and maintained application modules ensuring reliability, scalability, and performance.',
  },
  {
    year: 'Mid 2025',
    role: 'Web Designer',
    title: 'Simate Web Application (Filipino Web Development Peers)',
    description: 'Designed responsive, user-focused websites and collaborated with Filipino professionals on the Simate Web Application project.',
  },
  {
    year: 'December 8',
    role: 'Project Leader',
    title: 'Unicast Event Planning Management System',
    description: 'Led development and successful presentation with features for intelligent scheduling, smart recommendations, and automated event optimization.',
  },
];

const certifications = [
  'Trigger GitHub Actions with feature-based development (Microsoft)',
  'Transformer architecture and large language models in Azure Machine Learning (Microsoft)',
  'Collect guest operating system monitoring data with Azure Monitor Agent (Microsoft)',
  'Microsoft Trainee - Cloud computing & productivity tools',
  'AWS Skill Builder Trainee - Cloud architecture & services',
  'AWS Educate Member - EC2, S3, IAM, serverless architecture',
  'GitHub Student Developer Pack - Real-world deployment experience',
];

function MicrosoftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 21 21" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="10" height="10" fill="#F25022" />
      <rect x="11" y="0" width="10" height="10" fill="#7FBA00" />
      <rect x="0" y="11" width="10" height="10" fill="#00A4EF" />
      <rect x="11" y="11" width="10" height="10" fill="#FFB900" />
    </svg>
  );
}

const platforms = [
  { name: 'Microsoft', Icon: MicrosoftIcon, color: 'text-[#00A4EF]' },
  { name: 'AWS', Icon: SiAmazonwebservices, color: 'text-[#FF9900]' },
  { name: 'Google Cloud', Icon: SiGooglecloud, color: 'text-[#4285F4]' },
  { name: 'GitHub', Icon: SiGithub, color: 'text-foreground' },
  { name: 'Cisco', Icon: SiCisco, color: 'text-[#1BA0D7]' },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 animate-section-rise">
          <p className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-3">01 / ABOUT</p>
          <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight">
            About Me
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl">
            Passionate developer with experience in full-stack development, IoT systems, and cloud technologies
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <AnimationWrapper type="fade" direction="up">
            <div className="relative max-w-md mx-auto">
              {/* Glow behind */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-chart-2/10 rounded-3xl -z-10 blur-3xl opacity-60 animate-pulse" />

              <div className="relative rounded-2xl overflow-hidden border border-primary/30 bg-black/40 backdrop-blur-sm shadow-2xl shadow-primary/20" style={{ height: 420 }}>
                <img
                  src={aboutPhoto}
                  alt="Veronque Andrie"
                  className="w-full h-full object-cover object-top"
                />
                {/* Scan overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 hero-scan-line pointer-events-none" />

                {/* HUD overlays */}
                <div className="absolute top-3 left-3 text-[10px] font-mono text-primary/70 uppercase tracking-widest select-none">
                  ID · Verified
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1.5 select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-mono text-primary/70 uppercase tracking-widest">Live</span>
                </div>

                {/* Corner brackets */}
                <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-primary/70" />
                <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-primary/70" />
                <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-primary/70" />
                <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-primary/70" />

                {/* Name tag */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs font-mono text-primary/70 uppercase tracking-widest">andrieVerdev · PH</p>
                  <p className="text-sm font-bold text-white/90 mt-0.5">BS Information Technology</p>
                </div>
              </div>

              {/* JMRSP badge */}
              <div className="absolute -top-4 -left-4 bg-card border-2 border-primary/30 p-3 rounded-xl shadow-xl hidden md:block backdrop-blur-md">
                <p className="text-primary font-extrabold text-lg leading-none">JMRSP</p>
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">Member 2025</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-8 px-2">
              {[
                { label: 'Projects', value: '8' },
                { label: 'Certificates', value: '16+' },
                { label: 'Skills', value: '20+' },
              ].map((stat, index) => (
                <div key={index} className="p-4 rounded-xl bg-muted/30 border border-border/50 hover-elevate hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group text-center">
                  <div className="text-2xl font-bold text-primary mb-0.5 group-hover:scale-110 transition-transform">{stat.value}</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">{stat.label}</div>
                </div>
              ))}
            </div>
          </AnimationWrapper>

          <div className="space-y-8">
            {/* Experience Section */}
            <div>
              <h3 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-primary" />
                Academic & Project Experience
              </h3>
              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <AnimationWrapper key={index} type="slide" direction="up" delay={index * 100} duration={500}>
                    <Card className="p-4 border border-primary/20 bg-background/50 backdrop-blur-sm hover-elevate active-elevate-2 transition-all group overflow-visible">
                      <div className="flex items-start gap-4">
                        <div className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full whitespace-nowrap border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          {exp.year}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-primary text-sm tracking-tight">{exp.role}</p>
                          <p className="font-heading font-extrabold text-foreground text-lg mb-1">{exp.title}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                        </div>
                      </div>
                    </Card>
                  </AnimationWrapper>
                ))}
              </div>
            </div>

            {/* Certifications Section */}
            <div>
              <h3 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-primary" />
                Training & Certifications
              </h3>
              <div className="flex gap-5 items-start">
                {/* Platform logos — left column */}
                <div className="shrink-0 flex flex-col gap-3">
                  {platforms.map((p) => (
                    <div
                      key={p.name}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-primary/20 bg-background/50 backdrop-blur-sm w-[68px] hover-elevate transition-all"
                    >
                      <p.Icon className={`w-7 h-7 ${p.color} shrink-0`} />
                      <span className="text-[9px] font-mono text-muted-foreground text-center leading-tight">{p.name}</span>
                    </div>
                  ))}
                </div>

                {/* Cert list — right */}
                <div className="flex-1 flex flex-col gap-3">
                  {certifications.map((cert, index) => (
                    <AnimationWrapper key={index} type="slide" direction="up" delay={index * 80} duration={500}>
                      <Card className="p-4 border border-primary/20 bg-background/50 backdrop-blur-sm hover-elevate active-elevate-2 transition-all flex items-center gap-3 overflow-visible">
                        <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                        <p className="text-sm font-semibold text-foreground leading-tight">{cert}</p>
                      </Card>
                    </AnimationWrapper>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}