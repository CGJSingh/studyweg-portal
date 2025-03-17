import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LoginContainer = styled.div`
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
  margin-bottom: 1.5rem;
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

const ForgotPassword = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const SignUpPrompt = styled.div`
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

const SocialLoginContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

const SocialLoginButton = styled.button`
  width: 100%;
  padding: 12px 20px;
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
  }

  svg {
    margin-right: 10px;
  }
`;

const OrDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0;
  color: #666;

  &:before,
  &:after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #ddd;
  }

  span {
    margin: 0 10px;
    font-size: 0.9rem;
  }
`;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Here you would add your authentication logic
      // For example:
      // await authService.login(email, password);
      
      // Simulate API delay
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setLoading(false);
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleGoogleLogin = () => {
    // Implement Google OAuth logic
    console.log('Google login clicked');
  };

  const handleAppleLogin = () => {
    // Implement Apple OAuth logic
    console.log('Apple login clicked');
  };

  return (
    <LoginContainer>
      <Title>Welcome Back</Title>
      
      <SocialLoginContainer>
        <SocialLoginButton onClick={handleGoogleLogin}>
          <FontAwesomeIcon icon={['fab', 'google']} />
          Continue with Google
        </SocialLoginButton>
        <SocialLoginButton onClick={handleAppleLogin}>
          <FontAwesomeIcon icon={['fab', 'apple']} />
          Continue with Apple
        </SocialLoginButton>
      </SocialLoginContainer>
      
      <OrDivider>
        <span>or login with email</span>
      </OrDivider>
      
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
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </FormGroup>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </Button>
      </form>
      
      <ForgotPassword>
        <StyledLink to="/forgot-password">Forgot password?</StyledLink>
      </ForgotPassword>
      
      <SignUpPrompt>
        Don't have an account? <StyledLink to="/register">Sign up</StyledLink>
      </SignUpPrompt>
    </LoginContainer>
  );
};

export default LoginPage; 