import { ArrowDown, Mail, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import profileImage from '@assets/550406489_1129151318612807_3393823521163537089_n (1)_1761671062313.jpg';

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
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-20 text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Avatar className="w-48 h-48 md:w-64 md:h-64 border-4 border-primary/30 shadow-xl shadow-primary/20">
              <AvatarImage src={profileImage} alt="Profile" />
              <AvatarFallback className="text-6xl">VA</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-chart-2/20 animate-pulse" />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-700">
          Veronque Andrie
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          Aspiring Engineer
        </p>

        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          Passionate about creating innovative solutions through code. Specializing in web development,
          mobile applications, and modern software architecture.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <Button
            size="lg"
            onClick={() => scrollToSection('#portfolio')}
            className="rounded-full hover-elevate active-elevate-2"
            data-testid="button-view-work"
          >
            View My Work
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection('#contact')}
            className="rounded-full backdrop-blur-md hover-elevate active-elevate-2"
            data-testid="button-contact"
          >
            Contact Me
          </Button>
        </div>

        <div className="flex items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
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
