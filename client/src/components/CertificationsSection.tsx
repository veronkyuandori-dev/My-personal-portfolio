import { useState } from 'react';
import { Award } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import CoverflowCarousel, { CoverflowItem } from './CoverflowCarousel';

import awsMLAICert from '@assets/Screenshot_2026-03-02_09.35.56_1772415368173.png';
import awsCloudPractitionerCert from '@assets/Screenshot_2026-03-02_09.17.30_1772414264829.png';
import msAzureAICert from '@assets/Screenshot_2026-01-29_21.23.02_1769697681578.png';
import msSRECert from '@assets/Screenshot_2026-01-29_22.14.13_1769697681567.png';
import aseanCert from '@assets/Screenshot_2026-01-29_22.39.10_1769697681529.png';
import aiGameDevCert from '@assets/Screenshot_2026-01-29_22.10.08_1769697681573.png';
import googleCloudCert from '@assets/Screenshot_2026-01-29_22.34.37_1769697681542.png';
import hourOfCodeCert from '@assets/Screenshot_2026-01-29_22.38.38_1769697681539.png';
import msDataAnalysisCert from '@assets/Screenshot_2026-01-29_23.49.50_1769701859675.png';
import gcMLOpsCert from '@assets/Screenshot_2026-01-29_22.33.55_1769697681552.png';
import gcResponsibleAICert from '@assets/Screenshot_2026-01-29_22.34.15_1769697681550.png';
import wvsuBlockchainCert from '@assets/Screenshot_2026-01-29_22.20.52_1769697681563.png';
import wvsuDigitalTwinsCert from '@assets/Screenshot_2026-01-29_22.13.23_1769697681568.png';
import ciscoAIAtWorkCert from '@assets/Screenshot_2026-01-29_22.22.02_1769697681559.png';
import ciscoCppEssentialsCert from '@assets/Screenshot_2026-01-29_22.22.53_1769697681557.png';
import ghActionsCert from '@assets/Screenshot_2026-02-14_16.35.08_1771058417077.png';

const certifications = [
  { name: 'Fundamentals of Machine Learning and AI', organization: 'AWS Training & Certification', date: 'March 02, 2026', description: 'Advanced certification covering core principles of machine learning and AI on the AWS platform.', image: awsMLAICert },
  { name: 'AWS Certified Cloud Practitioner (CLF-C02)', organization: 'AWS Training & Certification', date: 'November 02, 2025', description: 'Comprehensive review of AWS Cloud fundamentals, security, compliance, and core services.', image: awsCloudPractitionerCert },
  { name: 'Plan and Prepare to Develop AI Solutions on Azure', organization: 'Microsoft', date: 'September 16, 2025', description: 'Completed Microsoft certification on planning and developing AI solutions using Azure cloud platform.', image: msAzureAICert },
  { name: 'Introduction to Site Reliability Engineering', organization: 'Microsoft', date: 'October 4, 2025', description: 'Training on Site Reliability Engineering principles for building reliable systems.', image: msSRECert },
  { name: 'AI Class ASEAN', organization: 'ASEAN Foundation & Google.org', date: 'October 15, 2025', description: 'Completed 12-hour AI learning modules building future-ready skills in artificial intelligence.', image: aseanCert },
  { name: 'Beyond the Black Box: Explainable AI in Game Dev', organization: 'West Visayas State University', date: 'October 24, 2025', description: 'Webinar on explainable AI applications in game development.', image: aiGameDevCert },
  { name: 'Google Cloud Computing Foundations', organization: 'Google Cloud', date: '2025', description: 'Mastered cloud computing fundamentals on Google Cloud Platform.', image: googleCloudCert },
  { name: 'The Hour of Code', organization: 'Code.org', date: '2025', description: 'Completed Hour of Code challenge demonstrating understanding of basic computer science.', image: hourOfCodeCert },
  { name: 'Discover Data Analysis', organization: 'Microsoft', date: 'September 16, 2025', description: 'Microsoft training on data analysis fundamentals and techniques.', image: msDataAnalysisCert },
  { name: 'MLOps for Generative AI', organization: 'Google Cloud', date: 'November 24, 2025', description: 'Advanced training on implementing MLOps practices for generative AI systems.', image: gcMLOpsCert },
  { name: 'Introduction to Responsible AI', organization: 'Google Cloud', date: 'November 24, 2025', description: 'Understanding of ethical AI principles and responsible AI practices.', image: gcResponsibleAICert },
  { name: "Beginner's Journey into Blockchain & Crypto", organization: 'West Visayas State University', date: 'November 14, 2025', description: 'Webinar on blockchain fundamentals and cryptocurrency concepts at WVSU.', image: wvsuBlockchainCert },
  { name: 'Digital Twins: Modeling Reality for Smarter Systems', organization: 'West Visayas State University', date: 'November 15, 2025', description: 'Webinar on digital twin technology for intelligent systems.', image: wvsuDigitalTwinsCert },
  { name: 'AI at Work: Analyze Customer Reviews', organization: 'Cisco Networking Academy', date: 'September 9, 2025', description: 'Training on AI applications for analyzing customer reviews.', image: ciscoAIAtWorkCert },
  { name: 'C++ Essentials 1', organization: 'Cisco Networking Academy', date: 'September 16, 2025', description: 'C++ programming essentials through Cisco Networking Academy.', image: ciscoCppEssentialsCert },
  { name: 'GitHub Actions', organization: 'GitHub', date: 'February 14, 2026', description: 'Certification in automating workflows using GitHub Actions CI/CD platform.', image: ghActionsCert },
];

export default function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);

  const carouselItems: CoverflowItem[] = certifications.map((c) => ({
    image: c.image,
    title: c.name,
    subtitle: c.organization,
    badge: c.date,
  }));

  const cert = selectedCert !== null ? certifications[selectedCert] : null;

  return (
    <section id="certifications" className="relative py-20 md:py-32 bg-card/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-center mb-4 animate-section-rise">
          Certifications
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Drag or tap to explore — click the center card to view full certificate
        </p>

        <CoverflowCarousel
          items={carouselItems}
          onSelect={setSelectedCert}
          cardWidth={420}
          cardHeight={560}
          imageFit="contain"
          autoPlayInterval={3200}
        />
      </div>

      {/* Detail Dialog */}
      <Dialog open={selectedCert !== null} onOpenChange={() => setSelectedCert(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {cert && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-heading pr-8 flex items-start gap-3">
                  <Award className="h-6 w-6 text-primary mt-1 shrink-0" />
                  {cert.name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="rounded-xl overflow-hidden border border-border">
                  <img src={cert.image} alt={cert.name} className="w-full h-auto" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Issued by</p>
                    <p className="text-lg font-semibold">{cert.organization}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Date Completed</p>
                    <p className="text-base">{cert.date}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">About this Certification</p>
                  <p className="text-base leading-relaxed">{cert.description}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
