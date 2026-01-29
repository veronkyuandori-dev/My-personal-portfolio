import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import AnimationWrapper from './AnimationWrapper';

import awsCert from '@assets/Screenshot_2026-01-29_22.05.46_1769697681575.png';
import ciscoCert from '/favicon.png';
import msAzureAICert from '@assets/Screenshot_2026-01-29_21.23.02_1769697681578.png';
import msSRECert from '@assets/Screenshot_2026-01-29_22.14.13_1769697681567.png';
import aseanCert from '@assets/Screenshot_2026-01-29_22.39.10_1769697681529.png';
import aiGameDevCert from '@assets/Screenshot_2026-01-29_22.10.08_1769697681573.png';
import googleCloudCert from '@assets/Screenshot_2026-01-29_22.34.37_1769697681542.png';
import hourOfCodeCert from '@assets/Screenshot_2026-01-29_22.38.38_1769697681539.png';
import msDataAnalysisCert from '/favicon.png';
import gcManagingChangeCert from '@assets/Screenshot_2026-01-29_22.34.37_1769697681542.png';
import gcMLOpsCert from '@assets/Screenshot_2026-01-29_22.33.55_1769697681552.png';
import gcResponsibleAICert from '@assets/Screenshot_2026-01-29_22.34.15_1769697681550.png';
import wvsuBlockchainCert from '@assets/Screenshot_2026-01-29_22.20.52_1769697681563.png';
import wvsuDigitalTwinsCert from '@assets/Screenshot_2026-01-29_22.13.23_1769697681568.png';
import ciscoAIAtWorkCert from '@assets/Screenshot_2026-01-29_22.22.02_1769697681559.png';
import ciscoGreenHouseGasCert from '@assets/Screenshot_2026-01-29_21.24.18_1769697681577.png';
import ciscoCppEssentialsCert from '@assets/Screenshot_2026-01-29_22.22.53_1769697681557.png';
import ghActionsCert from '@assets/614311453_1268615795324686_7714048154067654293_n_1769697681581.png';
import transformerCert from '@assets/Screenshot_2026-01-29_21.05.10_1769697718567.png';
import azureMonitorCert from '@assets/611974055_2053270672125756_6534229906902908588_n_1769697681580.png';

const certifications = [
  {
    name: 'Trigger GitHub Actions with feature-based development',
    organization: 'Microsoft',
    date: 'December 18, 2025',
    description: 'Mastered the principles of triggering GitHub Actions based on feature development workflows, ensuring automated and reliable CI/CD pipelines.',
    image: ghActionsCert,
  },
  {
    name: 'Understand the Transformer architecture and explore large language models in Azure Machine Learning',
    organization: 'Microsoft',
    date: 'January 7, 2026',
    description: 'Explored deep learning architectures including Transformers and Large Language Models (LLMs) within the Azure Machine Learning ecosystem.',
    image: transformerCert,
  },
  {
    name: 'Collect guest operating system monitoring data from Azure and hybrid virtual machines using Azure Monitor Agent',
    organization: 'Microsoft',
    date: 'January 13, 2026',
    description: 'Expertise in configuring Azure Monitor Agent to collect guest OS metrics and logs from both cloud and hybrid environments.',
    image: azureMonitorCert,
  },
  {
    name: 'AWS Database Offerings',
    organization: 'AWS Training & Certification',
    date: 'October 11, 2025',
    description: 'Completed comprehensive training on AWS Database services and offerings, demonstrating proficiency in cloud database solutions.',
    image: awsCert,
  },
  {
    name: 'Introduction to Greenhouse Gas Accounting for IT',
    organization: 'Cisco Networking Academy',
    date: 'September 21, 2025',
    description: 'Successfully completed training on greenhouse gas accounting principles for IT infrastructure and networking systems.',
    image: ciscoCert,
  },
  {
    name: 'Plan and Prepare to Develop AI Solutions on Azure',
    organization: 'Microsoft',
    date: 'September 16, 2025',
    description: 'Completed Microsoft certification on planning and developing AI solutions using Azure cloud platform.',
    image: msAzureAICert,
  },
  {
    name: 'Introduction to Site Reliability Engineering (SRE)',
    organization: 'Microsoft',
    date: 'October 4, 2025',
    description: 'Successfully completed training on Site Reliability Engineering principles and practices for building reliable systems.',
    image: msSRECert,
  },
  {
    name: 'AI Class ASEAN',
    organization: 'ASEAN Foundation & Google.org',
    date: 'October 15, 2025',
    description: 'Completed 12-hour AI learning modules demonstrating strong commitment to building future-ready skills in artificial intelligence.',
    image: aseanCert,
  },
  {
    name: 'Beyond the Black Box: Explainable AI in Game Development',
    organization: 'West Visayas State University',
    date: 'October 24, 2025',
    description: 'Participated in webinar on explainable AI applications in game development at the College of Communication and Information Technology.',
    image: aiGameDevCert,
  },
  {
    name: 'Google Cloud Computing Foundations',
    organization: 'Google Cloud',
    date: '2025',
    description: 'Earned completion badge for mastering cloud computing fundamentals on Google Cloud Platform.',
    image: googleCloudCert,
  },
  {
    name: 'The Hour of Code',
    organization: 'Code.org',
    date: '2025',
    description: 'Completed Hour of Code challenge, demonstrating understanding of basic computer science concepts.',
    image: hourOfCodeCert,
  },
  {
    name: 'Discover Data Analysis',
    organization: 'Microsoft',
    date: 'September 16, 2025',
    description: 'Successfully completed Microsoft training on data analysis fundamentals and techniques.',
    image: msDataAnalysisCert,
  },
  {
    name: 'Managing Change when Moving to Google Cloud',
    organization: 'Google Cloud',
    date: 'November 24, 2025',
    description: 'Earned completion badge for mastering change management strategies during cloud migration.',
    image: gcManagingChangeCert,
  },
  {
    name: 'Machine Learning Operations (MLOps) for Generative AI',
    organization: 'Google Cloud',
    date: 'November 24, 2025',
    description: 'Completed advanced training on implementing MLOps practices for generative AI systems.',
    image: gcMLOpsCert,
  },
  {
    name: 'Introduction to Responsible AI',
    organization: 'Google Cloud',
    date: 'November 24, 2025',
    description: 'Earned completion badge demonstrating understanding of ethical AI principles and practices.',
    image: gcResponsibleAICert,
  },
  {
    name: 'A Beginner\'s Journey into Blockchain and Cryptocurrency',
    organization: 'West Visayas State University',
    date: 'November 14, 2025',
    description: 'Actively participated in webinar on blockchain fundamentals and cryptocurrency concepts at WVSU College of ICT.',
    image: wvsuBlockchainCert,
  },
  {
    name: 'Digital Twins: Modeling Reality for Smarter Systems',
    organization: 'West Visayas State University',
    date: 'November 15, 2025',
    description: 'Participated in webinar on digital twin technology and its applications for intelligent systems at WVSU.',
    image: wvsuDigitalTwinsCert,
  },
  {
    name: 'AI at Work: Analyze Customer Reviews',
    organization: 'Cisco Networking Academy',
    date: 'September 9, 2025',
    description: 'Successfully completed training on AI applications for analyzing customer reviews through the DICT-ITU DTC Initiative.',
    image: ciscoAIAtWorkCert,
  },
  {
    name: 'Introduction to Greenhouse Gas Accounting for IT',
    organization: 'Cisco Networking Academy',
    date: 'September 21, 2025',
    description: 'Earned certification for completing advanced training on greenhouse gas accounting principles for IT infrastructure.',
    image: ciscoGreenHouseGasCert,
  },
  {
    name: 'C++ Essentials 1',
    organization: 'Cisco Networking Academy',
    date: 'September 16, 2025',
    description: 'Successfully completed C++ programming essentials training through Cisco Networking Academy and C3 Institute partnership.',
    image: ciscoCppEssentialsCert,
  },
];

export default function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);

  return (
    <section id="certifications" className="relative py-20 md:py-32 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-center mb-4">
          Certifications
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Professional credentials and achievements
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {certifications.map((cert, index) => (
            <AnimationWrapper 
              key={index}
              type="zoom"
              delay={index * 100}
              duration={650}
            >
              <Card
                className="hover-elevate transition-all duration-300 cursor-pointer group border border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/40 bg-background/50 backdrop-blur-sm"
                onClick={() => setSelectedCert(index)}
                data-testid={`certification-card-${index}`}
              >
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-md bg-primary/10 shrink-0">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 leading-tight">
                      {cert.name}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {cert.date}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Issued by
                </p>
                <p className="text-sm font-semibold mb-3">{cert.organization}</p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {cert.description}
                </p>
              </CardContent>
              </Card>
            </AnimationWrapper>
          ))}
        </div>
      </div>

      <Dialog open={selectedCert !== null} onOpenChange={() => setSelectedCert(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCert !== null && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-heading">
                  {certifications[selectedCert].name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="rounded-lg overflow-hidden border border-border">
                  <img
                    src={certifications[selectedCert].image}
                    alt={certifications[selectedCert].name}
                    className="w-full h-auto"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Issued by
                    </p>
                    <p className="text-lg font-semibold">
                      {certifications[selectedCert].organization}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Date
                    </p>
                    <p className="text-base">
                      {certifications[selectedCert].date}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Description
                    </p>
                    <p className="text-base leading-relaxed">
                      {certifications[selectedCert].description}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
