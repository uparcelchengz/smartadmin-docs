import React, { useEffect, useState } from 'react';

const BackgroundAnimation = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set client-side flag
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only run on client-side (browser)
    if (!isClient || typeof window === 'undefined') return;
    
    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const container = document.querySelector('.bg-animation');
      if (!container) return;

      // Clear any existing bubbles
      container.innerHTML = '';

      const bubbleCount = 45; // Optimized count for better performance

    for (let i = 0; i < bubbleCount; i++) {
      const span = document.createElement('span');
      
      // Random size between 6 and 35px
      const size = Math.round(Math.random() * 29) + 6;
      span.style.width = size + 'px';
      span.style.height = size + 'px';
      
      // Random horizontal position
      const leftPos = Math.random() * 100;
      span.style.left = leftPos + '%';
      
      // Start from different vertical positions for immediate visibility
      const startPosition = Math.random() * 120 - 20; // -20vh to 100vh
      span.style.bottom = startPosition + 'vh';
      
      // More visible opacity
      const alpha = (Math.random() * 0.3 + 0.1).toFixed(2);
      span.style.background = `rgba(162,89,255,${alpha})`;
      
      // Random animation duration
      const duration = (Math.random() * 10 + 8).toFixed(2);
      const delay = (Math.random() * 5).toFixed(2); // Shorter delay for immediate visibility
      
      // Add horizontal drift for gas movement - use inline transform instead of CSS variables
      const drift = (Math.random() * 60 - 30).toFixed(2);
      const scaleVariation = (Math.random() * 0.4 + 0.8).toFixed(2);
      
      // Create custom animation keyframes for each bubble
      const animationName = `gasFloat-${i}`;
      const keyframes = `
        @keyframes ${animationName} {
          0% {
            transform: translateY(0) translateX(0) scale(${scaleVariation}) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: 0.8;
          }
          25% {
            opacity: 1;
            transform: translateY(-25vh) translateX(${drift * 0.25}px) scale(${scaleVariation}) rotate(90deg);
          }
          50% {
            opacity: 0.9;
            transform: translateY(-50vh) translateX(${drift * 0.5}px) scale(${scaleVariation * 1.1}) rotate(180deg);
          }
          75% {
            opacity: 0.7;
            transform: translateY(-75vh) translateX(${drift * 0.75}px) scale(${scaleVariation * 1.3}) rotate(270deg);
          }
          95% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) translateX(${drift}px) scale(${scaleVariation * 1.5}) rotate(360deg);
            opacity: 0;
          }
        }
      `;
      
      // Add the keyframes to the document
      if (!document.querySelector(`style[data-animation="${animationName}"]`)) {
        const style = document.createElement('style');
        style.setAttribute('data-animation', animationName);
        style.textContent = keyframes;
        document.head.appendChild(style);
      }
      
      span.style.animation = `${animationName} ${duration}s linear ${delay}s infinite`;
      
      span.style.position = 'absolute';
      span.style.borderRadius = '50%';
      span.style.pointerEvents = 'none';
      span.style.willChange = 'transform, opacity';
      
      // Add subtle glow effect for visibility
      if (Math.random() > 0.6) {
        span.style.boxShadow = `0 0 ${size/3}px rgba(162,89,255,0.4)`;
      }
      
      container.appendChild(span);
    }

    // Create micro bubbles for dense effect
    for (let i = 0; i < 25; i++) {
      const microBubble = document.createElement('span');
      
      const microSize = Math.round(Math.random() * 4) + 2;
      microBubble.style.width = microSize + 'px';
      microBubble.style.height = microSize + 'px';
      microBubble.style.left = Math.random() * 100 + '%';
      microBubble.style.bottom = Math.random() * 100 + 'vh';
      
      const microAlpha = (Math.random() * 0.25 + 0.05).toFixed(2);
      microBubble.style.background = `rgba(199,164,255,${microAlpha})`;
      
      const microDuration = (Math.random() * 6 + 6).toFixed(2);
      const microDelay = (Math.random() * 3).toFixed(2);
      const microDrift = (Math.random() * 30 - 15).toFixed(2);
      
      // Create custom animation for micro bubbles
      const microAnimationName = `microGasFloat-${i}`;
      const microKeyframes = `
        @keyframes ${microAnimationName} {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.8;
            transform: translateY(-50vh) translateX(${microDrift * 0.7}px) scale(1.2);
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) translateX(${microDrift}px) scale(0.8);
            opacity: 0;
          }
        }
      `;
      
      // Add the micro keyframes to the document
      if (!document.querySelector(`style[data-animation="${microAnimationName}"]`)) {
        const microStyle = document.createElement('style');
        microStyle.setAttribute('data-animation', microAnimationName);
        microStyle.textContent = microKeyframes;
        document.head.appendChild(microStyle);
      }
      
      microBubble.style.animation = `${microAnimationName} ${microDuration}s linear ${microDelay}s infinite`;
      
      microBubble.style.position = 'absolute';
      microBubble.style.borderRadius = '50%';
      microBubble.style.pointerEvents = 'none';
      microBubble.style.willChange = 'transform, opacity';
      
      container.appendChild(microBubble);
    }
    }, 100); // 100ms delay

    // Cleanup function for component unmount
    return () => {
      clearTimeout(timer);
      if (isClient && typeof window !== 'undefined') {
        const container = document.querySelector('.bg-animation');
        if (container) {
          container.innerHTML = '';
        }
      }
    };
  }, [isClient]);

  // Don't render anything on server-side
  if (!isClient) {
    return null;
  }

  return <div className="bg-animation" aria-hidden="true" />;
};

export default BackgroundAnimation;