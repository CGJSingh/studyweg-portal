import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';
import DevToolbar from './DevToolbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Main = styled.main`
  min-height: calc(100vh - 200px); /* Adjust based on navbar and footer height */
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Main>{children}</Main>
      <Footer />
      <DevToolbar 
        isLoggedIn={isLoggedIn} 
        onToggleLogin={setIsLoggedIn} 
      />
    </>
  );
};

export default Layout; 