import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      setScrollProgress(scrollPercent);
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60]">
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <div className="absolute top-2 left-4 text-xs font-medium text-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border shadow-sm">
        {Math.round(scrollProgress)}% scrolled
      </div>
    </div>
  );
}
