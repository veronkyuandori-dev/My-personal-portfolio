import { Card } from '@/components/ui/card';
import { Briefcase, Award } from 'lucide-react';
import AnimationWrapper from '@/components/AnimationWrapper';
import profileImage from '@assets/582753724_1129297252616841_7787531120170901253_n_1763775009180.jpg';

const experiences = [
  {
    year: '2025',
    role: 'Project Leader',
    title: 'Progressive Responsive Website (Vue.js Application)',
    description: 'Managed project repositories and version control using GitHub. Supervised collaboration, task assignments, and ensured smooth project progression from planning to deployment.',
  },
  {
    year: '2025–2026',
    role: 'Programmer (Capstone Thesis)',
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
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden border-4 border-primary/20 shadow-2xl shadow-primary/10">
                <img
                  src={profileImage}
                  alt="Professional"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-chart-2/20 rounded-3xl -z-10 blur-2xl" />
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
                    <Card className="p-4 border border-primary/20 bg-background/50 backdrop-blur-sm hover-elevate transition-all">
                      <div className="flex items-start gap-3">
                        <div className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap">
                          {exp.year}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-primary text-sm">{exp.role}</p>
                          <p className="font-heading font-bold text-foreground">{exp.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">{exp.description}</p>
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
              <div className="grid grid-cols-1 gap-3">
                {certifications.map((cert, index) => (
                  <AnimationWrapper key={index} type="slide" direction="up" delay={index * 100} duration={500}>
                    <Card className="p-3 border border-primary/20 bg-background/50 backdrop-blur-sm hover-elevate transition-all">
                      <p className="text-sm font-medium text-foreground">{cert}</p>
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