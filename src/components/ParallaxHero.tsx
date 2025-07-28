"use client";
import { useEffect, useRef, useState } from "react";

export default function ParallaxHero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseStartTime, setPauseStartTime] = useState(0);
  const [pauseDuration, setPauseDuration] = useState(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${y * 0.2}px)`;
      }
      if (shapeRef.current) {
        shapeRef.current.style.transform = `translateY(${y * 0.5}px) rotate(${y * 0.1}deg)`;
      }
      if (textRef.current) {
        textRef.current.style.transform = `translateY(${y * 0.1}px)`;
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Draw static arched lines with animated satellite
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match screen size
    const resizeCanvas = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId: number;
    let time = 0;
    let isPaused = false;
    let pauseStartTime = 0;
    let pauseDuration = 0;

    function drawSatellite(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, angle: number) {
      ctx.save();
      
      // Draw neon blue elongated ellipse
      ctx.beginPath();
      ctx.ellipse(x, y, size * 0.8, size * 0.2, angle, 0, 2 * Math.PI);
      ctx.fillStyle = '#00ffff'; // Neon blue
      ctx.fill();
      
      // Add neon glow effect
      ctx.shadowColor = '#00ffff';
      ctx.shadowBlur = 50;
      ctx.beginPath();
      ctx.ellipse(x, y, size * 0.8, size * 0.2, angle, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
      ctx.fill();
      ctx.shadowBlur = 0;
      
      ctx.restore();
    }

    function animate() {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height * 0.9;
      
      // Check if mobile (width less than 768px)
      const isMobile = rect.width < 768;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw first arched line above Earth
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(128, 128, 128, 0.2)'; // Grey with 20% transparency
      ctx.lineWidth = 0.5;
      ctx.lineCap = 'round';
      
      // Create first arc path
      const startX = 0;
      const endX = rect.width;
      const arcHeight = isMobile ? 200 : 600;
      const arcY = centerY + (isMobile ? -50 : 80); // Move up 20px more
      ctx.moveTo(startX, arcY);
      const controlX = (startX + endX) / 2;
      const controlY = arcY - arcHeight;
      ctx.quadraticCurveTo(controlX, controlY, endX, arcY);
      ctx.stroke();
      ctx.shadowColor = '#808080';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;
      // Draw second arched line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(128, 128, 128, 0.2)';
      ctx.lineWidth = 0.5;
      ctx.lineCap = 'round';
      const arcHeight2 = isMobile ? 250 : 800;
      const arcY2 = centerY + (isMobile ? -100 : 200); // Move up 20px more
      const startX2 = isMobile ? 0 : -500;
      const endX2 = rect.width;
      ctx.moveTo(startX2, arcY2);
      const controlX2 = (startX2 + endX2) * 0.5;
      const controlY2 = arcY2 - arcHeight2;
      const endY2 = isMobile ? arcY2 : centerY + 76; // Move up 304px more
      ctx.quadraticCurveTo(controlX2, controlY2, endX2, endY2);
      ctx.stroke();
      ctx.shadowColor = '#808080';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;
      // Draw third arched line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(128, 128, 128, 0.2)';
      ctx.lineWidth = 0.5;
      ctx.lineCap = 'round';
      const arcHeight3 = isMobile ? 250 : 800;
      const arcY3 = centerY + (isMobile ? -150 : 320); // Move up 20px more
      const startX3 = isMobile ? 0 : -500;
      const endX3 = rect.width;
      ctx.moveTo(startX3, arcY3);
      const controlX3 = (startX3 + endX3) * 0.5;
      const controlY3 = arcY3 - arcHeight3;
      const endY3 = isMobile ? arcY3 : centerY - 144; // Move up 304px more
      ctx.quadraticCurveTo(controlX3, controlY3, endX3, endY3);
      ctx.stroke();
      ctx.shadowColor = '#808080';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;
      
      // Check if we should pause at the end of the animation
      const progress = (time * 0.0045) % 1; // 10% slower movement
      
      // If we reach the end (progress >= 0.99) and we're not already paused, start a pause
      if (progress >= 0.99 && !isPaused) {
        isPaused = true;
        pauseStartTime = time;
        pauseDuration = Math.random() * 4000 + 1000; // Random pause between 1-5 seconds (1000-5000ms)
      }
      
      // If we're paused and enough time has passed, resume
      if (isPaused && (time - pauseStartTime) * 16.67 > pauseDuration) { // 16.67ms per frame at 60fps
        isPaused = false;
        time = 0; // Reset to start
      }
      
      // If paused, don't animate the satellite
      if (isPaused) {
        time += 1;
        animationId = requestAnimationFrame(animate);
        return;
      }
      
      let satelliteX, satelliteY, satelliteAngle;
      
      // Choose which arch to follow based on progress
      if (progress < 0.33) {
        // Follow first arch (quadratic curve)
        const t = progress * 3;
        satelliteX = startX + (endX - startX) * t;
        // Quadratic curve: P0=arcY, P1=controlY, P2=arcY
        const controlY = arcY - arcHeight;
        satelliteY = (1 - t) * (1 - t) * arcY + 2 * (1 - t) * t * controlY + t * t * arcY;
        // Derivative for angle
        const dy = 2 * (1 - t) * (controlY - arcY) + 2 * t * (arcY - controlY);
        satelliteAngle = Math.atan2(dy, endX - startX);
      } else if (progress < 0.66) {
        // Follow second arch (quadratic curve)
        const t = (progress - 0.33) * 3;
        satelliteX = startX2 + (endX2 - startX2) * t;
        // Quadratic curve: P0=arcY2, P1=controlY2, P2=endY2
        const controlY2 = arcY2 - arcHeight2;
        satelliteY = (1 - t) * (1 - t) * arcY2 + 2 * (1 - t) * t * controlY2 + t * t * endY2;
        // Derivative for angle
        const dy = 2 * (1 - t) * (controlY2 - arcY2) + 2 * t * (endY2 - controlY2);
        satelliteAngle = Math.atan2(dy, endX2 - startX2);
      } else {
        // Follow third arch (quadratic curve)
        const t = (progress - 0.66) * 3;
        satelliteX = startX3 + (endX3 - startX3) * t;
        // Quadratic curve: P0=arcY3, P1=controlY3, P2=endY3
        const controlY3 = arcY3 - arcHeight3;
        satelliteY = (1 - t) * (1 - t) * arcY3 + 2 * (1 - t) * t * controlY3 + t * t * endY3;
        // Derivative for angle
        const dy = 2 * (1 - t) * (controlY3 - arcY3) + 2 * t * (endY3 - controlY3);
        satelliteAngle = Math.atan2(dy, endX3 - startX3);
      }
      
      // Draw satellite (always visible)
      drawSatellite(ctx, satelliteX, satelliteY, isMobile ? 8 : 15, satelliteAngle);
      
      time += 1;
      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(180deg, #1a1a1a 0%, #4c5559 100%)",
          zIndex: 1,
          willChange: "transform",
        }}
      />
      {/* <div
        ref={shapeRef}
        style={{
          position: "absolute",
          top: "30%",
          left: "60%",
          width: 200,
          height: 200,
          background: "radial-gradient(circle at 30% 30%, #ffd700 0%, #ff8c00 50%, #ff4500 100%)",
          borderRadius: "50%",
          filter: "blur(0.5px)",
          opacity: 0.8,
          zIndex: 2,
          willChange: "transform",
          boxShadow: "0 0 30px rgba(255, 215, 0, 0.4)",
        }}
      /> */}
      <div
        ref={textRef}
        style={{
          position: "relative",
          zIndex: 3,
          color: "white",
          textAlign: "center",
          top: "25vh",
          letterSpacing: "-0.03em",
          textShadow: "0 8px 32px #0008",
          willChange: "transform",
        }}
      >
        <div style={{ fontSize: "1.2rem", fontWeight: 400, marginBottom: 16, opacity: 0.8, fontFamily: 'Satoshi, sans-serif', color: 'rgb(95, 111, 119)' }}>
          JAMES YOUNG&apos;S PORTFOLIO
        </div>
        <span className="font-satoshi text-[rgb(213,225,231)] text-2xl md:text-[5rem] font-bold tracking-tight leading-none" style={{ textShadow: "0 8px 32px #0008" }}>Improve Design Ops,<br />Skyrocket Satisfaction,<br />and Delight <span className="text-[#00d4ff]">Everyone</span></span>
      </div>
      
      {/* Canvas in lower part of hero */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 10,
        }}
      >
        <canvas 
          ref={canvasRef}
          style={{ height: "100%", width: "100%" }} 
        />
      </div>

      {/* Blue background cloud at bottom center */}
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "300%",
          height: "40%",
          zIndex: 4,
          filter: "blur(20px)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(209, 231, 255, 0.3) 0%, rgba(209, 231, 255, 0.1) 50%, transparent 100%)",
            boxShadow: "0 0 50px rgba(209, 231, 255, 0.2)",
          }}
        />
      </div>

      {/* Earth-like ellipse at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: "-40%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "200%",
          height: "60%",
          zIndex: 5,
          animation: "earthFloat 8s ease-in-out infinite",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "linear-gradient(to bottom, #1a1a1a 0%, #1a1a1a 50%, #0a0a0a 100%)",
            boxShadow: "inset 0 20px 40px rgba(0,0,0,0.5), 0 10px 30px rgba(0,0,0,0.3)",
            border: "2px solid rgba(255,255,255,0.05)",
          }}
        />
      </div>
    </section>
  );
} 