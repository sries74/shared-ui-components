import React from 'react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="home-hero">
        <h1>Shared Component Library</h1>
        <p>A comprehensive collection of reusable React components built with TypeScript</p>
      </div>
      <div className="home-content">
        <h2>Getting Started</h2>
        <p>Use the menu button in the top left to browse all available components.</p>
        <p>Each component page includes:</p>
        <ul>
          <li>Live component demo</li>
          <li>Interactive property panel</li>
          <li>Code examples with copy functionality</li>
          <li>Popular attributes and examples</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;

