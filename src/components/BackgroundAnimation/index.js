import React, { useEffect } from 'react';

const BackgroundAnimation = () => {
  useEffect(() => {
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
      
      // Add horizontal drift for gas movement
      const drift = (Math.random() * 60 - 30).toFixed(2);
      span.style.setProperty('--drift', drift + 'px');
      
      // Add scale variation
      const scaleVariation = (Math.random() * 0.4 + 0.8).toFixed(2);
      span.style.setProperty('--scale', scaleVariation);
      
      span.style.animation = `gasFloat ${duration}s linear ${delay}s infinite`;
      
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
      
      microBubble.style.setProperty('--drift', microDrift + 'px');
      microBubble.style.setProperty('--scale', '1');
      microBubble.style.animation = `microGasFloat ${microDuration}s linear ${microDelay}s infinite`;
      
      microBubble.style.position = 'absolute';
      microBubble.style.borderRadius = '50%';
      microBubble.style.pointerEvents = 'none';
      microBubble.style.willChange = 'transform, opacity';
      
      container.appendChild(microBubble);
    }
  }, []);

  return <div className="bg-animation" aria-hidden="true" />;
};

export default BackgroundAnimation;