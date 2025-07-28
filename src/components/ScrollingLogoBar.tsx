'use client';

import { useEffect, useRef } from 'react';

export default function ScrollingLogoBar() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.3; // Slower movement

    function animate() {
      if (scrollContainer) {
        scrollPosition += scrollSpeed;
        
        // Reset position when we've scrolled the full width
        const containerWidth = scrollContainer.scrollWidth;
        const visibleWidth = scrollContainer.clientWidth;
        
        if (scrollPosition >= containerWidth / 2) {
          scrollPosition = 0;
        }
        
        scrollContainer.style.transform = `translateX(-${scrollPosition}px)`;
      }
      
      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const logos = [
    { name: 'Google', color: '#4285F4' },
    { name: 'Microsoft', color: '#00A4EF' },
    { name: 'Apple', color: '#A2AAAD' },
    { name: 'Amazon', color: '#FF9900' },
    { name: 'Meta', color: '#1877F2' },
    { name: 'W.W. Grainger', color: '#C8102E' },
    { name: 'Spotify', color: '#1DB954' },
    { name: 'Uber', color: '#000000' },
    { name: 'Bravado Health', color: '#E6E6FA' },
    { name: 'Pearl Health', color: '#FFFFFF' },
    { name: 'Press Ganey', color: '#FF00FF' },
    { name: 'Humana', color: '#5BA908' },
    { name: 'CVS Healthcare', color: '#cc0000' },
    // Duplicate logos for seamless loop
    { name: 'Google', color: '#4285F4' },
    { name: 'Microsoft', color: '#00A4EF' },
    { name: 'Apple', color: '#A2AAAD' },
    { name: 'Amazon', color: '#FF9900' },
    { name: 'Meta', color: '#1877F2' },
    { name: 'W.W. Grainger', color: '#C8102E' },
    { name: 'Spotify', color: '#1DB954' },
    { name: 'Uber', color: '#000000' },
    { name: 'Bravado Health', color: '#E6E6FA' },
    { name: 'Pearl Health', color: '#FFFFFF' },
    { name: 'Press Ganey', color: '#FF00FF' },
    { name: 'Humana', color: '#5BA908' },
    { name: 'CVS Healthcare', color: '#cc0000' },
  ];

  return (
    <section className="py-16 w-full bg-[#1a1a1a]">
      <div className="w-full px-4">
        <div className="text-center mb-12">
          <h2 className="text-xl font-bold text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-300 text-sm">
            Working with companies that shape the future of design and technology
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            ref={scrollRef}
            className="flex items-center gap-12 whitespace-nowrap"
            style={{ width: 'fit-content' }}
          >
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center min-w-[120px] h-16 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                                 <div 
                   className="text-white font-semibold text-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                   style={{ color: logo.color }}
                 >
                   {logo.name}
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 