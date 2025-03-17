import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from 'styled-components';

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
    <SkeletonContainer>
      {/* Header */}
      <SkeletonCard style={{ marginBottom: '2rem' }}>
        <Skeleton height={40} width="50%" style={{ marginBottom: '1rem' }} />
        <Skeleton height={20} count={2} style={{ marginBottom: '1rem' }} />
        <SkeletonRow style={{ marginBottom: '1rem' }}>
          <Skeleton height={40} width="30%" />
          <Skeleton height={40} width="30%" />
        </SkeletonRow>
      </SkeletonCard>
      
      {/* Filters Section */}
      <SkeletonRow style={{ marginBottom: '2rem' }}>
        <Skeleton height={40} width="20%" />
        <Skeleton height={40} width="20%" />
        <Skeleton height={40} width="20%" />
      </SkeletonRow>
      
      {/* Programs Grid */}
      <SkeletonGrid>
        {Array(6).fill(0).map((_, index) => (
          <SkeletonCard key={index} style={{ overflow: 'hidden' }}>
            <Skeleton height={180} style={{ marginBottom: '1rem', marginLeft: '-1.5rem', marginRight: '-1.5rem', marginTop: '-1.5rem' }} />
            <Skeleton height={25} width="80%" style={{ marginBottom: '0.5rem' }} />
            <Skeleton height={15} count={3} style={{ marginBottom: '0.5rem' }} />
            <SkeletonRow style={{ marginTop: '1rem' }}>
              <Skeleton height={15} width="40%" />
              <Skeleton height={15} width="40%" />
            </SkeletonRow>
            <Skeleton height={40} width="50%" style={{ marginTop: '1rem' }} />
          </SkeletonCard>
        ))}
      </SkeletonGrid>
      
      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <Skeleton width={200} height={40} />
      </div>
    </SkeletonContainer>
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