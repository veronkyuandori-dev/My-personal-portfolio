import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

// todo: remove mock functionality
const certifications = [
  {
    name: 'AWS Certified Solutions Architect',
    organization: 'Amazon Web Services',
    date: 'Jan 2024',
    credentialId: 'AWS-SA-2024-001',
    link: '#',
  },
  {
    name: 'Professional Scrum Master I',
    organization: 'Scrum.org',
    date: 'Nov 2023',
    credentialId: 'PSM-001-2023',
    link: '#',
  },
  {
    name: 'Meta Front-End Developer',
    organization: 'Meta',
    date: 'Sep 2023',
    credentialId: 'META-FE-2023-456',
    link: '#',
  },
  {
    name: 'Google UX Design Certificate',
    organization: 'Google',
    date: 'Jul 2023',
    credentialId: 'GOOG-UX-2023-789',
    link: '#',
  },
  {
    name: 'MongoDB Certified Developer',
    organization: 'MongoDB University',
    date: 'May 2023',
    credentialId: 'MONGO-DEV-2023-321',
    link: '#',
  },
  {
    name: 'Docker Certified Associate',
    organization: 'Docker',
    date: 'Mar 2023',
    credentialId: 'DCA-2023-654',
    link: '#',
  },
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="relative py-20 md:py-32 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-center mb-4">
          Certifications
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Professional credentials and achievements
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <Card
              key={index}
              className="hover-elevate transition-all duration-300"
              data-testid={`certification-card-${index}`}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-md bg-primary/10 shrink-0">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 leading-tight">
                      {cert.name}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {cert.date}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Issued by
                  </p>
                  <p className="text-sm font-semibold">{cert.organization}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Credential ID
                  </p>
                  <p className="text-xs font-mono">{cert.credentialId}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 hover-elevate active-elevate-2"
                  data-testid={`button-verify-${index}`}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Verify Credential
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
