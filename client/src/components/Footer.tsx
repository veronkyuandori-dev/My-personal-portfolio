import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-heading font-bold mb-4 bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Portfolio
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Passionate about creating innovative solutions through code and design.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Quick Links</h3>
            <div className="space-y-2">
              {['Home', 'About', 'Projects', 'Skills', 'Certifications', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(`#${item.toLowerCase()}`)}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                  data-testid={`footer-link-${item.toLowerCase()}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Connect</h3>
            <div className="flex gap-3 mb-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover-elevate active-elevate-2"
                data-testid="footer-social-github"
                asChild
              >
                <a href="https://github.com/andrieVerdev" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover-elevate active-elevate-2"
                data-testid="footer-social-linkedin"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover-elevate active-elevate-2"
                data-testid="footer-social-twitter"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover-elevate active-elevate-2"
                data-testid="footer-social-email"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              contact@example.com
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
