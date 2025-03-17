import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faLinkedinIn 
} from '@fortawesome/free-brands-svg-icons';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  padding: 3rem 2rem;
  margin-top: 3rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  color: #0c3b5e;
  margin-bottom: 1.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: #f39c12;
  }
`;

const FooterLink = styled(Link)`
  color: #555;
  text-decoration: none;
  margin-bottom: 0.8rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: #f39c12;
  }
`;

const FooterText = styled.p`
  color: #555;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: #555;
  font-size: 1.2rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: #f39c12;
  }
`;

const BottomBar = styled.div`
  max-width: 1200px;
  margin: 2rem auto 0;
  padding-top: 1.5rem;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Copyright = styled.p`
  color: #777;
  font-size: 0.9rem;
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const BottomLink = styled(Link)`
  color: #777;
  font-size: 0.9rem;
  text-decoration: none;
  
  &:hover {
    color: #f39c12;
    text-decoration: underline;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>StudyWeg</FooterTitle>
          <FooterText>
            StudyWeg is dedicated to helping students achieve their educational and career goals through our comprehensive programs and support services.
          </FooterText>
          <SocialLinks>
            <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} />
            </SocialLink>
            <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </SocialLink>
            <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </SocialLink>
            <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </SocialLink>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/programs">Programs</FooterLink>
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
          <FooterLink to="/faq">FAQ</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Programs</FooterTitle>
          <FooterLink to="/programs/category/undergraduate">Undergraduate</FooterLink>
          <FooterLink to="/programs/category/graduate">Graduate</FooterLink>
          <FooterLink to="/programs/category/certificate">Certificate Programs</FooterLink>
          <FooterLink to="/programs/category/diploma">Diploma Courses</FooterLink>
          <FooterLink to="/programs/category/short-course">Short Courses</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contact Us</FooterTitle>
          <FooterText>
            123 Education Street<br />
            Toronto, ON M5V 2K7<br />
            Canada
          </FooterText>
          <FooterText>
            <strong>Phone:</strong> +1 (123) 456-7890<br />
            <strong>Email:</strong> info@studyweg.com
          </FooterText>
        </FooterSection>
      </FooterContent>
      
      <BottomBar>
        <Copyright>
          &copy; {new Date().getFullYear()} StudyWeg. All rights reserved.
        </Copyright>
        
        <BottomLinks>
          <BottomLink to="/privacy">Privacy Policy</BottomLink>
          <BottomLink to="/terms">Terms of Service</BottomLink>
          <BottomLink to="/sitemap">Sitemap</BottomLink>
        </BottomLinks>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer; 