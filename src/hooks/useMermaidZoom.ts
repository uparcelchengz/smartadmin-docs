import { useEffect } from 'react';

export const useMermaidModal = () => {
  useEffect(() => {
    const initializeModal = () => {
      // Find all Mermaid SVG elements
      const svgElements = document.querySelectorAll('svg[id^="mermaid-"], .mermaid svg, svg.flowchart');
      
      // Find all images in markdown content
      const imgElements = document.querySelectorAll('article img, .markdown img, main img, [class*="docItemContainer"] img');
      
      console.log(`Found ${svgElements.length} Mermaid diagrams and ${imgElements.length} images`);
      
      // Handle Mermaid diagrams
      svgElements.forEach((svg, index) => {
        const svgElement = svg as HTMLElement;
        
        // Skip if already has modal functionality
        if (svgElement.getAttribute('data-modal-ready')) {
          return;
        }
        
        // Mark as initialized
        svgElement.setAttribute('data-modal-ready', 'true');
        
        // Style the SVG
        svgElement.style.cursor = 'pointer';
        svgElement.style.border = '1px solid rgba(162, 89, 255, 0.3)';
        svgElement.style.borderRadius = '8px';
        svgElement.style.padding = '10px';
        svgElement.style.background = 'rgba(26, 13, 46, 0.3)';
        svgElement.style.transition = 'all 0.2s ease';
        
        // Add hover effect
        svgElement.addEventListener('mouseenter', () => {
          svgElement.style.transform = 'scale(1.02)';
          svgElement.style.boxShadow = '0 5px 15px rgba(162, 89, 255, 0.4)';
        });
        
        svgElement.addEventListener('mouseleave', () => {
          svgElement.style.transform = 'scale(1)';
          svgElement.style.boxShadow = 'none';
        });
        
        // Add click handler for modal
        svgElement.addEventListener('click', () => {
          createModal(svgElement.cloneNode(true) as HTMLElement, 'diagram');
        });
        
        console.log(`Modal functionality added to diagram ${index + 1}`);
      });
      
      // Handle images
      imgElements.forEach((img, index) => {
        const imgElement = img as HTMLImageElement;
        
        // Skip if already has modal functionality
        if (imgElement.getAttribute('data-modal-ready')) {
          return;
        }
        
        // Mark as initialized
        imgElement.setAttribute('data-modal-ready', 'true');
        
        // Style the image
        imgElement.style.cursor = 'pointer';
        imgElement.style.border = '1px solid rgba(162, 89, 255, 0.2)';
        imgElement.style.borderRadius = '8px';
        imgElement.style.transition = 'all 0.2s ease';
        
        // Add hover effect
        imgElement.addEventListener('mouseenter', () => {
          imgElement.style.transform = 'scale(1.02)';
          imgElement.style.boxShadow = '0 5px 15px rgba(162, 89, 255, 0.4)';
          imgElement.style.borderColor = 'rgba(162, 89, 255, 0.5)';
        });
        
        imgElement.addEventListener('mouseleave', () => {
          imgElement.style.transform = 'scale(1)';
          imgElement.style.boxShadow = 'none';
          imgElement.style.borderColor = 'rgba(162, 89, 255, 0.2)';
        });
        
        // Add click handler for modal
        imgElement.addEventListener('click', () => {
          const imgClone = imgElement.cloneNode(true) as HTMLImageElement;
          createModal(imgClone, 'image');
        });
        
        console.log(`Modal functionality added to image ${index + 1}`);
      });
    };
    
    const createModal = (element: HTMLElement, type: 'diagram' | 'image') => {
      // Create modal overlay
      const modal = document.createElement('div');
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(26, 13, 46, 0.95);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: zoom-out;
        backdrop-filter: blur(10px);
      `;
      
      // Style the element for modal
      if (type === 'diagram') {
        element.style.cssText = `
          max-width: 90vw;
          max-height: 90vh;
          background: rgba(45, 24, 70, 0.9);
          border: 2px solid #a259ff;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 25px 80px rgba(162, 89, 255, 0.4);
        `;
      } else {
        element.style.cssText = `
          max-width: 90vw;
          max-height: 90vh;
          border: 2px solid #a259ff;
          border-radius: 12px;
          box-shadow: 0 25px 80px rgba(162, 89, 255, 0.4);
          object-fit: contain;
        `;
      }
      
      // Add close instruction
      const instruction = document.createElement('div');
      instruction.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        color: #c7a4ff;
        font-size: 14px;
        background: rgba(162, 89, 255, 0.8);
        padding: 8px 12px;
        border-radius: 6px;
        pointer-events: none;
      `;
      instruction.textContent = 'Click anywhere to close';
      
      modal.appendChild(element);
      modal.appendChild(instruction);
      
      // Add to document
      document.body.appendChild(modal);
      
      // Close on click
      modal.addEventListener('click', () => {
        document.body.removeChild(modal);
      });
      
      // Close on escape key
      const escapeHandler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          document.body.removeChild(modal);
          document.removeEventListener('keydown', escapeHandler);
        }
      };
      document.addEventListener('keydown', escapeHandler);
    };

    // Initial initialization
    setTimeout(initializeModal, 500);
    
    // Re-initialize when content changes
    const observer = new MutationObserver((mutations) => {
      let hasNewContent = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          hasNewContent = true;
        }
      });
      
      if (hasNewContent) {
        setTimeout(initializeModal, 300);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);
};

export default useMermaidModal;