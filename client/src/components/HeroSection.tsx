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
        * { margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 850px; margin: 0 auto; padding: 40px; background: #fff; }
        .header { border-bottom: 3px solid #22C55E; padding-bottom: 20px; margin-bottom: 30px; }
        .header h1 { font-size: 32px; color: #1a1a1a; margin-bottom: 5px; }
        .header p { color: #666; font-size: 14px; }
        .contact-info { display: flex; gap: 20px; font-size: 13px; color: #666; flex-wrap: wrap; margin-top: 10px; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 16px; font-weight: 700; color: #22C55E; border-bottom: 2px solid #22C55E; padding-bottom: 8px; margin-bottom: 12px; }
        .entry { margin-bottom: 15px; }
        .entry-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 5px; }
        .entry-title { font-weight: 600; color: #1a1a1a; }
        .entry-subtitle { color: #666; font-size: 14px; }
        .entry-date { color: #22C55E; font-size: 13px; font-weight: 500; }
        .entry-description { color: #555; font-size: 14px; margin-top: 5px; line-height: 1.5; }
        .skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
        .skill-item { padding: 10px; background: #f8f8f8; border-left: 3px solid #22C55E; }
        .skill-category { font-weight: 600; color: #22C55E; font-size: 13px; margin-bottom: 5px; }
        .skill-list { font-size: 13px; color: #555; }
        .certifications-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        .cert-item { padding: 8px; background: #f8f8f8; border-left: 3px solid #22C55E; font-size: 13px; }
        .cert-name { font-weight: 600; color: #1a1a1a; }
        .cert-org { color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Veronque Andrie</h1>
            <p>Junior Developer | Software Engineer | Mechatronics & Robotics Enthusiast</p>
            <div class="contact-info">
                <span>📧 Email: veronqueandrie@email.com</span>
                <span>📱 Phone: +63 (XXX) XXX-XXXX</span>
                <span>📍 Location: Philippines</span>
                <span>💼 <a href="#">GitHub</a> | <a href="#">LinkedIn</a></span>
            </div>
        </div>

        <div class="section">
            <div class="section-title">PROFESSIONAL SUMMARY</div>
            <p class="entry-description">Passionate and driven junior developer specializing in web development, mobile applications, and modern software architecture. Active member of Junior Mechatronics and Robotics Society of the Philippines (JMRSP). AWS Educate Member and GitHub Student Developer with strong foundation in full-stack development and emerging technologies.</p>
        </div>

        <div class="section">
            <div class="section-title">EDUCATION</div>
            <div class="entry">
                <div class="entry-header">
                    <div>
                        <div class="entry-title">Bachelor of Science in [Your Program]</div>
                        <div class="entry-subtitle">[Your University Name]</div>
                    </div>
                    <div class="entry-date">2024 - Present</div>
                </div>
            </div>
            <div class="entry">
                <div class="entry-header">
                    <div>
                        <div class="entry-title">JMRSP Student Chapter - PnC Member</div>
                        <div class="entry-subtitle">Junior Mechatronics and Robotics Society of the Philippines</div>
                    </div>
                    <div class="entry-date">A.Y. 2025-2026</div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">EXPERIENCE</div>
            <div class="entry">
                <div class="entry-header">
                    <div>
                        <div class="entry-title">AWS Educate Member</div>
                        <div class="entry-subtitle">Amazon Web Services</div>
                    </div>
                    <div class="entry-date">2024 - Present</div>
                </div>
                <div class="entry-description">• Access to AWS cloud services and educational resources • Hands-on experience with cloud infrastructure</div>
            </div>
            <div class="entry">
                <div class="entry-header">
                    <div>
                        <div class="entry-title">GitHub Student Developer</div>
                        <div class="entry-subtitle">GitHub Education</div>
                    </div>
                    <div class="entry-date">2024 - Present</div>
                </div>
                <div class="entry-description">• Developer pack benefits and premium tools • Contributing to open-source projects</div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">TECHNICAL SKILLS</div>
            <div class="skills-grid">
                <div class="skill-item">
                    <div class="skill-category">FRONTEND</div>
                    <div class="skill-list">React, TypeScript, Tailwind CSS, HTML5, CSS3, JavaScript</div>
                </div>
                <div class="skill-item">
                    <div class="skill-category">BACKEND</div>
                    <div class="skill-list">Node.js, Express, PostgreSQL, REST APIs, Full-Stack</div>
                </div>
                <div class="skill-item">
                    <div class="skill-category">TOOLS & PLATFORMS</div>
                    <div class="skill-list">Git, GitHub, AWS, Docker, VS Code, Figma</div>
                </div>
                <div class="skill-item">
                    <div class="skill-category">LANGUAGES</div>
                    <div class="skill-list">JavaScript, TypeScript, Python, SQL</div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">CERTIFICATIONS</div>
            <div class="certifications-list">
                <div class="cert-item">
                    <div class="cert-name">Google Cloud Associate Cloud Engineer</div>
                    <div class="cert-org">Google Cloud</div>
                </div>
                <div class="cert-item">
                    <div class="cert-name">AWS Certified Cloud Practitioner</div>
                    <div class="cert-org">Amazon Web Services</div>
                </div>
                <div class="cert-item">
                    <div class="cert-name">Microsoft Azure Fundamentals</div>
                    <div class="cert-org">Microsoft</div>
                </div>
                <div class="cert-item">
                    <div class="cert-name">Cisco CCNA Routing & Switching</div>
                    <div class="cert-org">Cisco</div>
                </div>
            </div>
        </div>

        <div class="section">
            <div class="section-title">PROJECTS</div>
            <div class="entry">
                <div class="entry-title">Professional Portfolio Website</div>
                <div class="entry-description">A futuristic cybersecurity-themed portfolio showcasing technical skills, projects, and achievements with animated components and responsive design.</div>
            </div>
            <div class="entry">
                <div class="entry-title">Full-Stack Web Applications</div>
                <div class="entry-description">Developed multiple web applications using modern tech stack including React, Node.js, and PostgreSQL with focus on user experience and performance.</div>
            </div>
        </div>

        <div class="section" style="margin-bottom: 0; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999;">
            <p>Last updated: December 2025 | For more details, visit: [Your Portfolio URL]</p>
        </div>
    </div>
</body>
</html>
    `;

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
