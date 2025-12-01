import React from 'react';
import BackgroundAnimation from '@site/src/components/BackgroundAnimation';
import { useMermaidModal } from '@site/src/hooks/useMermaidZoom';

export default function Root({children}) {
  // Enable modal functionality on all Mermaid diagrams automatically
  useMermaidModal();
  
  return (
    <>
      <BackgroundAnimation />
      {children}
    </>
  );
}