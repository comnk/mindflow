import React from 'react';
import './FeatureCard.css';

function FeatureCard({ title, description, icon }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h2 className="feature-title">{title}</h2>
      <p className="feature-description">{description}</p>
    </div>
  );
}

export default FeatureCard;
