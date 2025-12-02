import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import './styles.css';

/**
 * Mobile Sidebar Navigation
 * 
 * TO ADD NEW PAGES: Update the 'navigationStructure' array below
 * 
 * For top-level pages: { id: 'filename', label: 'Display Name', icon: '📋' }
 * For categories: { 
 *   type: 'category', 
 *   label: 'Category Name', 
 *   icon: '🤖', 
 *   items: [{ id: 'folder/filename', label: 'Display Name' }] 
 * }
 */

// Static navigation structure - update this when you add new docs
// Here to edit the mobile sidebar navigation items
const navigationStructure = [
  // Top-level docs (no category)
  { id: 'overview', label: 'Project Overview', icon: '📋' },
  { id: 'architecture', label: 'Architecture', icon: '🏗️' },
  { id: 'action', label: 'Action Framework', icon: '⚡' },
  
  // AI Integration category
  {
    type: 'category',
    label: 'AI Integration',
    icon: '🤖',
    items: [
      { id: 'ai/openai', label: 'OpenAI API' },
      { id: 'ai/openrouter', label: 'OpenRouter API' },
      { id: 'ai/local', label: 'Local LLaMA' },
      { id: 'ai/rag', label: 'RAG System' },
    ]
  },
  
  // Electron Components category
  {
    type: 'category',
    label: 'Electron Components',
    icon: '⚙️',
    items: [
      { id: 'electron/main', label: 'Main Process' },
      { id: 'electron/renderer', label: 'Renderer Process' },
      { id: 'electron/ipc', label: 'IPC Communication' },
    ]
  },
  
  // User Guide category
  {
    type: 'category',
    label: 'User Guide',
    icon: '👤',
    items: [
      { id: 'user/login', label: 'Login System' },
      { id: 'user/login-browser', label: 'Browser Login' },
    ]
  }
];

const MobileSidebarToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 996);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  if (!isMobile) return null;

  const renderNavItem = (item) => {
    const href = `/docs/${item.id}`;
    const isActive = location.pathname === href;
    
    return (
      <div key={item.id} className="nav-item">
        <Link 
          to={href} 
          onClick={() => setIsOpen(false)}
          className={isActive ? 'active' : ''}
        >
          {item.icon && `${item.icon} `}{item.label}
        </Link>
      </div>
    );
  };

  const renderSection = (section) => {
    if (section.type === 'category') {
      return (
        <div key={section.label} className="nav-section">
          <div className="nav-category">
            {section.icon} {section.label}
          </div>
          {section.items?.map(renderNavItem)}
        </div>
      );
    } else {
      // Top-level item
      return renderNavItem(section);
    }
  };

  return (
    <>
      <button 
        className="mobile-sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle mobile navigation"
      >
        <div className={`hamburger ${isOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {isOpen && (
        <div className="mobile-sidebar-overlay" onClick={() => setIsOpen(false)}>
          <div className="mobile-sidebar" onClick={e => e.stopPropagation()}>
            <div className="mobile-sidebar-header">
              <h3>Documentation</h3>
              <button 
                className="close-btn" 
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation"
              >
                ×
              </button>
            </div>

            <div className="mobile-sidebar-content">
              {navigationStructure.map(renderSection)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileSidebarToggle;