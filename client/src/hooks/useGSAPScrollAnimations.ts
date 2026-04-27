import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useGSAPScrollAnimations() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {

        // ── Hero parallax ────────────────────────────────────────────────────
        if (document.getElementById('hero-content')) {
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
        }

        // ── Section headings slide-up ─────────────────────────────────────
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

        // ── Skills section — card stagger ─────────────────────────────────
        const skillCards = gsap.utils.toArray<HTMLElement>('#skills .group');
        if (skillCards.length) {
          gsap.from(skillCards, {
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
        }

        // ── Certifications section — carousel fade in ─────────────────────
        const certSection = document.getElementById('certifications');
        if (certSection) {
          gsap.from(certSection.querySelector('canvas'), {
            opacity: 0,
            scale: 0.9,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#certifications',
              start: 'top 78%',
            },
          });
        }

        // GitHub stats section animations removed — they conflicted with React's
        // re-renders when live data replaced fallback repos, leaving cards stuck
        // at opacity:0. The section uses its own CSS hover-elevate transitions.

        // ── Contact form elements ─────────────────────────────────────────
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          const items = gsap.utils.toArray<HTMLElement>(
            contactSection.querySelectorAll('input, textarea, button[type="submit"], .card, form > *')
          );
          if (items.length) {
            gsap.from(items, {
              y: 40,
              opacity: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: contactSection,
                start: 'top 80%',
              },
            });
          }
        }

        // ── Parallax on data-parallax-speed elements ──────────────────────
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
    }, 500);

    return () => clearTimeout(timer);
  }, []);
}
