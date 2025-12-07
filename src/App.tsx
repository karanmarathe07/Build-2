import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, motion } from 'motion/react';
import Hero from './components/Hero';
import LineStackAnimation from './components/LineStackAnimation';
import NavbarWithPanel from './components/NavbarWithPanel';
import OrbitCarousel from './components/ui/orbiting-carousel-with-animated-icons';
import TechnologiesMarquee from './components/TechnologiesMarquee';
import './index.css';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(1000); // Default fallback

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHeight(window.innerHeight);
    }
  }, []);

  const { scrollY } = useScroll();

  // Animations based on scroll Y pixels [0, viewportHeight]
  // Hero Shrinks: Scale 1 -> 0.8, Rotate 0 -> -5
  const heroScale = useTransform(scrollY, [0, height], [1, 0.8]);
  const heroRotate = useTransform(scrollY, [0, height], [0, -5]);
  const heroOpacity = useTransform(scrollY, [0, height * 0.8], [1, 0]); // Fade out slightly for smoothness? Or keep full? User prompt didn't strictly specify opacity, but scale/rotate. Let's stick to scale/rotate + sticky.

  // LineStack Enters: Scale 0.8 -> 1, Rotate 5 -> 0
  const stackScale = useTransform(scrollY, [0, height], [0.8, 1]);
  const stackRotate = useTransform(scrollY, [0, height], [5, 0]);

  // Clean up transforms when animation is done to avoid breaking ScrollTrigger pinning?
  // We can't easily perform "remove property" via motion values, but we can ensure it's exactly identity.

  return (
    <>
      <NavbarWithPanel />

      <main ref={containerRef} className="relative bg-black">
        {/* HERO SECTION - Sticky & Animated */}
        <motion.div
          style={{ scale: heroScale, rotateX: heroRotate }}
          className="sticky top-0 h-screen z-0 overflow-hidden"
        >
          <Hero />
          {/* Overlay mask like in the demo? */}
          <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none'></div>
        </motion.div>

        {/* LINE STACK ANIMATION - Enters & Grows */}
        <motion.div
          style={{ scale: stackScale, rotateX: stackRotate }}
          className="relative z-10 bg-black min-h-screen origin-top"
        >
          {/* Add a background wrapper to ensure it covers Hero */}
          <div className="bg-black w-full h-full relative">
            <LineStackAnimation />
          </div>
        </motion.div>

        <OrbitCarousel />

        <TechnologiesMarquee />
      </main>
    </>
  );
}

export default App;
