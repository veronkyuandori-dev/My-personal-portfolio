import { Card } from '@/components/ui/card';
import { Briefcase, Award } from 'lucide-react';
import AnimationWrapper from '@/components/AnimationWrapper';
import profileImage from '@assets/582753724_1129297252616841_7787531120170901253_n_1763775009180.jpg';

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
  'Microsoft Trainee - Cloud computing & productivity tools',
  'AWS Skill Builder Trainee - Cloud architecture & services',
  'AWS Educate Member - EC2, S3, IAM, serverless architecture',
  'GitHub Student Developer Pack - Real-world deployment experience',
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-center mb-4">
          About Me
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Passionate developer with experience in full-stack development, IoT systems, and cloud technologies
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <AnimationWrapper type="fade" direction="up">
            <div className="relative max-w-md mx-auto">
              <div className="aspect-square rounded-[2rem] overflow-hidden border-8 border-primary/20 shadow-2xl shadow-primary/20 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <img
                  src={profileImage}
                  alt="Professional"
                  className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-700"
                />
              </div>
              <div className="absolute -inset-6 bg-gradient-to-tr from-primary/30 to-chart-2/30 rounded-[3rem] -z-10 blur-3xl opacity-50 animate-pulse" />
              <div className="absolute -bottom-6 -right-6 bg-card border-4 border-primary/30 p-4 rounded-2xl shadow-xl hidden md:block">
                <p className="text-primary font-extrabold text-2xl">JMRSP</p>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Member 2025</p>
              </div>
            </div>
          </AnimationWrapper>

          <div className="space-y-8">
            {/* Experience Section */}
            <div>
              <h3 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-primary" />
                Professional Experience
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
                  <AnimationWrapper key={index} type="slide" direction="up" delay={index * 100} duration={500}>
                    <Card className="p-4 border border-primary/20 bg-background/50 backdrop-blur-sm hover-elevate active-elevate-2 transition-all flex items-center gap-3 overflow-visible">
                      <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                      <p className="text-sm font-semibold text-foreground leading-tight">{cert}</p>
                    </Card>
                  </AnimationWrapper>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}