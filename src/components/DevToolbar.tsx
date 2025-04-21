import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface DevToolbarProps {
  onToggleLogin: (isLoggedIn: boolean) => void;
  isLoggedIn: boolean;
}

const ToolbarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #333;
  color: white;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 9999;
  font-size: 14px;
`;

const ToolbarTitle = styled.div`
  font-weight: bold;
  margin-right: 16px;
`;

const Controls = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 24px;
    
    &:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }
  
  input:checked + span {
    background-color: #2196F3;
  }
  
  input:checked + span:before {
    transform: translateX(16px);
  }
`;

const HelpText = styled.div`
  font-size: 12px;
  opacity: 0.7;
  margin-left: auto;
`;

const DevToolbar: React.FC<DevToolbarProps> = ({ onToggleLogin, isLoggedIn }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Check if we're in development mode and initialize visibility
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Default to hidden, but remember user preference
      const savedVisibility = localStorage.getItem('devToolbarVisible');
      setIsVisible(savedVisibility === 'true');
    }
  }, []);
  
  // Set up keyboard shortcut to toggle the toolbar
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+Shift+D to toggle toolbar
      if (event.ctrlKey && event.shiftKey && event.key === 'D') {
        setIsVisible(prev => {
          const newValue = !prev;
          localStorage.setItem('devToolbarVisible', String(newValue));
          return newValue;
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  // Early return if toolbar is not visible
  if (!isVisible) return null;
  
  return (
    <ToolbarContainer>
      <ToolbarTitle>Developer Toolbar</ToolbarTitle>
      <Controls>
        <ToggleContainer>
          <span>Authentication:</span>
          <Switch>
            <input 
              type="checkbox" 
              checked={isLoggedIn}
              onChange={(e) => onToggleLogin(e.target.checked)}
            />
            <span></span>
          </Switch>
          <span>{isLoggedIn ? 'Logged In' : 'Logged Out'}</span>
        </ToggleContainer>
      </Controls>
      <HelpText>Press Ctrl+Shift+D to show/hide</HelpText>
    </ToolbarContainer>
  );
};

export default DevToolbar; 