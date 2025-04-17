import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faLinkedinIn,
  faYoutube,
  faTiktok
} from '@fortawesome/free-brands-svg-icons';

const FooterContainer = styled.footer`
  background-color: #0c3b5e;
  padding: 3rem 2rem;
  margin-top: 3rem;
  color: white;
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
  color: white;
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
  color: #f0f0f0;
  text-decoration: none;
  margin-bottom: 0.8rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: #f39c12;
  }
`;

const FooterText = styled.p`
  color: #f0f0f0;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

const SocialLink = styled.a`
  color: #f0f0f0;
  font-size: 1.2rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  
  &:hover {
    color: white;
    background-color: #f39c12;
    transform: translateY(-3px);
  }
`;

const BottomBar = styled.div`
  max-width: 1200px;
  margin: 2rem auto 0;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Copyright = styled.p`
  color: #f0f0f0;
  font-size: 0.9rem;
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const BottomLink = styled(Link)`
  color: #f0f0f0;
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
            7800 Keele St. Unit 206<br />
            Concord, ON, L4K 4G7<br />
            Canada
          </FooterText>
          <FooterText>
            <strong>Phone:</strong> +1 (365) 775-2128<br />
            <strong>Email:</strong> info@studyweg.ca
          </FooterText>
          
          <FooterTitle style={{ marginTop: '1rem' }}>Follow Us</FooterTitle>
          <SocialLinks>
            <SocialLink href="https://linkedin.com/in/studyweg" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </SocialLink>
            <SocialLink href="https://instagram.com/studywegofficial" target="_blank" rel="noopener noreferrer" title="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </SocialLink>
            <SocialLink href="https://facebook.com/studyweg" target="_blank" rel="noopener noreferrer" title="Facebook">
              <FontAwesomeIcon icon={faFacebookF} />
            </SocialLink>
            <SocialLink href="https://twitter.com/studyweg" target="_blank" rel="noopener noreferrer" title="Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </SocialLink>
            <SocialLink href="https://youtube.com/@studyweg" target="_blank" rel="noopener noreferrer" title="YouTube">
              <FontAwesomeIcon icon={faYoutube} />
            </SocialLink>
            <SocialLink href="https://tiktok.com/@studyweg" target="_blank" rel="noopener noreferrer" title="TikTok">
              <FontAwesomeIcon icon={faTiktok} />
            </SocialLink>
          </SocialLinks>
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