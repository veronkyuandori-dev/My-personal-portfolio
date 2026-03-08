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
import msDataAnalysisCert from '@assets/Screenshot_2026-01-29_23.49.50_1769701859675.png';
import gcManagingChangeCert from '@assets/Screenshot_2026-01-29_22.34.37_1769697681542.png';
import gcMLOpsCert from '@assets/Screenshot_2026-01-29_22.33.55_1769697681552.png';
import gcResponsibleAICert from '@assets/Screenshot_2026-01-29_22.34.15_1769697681550.png';
import wvsuBlockchainCert from '@assets/Screenshot_2026-01-29_22.20.52_1769697681563.png';
import wvsuDigitalTwinsCert from '@assets/Screenshot_2026-01-29_22.13.23_1769697681568.png';
import ciscoAIAtWorkCert from '@assets/Screenshot_2026-01-29_22.22.02_1769697681559.png';
import ciscoGreenHouseGasCert from '@assets/Screenshot_2026-01-29_21.24.18_1769702343730.png';
import ciscoCppEssentialsCert from '@assets/Screenshot_2026-01-29_22.22.53_1769697681557.png';
import ghActionsCert from '@assets/Screenshot_2026-02-14_16.35.08_1771058417077.png';
import transformerCert from '@assets/Screenshot_2026-02-14_16.35.29_1771058401613.png';
import azureMonitorCert from '@assets/611974055_2053270672125756_6534229906902908588_n_1769697681580.png';
import awsDataEngineeringCert from '@assets/Screenshot_2026-01-29_23.56.06_1769702307268.png';
import awsCloudPractitionerCert from '@assets/Screenshot_2026-03-02_09.17.30_1772414264829.png';
import awsMLAICert from '@assets/Screenshot_2026-03-02_09.35.56_1772415368173.png';

import awsDatabaseCert from '@assets/Screenshot_2026-03-02_16.33.41_1772440506732.png';
import awsDataEngFoundationsCert from '@assets/Screenshot_2026-03-02_16.34.27_1772440481687.png';

const certifications = [
  {
    name: 'Fundamentals of Machine Learning and Artificial Intelligence',
    organization: 'AWS Training & Certification',
    date: 'March 02, 2026',
    description: 'Advanced certification covering the core principles of machine learning and artificial intelligence on the AWS platform.',
    image: awsMLAICert,
  },
  {
    name: 'AWS Certified Database - Specialty',
    organization: 'AWS Training & Certification',
    date: 'March 02, 2026',
    description: 'Professional certification demonstrating expertise in AWS database services, architecture, and implementation.',
    image: awsDatabaseCert,
  },
  {
    name: 'AWS Data Engineering Foundations',
    organization: 'AWS Training & Certification',
    date: 'March 02, 2026',
    description: 'Foundation-level certification covering data engineering principles and AWS data services.',
    image: awsDataEngFoundationsCert,
  },
  {
    name: 'Domain 1 Review: AWS Certified Cloud Practitioner (CLF-C02)',
    organization: 'AWS Training & Certification',
    date: 'November 02, 2025',
    description: 'Comprehensive review and certification of AWS Cloud fundamentals, security, compliance, and core services.',
    image: awsCloudPractitionerCert,
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
