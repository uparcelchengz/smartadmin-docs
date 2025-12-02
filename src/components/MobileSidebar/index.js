import React, { useState, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import './styles.css';

const MobileSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState(new Set());

  const sidebarItems = [
    {
      type: 'doc',
      id: 'overview',
      label: 'Project Overview',
      href: '/docs/overview',
    },
    {
      type: 'doc',
      id: 'architecture', 
      label: 'Architecture',
      href: '/docs/architecture',
    },
    {
      type: 'doc',
      id: 'action',
      label: 'Action Scripts',
      href: '/docs/action',
    },
    {
      type: 'category',
      label: 'AI Model Related',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'ai/local',
          label: 'Local LLaMA',
          href: '/docs/ai/local',
        },
        {
          type: 'doc',
          id: 'ai/openai',
          label: 'OpenAI Integration',
          href: '/docs/ai/openai',
        },
        {
          type: 'doc',
          id: 'ai/openrouter',
          label: 'OpenRouter API',
          href: '/docs/ai/openrouter',
        },
        {
          type: 'doc',
          id: 'ai/rag',
          label: 'RAG System',
          href: '/docs/ai/rag',
        },
      ],
    },
    {
      type: 'category',
      label: 'Electron Framework Related',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'electron/main',
          label: 'Main Process',
          href: '/docs/electron/main',
        },
        {
          type: 'doc',
          id: 'electron/renderer',
          label: 'Renderer Process',
          href: '/docs/electron/renderer',
        },
        {
          type: 'doc',
          id: 'electron/ipc',
          label: 'IPC Communication',
          href: '/docs/electron/ipc',
        },
      ],
    },
    {
      type: 'category',
      label: 'User Authentication',
      collapsed: false,
      items: [
        {
          type: 'doc',
          id: 'user/login',
          label: 'Login System',
          href: '/docs/user/login',
        },
        {
          type: 'doc',
          id: 'user/login-browser',
          label: 'Browser Extension',
          href: '/docs/user/login-browser',
        },
      ],
    },
  ];

  const toggleCategory = (categoryLabel) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryLabel)) {
      newExpanded.delete(categoryLabel);
    } else {
      newExpanded.add(categoryLabel);
    }
    setExpandedCategories(newExpanded);
  };

  const isActiveLink = (href) => {
    return location.pathname === href;
  };

  const renderSidebarItem = (item, isSubItem = false) => {
    if (item.type === 'doc') {
      return (
        <Link
          key={item.id}
          to={item.href}
          className={`custom-mobile-menu-link ${isSubItem ? 'custom-mobile-menu-sublink' : ''} ${
            isActiveLink(item.href) ? 'active' : ''
          }`}
          onClick={onClose}
        >
          {item.label}
        </Link>
      );
    }

    if (item.type === 'category') {
      const isExpanded = expandedCategories.has(item.label);
      return (
        <div key={item.label} className={`custom-mobile-menu-category ${isExpanded ? 'expanded' : ''}`}>
          <div className="custom-mobile-menu-category-header" onClick={() => toggleCategory(item.label)}>
            <div className="custom-mobile-menu-category-link">
              {item.label}
              <span className="custom-mobile-menu-category-arrow">▶</span>
            </div>
          </div>
          {isExpanded && (
            <div className="custom-mobile-menu-subcategory">
              {item.items.map((subItem) => renderSidebarItem(subItem, true))}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="custom-mobile-backdrop active" onClick={onClose} />
      <div className={`custom-mobile-sidebar ${isOpen ? 'active' : ''}`}>
        <div className="custom-mobile-sidebar-header">
          <span className="custom-mobile-sidebar-title">SmartAdmin Docs</span>
          <button className="custom-mobile-sidebar-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="custom-mobile-sidebar-content">
          {sidebarItems.map((item) => (
            <div key={item.id || item.label} className="custom-mobile-menu-item">
              {renderSidebarItem(item)}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;