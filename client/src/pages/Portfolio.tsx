import EnhancedCosmicBackground from '@/components/EnhancedCosmicBackground';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import AchievementsSection from '@/components/AchievementsSection';
import GitHubStatsSection from '@/components/GitHubStatsSection';
import SkillsSection from '@/components/SkillsSection';
import CertificationsSection from '@/components/CertificationsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ChatBot3D from '@/components/ChatBot3D';
import SnakeEasterEgg from '@/components/SnakeEasterEgg';
import useGSAPScrollAnimations from '@/hooks/useGSAPScrollAnimations';

export default function Portfolio() {
  useGSAPScrollAnimations();

  return (
    <div className="relative min-h-screen">
      <EnhancedCosmicBackground />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <AchievementsSection />
        <GitHubStatsSection />
        <SkillsSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatBot3D />
      <SnakeEasterEgg />
    </div>
  );
}
