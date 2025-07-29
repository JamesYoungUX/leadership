'use client';

import { useEffect, useRef, useState } from 'react';

export default function InteractiveButtons() {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [activeButton, setActiveButton] = useState(0);
  const [timeProgress, setTimeProgress] = useState(0);
  const [buttonWidths, setButtonWidths] = useState<number[]>([]);
  const timerStartedRef = useRef<boolean>(false);
  
  // Refs for each button to measure their widths
  const buttonRefs = [
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null),
    useRef<HTMLButtonElement>(null)
  ];

  // Measure button widths when they become active (with delay for transition)
  useEffect(() => {
    const measureButtonWidth = (index: number) => {
      const button = buttonRefs[index].current;
      if (button) {
        // Force the button to expand by temporarily setting a minimum width
        const originalMinWidth = button.style.minWidth;
        button.style.minWidth = '200px';
        
        // Immediate measurement
        const rect = button.getBoundingClientRect();
        console.log(`Immediate measurement - button ${index} width: ${rect.width}px`);
        if (rect.width > 0) {
          setButtonWidths(prev => {
            const newWidths = [...prev];
            newWidths[index] = rect.width;
            return newWidths;
          });
        }

        // Restore original minWidth
        button.style.minWidth = originalMinWidth;

        // Wait for the button to be fully expanded and rendered
        setTimeout(() => {
          const rect = button.getBoundingClientRect();
          console.log(`First measurement - button ${index} width: ${rect.width}px`);
          if (rect.width > 0) {
            setButtonWidths(prev => {
              const newWidths = [...prev];
              newWidths[index] = rect.width;
              return newWidths;
            });
          }
        }, 1000); // Increased delay to ensure button is fully expanded

        // Second measurement to ensure we have the final width
        setTimeout(() => {
          const rect = button.getBoundingClientRect();
          console.log(`Final measurement - button ${index} width: ${rect.width}px`);
          if (rect.width > 0) {
            setButtonWidths(prev => {
              const newWidths = [...prev];
              newWidths[index] = rect.width;
              return newWidths;
            });
          }
        }, 1500); // Additional delay to ensure full expansion

        // Fallback measurement after longer delay
        setTimeout(() => {
          const rect = button.getBoundingClientRect();
          console.log(`Fallback measurement - button ${index} width: ${rect.width}px`);
          if (rect.width > 0) {
            setButtonWidths(prev => {
              const newWidths = [...prev];
              newWidths[index] = rect.width;
              return newWidths;
            });
          }
        }, 2000); // Fallback measurement
      }
    };

    // Measure the active button width
    measureButtonWidth(activeButton);
  }, [activeButton]);

  // Reset timer flag when active button changes
  useEffect(() => {
    timerStartedRef.current = false;
    console.log(`Reset timer flag for button ${activeButton}`);
  }, [activeButton]);

  // Timer effect for automatic progression - only start after width is measured
  useEffect(() => {
    console.log('Desktop timer effect triggered', { 
      activeButton, 
      buttonWidths, 
      currentButtonWidth: buttonWidths[activeButton],
      timerStarted: timerStartedRef.current 
    });
    
    // Only start timer if we have the button width and haven't started yet
    if (!buttonWidths[activeButton] || timerStartedRef.current) {
      console.log('Desktop timer not starting:', { 
        hasWidth: !!buttonWidths[activeButton], 
        buttonWidth: buttonWidths[activeButton],
        timerStarted: timerStartedRef.current 
      });
      return;
    }

    console.log('Starting desktop timer for button', activeButton, 'with width', buttonWidths[activeButton]);
    timerStartedRef.current = true;
    
    const startTimer = () => {
      // Clear any existing timer
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Get the measured width of the active button
      const currentButtonWidth = buttonWidths[activeButton];
      const baseDuration = 8000; // 8 seconds base duration
      const baseWidth = 200; // Base width for desktop buttons
      
      // Adjust duration based on button width - wider buttons get more time
      const duration = Math.max(baseDuration, (currentButtonWidth / baseWidth) * baseDuration);
      const frameRate = 60; // 60fps
      const frameDuration = 1000 / frameRate; // ~16.67ms
      const totalFrames = duration / frameDuration;
      const progressIncrement = currentButtonWidth / totalFrames; // Progress in pixels

      console.log('Timer setup:', { currentButtonWidth, duration, progressIncrement, totalFrames });

      let frameCount = 0;
      const maxFrames = Math.floor(totalFrames); // Ensure it's an integer

      const updateProgress = (progress: number) => {
        frameCount++;
        
        // Ensure we don't exceed the button width
        const clampedProgress = Math.min(progress, currentButtonWidth);
        setTimeProgress(clampedProgress);
        
        console.log('Progress update:', { progress: clampedProgress, frameCount, maxFrames });
        
        if (clampedProgress >= currentButtonWidth) {
          // Timer complete, move to next button
          console.log('Timer complete');
          timerStartedRef.current = false; // Reset flag for next button
          setActiveButton(prevButton => {
            const nextButton = (prevButton + 1) % 5;
            return nextButton;
          });
          setTimeProgress(0);
          // Start next timer after a short delay
          timeoutRef.current = setTimeout(() => startTimer(), 200);
        } else if (frameCount >= maxFrames) {
          // Force completion if we've reached max frames
          console.log('Timer forced completion');
          timerStartedRef.current = false; // Reset flag for next button
          setTimeProgress(currentButtonWidth);
          setActiveButton(prevButton => {
            const nextButton = (prevButton + 1) % 5;
            return nextButton;
          });
          setTimeProgress(0);
          timeoutRef.current = setTimeout(() => startTimer(), 200);
        } else {
          // Continue timer with pixel-based increment
          timeoutRef.current = setTimeout(() => updateProgress(progress + progressIncrement), frameDuration);
        }
      };

      // Start the timer
      timeoutRef.current = setTimeout(() => updateProgress(0), frameDuration);
    };

    startTimer();

    return () => {
      // Don't clear the timer on cleanup - let it continue running
      // Only clear if we're actually changing buttons
    };
  }, [activeButton, buttonWidths]); // Add buttonWidths back as dependency

  // Reset timer when button is manually clicked
  const handleButtonClick = (index: number) => {
    console.log(`Manual click: setting active button to ${index}`);
    setActiveButton(index);
    setTimeProgress(0);
    
    // Clear existing timer
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    // Reset timer flags
    timerStartedRef.current = false;
  };

  const panelContent = [
    {
      title: "Servant Leadership",
      description: "Empowering teams through humility, empathy, and service-first mindset. Building trust and fostering collaboration across all levels."
    },
    {
      title: "Mentorship", 
      description: "Developing talent through personalized guidance, knowledge sharing, and creating growth opportunities for team members."
    },
    {
      title: "Strategic",
      description: "Aligning design initiatives with business objectives, making data-driven decisions, and planning for long-term success."
    },
    {
      title: "Collaboration",
      description: "Breaking down silos, facilitating cross-functional partnerships, and creating environments where diverse perspectives thrive."
    },
    {
      title: "Innovation",
      description: "Driving creative solutions and pushing boundaries to deliver cutting-edge design experiences."
    }
  ];

  return (
    <section className="pb-32 pt-0 w-full" style={{backgroundColor: 'rgb(34, 34, 34)'}}>
      <div className="w-full px-2 pt-26 pb-26" style={{backgroundColor: '#92a6b0', marginLeft: '8px', marginRight: '8px', borderRadius: '16px', boxShadow: 'inset 0 0 40px rgba(255, 255, 255, 0.2)'}}>
        <div className="text-center" style={{paddingTop: '104px'}}>
          <div style={{marginBottom: '104px'}}>
            <h2 className="font-satoshi text-base font-normal tracking-tight leading-none" style={{color: 'rgb(95, 111, 119)'}}>
              [ EFFECTIVE, EFFICIENT AND FLEXIBLE ]
            </h2>
          </div>
          <h1 className="font-satoshi text-[rgb(213,225,231)] text-2xl md:text-[5rem] font-bold tracking-tight leading-none" style={{ textShadow: "0 8px 32px #0008" }}>
            Unparalleled
          </h1>
          <h1 className="font-satoshi text-[#111] text-2xl md:text-[5rem] font-black tracking-tight leading-none">
            Design Leadership Capabilities
          </h1>
          
          {/* Desktop Layout - Original structure preserved */}
          <div className="hidden md:flex justify-center gap-1 mt-26 w-3/5 mx-auto overflow-visible">
            <button 
              ref={buttonRefs[0]}
              className={`flex items-center gap-3 px-1 py-1 pr-4 backdrop-blur-sm rounded-lg transition-all duration-300 group relative overflow-hidden border border-red-500/30 ${
                activeButton === 0 ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'
              }`}
              style={{ 
                flex: activeButton === 0 ? '1 1 0%' : '0 0 auto',
                minWidth: activeButton === 0 ? '200px' : 'auto'
              }}
              onClick={() => handleButtonClick(0)}
            >
              <div 
                className={`absolute left-0 top-0 bottom-0 transition-all duration-300`}
                style={{ 
                  width: activeButton === 0 ? `${timeProgress}px` : '0px',
                  backgroundColor: 'rgb(177,197,206)',
                  height: '100%'
                }}
              />
              <div className="w-16 h-16 rounded-md bg-red-500/20 flex items-center justify-center relative z-10">
                <img src="https://cdn.prod.website-files.com/66e53bf67b6fc1646ce0777e/6752eb5f691796371f775ca9_Coins.svg" loading="lazy" alt="" className="w-8 h-8" />
              </div>
              <span className="text-[#333] font-semibold relative z-10 text-base uppercase">Servant Leadership</span>
            </button>
            <button 
              ref={buttonRefs[1]}
              className={`flex items-center gap-3 px-1 py-1 pr-4 backdrop-blur-sm rounded-lg transition-all duration-300 group relative overflow-hidden border border-green-500/30 ${
                activeButton === 1 ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'
              }`}
              style={{ 
                flex: activeButton === 1 ? '1 1 0%' : '0 0 auto',
                minWidth: activeButton === 1 ? '200px' : 'auto'
              }}
              onClick={() => handleButtonClick(1)}
            >
              <div 
                className={`absolute left-0 top-0 bottom-0 transition-all duration-300`}
                style={{ 
                  width: activeButton === 1 ? `${timeProgress}px` : '0px',
                  backgroundColor: 'rgb(177,197,206)',
                  height: '100%'
                }}
              />
              <div className="w-16 h-16 rounded-md bg-green-500/20 flex items-center justify-center relative z-10">
                <img src="https://cdn.prod.website-files.com/66e53bf67b6fc1646ce0777e/6752eb8f589e8997cda73fcb_Casg.svg" loading="lazy" alt="" className="w-8 h-8" />
              </div>
              <span className="text-[#333] font-semibold relative z-10 text-base uppercase">Mentorship</span>
            </button>
            <button 
              ref={buttonRefs[2]}
              className={`flex items-center gap-3 px-1 py-1 pr-4 backdrop-blur-sm rounded-lg transition-all duration-300 group relative overflow-hidden border border-blue-500/30 ${
                activeButton === 2 ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'
              }`}
              style={{ 
                flex: activeButton === 2 ? '1 1 0%' : '0 0 auto',
                minWidth: activeButton === 2 ? '200px' : 'auto'
              }}
              onClick={() => handleButtonClick(2)}
            >
              <div 
                className={`absolute left-0 top-0 bottom-0 transition-all duration-300`}
                style={{ 
                  width: activeButton === 2 ? `${timeProgress}px` : '0px',
                  backgroundColor: 'rgb(177,197,206)',
                  height: '100%'
                }}
              />
              <div className="w-16 h-16 rounded-md bg-blue-500/20 flex items-center justify-center relative z-10">
                <img src="https://cdn.prod.website-files.com/66e53bf67b6fc1646ce0777e/6752eb8f355c535a4270b03c_Stack.svg" loading="lazy" alt="" className="w-8 h-8" />
              </div>
              <span className="text-[#333] font-semibold relative z-10 text-base uppercase">Strategic</span>
            </button>
            <button 
              ref={buttonRefs[3]}
              className={`flex items-center gap-3 px-1 py-1 pr-4 backdrop-blur-sm rounded-lg transition-all duration-300 group relative overflow-hidden border border-yellow-500/30 ${
                activeButton === 3 ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'
              }`}
              style={{ 
                flex: activeButton === 3 ? '1 1 0%' : '0 0 auto',
                minWidth: activeButton === 3 ? '200px' : 'auto'
              }}
              onClick={() => handleButtonClick(3)}
            >
              <div 
                className={`absolute left-0 top-0 bottom-0 transition-all duration-300`}
                style={{ 
                  width: activeButton === 3 ? `${timeProgress}px` : '0px',
                  backgroundColor: 'rgb(177,197,206)',
                  height: '100%'
                }}
              />
              <div className="w-16 h-16 rounded-md bg-yellow-500/20 flex items-center justify-center relative z-10">
                <img src="https://cdn.prod.website-files.com/66e53bf67b6fc1646ce0777e/6752eb8fa121f6a1309c0af2_Atom.svg" loading="lazy" alt="" className="w-8 h-8" />
              </div>
              <span className="text-[#333] font-semibold relative z-10 text-base uppercase">Collaboration</span>
            </button>
            <button 
              ref={buttonRefs[4]}
              className={`flex items-center gap-3 px-1 py-1 pr-4 backdrop-blur-sm rounded-lg transition-all duration-300 group relative overflow-hidden border border-purple-500/30 ${
                activeButton === 4 ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'
              }`}
              style={{ 
                flex: activeButton === 4 ? '1 1 0%' : '0 0 auto',
                minWidth: activeButton === 4 ? '200px' : 'auto'
              }}
              onClick={() => handleButtonClick(4)}
            >
              <div 
                className={`absolute left-0 top-0 bottom-0 transition-all duration-300`}
                style={{ 
                  width: activeButton === 4 ? `${timeProgress}px` : '0px',
                  backgroundColor: 'rgb(177,197,206)',
                  height: '100%'
                }}
              />
              <div className="w-16 h-16 rounded-md bg-purple-500/20 flex items-center justify-center relative z-10">
                <img src="https://cdn.prod.website-files.com/66e53bf67b6fc1646ce0777e/6752eb8fa121f6a1309c0af2_Atom.svg" loading="lazy" alt="" className="w-8 h-8" />
              </div>
              <span className="text-[#333] font-semibold relative z-10 text-base uppercase">Innovation</span>
            </button>
          </div>
          <div className="hidden md:block mt-1 p-12 backdrop-blur-sm rounded-lg border border-white/10 w-3/5 mx-auto min-h-[400px]" style={{backgroundColor: 'rgb(177,197,206)'}}>
            <div className="flex">
              {/* Left Column - 40% */}
              <div className="w-[40%] pr-6 text-left">
                <div className="text-xs text-gray-600 mb-2">
                  Active Button: {activeButton} | Progress: {timeProgress.toFixed(1)}px / {buttonWidths[activeButton]?.toFixed(0) || 'measuring...'}px | 
                  Duration: 8.0s
                </div>
                <h2 className="text-[40px] font-extrabold text-gray-800 mb-2">{panelContent[activeButton].title}</h2>
                <p className="text-xl font-light text-gray-800">
                  {panelContent[activeButton].description}
                </p>
              </div>
              
              {/* Right Column - 60% */}
              <div className="w-[60%]">
                {/* Right column content can be added here */}
              </div>
            </div>
          </div>

          {/* Mobile Layout - Vertical buttons with panel beneath active button */}
          <div className="md:hidden mt-8 space-y-0">
            {[0, 1, 2, 3, 4].map((index) => (
              <div key={index} className="space-y-2">
                <button 
                  ref={buttonRefs[index]}
                  className={`w-full flex items-center gap-3 px-4 py-3 backdrop-blur-sm rounded-lg transition-all duration-300 group relative overflow-hidden border ${
                    index === 0 ? 'border-red-500/30' :
                    index === 1 ? 'border-green-500/30' :
                    index === 2 ? 'border-blue-500/30' :
                    index === 3 ? 'border-yellow-500/30' :
                    'border-purple-500/30'
                  } ${
                    activeButton === index ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'
                  }`}
                  onClick={() => handleButtonClick(index)}
                >
                  <div 
                    className={`absolute left-0 top-0 bottom-0 transition-all duration-300`}
                    style={{ 
                      width: activeButton === index ? `${timeProgress}px` : '0px',
                      backgroundColor: 'rgb(177,197,206)',
                      height: '100%'
                    }}
                  />
                  <div className={`w-12 h-12 rounded-md flex items-center justify-center relative z-10 ${
                    index === 0 ? 'bg-red-500/20' :
                    index === 1 ? 'bg-green-500/20' :
                    index === 2 ? 'bg-blue-500/20' :
                    index === 3 ? 'bg-yellow-500/20' :
                    'bg-purple-500/20'
                  }`}>
                    <img src={
                      index === 0 ? "https://cdn.prod.website-files.com/66e53bf67b6fc1646ce0777e/6752eb5f691796371f775ca9_Coins.svg" :
                      index === 1 ? "https://cdn.prod.website-files.com/66e53bf67b6fc1646ce0777e/6752eb8f589e8997cda73fcb_Casg.svg" :
                      index === 2 ? "https://cdn.prod.website-files.com/66e53bf67b6fc1646ce0777e/6752eb8f355c535a4270b03c_Stack.svg" :
                      index === 3 ? "https://cdn.prod.website-files.com/66e53bf67b6fc1646ce0777e/6752eb8fa121f6a1309c0af2_Atom.svg" :
                      "https://cdn.prod.website-files.com/66e53bf67b6fc1646ce0777e/6752eb8fa121f6a1309c0af2_Atom.svg"
                    } loading="lazy" alt="" className="w-6 h-6" />
                  </div>
                  <span className="text-[#333] font-semibold relative z-10 text-sm uppercase">{panelContent[index].title}</span>
                </button>
                
                {/* Panel appears beneath active button on mobile */}
                {activeButton === index && (
                  <div className="p-6 backdrop-blur-sm rounded-lg border border-white/10" style={{backgroundColor: 'rgb(177,197,206)'}}>
                    <div className="text-xs text-gray-600 mb-2">
                      Progress: {timeProgress.toFixed(1)}px / {buttonWidths[activeButton]?.toFixed(0) || 'measuring...'}px | 
                      Duration: 8.0s
                    </div>
                    <h2 className="text-[32px] font-extrabold text-gray-800 mb-2">{panelContent[index].title}</h2>
                    <p className="text-lg font-light text-gray-800">
                      {panelContent[index].description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 