import React from 'react';
import MobileSidebarToggle from '@site/src/components/MobileSidebarToggle';
import BackgroundAnimation from '@site/src/components/BackgroundAnimation';

export default function Root({children}) {
  return (
    <>
      <BackgroundAnimation />
      {children}
      <MobileSidebarToggle />
    </>
  );
}