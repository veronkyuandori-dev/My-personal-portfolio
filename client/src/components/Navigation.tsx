import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { label: 'Home', href: 'home' },
  { label: 'About', href: 'about' },
  { label: 'Projects', href: 'projects' },
  { label: 'Achievements', href: 'achievements' },
  { label: 'GitHub', href: 'github' },
  { label: 'Skills', href: 'skills' },
  { label: 'Certs', href: 'certifications' },
  { label: 'Contact', href: 'contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const current = navItems.find(item => {
        const el = document.getElementById(item.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current.href);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="flex items-center gap-2 group"
        >
          <span className="font-mono text-xs text-primary font-bold">{'<'}</span>
          <span className="font-heading font-black text-lg tracking-tighter text-foreground group-hover:text-primary transition-colors">VA</span>
          <span className="font-mono text-xs text-primary font-bold">{'/>'}</span>
        </button>

        {/* Desktop nav — underline style */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className={`relative text-sm font-semibold tracking-wide transition-colors duration-200 pb-0.5 ${
                activeSection === item.href
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
              {activeSection === item.href && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-primary animate-nav-indicator origin-left" />
              )}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <Button
            size="sm"
            className="hidden sm:flex rounded-md px-5 font-bold"
            onClick={() => scrollTo('contact')}
          >
            Hire Me
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden border-b border-border/50 bg-background/95 backdrop-blur-xl transition-all duration-400 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className={`text-left px-3 py-2.5 rounded-md text-sm font-semibold transition-all ${
                activeSection === item.href
                  ? 'text-primary bg-primary/5'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/40 px-1">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
