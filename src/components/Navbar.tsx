import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavbarContainer = styled.nav<{ isScrolled: boolean }>`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.isScrolled ? 'white' : 'transparent'};
  box-shadow: ${props => props.isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
  padding: 1rem 2rem;
  z-index: 1000;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
`;

const NavbarContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #0c3b5e;
  text-decoration: none;
  display: flex;
  align-items: center;
  
  img {
    height: 40px;
    width: auto;
    object-fit: contain;
  }
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 250px;
    flex-direction: column;
    background-color: white;
    padding: 2rem;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease;
    z-index: 1001;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const NavLink = styled(Link)<{ isActive: boolean }>`
  margin: 0 1rem;
  color: ${props => props.isActive ? '#f39c12' : '#333'};
  text-decoration: none;
  font-weight: ${props => props.isActive ? '600' : '500'};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${props => props.isActive ? '100%' : '0'};
    height: 2px;
    background-color: #f39c12;
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
  
  @media (max-width: 768px) {
    margin: 1rem 0;
    font-size: 1.1rem;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  
  @media (max-width: 768px) {
    display: block;
    z-index: 1002;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 1000;
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: 1rem;
  
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 1rem;
    flex-direction: column;
    width: 100%;
  }
`;

const LoginButton = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: 500;
  color: #0c3b5e;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(12, 59, 94, 0.1);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const SignupButton = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background-color: #0c3b5e;
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #092b47;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const UserMenu = styled.div`
  position: relative;
  margin-left: 1rem;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserMenuDropdown = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  width: 200px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  margin-top: 0.5rem;
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 1001;
`;

const UserMenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: #333;
  text-decoration: none;
  transition: background-color 0.3s ease;
  
  svg {
    margin-right: 0.75rem;
    width: 1rem;
  }
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const UserMenuDivider = styled.div`
  height: 1px;
  background-color: #eee;
  margin: 0.5rem 0;
`;

const DemoToggle = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #0c3b5e;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #092b47;
  }
`;

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // In a real app, this would come from your auth state
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    const userMenu = document.getElementById('user-menu');
    
    if (userMenu && !userMenu.contains(target)) {
      setIsUserMenuOpen(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <>
      <NavbarContainer isScrolled={isScrolled}>
        <NavbarContent>
          <Logo to="/">
            <img 
              src="https://test.studyweg.ca/wp-content/uploads/2024/06/StudyWeg-Logo-3-e1720449945770.png" 
              alt="StudyWeg Logo" 
            />
          </Logo>
          
          <MobileMenuButton onClick={toggleMenu}>
            ☰
          </MobileMenuButton>
          
          <NavLinks isOpen={isMenuOpen}>
            <CloseButton onClick={toggleMenu}>×</CloseButton>
            <NavLink to="/" isActive={location.pathname === '/'}>
              Home
            </NavLink>
            <NavLink to="/programs" isActive={location.pathname === '/programs' || location.pathname.startsWith('/programs/')}>
              Programs
            </NavLink>
            {isLoggedIn && (
              <NavLink to="/dashboard" isActive={location.pathname === '/dashboard'}>
                Dashboard
              </NavLink>
            )}
            <NavLink to="/about" isActive={location.pathname === '/about'}>
              About Us
            </NavLink>
            <NavLink to="/contact" isActive={location.pathname === '/contact'}>
              Contact
            </NavLink>
            
            {!isLoggedIn ? (
              <AuthButtons>
                <LoginButton to="/login">Log In</LoginButton>
                <SignupButton to="/register">Sign Up</SignupButton>
              </AuthButtons>
            ) : (
              <UserMenu id="user-menu">
                <UserAvatar onClick={toggleUserMenu}>
                  <img src="https://via.placeholder.com/40" alt="User" />
                </UserAvatar>
                <UserMenuDropdown isOpen={isUserMenuOpen}>
                  <UserMenuItem to="/profile">
                    <FontAwesomeIcon icon={['fas', 'user']} /> Profile
                  </UserMenuItem>
                  <UserMenuItem to="/dashboard">
                    <FontAwesomeIcon icon={['fas', 'tachometer-alt']} /> Dashboard
                  </UserMenuItem>
                  <UserMenuItem to="/settings">
                    <FontAwesomeIcon icon={['fas', 'cog']} /> Settings
                  </UserMenuItem>
                  <UserMenuDivider />
                  <UserMenuItem to="/" onClick={() => setIsLoggedIn(false)}>
                    <FontAwesomeIcon icon={['fas', 'sign-out-alt']} /> Logout
                  </UserMenuItem>
                </UserMenuDropdown>
              </UserMenu>
            )}
          </NavLinks>
        </NavbarContent>
      </NavbarContainer>
      
      <Overlay isOpen={isMenuOpen} onClick={toggleMenu} />
      
      {/* Demo toggle button */}
      <DemoToggle onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? 'Switch to Logged Out' : 'Switch to Logged In'}
      </DemoToggle>
    </>
  );
};

export default Navbar; 