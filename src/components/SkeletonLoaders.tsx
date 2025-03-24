import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled, { keyframes } from 'styled-components';

// Styled components for skeleton layouts
const SkeletonContainer = styled.div`
  padding: 1rem 0;
  width: 100%;
`;

const SkeletonCard = styled.div`
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

const SkeletonRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SkeletonColumn = styled.div`
  flex: 1;
`;

const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
  background-size: 2000px 100%;
  animation: ${shimmer} 2s linear infinite;
`;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 2rem 1rem;
`;

const SearchBarSkeleton = styled(SkeletonBase)`
  height: 48px;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  max-width: 600px;
`;

const FilterButtonSkeleton = styled(SkeletonBase)`
  width: 120px;
  height: 48px;
  border-radius: 8px;
`;

const SearchFilterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const TabsSkeleton = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.75rem;
`;

const TabSkeleton = styled(SkeletonBase)`
  width: 120px;
  height: 36px;
  border-radius: 4px;
`;

const ProgramsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const ProgramCardSkeleton: React.FC = () => {
  return (
    <SkeletonCard style={{ 
      height: '480px', 
      borderRadius: '10px', 
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      border: '1px solid #e0e0e0',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
    }}>
      {/* Image Container */}
      <div style={{ height: '180px', backgroundColor: '#f0f0f0', position: 'relative' }}>
        <Skeleton height={180} style={{ margin: 0 }} />
        {/* Badge Position */}
        <div style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
          <Skeleton height={24} width={80} style={{ borderRadius: '20px' }} />
        </div>
        {/* Bookmark Button Position */}
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <Skeleton height={36} width={36} style={{ borderRadius: '50%' }} />
        </div>
        {/* Popularity Badge Position */}
        <div style={{ position: 'absolute', top: '10px', right: '58px' }}>
          <Skeleton height={24} width={90} style={{ borderRadius: '20px' }} />
        </div>
      </div>
      
      {/* Content */}
      <div style={{ padding: '1.2rem' }}>
        {/* Institution */}
        <SkeletonRow style={{ marginBottom: '0.5rem', alignItems: 'center' }}>
          <Skeleton circle height={16} width={16} style={{ marginRight: '8px' }} />
          <Skeleton height={18} width={140} />
        </SkeletonRow>
        
        {/* Location */}
        <SkeletonRow style={{ marginBottom: '0.5rem', alignItems: 'center' }}>
          <Skeleton circle height={16} width={16} style={{ marginRight: '8px' }} />
          <Skeleton height={16} width={120} />
        </SkeletonRow>
        
        {/* Title */}
        <Skeleton height={21} width="90%" style={{ marginBottom: '0.7rem' }} />
        
        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.7rem' }}>
          <SkeletonRow style={{ alignItems: 'center' }}>
            <Skeleton circle height={16} width={16} style={{ marginRight: '8px' }} />
            <Skeleton height={16} width={60} />
          </SkeletonRow>
          <SkeletonRow style={{ alignItems: 'center' }}>
            <Skeleton circle height={16} width={16} style={{ marginRight: '8px' }} />
            <Skeleton height={16} width={80} />
          </SkeletonRow>
        </div>
        
        {/* Popularity Metrics */}
        <SkeletonRow style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
          <SkeletonRow style={{ alignItems: 'center' }}>
            <Skeleton circle height={12} width={12} style={{ marginRight: '4px' }} />
            <Skeleton height={15} width={60} />
          </SkeletonRow>
          <div style={{ width: '0.8rem' }}></div>
          <SkeletonRow style={{ alignItems: 'center' }}>
            <Skeleton circle height={12} width={12} style={{ marginRight: '4px' }} />
            <Skeleton height={15} width={70} />
          </SkeletonRow>
        </SkeletonRow>
        
        {/* Meta Info */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginTop: 'auto', 
          paddingTop: '0.7rem', 
          borderTop: '1px solid #eee' 
        }}>
          <SkeletonRow style={{ alignItems: 'center' }}>
            <Skeleton circle height={16} width={16} style={{ marginRight: '4px' }} />
            <Skeleton height={16} width={40} />
          </SkeletonRow>
          <SkeletonRow style={{ alignItems: 'center' }}>
            <Skeleton circle height={16} width={16} style={{ marginRight: '4px' }} />
            <Skeleton height={16} width={40} />
          </SkeletonRow>
          <Skeleton height={36} width={100} style={{ borderRadius: '30px' }} />
        </div>
      </div>
    </SkeletonCard>
  );
};

// Dashboard Page Skeleton
export const DashboardSkeleton: React.FC = () => {
  return (
    <SkeletonContainer>
      {/* Welcome Section */}
      <SkeletonCard style={{ height: '150px', marginBottom: '2rem' }}>
        <Skeleton height={40} width="60%" style={{ marginBottom: '1rem' }} />
        <Skeleton height={20} count={2} style={{ marginBottom: '0.5rem' }} />
      </SkeletonCard>
      
      {/* Statistics Grid */}
      <SkeletonRow>
        {Array(4).fill(0).map((_, index) => (
          <SkeletonCard key={index}>
            <Skeleton circle width={50} height={50} style={{ marginBottom: '1rem' }} />
            <Skeleton height={15} width="40%" style={{ marginBottom: '0.5rem' }} />
            <Skeleton height={30} width="25%" />
          </SkeletonCard>
        ))}
      </SkeletonRow>
      
      {/* Programs Section */}
      <Skeleton height={30} width="40%" style={{ marginBottom: '1.5rem', marginTop: '2rem' }} />
      <SkeletonGrid>
        {Array(3).fill(0).map((_, index) => (
          <SkeletonCard key={index} style={{ overflow: 'hidden' }}>
            <Skeleton height={160} style={{ marginBottom: '1rem', marginLeft: '-1.5rem', marginRight: '-1.5rem', marginTop: '-1.5rem' }} />
            <Skeleton height={20} width="80%" style={{ marginBottom: '0.5rem' }} />
            <Skeleton height={15} count={2} style={{ marginBottom: '0.5rem' }} />
            <SkeletonRow>
              <Skeleton height={15} width="40%" />
              <Skeleton height={15} width="40%" />
            </SkeletonRow>
            <Skeleton height={6} style={{ marginTop: '1rem', borderRadius: '3px' }} />
          </SkeletonCard>
        ))}
      </SkeletonGrid>
      
      {/* Activity Section */}
      <Skeleton height={30} width="40%" style={{ marginBottom: '1.5rem', marginTop: '2rem' }} />
      <SkeletonCard>
        <SkeletonRow style={{ alignItems: 'center' }}>
          <Skeleton circle width={40} height={40} />
          <SkeletonColumn>
            <Skeleton height={20} width="60%" style={{ marginBottom: '0.5rem' }} />
            <Skeleton height={15} width="40%" />
          </SkeletonColumn>
        </SkeletonRow>
        <SkeletonRow style={{ alignItems: 'center', marginTop: '1rem' }}>
          <Skeleton circle width={40} height={40} />
          <SkeletonColumn>
            <Skeleton height={20} width="70%" style={{ marginBottom: '0.5rem' }} />
            <Skeleton height={15} width="45%" />
          </SkeletonColumn>
        </SkeletonRow>
      </SkeletonCard>
    </SkeletonContainer>
  );
};

// Profile Page Skeleton
export const ProfileSkeleton: React.FC = () => {
  return (
    <SkeletonContainer>
      {/* Profile Header */}
      <SkeletonRow style={{ alignItems: 'flex-start', marginBottom: '2.5rem' }}>
        <Skeleton circle width={150} height={150} style={{ flexShrink: 0 }} />
        <SkeletonColumn>
          <Skeleton height={40} width="40%" style={{ marginBottom: '1rem' }} />
          <SkeletonRow style={{ marginBottom: '1rem' }}>
            <Skeleton height={15} width="30%" />
            <Skeleton height={15} width="30%" />
            <Skeleton height={15} width="30%" />
          </SkeletonRow>
          <Skeleton height={15} count={3} style={{ marginBottom: '0.5rem' }} />
        </SkeletonColumn>
      </SkeletonRow>
      
      {/* Tabs */}
      <SkeletonRow style={{ marginBottom: '2rem', justifyContent: 'flex-start' }}>
        <Skeleton height={30} width={100} />
        <Skeleton height={30} width={100} />
        <Skeleton height={30} width={100} />
      </SkeletonRow>
      
      {/* Profile Info Section */}
      <Skeleton height={30} width="30%" style={{ marginBottom: '1.5rem' }} />
      <SkeletonCard>
        <SkeletonRow>
          <SkeletonColumn>
            <Skeleton height={15} width="30%" style={{ marginBottom: '0.5rem' }} />
            <Skeleton height={20} width="60%" style={{ marginBottom: '1.5rem' }} />
          </SkeletonColumn>
          <SkeletonColumn>
            <Skeleton height={15} width="30%" style={{ marginBottom: '0.5rem' }} />
            <Skeleton height={20} width="60%" style={{ marginBottom: '1.5rem' }} />
          </SkeletonColumn>
        </SkeletonRow>
        <SkeletonRow>
          <SkeletonColumn>
            <Skeleton height={15} width="30%" style={{ marginBottom: '0.5rem' }} />
            <Skeleton height={20} width="60%" style={{ marginBottom: '1.5rem' }} />
          </SkeletonColumn>
          <SkeletonColumn>
            <Skeleton height={15} width="30%" style={{ marginBottom: '0.5rem' }} />
            <Skeleton height={20} width="60%" style={{ marginBottom: '1.5rem' }} />
          </SkeletonColumn>
        </SkeletonRow>
        <Skeleton height={15} width="30%" style={{ marginBottom: '0.5rem' }} />
        <Skeleton height={20} count={3} style={{ marginBottom: '0.5rem' }} />
      </SkeletonCard>
    </SkeletonContainer>
  );
};

// Programs List Page Skeleton
export const ProgramsListSkeleton: React.FC = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
      {/* Search and Filter Row */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '1.5rem',
        gap: '1rem'
      }}>
        <div style={{ flex: 1, maxWidth: '600px' }}>
          <Skeleton height={48} borderRadius={24} />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Skeleton height={48} width={120} borderRadius={24} />
          <Skeleton height={48} width={120} borderRadius={24} />
        </div>
      </div>
      
      {/* Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '1.5rem',
        borderBottom: '1px solid #eee',
        paddingBottom: '0.5rem'
      }}>
        <Skeleton height={35} width={80} />
        <Skeleton height={35} width={100} />
        <Skeleton height={35} width={90} />
        <Skeleton height={35} width={110} />
      </div>
      
      {/* Active Filters */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '0.5rem', 
        marginBottom: '1.5rem' 
      }}>
        <Skeleton height={32} width={120} borderRadius={16} />
        <Skeleton height={32} width={100} borderRadius={16} />
        <Skeleton height={32} width={130} borderRadius={16} />
      </div>
      
      {/* Programs Grid */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {Array(12).fill(0).map((_, index) => (
          <ProgramCardSkeleton key={index} />
        ))}
      </div>
      
      {/* Pagination */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        gap: '0.5rem',
        marginTop: '2rem'
      }}>
        <Skeleton height={40} width={40} borderRadius={20} />
        <Skeleton height={40} width={40} borderRadius={20} />
        <Skeleton height={40} width={40} borderRadius={20} />
        <Skeleton height={40} width={40} borderRadius={20} />
        <Skeleton height={40} width={40} borderRadius={20} />
      </div>
    </div>
  );
};

// Program Details Skeleton
export const ProgramDetailsSkeleton: React.FC = () => {
  return (
    <SkeletonContainer>
      {/* Program Header with Image */}
      <div style={{ marginBottom: '2rem' }}>
        <Skeleton height={300} style={{ marginBottom: '2rem' }} />
        <Skeleton height={40} width="70%" style={{ marginBottom: '1rem' }} />
        <Skeleton height={20} count={3} style={{ marginBottom: '0.5rem' }} />
        <SkeletonRow style={{ marginTop: '1.5rem' }}>
          <Skeleton height={50} width={150} />
          <Skeleton height={50} width={150} />
        </SkeletonRow>
      </div>
      
      {/* Program Details Section */}
      <SkeletonRow style={{ alignItems: 'flex-start' }}>
        <SkeletonColumn style={{ flex: 2 }}>
          <SkeletonCard>
            <Skeleton height={30} width="50%" style={{ marginBottom: '1.5rem' }} />
            <Skeleton height={20} count={10} style={{ marginBottom: '0.5rem' }} />
          </SkeletonCard>
          
          <SkeletonCard style={{ marginTop: '2rem' }}>
            <Skeleton height={30} width="50%" style={{ marginBottom: '1.5rem' }} />
            <Skeleton height={20} count={5} style={{ marginBottom: '0.5rem' }} />
          </SkeletonCard>
        </SkeletonColumn>
        
        <SkeletonColumn style={{ flex: 1 }}>
          <SkeletonCard>
            <Skeleton height={25} width="80%" style={{ marginBottom: '1rem' }} />
            <Skeleton height={20} count={3} style={{ marginBottom: '1rem' }} />
            <Skeleton height={50} style={{ marginBottom: '1rem' }} />
            <Skeleton height={15} count={3} style={{ marginBottom: '0.5rem' }} />
          </SkeletonCard>
          
          <SkeletonCard style={{ marginTop: '1.5rem' }}>
            <Skeleton height={25} width="60%" style={{ marginBottom: '1rem' }} />
            <Skeleton height={15} count={4} style={{ marginBottom: '0.5rem' }} />
          </SkeletonCard>
        </SkeletonColumn>
      </SkeletonRow>
    </SkeletonContainer>
  );
};

// Login Form Skeleton
export const LoginFormSkeleton: React.FC = () => {
  return (
    <SkeletonContainer style={{ maxWidth: '450px', margin: '4rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Skeleton height={40} width="60%" style={{ margin: '0 auto 1.5rem' }} />
      </div>
      
      <Skeleton height={50} style={{ marginBottom: '1.5rem' }} />
      <Skeleton height={50} style={{ marginBottom: '1.5rem' }} />
      
      <div style={{ marginBottom: '1.5rem' }}>
        <Skeleton height={15} width="30%" style={{ marginBottom: '0.5rem' }} />
        <Skeleton height={40} />
      </div>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <Skeleton height={15} width="30%" style={{ marginBottom: '0.5rem' }} />
        <Skeleton height={40} />
      </div>
      
      <Skeleton height={50} style={{ marginBottom: '1.5rem' }} />
      <div style={{ textAlign: 'center' }}>
        <Skeleton height={20} width="60%" style={{ margin: '0 auto' }} />
      </div>
    </SkeletonContainer>
  );
};

// Registration Form Skeleton
export const RegisterFormSkeleton: React.FC = () => {
  return (
    <SkeletonContainer style={{ maxWidth: '500px', margin: '4rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Skeleton height={40} width="60%" style={{ margin: '0 auto 1rem' }} />
        <Skeleton height={20} width="80%" style={{ margin: '0 auto' }} />
      </div>
      
      <Skeleton height={50} style={{ marginBottom: '1.5rem' }} />
      <Skeleton height={50} style={{ marginBottom: '1.5rem' }} />
      
      <SkeletonRow>
        <SkeletonColumn>
          <div style={{ marginBottom: '1.5rem' }}>
            <Skeleton height={15} width="50%" style={{ marginBottom: '0.5rem' }} />
            <Skeleton height={40} />
          </div>
        </SkeletonColumn>
        <SkeletonColumn>
          <div style={{ marginBottom: '1.5rem' }}>
            <Skeleton height={15} width="50%" style={{ marginBottom: '0.5rem' }} />
            <Skeleton height={40} />
          </div>
        </SkeletonColumn>
      </SkeletonRow>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <Skeleton height={15} width="30%" style={{ marginBottom: '0.5rem' }} />
        <Skeleton height={40} />
      </div>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <Skeleton height={15} width="30%" style={{ marginBottom: '0.5rem' }} />
        <Skeleton height={40} />
      </div>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <Skeleton height={15} width="40%" style={{ marginBottom: '0.5rem' }} />
        <Skeleton height={40} />
      </div>
      
      <Skeleton height={50} style={{ marginBottom: '1.5rem' }} />
      <div style={{ textAlign: 'center' }}>
        <Skeleton height={20} width="80%" style={{ margin: '0 auto 1.5rem' }} />
        <Skeleton height={20} width="60%" style={{ margin: '0 auto' }} />
      </div>
    </SkeletonContainer>
  );
}; 