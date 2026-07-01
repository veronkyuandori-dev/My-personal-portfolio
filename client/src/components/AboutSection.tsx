import { Card } from '@/components/ui/card';
import { Briefcase, Award } from 'lucide-react';
import AnimationWrapper from '@/components/AnimationWrapper';
import aboutPhoto from '@assets/image_1780578013237.png';
import {
  SiAmazonwebservices,
  SiGithub,
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
  { text: 'Trigger GitHub Actions with feature-based development', platform: 'microsoft' },
  { text: 'Transformer architecture and large language models in Azure Machine Learning', platform: 'microsoft' },
  { text: 'Collect guest operating system monitoring data with Azure Monitor Agent', platform: 'microsoft' },
  { text: 'Microsoft Trainee – Cloud computing & productivity tools', platform: 'microsoft' },
  { text: 'AWS Skill Builder Trainee – Cloud architecture & services', platform: 'aws' },
  { text: 'AWS Educate Member – EC2, S3, IAM, serverless architecture', platform: 'aws' },
  { text: 'GitHub Student Developer Pack – Real-world deployment experience', platform: 'github' },
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
  { name: 'GitHub', Icon: SiGithub, color: 'text-foreground' },
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
            <div className="relative max-w-sm mx-auto">

              {/* === Deep glow layers === */}
              <div className="absolute -inset-8 bg-primary/15 rounded-full blur-3xl opacity-50 animate-pulse -z-10" />
              <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-xl opacity-70 -z-10" />

              {/* === Outer decorative ring (SVG circuit traces) === */}
              <svg className="absolute -inset-6 w-[calc(100%+48px)] h-[calc(100%+48px)] pointer-events-none -z-0" viewBox="0 0 340 460" fill="none">
                {/* Animated corner traces — top-left */}
                <path d="M24 8 L8 8 L8 24" stroke="currentColor" strokeWidth="1.5" className="text-primary/60" strokeLinecap="round"/>
                <circle cx="8" cy="8" r="3" fill="currentColor" className="text-primary/80"/>
                <path d="M8 40 L8 56" stroke="currentColor" strokeWidth="1" className="text-primary/30" strokeDasharray="4 4"/>
                {/* top-right */}
                <path d="M316 8 L332 8 L332 24" stroke="currentColor" strokeWidth="1.5" className="text-primary/60" strokeLinecap="round"/>
                <circle cx="332" cy="8" r="3" fill="currentColor" className="text-primary/80"/>
                <path d="M332 40 L332 56" stroke="currentColor" strokeWidth="1" className="text-primary/30" strokeDasharray="4 4"/>
                {/* bottom-left */}
                <path d="M24 452 L8 452 L8 436" stroke="currentColor" strokeWidth="1.5" className="text-primary/60" strokeLinecap="round"/>
                <circle cx="8" cy="452" r="3" fill="currentColor" className="text-primary/80"/>
                {/* bottom-right */}
                <path d="M316 452 L332 452 L332 436" stroke="currentColor" strokeWidth="1.5" className="text-primary/60" strokeLinecap="round"/>
                <circle cx="332" cy="452" r="3" fill="currentColor" className="text-primary/80"/>
                {/* Side tick marks */}
                <path d="M0 120 L6 120" stroke="currentColor" strokeWidth="1" className="text-primary/40"/>
                <path d="M0 180 L10 180" stroke="currentColor" strokeWidth="1.5" className="text-primary/60"/>
                <path d="M0 240 L6 240" stroke="currentColor" strokeWidth="1" className="text-primary/40"/>
                <path d="M0 300 L10 300" stroke="currentColor" strokeWidth="1.5" className="text-primary/60"/>
                <path d="M340 120 L334 120" stroke="currentColor" strokeWidth="1" className="text-primary/40"/>
                <path d="M340 180 L330 180" stroke="currentColor" strokeWidth="1.5" className="text-primary/60"/>
                <path d="M340 240 L334 240" stroke="currentColor" strokeWidth="1" className="text-primary/40"/>
                <path d="M340 300 L330 300" stroke="currentColor" strokeWidth="1.5" className="text-primary/60"/>
              </svg>

              {/* === Main photo card with clipped corners === */}
              <div
                className="relative overflow-hidden border border-primary/40 bg-background/20 shadow-2xl shadow-primary/30"
                style={{ clipPath: 'polygon(18px 0%, calc(100% - 18px) 0%, 100% 18px, 100% calc(100% - 18px), calc(100% - 18px) 100%, 18px 100%, 0% calc(100% - 18px), 0% 18px)' }}
              >
                {/* Photo — full size, no crop */}
                <img
                  src={aboutPhoto}
                  alt="Veronque Andrie"
                  className="w-full h-auto block"
                  style={{ display: 'block' }}
                />

                {/* Scan line */}
                <div className="absolute inset-0 hero-scan-line pointer-events-none" />
                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent pointer-events-none" />

                {/* Top HUD bar */}
                <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-3 py-2 bg-background/40 backdrop-blur-sm border-b border-primary/20">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="font-mono text-[9px] text-primary uppercase tracking-[0.2em]">ID_VERIFIED</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[9px] text-primary/50 uppercase tracking-widest">UC · PH</span>
                    <span className="font-mono text-[9px] text-primary uppercase tracking-widest">● LIVE</span>
                  </div>
                </div>

                {/* Corner brackets inside */}
                <div className="absolute top-9 left-2 w-6 h-6 border-t-2 border-l-2 border-primary/80" />
                <div className="absolute top-9 right-2 w-6 h-6 border-t-2 border-r-2 border-primary/80" />
                <div className="absolute bottom-12 left-2 w-6 h-6 border-b-2 border-l-2 border-primary/80" />
                <div className="absolute bottom-12 right-2 w-6 h-6 border-b-2 border-r-2 border-primary/80" />

                {/* Bottom info bar */}
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-background/60 backdrop-blur-sm border-t border-primary/20">
                  <p className="font-mono text-[10px] text-primary/60 uppercase tracking-widest mb-0.5">andrieVerdev · PH</p>
                  <p className="font-bold text-sm text-foreground/90">BS Information Technology</p>
                </div>
              </div>

              {/* === JMRSP floating badge === */}
              <div className="absolute -top-3 -right-3 z-10 bg-card border border-primary/40 px-3 py-2 shadow-xl backdrop-blur-md"
                style={{ clipPath: 'polygon(6px 0%, 100% 0%, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0% 100%, 0% 6px)' }}>
                <p className="text-primary font-extrabold text-sm leading-none">JMRSP</p>
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">Member 2025</p>
              </div>

              {/* === Floating data chip === */}
              <div className="absolute -bottom-3 -left-3 z-10 bg-card border border-primary/30 px-3 py-2 shadow-xl backdrop-blur-md"
                style={{ clipPath: 'polygon(6px 0%, 100% 0%, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0% 100%, 0% 6px)' }}>
                <p className="font-mono text-[9px] text-primary/60 uppercase tracking-widest">Status</p>
                <p className="font-bold text-xs text-primary">Available · 2025</p>
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

            {/* Credential Bio Block */}
            <div className="border border-primary/25 bg-background/40 backdrop-blur-sm rounded-xl p-5 space-y-4">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <div>
                  <p className="font-heading font-extrabold text-lg text-foreground leading-tight">Veronque Andrie</p>
                  <p className="font-mono text-[10px] text-primary uppercase tracking-[0.22em] mt-0.5">andrieVerdev · BS Information Technology</p>
                </div>
                <span className="font-mono text-[9px] text-primary/60 border border-primary/20 px-2 py-1 rounded bg-primary/5 whitespace-nowrap">CREDENTIAL SUMMARY</span>
              </div>

              <div>
                <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-[0.25em] mb-2">Certifications &amp; Credentials</p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Microsoft Certified: Azure Fundamentals',
                    'AWS ML & Cloud Practitioner',
                    'Google Cloud MLOps & Responsible AI',
                    'GitHub Actions',
                    'Cisco C++ Essentials',
                    'TESDA — Computer Systems',
                  ].map((c) => (
                    <span key={c} className="font-mono text-[9.5px] text-primary bg-primary/8 border border-primary/20 px-2 py-0.5 rounded-sm">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-[0.25em] mb-2">Specializations</p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'Multi-Cloud Architecture',
                    'AI / ML & MLOps',
                    'IoT Systems',
                    'Full-Stack Engineering',
                    'DevOps & SRE',
                    'Blockchain & Digital Twins',
                    'Embedded Systems',
                  ].map((s) => (
                    <span key={s} className="font-mono text-[9.5px] text-muted-foreground bg-muted/30 border border-border/60 px-2 py-0.5 rounded-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

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
                        {/* Platform logo inline */}
                        <div className="shrink-0">
                          {cert.platform === 'microsoft' && (
                            <MicrosoftIcon className="w-5 h-5" />
                          )}
                          {cert.platform === 'aws' && (
                            <SiAmazonwebservices className="w-5 h-5 text-[#FF9900]" />
                          )}
                          {cert.platform === 'github' && (
                            <SiGithub className="w-5 h-5 text-foreground" />
                          )}
                        </div>
                        <p className="text-sm font-semibold text-foreground leading-tight">{cert.text}</p>
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