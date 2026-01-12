import { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'GitHub', href: '#github' },
  { label: 'Blog', href: '#blog' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-3 bg-background/80 backdrop-blur-xl border-b border-primary/10 shadow-lg shadow-primary/5' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => scrollToSection('#home')}
        >
          <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-all duration-300">
            <Shield className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
          </div>
          <span className="font-heading font-extrabold text-xl tracking-tighter bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
            VERONQUE
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1 bg-muted/20 p-1.5 rounded-full border border-border/40 backdrop-blur-md shadow-inner">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection(item.href)}
              className={`rounded-full px-5 font-bold transition-all duration-300 relative overflow-visible ${
                activeSection === item.href.substring(1)
                  ? 'text-primary'
                  : 'text-foreground/70 hover:text-primary'
              }`}
            >
              <span className="relative z-10">{item.label}</span>
              {activeSection === item.href.substring(1) && (
                <div className="absolute inset-0 bg-primary/10 rounded-full border border-primary/20 shadow-[0_0_10px_rgba(34,197,94,0.15)] animate-pulse" />
              )}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-full hover:bg-primary/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          <Button 
            className="hidden sm:flex rounded-full px-6 font-extrabold hover-elevate active-elevate-2 shadow-lg shadow-primary/20 border border-primary/20"
            onClick={() => scrollToSection('#contact')}
          >
            Hire Me
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-2xl border-b border-primary/10 transition-all duration-500 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen opacity-100 py-6' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div className="flex flex-col gap-2 px-4">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className={`w-full justify-start rounded-xl text-lg font-bold ${
                activeSection === item.href.substring(1) ? 'text-primary bg-primary/10' : ''
              }`}
              onClick={() => scrollToSection(item.href)}
            >
              {item.label}
            </Button>
          ))}
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/40 px-2">
            <span className="font-bold text-muted-foreground">Appearance</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
