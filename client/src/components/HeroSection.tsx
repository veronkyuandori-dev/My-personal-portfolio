import { ArrowDown, Mail, Github, Linkedin } from 'lucide-react';
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
