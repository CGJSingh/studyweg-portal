import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  max-width: 500px;
  margin: 4rem auto;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #3f51b5;
  margin-bottom: 1rem;
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

const LoginPrompt = styled.div`
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
  margin-top: 0.5rem;
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

const TermsText = styled.p`
  font-size: 0.85rem;
  color: #666;
  text-align: center;
  margin-top: 1.5rem;
`;

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      // Here you would add your registration logic
      // For example:
      // await authService.register(formData);
      
      // Simulate API delay
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setLoading(false);
      setErrors({ 
        general: 'Registration failed. Please try again.' 
      });
    }
  };

  const handleGoogleSignup = () => {
    // Implement Google OAuth signup logic
    console.log('Google signup clicked');
  };

  const handleAppleSignup = () => {
    // Implement Apple OAuth signup logic
    console.log('Apple signup clicked');
  };

  return (
    <RegisterContainer>
      <Title>Create an Account</Title>
      <Subtitle>Join StudyWeg and access all our features</Subtitle>
      
      <SocialLoginContainer>
        <SocialLoginButton onClick={handleGoogleSignup}>
          <FontAwesomeIcon icon={['fab', 'google']} />
          Sign up with Google
        </SocialLoginButton>
        <SocialLoginButton onClick={handleAppleSignup}>
          <FontAwesomeIcon icon={['fab', 'apple']} />
          Sign up with Apple
        </SocialLoginButton>
      </SocialLoginContainer>
      
      <OrDivider>
        <span>or sign up with email</span>
      </OrDivider>
      
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <FormGroup style={{ flex: 1 }}>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Enter your first name"
            />
            {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup style={{ flex: 1 }}>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Enter your last name"
            />
            {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
          </FormGroup>
        </div>
        
        <FormGroup>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Create a password"
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
        </FormGroup>
        
        {errors.general && <ErrorMessage>{errors.general}</ErrorMessage>}
        
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
        
        <TermsText>
          By signing up, you agree to our <StyledLink to="/terms">Terms of Service</StyledLink> and <StyledLink to="/privacy">Privacy Policy</StyledLink>
        </TermsText>
      </form>
      
      <LoginPrompt>
        Already have an account? <StyledLink to="/login">Log in</StyledLink>
      </LoginPrompt>
    </RegisterContainer>
  );
};

export default RegisterPage; 