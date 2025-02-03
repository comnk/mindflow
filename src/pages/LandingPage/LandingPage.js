import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Nav/Navbar';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import './LandingPage.css';

function LandingPage() {
  return (
    <>
      <Navbar />
      <div className="landing-page">
        <h1 className="landing-title">Welcome to MindFlow</h1>
        <p className="landing-subtitle">Your companion for mental clarity and mindfulness</p>

        <div className="features-container">
          <FeatureCard
            icon="📝"
            title="Journaling Chatbot"
            description="Write your thoughts and get insights with our intelligent chatbot."
          />
          <FeatureCard
            icon="🎥"
            title="Mindfulness Video Library"
            description="Explore a curated library of videos to relax and focus."
          />
          <FeatureCard
            icon="👤"
            title="Custom Profile"
            description="Track your progress and personalize your experience."
          />
        </div>

        <div className="video-container">
          <iframe width="600" height="480" src="https://www.youtube.com/embed/sYksDJUJg7M" title="Mindflow Demo" frameborder="0" />
        </div>
        <Link to="/register" className="signup-button">Sign Up</Link>
      </div>
    </>
  );
}

export default LandingPage;
