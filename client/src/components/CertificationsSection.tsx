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

import awsCert from '@assets/567758881_4232711827000106_8629763992560919324_n_1761670898469.jpg';
import ciscoCert from '@assets/569285157_2158626684881848_4799189794560792209_n_1761670919065.jpg';
import msAzureAICert from '@assets/568219820_2626348274367441_8298057573251342787_n_1761670941388.jpg';
import msSRECert from '@assets/567694557_1708115870144094_158984253378004564_n_1761670960013.jpg';
import aseanCert from '@assets/567642710_1329712878617496_7242077661466736662_n_1761670979133.jpg';
import aiGameDevCert from '@assets/566618271_1388054376370349_4999140062680558457_n (1)_1761671024657.jpg';
import googleCloudCert from '@assets/550406489_1129151318612807_3393823521163537089_n (1)_1761671062313.jpg';
import hourOfCodeCert from '@assets/564999914_1743336026234176_350358078360885093_n (2)_1761671084083.jpg';
import msDataAnalysisCert from '@assets/552151042_1970535093710852_5294022445060506020_n_1761671193904.jpg';

const certifications = [
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
            <Card
              key={index}
              className="hover-elevate transition-all duration-300 cursor-pointer group"
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
