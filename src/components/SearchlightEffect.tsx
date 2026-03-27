import React from 'react';
import './SearchlightEffect.css';

const SearchlightEffect: React.FC = () => {
  return (
    <div className="searchlight-container">
      {/* Haze / fog layer */}
      <div className="searchlight-haze" />
      
      {/* The rotating beam */}
      <div className="searchlight-origin">
        <div className="searchlight-beam" />
      </div>
      
      {/* Subtle water ripple at bottom */}
      <div className="searchlight-ripple" />
    </div>
  );
};

export default SearchlightEffect;
