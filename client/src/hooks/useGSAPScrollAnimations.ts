import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useGSAPScrollAnimations() {
  useEffect(() => {
    // Small delay to let DOM render
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {

        // ── Hero parallax ───────────────────────────────────────────────────
        gsap.to('#hero-content', {
          yPercent: -22,
          ease: 'none',
          scrollTrigger: {
            trigger: '#home',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        // ── Section headings slide-up ────────────────────────────────────────
        gsap.utils.toArray<HTMLElement>('section h2').forEach((el) => {
          gsap.from(el, {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          });
        });

        // ── About section — text blocks stagger ────────────────────────────
        gsap.from('#about .gsap-stagger', {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#about',
            start: 'top 75%',
          },
        });

        // ── Projects — alternate slide in from sides ──────────────────────
        gsap.utils.toArray<HTMLElement>('[data-testid^="project-card-"]').forEach((card, i) => {
          gsap.from(card, {
            x: i % 2 === 0 ? -80 : 80,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          });
        });

        // ── Skills bars — width animation ────────────────────────────────
        gsap.utils.toArray<HTMLElement>('[data-gsap-skill-bar]').forEach((bar) => {
          const target = bar.getAttribute('data-gsap-skill-bar') ?? '0';
          gsap.from(bar, {
            width: '0%',
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          });
          // Also animate to target width in case CSS width is not set
          gsap.to(bar, {
            width: `${target}%`,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          });
        });

        // ── Skill cards stagger ───────────────────────────────────────────
        gsap.from('#skills .gsap-skill-card', {
          y: 50,
          opacity: 0,
          scale: 0.95,
          duration: 0.7,
          stagger: 0.12,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '#skills',
            start: 'top 75%',
          },
        });

        // ── Certifications — stagger cascade ─────────────────────────────
        gsap.from('[data-testid^="cert-card-"]', {
          y: 40,
          opacity: 0,
          scale: 0.92,
          duration: 0.6,
          stagger: 0.07,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#certifications',
            start: 'top 78%',
          },
        });

        // ── GitHub stats — counter-pop ────────────────────────────────────
        gsap.from('#github .gsap-stat', {
          scale: 0.6,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: '#github',
            start: 'top 80%',
          },
        });

        // ── Contact section slide-up ──────────────────────────────────────
        gsap.from('#contact .gsap-contact-item', {
          y: 50,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '#contact',
            start: 'top 80%',
          },
        });

        // ── Decorative background parallax layers ─────────────────────────
        gsap.utils.toArray<HTMLElement>('[data-parallax-speed]').forEach((el) => {
          const speed = parseFloat(el.getAttribute('data-parallax-speed') ?? '0.3');
          gsap.to(el, {
            yPercent: -100 * speed,
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('section') ?? el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        });

      });

      return () => ctx.revert();
    }, 300);

    return () => clearTimeout(timer);
  }, []);
}
