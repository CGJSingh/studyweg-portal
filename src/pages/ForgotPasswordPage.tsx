import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ForgotPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  max-width: 450px;
  margin: 4rem auto;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #3f51b5;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 2rem;
  text-align: center;
`;

const FormGroup = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px 20px;
  background-color: #3f51b5;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #303f9f;
  }

  &:disabled {
    background-color: #9fa8da;
    cursor: not-allowed;
  }
`;

const BackToLogin = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: #3f51b5;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  color: #f44336;
  margin-top: 0.5rem;
  font-size: 0.875rem;
`;

const SuccessMessage = styled.div`
  color: #4caf50;
  margin-top: 1rem;
  padding: 1rem;
  background-color: #e8f5e9;
  border-radius: 5px;
  text-align: center;
`;

const IconWrapper = styled.div`
  margin-bottom: 1.5rem;
  color: #3f51b5;
  font-size: 3rem;
  text-align: center;
`;

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError('');
    setLoading(true);

    try {
      // Here you would add your password reset logic
      // For example:
      // await authService.sendPasswordResetEmail(email);
      
      // Simulate API delay
      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
      }, 1500);
    } catch (err) {
      setLoading(false);
      setError('Failed to send reset instructions. Please try again.');
    }
  };

  return (
    <ForgotPasswordContainer>
      {!submitted ? (
        <>
          <IconWrapper>
            <FontAwesomeIcon icon={['fas', 'key']} />
          </IconWrapper>
          <Title>Forgot your password?</Title>
          <Subtitle>Enter your email address and we'll send you instructions to reset your password.</Subtitle>
          
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <FormGroup>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
              {error && <ErrorMessage>{error}</ErrorMessage>}
            </FormGroup>
            
            <Button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Instructions'}
            </Button>
          </form>
        </>
      ) : (
        <>
          <IconWrapper>
            <FontAwesomeIcon icon={['fas', 'check-circle']} />
          </IconWrapper>
          <Title>Check your email</Title>
          <SuccessMessage>
            If an account exists for {email}, you will receive password reset instructions.
          </SuccessMessage>
        </>
      )}
      
      <BackToLogin>
        <StyledLink to="/login">
          <FontAwesomeIcon icon={['fas', 'arrow-left']} style={{ marginRight: '0.5rem' }} />
          Back to Login
        </StyledLink>
      </BackToLogin>
    </ForgotPasswordContainer>
  );
};

export default ForgotPasswordPage; 