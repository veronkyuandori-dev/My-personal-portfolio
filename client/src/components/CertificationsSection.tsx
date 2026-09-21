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
import msAzureFundamentalsCert from '@assets/image_1779899343958.png';
import tesdaICSCert from '@assets/Screenshot_2026-06-28_7.11.31_PM_1782649386262.png';
import readInTheCloudCert from '@assets/IMG_20260921_074545_1790003613861.png';

const certifications = [
  { name: 'Microsoft Certified: Azure Fundamentals', organization: 'Microsoft', date: 'May 15, 2025', description: 'Officially certified by Microsoft on cloud concepts, Azure architecture, and core Azure services. Credential ID: 4B8E9F23D6A71C9E.', image: msAzureFundamentalsCert },
  { name: 'Fundamentals of Machine Learning and Artificial Intelligence', organization: 'AWS Training & Certification', date: 'March 02, 2026', description: 'Completion certificate covering core principles of machine learning and artificial intelligence on the AWS platform.', image: awsMLAICert },
  { name: 'Domain 1 Review: AWS Certified Cloud Practitioner (CLF-C02)', organization: 'AWS Training & Certification', date: 'November 02, 2025', description: 'Domain 1 review of the AWS Certified Cloud Practitioner exam covering cloud concepts, AWS infrastructure, and core services.', image: awsCloudPractitionerCert },
  { name: 'Plan and Prepare to Develop AI Solutions on Azure', organization: 'Microsoft', date: 'September 16, 2025', description: 'Completed Microsoft certification on planning and developing AI solutions using Azure cloud platform.', image: msAzureAICert },
  { name: 'Introduction to Site Reliability Engineering (SRE)', organization: 'Microsoft', date: 'October 4, 2025', description: 'Training on Site Reliability Engineering principles for building reliable and scalable systems.', image: msSRECert },
  { name: 'AI Ready ASEAN: Hour of Code Training', organization: 'ASEAN Foundation & Google.org', date: 'October 2025', description: 'Completed one hour of learning in the AI Ready ASEAN Hour of Code Training, awarded by the ASEAN Foundation with support from Google.org.', image: aseanCert },
  { name: 'Beyond the Black Box: Explainable AI in Game Development', organization: 'West Visayas State University', date: 'October 24, 2025', description: 'Webinar on explainable AI applications in game development held at WVSU College of ICT.', image: aiGameDevCert },
  { name: 'Managing Change when Moving to Google Cloud', organization: 'Google Cloud', date: '2025', description: 'Google Cloud completion badge for managing organizational change during cloud migration to Google Cloud Platform.', image: googleCloudCert },
  { name: 'AI Ready ASEAN: Hour of Code Campaign', organization: 'ASEAN Foundation & Google.org', date: 'June 11, 2025', description: 'Certificate of participation in the Hour of Code Campaign as part of the AI Ready ASEAN Programme, implemented by Break The Fake Movement in partnership with ASEAN Foundation and Google.org.', image: hourOfCodeCert },
  { name: 'Discover Data Analysis', organization: 'Microsoft', date: 'September 16, 2025', description: 'Microsoft training on data analysis fundamentals and techniques.', image: msDataAnalysisCert },
  { name: 'Machine Learning Operations (MLOps) for Generative AI', organization: 'Google Cloud', date: 'November 24, 2025', description: 'Google Cloud completion badge for MLOps practices applied to generative AI systems.', image: gcMLOpsCert },
  { name: 'Introduction to Responsible AI', organization: 'Google Cloud', date: 'November 24, 2025', description: 'Google Cloud completion badge for understanding ethical AI principles and responsible AI practices.', image: gcResponsibleAICert },
  { name: "A Beginner's Journey into Blockchain and Cryptocurrency", organization: 'West Visayas State University', date: 'November 14, 2025', description: 'Certificate of participation in the WVSU Webinar Series 2025 on blockchain fundamentals and cryptocurrency.', image: wvsuBlockchainCert },
  { name: 'Digital Twins: Modeling Reality for Smarter Systems', organization: 'West Visayas State University', date: 'November 15, 2025', description: 'Certificate of participation in the WVSU webinar on digital twin technology for intelligent systems.', image: wvsuDigitalTwinsCert },
  { name: 'AI at Work: Analyze Customer Reviews', organization: 'Cisco Networking Academy', date: 'September 9, 2025', description: 'Certificate for completing AI at Work: Analyze Customer Reviews through the Cisco Networking Academy DICT-ITU DTC Initiative.', image: ciscoAIAtWorkCert },
  { name: 'C++ Essentials 1', organization: 'Cisco Networking Academy', date: 'September 15, 2025', description: 'Certificate for completing C++ Essentials 1 through the Cisco Networking Academy program.', image: ciscoCppEssentialsCert },
  { name: 'Trigger GitHub Actions with Feature-Based Development', organization: 'GitHub', date: 'December 18, 2025', description: 'GitHub Learning Path certificate for triggering and automating workflows using GitHub Actions with feature-based development.', image: ghActionsCert },
  { name: 'Installing and Configuring Computer Systems', organization: 'TESDA — NITESD', date: 'June 28, 2026', description: 'Certificate of Completion issued by the Technical Education and Skills Development Authority (TESDA) — National Institute for Technical Education and Skills Development for completing the course on Installing and Configuring Computer Systems.', image: tesdaICSCert },
  { name: 'Head in the Cloud: Cloud Computing & Cloud-Based Information Systems', organization: 'Read in the Cloud Webinar', date: 'September 19, 2026', description: 'Certificate of Recognition for serving as a Resource Speaker during the webinar “Head in the Cloud: A Webinar on Cloud Computing & Cloud-Based Information Systems.”', image: readInTheCloudCert },
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
        <div className="mb-12 animate-section-rise">
          <p className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-3">06 / CERTS</p>
          <h2 className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight">
            Certifications
          </h2>
        </div>
        <p className="text-muted-foreground mb-12 max-w-2xl">
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
