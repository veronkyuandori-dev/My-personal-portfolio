import { ArrowDown, Mail, Github, Linkedin, Download, Cpu, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AnimationWrapper from '@/components/AnimationWrapper';
import profileImage from '@assets/582753724_1129297252616841_7787531120170901253_n_1763775009180.jpg';

export default function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getCVStyles = () => `
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', -apple-system, sans-serif; line-height: 1.5; color: #1a1a1a; background: #0a0a0a; padding: 40px 20px; }
        .container { max-width: 800px; margin: 0 auto; background: #fff; padding: 50px; border-radius: 12px; position: relative; overflow: hidden; }
        .cyber-border { position: absolute; top: 0; left: 0; right: 0; height: 6px; background: linear-gradient(90deg, #22C55E, #3B82F6); }
        .header { border-bottom: 2px solid #e5e7eb; padding-bottom: 25px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: start; }
        .header-info h1 { font-size: 36px; font-weight: 900; color: #111; margin-bottom: 4px; letter-spacing: -0.03em; text-transform: uppercase; }
        .header-info p { color: #22C55E; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
        .contact-info { margin-top: 15px; font-size: 13px; color: #4b5563; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .section { margin-bottom: 35px; }
        .section-title { font-size: 14px; font-weight: 900; color: #22C55E; text-transform: uppercase; letter-spacing: 0.15em; display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        .section-title::after { content: ""; flex: 1; height: 1px; background: #e5e7eb; }
        .experience-item { margin-bottom: 25px; position: relative; padding-left: 20px; }
        .experience-item::before { content: ""; position: absolute; left: 0; top: 5px; bottom: 5px; width: 2px; background: #22C55E; opacity: 0.3; }
        .item-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px; }
        .item-title { font-size: 17px; font-weight: 800; color: #111; }
        .item-org { font-size: 14px; font-weight: 700; color: #22C55E; }
        .item-date { font-size: 12px; color: #6b7280; font-weight: 600; background: #f3f4f6; padding: 2px 8px; rounded: 4px; }
        .item-desc { font-size: 13.5px; color: #374151; margin-top: 8px; line-height: 1.6; font-weight: 500; }
        .skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 25px; }
        .skill-cat { font-size: 12px; font-weight: 900; color: #111; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.05em; }
        .skill-list { font-size: 13px; color: #4b5563; line-height: 1.8; }
        .skill-tag { display: inline-block; background: #f3f4f6; padding: 2px 10px; margin: 0 4px 4px 0; border-radius: 4px; border: 1px solid #e5e7eb; }
        @media print {
            body { background: none; padding: 0; }
            .container { box-shadow: none; border-radius: 0; padding: 0; }
        }
    </style>
  `;

  const downloadCV = (type: 'software' | 'hardware') => {
    const isHardware = type === 'hardware';
    const cvContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Veronque Andrie - ${isHardware ? 'Hardware & Robotics' : 'Software Engineering'} CV</title>
    ${getCVStyles()}
</head>
<body>
    <div class="container">
        <div class="cyber-border"></div>
        <div class="header">
            <div class="header-info">
                <h1>Veronque Andrie</h1>
                <p>${isHardware ? 'Aspiring Mechatronics & Robotics Engineer' : 'Aspiring Software Engineer'}</p>
                <div class="contact-info">
                    <span>📧 veronqueandrie@email.com</span>
                    <span>📍 Philippines</span>
                    <span>🌐 GitHub: bukosalad123</span>
                    <span>💼 LinkedIn: veronqueandrei</span>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">${isHardware ? 'Academic & Personal Projects' : 'Software Development Projects'}</div>
            
            ${isHardware ? `
            <div class="experience-item">
                <div class="item-header">
                    <span class="item-title">Programmer (Undergraduate Thesis)</span>
                    <span class="item-date">2025–2026 (In Progress)</span>
                </div>
                <div class="item-org">IoT-Enabled Smart Agriculture & Monitoring</div>
                <div class="item-desc">Designing and implementing embedded systems for real-time environmental monitoring. Working with sensors, microcontrollers, and wireless communication protocols for precision agriculture.</div>
            </div>
            <div class="experience-item">
                <div class="item-header">
                    <span class="item-title">AI Facial Recognition Developer</span>
                    <span class="item-date">2025</span>
                </div>
                <div class="item-org">Academic Project</div>
                <div class="item-desc">Optimizing computer vision algorithms for hardware deployment. Integrated Python/C++ logic with secure authentication modules.</div>
            </div>
            ` : `
            <div class="experience-item">
                <div class="item-header">
                    <span class="item-title">Project Leader</span>
                    <span class="item-date">2025</span>
                </div>
                <div class="item-org">Progressive Vue.js Application (Academic Project)</div>
                <div class="item-desc">Full-cycle development from architecture to deployment. Implemented responsive frontend logic and secure state management systems.</div>
            </div>
            <div class="experience-item">
                <div class="item-header">
                    <span class="item-title">Lead Developer</span>
                    <span class="item-date">Dec 2025</span>
                </div>
                <div class="item-org">Unicast Event Management System</div>
                <div class="item-desc">Built intelligent scheduling algorithms and automated optimization features using modern web technologies. Focus on high-performance API design.</div>
            </div>
            `}
        </div>

        <div class="section">
            <div class="section-title">Technical Expertise</div>
            <div class="skills-grid">
                <div>
                    <div class="skill-cat">${isHardware ? 'Hardware & Control' : 'Web & Mobile'}</div>
                    <div class="skill-list">
                        ${isHardware ? 
                          'C++, Python, Arduino, Raspberry Pi, Sensors, Robotics Design, Control Systems' : 
                          'React, Vue.js, Node.js, TypeScript, Dart, Flutter, Tailwind CSS'}
                    </div>
                </div>
                <div>
                    <div class="skill-cat">Infrastructure & Tools</div>
                    <div class="skill-list">
                        ${isHardware ? 
                          'Figma (CAD), AWS IoT, Git, MongoDB, PostgreSQL, System Integration' : 
                          'PostgreSQL, MongoDB, AWS, Git, CI/CD, Figma, REST APIs'}
                    </div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Professional Affiliations</div>
            <div class="item-desc" style="font-weight: 700; color: #111;">
                • Member, Junior Mechatronics and Robotics Society of the Philippines (JMRSP) — A.Y. 2025–2026
            </div>
            <div class="item-desc">• Microsoft Trainee (Cloud) • AWS Educate Member • GitHub Student Developer</div>
        </div>
    </div>
</body>
</html>`;

    const blob = new Blob([cvContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Veronque-Andrie-${isHardware ? 'Hardware' : 'Software'}-CV.html`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      
      {/* Radial Pulse Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-radial-pulse" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-20 text-center">
        <AnimationWrapper type="zoom" duration={1000}>
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-chart-2 to-primary opacity-75 blur-2xl scale-125 animate-pulse" />
            <Avatar className="w-56 h-56 md:w-72 md:h-72 border-4 border-primary/70 shadow-2xl shadow-primary/60 relative z-10 animate-glow-pulse">
              <AvatarImage src={profileImage} alt="Profile" />
              <AvatarFallback className="text-6xl">VA</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/30 to-chart-2/30 animate-pulse z-0" />
          </div>
        </div>
        </AnimationWrapper>

        <AnimationWrapper type="slide" direction="up" delay={200} duration={900}>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
          Veronque Andrie
        </h1>
        </AnimationWrapper>

        <AnimationWrapper type="blur-fade" delay={400} duration={800}>
        <div className="text-lg md:text-xl text-foreground/80 mb-8 space-y-1.5 max-w-2xl mx-auto">
          <p>Junior Mechatronics and Robotics Society of the Philippines</p>
          <p className="text-sm md:text-base text-foreground/70">(JMRSP – PnC Student Chapter) • Member — A.Y. 2025–2026</p>
          <p className="text-sm md:text-base text-foreground/70">AWS Educate Member • GitHub Student Developer</p>
        </div>
        </AnimationWrapper>

        <AnimationWrapper type="fade" delay={600} duration={800}>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          Aspiring engineer passionate about creating innovative solutions through code. 
          Specializing in web development, robotics, and modern software architecture.
        </p>
        </AnimationWrapper>

        <AnimationWrapper type="scale-up" delay={800} duration={700}>
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Button
            size="lg"
            onClick={() => scrollToSection('#projects')}
            className="rounded-full hover-elevate active-elevate-2 gap-2"
            data-testid="button-view-work"
          >
            View My Work
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection('#contact')}
            className="rounded-full backdrop-blur-md hover-elevate active-elevate-2 gap-2"
            data-testid="button-contact"
          >
            Contact Me
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full hover-elevate active-elevate-2 gap-2 border border-primary/40 bg-primary/10 hover:bg-primary/20 text-primary"
                data-testid="button-download-cv-dropdown"
              >
                <Download className="h-5 w-5" />
                Download CV
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-md border-primary/20 rounded-xl">
              <DropdownMenuItem 
                onClick={() => downloadCV('software')}
                className="gap-2 cursor-pointer focus:bg-primary/10 focus:text-primary py-3"
              >
                <Code className="h-4 w-4" />
                <span>Software Focused</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => downloadCV('hardware')}
                className="gap-2 cursor-pointer focus:bg-primary/10 focus:text-primary py-3"
              >
                <Cpu className="h-4 w-4" />
                <span>Hardware & Robotics</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        </AnimationWrapper>

        <AnimationWrapper type="ripple" delay={1000} duration={600}>
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover-elevate active-elevate-2"
            data-testid="link-github"
          >
            <Github className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover-elevate active-elevate-2"
            data-testid="link-linkedin"
          >
            <Linkedin className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover-elevate active-elevate-2"
            data-testid="link-email"
          >
            <Mail className="h-5 w-5" />
          </Button>
        </div>
        </AnimationWrapper>

        <button
          onClick={() => scrollToSection('#about')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          data-testid="button-scroll-down"
        >
          <ArrowDown className="h-8 w-8 text-primary" />
        </button>
      </div>
    </section>
  );
}
