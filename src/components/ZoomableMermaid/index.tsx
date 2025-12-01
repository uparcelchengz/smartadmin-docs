import React, { useEffect, useRef } from 'react';
import mediumZoom from 'medium-zoom';
import './styles.module.css';

interface ZoomableMermaidProps {
  chart: string;
  title?: string;
  id?: string;
}

const ZoomableMermaid: React.FC<ZoomableMermaidProps> = ({ 
  chart, 
  title, 
  id = `mermaid-${Math.random().toString(36).substr(2, 9)}` 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeMermaidZoom = () => {
      if (containerRef.current) {
        // Look for both .mermaid containers and SVG elements
        const mermaidElement = containerRef.current.querySelector('.mermaid');
        const svgElement = containerRef.current.querySelector('svg');
        
        const targetElement = svgElement || mermaidElement;
        
        if (targetElement && !(targetElement as HTMLElement).dataset.zoomInitialized) {
          // Mark as initialized to prevent double-init
          (targetElement as HTMLElement).dataset.zoomInitialized = 'true';
          
          // Add zoom cursor and styles
          (targetElement as HTMLElement).style.cursor = 'zoom-in';
          (targetElement as HTMLElement).style.transition = 'transform 0.2s ease';
          
          // Initialize medium-zoom
          mediumZoom(targetElement as any, {
            background: 'rgba(26, 13, 46, 0.95)',
            margin: 20,
            scrollOffset: 0,
            container: {
              top: 50,
              right: 50,
              bottom: 50,
              left: 50,
            },
          });
          
          console.log('ZoomableMermaid: Zoom initialized for:', targetElement);
        }
      }
    };

    // Multiple timing attempts to catch Mermaid rendering
    const timers = [
      setTimeout(initializeMermaidZoom, 100),
      setTimeout(initializeMermaidZoom, 300),
      setTimeout(initializeMermaidZoom, 600),
      setTimeout(initializeMermaidZoom, 1000),
      setTimeout(initializeMermaidZoom, 2000)
    ];

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [chart]);

  return (
    <div className="zoomable-mermaid-container" ref={containerRef}>
      {title && <div className="mermaid-title">{title}</div>}
      <div className="mermaid-wrapper">
        <div 
          className="mermaid"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px',
          }}
          dangerouslySetInnerHTML={{ 
            __html: `<div class="mermaid">${chart}</div>` 
          }}
        />
        <div className="zoom-hint">
          🔍 Click diagram to zoom and explore details
        </div>
      </div>
    </div>
  );
};

export default ZoomableMermaid;