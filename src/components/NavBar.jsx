import React, { useState } from 'react';
import './NavBar.css';

const TABS = ['All Flights', 'Delayed', 'Weather Affected', 'Domestic', 'International'];

export default function NavBar({ onTabChange }) {
  const [active, setActive] = useState('All Flights');

  const handleClick = (tab) => {
    setActive(tab);
    if (onTabChange) onTabChange(tab);
  };

  return (
    <nav className="navbar">
      {TABS.map(tab => (
        <button
          key={tab}
          className={`nav-tab${active === tab ? ' active' : ''}`}
          onClick={() => handleClick(tab)}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}
