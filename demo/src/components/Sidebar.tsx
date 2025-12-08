import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { componentTree, ComponentNode } from '../utils/componentTree';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  const handleLinkClick = (path: string) => {
    navigate(path);
    onClose();
  };

  const renderNode = (node: ComponentNode, level: number = 0): React.ReactNode => {
    if (node.children) {
      const isExpanded = expandedCategories.has(node.name);
      return (
        <div key={node.name} className="sidebar-node">
          <button
            className={`sidebar-category ${isExpanded ? 'expanded' : ''}`}
            onClick={() => toggleCategory(node.name)}
            style={{ paddingLeft: `${level * 16 + 12}px` }}
          >
            <svg
              className="sidebar-chevron"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.5 3L7.5 6L4.5 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{node.name}</span>
          </button>
          {isExpanded && (
            <div className="sidebar-children">
              {node.children.map((child) => renderNode(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    if (node.path) {
      const isActive = location.pathname === node.path;
      return (
        <a
          key={node.name}
          href={node.path}
          className={`sidebar-link ${isActive ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick(node.path!);
          }}
          style={{ paddingLeft: `${level * 16 + 32}px` }}
        >
          {node.name}
        </a>
      );
    }

    return null;
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Components</h2>
          <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <nav className="sidebar-nav">
          {componentTree.map((node) => renderNode(node))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

