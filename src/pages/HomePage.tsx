import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 800px;
  margin-bottom: 2rem;
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #f39c12;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 2rem 0;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to programs page after a short delay
    const timer = setTimeout(() => {
      navigate('/programs');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <HomeContainer>
      <Title>Welcome to StudyWeg</Title>
      <Subtitle>
        Your gateway to educational opportunities and career advancement.
        Redirecting you to our programs...
      </Subtitle>
      <LoadingSpinner />
    </HomeContainer>
  );
};

export default HomePage; 