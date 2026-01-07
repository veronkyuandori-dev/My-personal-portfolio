import { ArrowDown, Mail, Github, Linkedin, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import AnimationWrapper from '@/components/AnimationWrapper';
import profileImage from '@assets/582753724_1129297252616841_7787531120170901253_n_1763775009180.jpg';

export default function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadCV = () => {
    // Create a professional resume/CV in HTML format
    const cvContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Veronque Andrie - CV</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', -apple-system, sans-serif; line-height: 1.5; color: #1a1a1a; background: #f4f4f4; padding: 40px 20px; }
        .container { max-width: 800px; margin: 0 auto; background: #fff; padding: 50px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 8px; }
        .header { border-bottom: 2px solid #22C55E; padding-bottom: 20px; margin-bottom: 30px; }
        .header h1 { font-size: 32px; font-weight: 800; color: #111; margin-bottom: 8px; letter-spacing: -0.02em; }
        .header p { color: #22C55E; font-size: 16px; font-weight: 600; margin-bottom: 12px; }
        .contact-info { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; font-size: 13px; color: #4b5563; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 14px; font-weight: 800; color: #22C55E; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 16px; }
        .experience-item { margin-bottom: 20px; }
        .item-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
        .item-title { font-size: 16px; font-weight: 700; color: #111; }
        .item-org { font-size: 14px; font-weight: 600; color: #4b5563; }
        .item-date { font-size: 13px; color: #6b7280; font-weight: 500; }
        .item-desc { font-size: 13px; color: #374151; margin-top: 6px; line-height: 1.6; }
        .skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .skill-cat { font-size: 13px; font-weight: 700; color: #111; margin-bottom: 6px; text-transform: uppercase; }
        .skill-list { font-size: 13px; color: #4b5563; }
        .project-item { margin-bottom: 15px; }
        .project-title { font-size: 14px; font-weight: 700; color: #111; }
        .project-desc { font-size: 13px; color: #4b5563; margin-top: 2px; }
        @media print {
            body { background: none; padding: 0; }
            .container { box-shadow: none; max-width: 100%; padding: 0; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Veronque Andrie</h1>
            <p>Software Engineer | Mechatronics & Robotics Enthusiast</p>
            <div class="contact-info">
                <span>📧 veronqueandrie@email.com</span>
                <span>📍 Philippines</span>
                <span>🌐 GitHub: bukosalad123</span>
                <span>💼 LinkedIn: veronqueandrei</span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Professional Experience (2025)</div>
            
            <div class="experience-item">
                <div class="item-header">
                    <span class="item-title">Project Leader</span>
                    <span class="item-date">2025</span>
                </div>
                <div class="item-org">Progressive Responsive Website (Vue.js Application)</div>
                <div class="item-desc">Managed project repositories and version control using GitHub. Supervised collaboration, task assignments, and ensured smooth project progression from planning to deployment.</div>
            </div>

            <div class="experience-item">
                <div class="item-header">
                    <span class="item-title">Programmer (Capstone Thesis)</span>
                    <span class="item-date">2025–2026</span>
                </div>
                <div class="item-org">IoT-Enabled Smart Agriculture and Real-Time Monitoring</div>
                <div class="item-desc">Contributed to design and implementation of IoT-based systems for environmental monitoring. Developed and maintained application modules ensuring reliability, scalability, and performance.</div>
            </div>

            <div class="experience-item">
                <div class="item-header">
                    <span class="item-title">Web Designer</span>
                    <span class="item-date">Mid 2025</span>
                </div>
                <div class="item-org">Simate Web Application (Filipino Web Development Peers)</div>
                <div class="item-desc">Designed responsive, user-focused websites and collaborated with Filipino professionals on the Simate Web Application project.</div>
            </div>

            <div class="experience-item">
                <div class="item-header">
                    <span class="item-title">Project Leader</span>
                    <span class="item-date">December 8, 2025</span>
                </div>
                <div class="item-org">Unicast Event Planning Management System</div>
                <div class="item-desc">Led development and successful presentation with features for intelligent scheduling, smart recommendations, and automated event optimization.</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Technical Skills</div>
            <div class="skills-grid">
                <div>
                    <div class="skill-cat">Programming Languages</div>
                    <div class="skill-list">Dart, HTML5, C++, Python, Java, JavaScript, TypeScript</div>
                </div>
                <div>
                    <div class="skill-cat">Databases & Tools</div>
                    <div class="skill-list">PostgreSQL, MongoDB, Figma, Git, GitHub, GitLab</div>
                </div>
                <div>
                    <div class="skill-cat">Featured Languages (GitHub)</div>
                    <div class="skill-list">JavaScript (8), Node.js (7), TypeScript (6), React (5), Python (4)</div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">Training & Certifications</div>
            <div class="item-desc">• Microsoft Trainee - Cloud computing & productivity tools</div>
            <div class="item-desc">• AWS Skill Builder Trainee - Cloud architecture & services</div>
            <div class="item-desc">• AWS Educate Member - EC2, S3, IAM, serverless architecture</div>
            <div class="item-desc">• GitHub Student Developer Pack - Real-world deployment experience</div>
            <div class="item-desc">• JMRSP – PnC Student Chapter Member (A.Y. 2025–2026)</div>
        </div>

        <div class="section">
            <div class="section-title">Featured Projects</div>
            <div class="project-item">
                <div class="project-title">Webtracker</div>
                <div class="project-desc">Analytics application using Python, PostgreSQL, and HTML5.</div>
            </div>
            <div class="project-item">
                <div class="project-title">Buddydash</div>
                <div class="project-desc">Educational platform built with Dart, Java, and MongoDB.</div>
            </div>
            <div class="project-item">
                <div class="project-title">Library Management System</div>
                <div class="project-desc">Python-based solution for inventory and member records.</div>
            </div>
            <div class="project-item">
                <div class="project-title">AI Facial Recognition</div>
                <div class="project-desc">Secure identification system using Python, C++, and MongoDB.</div>
            </div>
        </div>
    </div>
</body>
</html>`;

    // Create blob and download
    const blob = new Blob([cvContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Veronque-Andrie-CV.html';
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
          Passionate about creating innovative solutions through code. Specializing in web development,
          mobile applications, and modern software architecture.
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
          <Button
            size="lg"
            variant="secondary"
            onClick={downloadCV}
            className="rounded-full hover-elevate active-elevate-2 gap-2 border border-primary/40 bg-primary/10 hover:bg-primary/20 text-primary"
            data-testid="button-download-cv"
          >
            <Download className="h-5 w-5" />
            Download CV
          </Button>
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
