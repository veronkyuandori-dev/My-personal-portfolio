import { Card } from '@/components/ui/card';
import { Code, Briefcase, Award, Zap } from 'lucide-react';
import profileImage from '@assets/550406489_1129151318612807_3393823521163537089_n (1)_1761671062313.jpg';

const stats = [
  { icon: Briefcase, label: 'Years Experience', value: '3+' },
  { icon: Code, label: 'Projects Completed', value: '25+' },
  { icon: Award, label: 'Certifications', value: '8' },
  { icon: Zap, label: 'Technologies', value: '15+' },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-center mb-4">
          About Me
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Get to know more about my background and expertise
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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

          <div className="space-y-6">
            <p className="text-base md:text-lg leading-relaxed text-foreground">
              I'm a passionate software engineer with a strong foundation in computer science and a
              drive to create innovative digital solutions. My journey in technology began with a
              curiosity about how things work and evolved into a career dedicated to building
              meaningful applications.
            </p>

            <p className="text-base md:text-lg leading-relaxed text-foreground">
              With expertise spanning frontend and backend development, I specialize in creating
              responsive web applications, mobile solutions, and scalable architectures. I'm
              constantly learning and adapting to new technologies to stay at the forefront of the
              industry.
            </p>

            <p className="text-base md:text-lg leading-relaxed text-foreground">
              When I'm not coding, I enjoy contributing to open-source projects, mentoring aspiring
              developers, and exploring the latest trends in artificial intelligence and cloud
              computing.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-8">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="p-6 text-center hover-elevate transition-all duration-300"
                  data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
