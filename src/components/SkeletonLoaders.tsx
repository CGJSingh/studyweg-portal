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
      height: '500px', 
      borderRadius: '12px', 
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      border: '1px solid #e0e0e0',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
    }}>
      {/* Image Container */}
      <div style={{ height: '200px', backgroundColor: '#f0f0f0', position: 'relative' }}>
        <Skeleton height={200} style={{ margin: 0 }} />
        {/* Badge Position */}
        <div style={{ position: 'absolute', bottom: '12px', left: '12px' }}>
          <Skeleton height={28} width={100} style={{ borderRadius: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
        </div>
        {/* Bookmark Button Position */}
        <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
          <Skeleton height={40} width={40} style={{ borderRadius: '50%', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
        </div>
        {/* Popularity Badge Position */}
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <Skeleton height={28} width={100} style={{ borderRadius: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
        </div>
      </div>
      
      {/* Content */}
      <div style={{ padding: '1.5rem' }}>
        {/* Institution */}
        <SkeletonRow style={{ marginBottom: '0.75rem', alignItems: 'center' }}>
          <Skeleton circle height={18} width={18} style={{ marginRight: '10px' }} />
          <Skeleton height={20} width={160} />
        </SkeletonRow>
        
        {/* Location */}
        <SkeletonRow style={{ marginBottom: '0.75rem', alignItems: 'center' }}>
          <Skeleton circle height={18} width={18} style={{ marginRight: '10px' }} />
          <Skeleton height={18} width={140} />
        </SkeletonRow>
        
        {/* Title - improved contrast and style */}
        <Skeleton 
          height={24} 
          width="95%" 
          style={{ 
            marginBottom: '1rem',
            borderRadius: '4px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }} 
        />
        
        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1rem' }}>
          <div style={{ display: 'inline-flex', padding: '0.5rem 0.8rem', borderRadius: '20px', background: '#f0f0f0' }}>
            <SkeletonRow style={{ alignItems: 'center' }}>
              <Skeleton circle height={16} width={16} style={{ marginRight: '8px' }} />
              <Skeleton height={16} width={70} />
            </SkeletonRow>
          </div>
          <div style={{ display: 'inline-flex', padding: '0.5rem 0.8rem', borderRadius: '20px', background: '#f0f0f0' }}>
            <SkeletonRow style={{ alignItems: 'center' }}>
              <Skeleton circle height={16} width={16} style={{ marginRight: '8px' }} />
              <Skeleton height={16} width={90} />
            </SkeletonRow>
          </div>
        </div>
        
        {/* Short Description */}
        <div style={{ marginBottom: '1rem' }}>
          <Skeleton height={16} count={2} style={{ marginBottom: '0.5rem' }} />
          <Skeleton height={16} width="70%" />
        </div>
        
        {/* Popularity Metrics */}
        <SkeletonRow style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
          <SkeletonRow style={{ alignItems: 'center' }}>
            <Skeleton circle height={14} width={14} style={{ marginRight: '6px' }} />
            <Skeleton height={16} width={60} />
          </SkeletonRow>
          <div style={{ width: '1rem' }}></div>
          <SkeletonRow style={{ alignItems: 'center' }}>
            <Skeleton circle height={14} width={14} style={{ marginRight: '6px' }} />
            <Skeleton height={16} width={80} />
          </SkeletonRow>
        </SkeletonRow>
        
        {/* Meta Info */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginTop: 'auto', 
          paddingTop: '1rem', 
          borderTop: '1px solid #eee' 
        }}>
          <SkeletonRow style={{ alignItems: 'center' }}>
            <Skeleton circle height={18} width={18} style={{ marginRight: '6px' }} />
            <Skeleton height={18} width={60} />
          </SkeletonRow>
          <SkeletonRow style={{ alignItems: 'center' }}>
            <Skeleton circle height={18} width={18} style={{ marginRight: '6px' }} />
            <Skeleton height={18} width={80} />
          </SkeletonRow>
          <Skeleton 
            height={40} 
            width={120} 
            style={{ 
              borderRadius: '30px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }} 
          />
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

// Programs List Page Skeleton - Enhanced version
export const ProgramsListSkeleton: React.FC = () => {
  return (
    <PageContainer>
      {/* Header Bar with Title and User */}
      <div style={{ 
        background: '#0c3b5e', 
        padding: '1rem 1.5rem', 
        borderRadius: '8px', 
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
      }}>
        <Skeleton height={32} width={200} baseColor="#164a71" highlightColor="#205b86" />
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Skeleton circle height={40} width={40} baseColor="#164a71" highlightColor="#205b86" />
          <div>
            <Skeleton height={16} width={120} baseColor="#164a71" highlightColor="#205b86" style={{ marginBottom: '6px' }} />
            <Skeleton height={14} width={150} baseColor="#164a71" highlightColor="#205b86" />
          </div>
        </div>
      </div>

      {/* Search and Filter Bar - Enhanced */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem',
        gap: '1.5rem',
        backgroundColor: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '600px' }}>
          <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}>
            <Skeleton circle height={18} width={18} />
          </div>
          <Skeleton height={50} style={{ borderRadius: '12px', paddingLeft: '2.8rem' }} />
        </div>
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <Skeleton height={50} width={130} style={{ borderRadius: '8px' }} />
          <Skeleton height={50} width={130} style={{ borderRadius: '8px' }} />
        </div>
      </div>
      
      {/* Filters Section */}
      <div style={{ 
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '2rem',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
      }}>
        {/* Filter Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <Skeleton height={24} width={120} />
          <Skeleton height={32} width={100} style={{ borderRadius: '20px' }} />
        </div>
        
        {/* Filter Categories */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {Array(4).fill(0).map((_, index) => (
            <div key={index} style={{ marginBottom: '1.5rem' }}>
              <Skeleton height={20} width={120} style={{ marginBottom: '1rem' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <Skeleton height={20} width={20} style={{ borderRadius: '4px' }} />
                  <Skeleton height={16} width={100} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <Skeleton height={20} width={20} style={{ borderRadius: '4px' }} />
                  <Skeleton height={16} width={130} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                  <Skeleton height={20} width={20} style={{ borderRadius: '4px' }} />
                  <Skeleton height={16} width={110} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '1.5rem', 
        marginBottom: '1.5rem',
        borderBottom: '2px solid #eee',
        paddingBottom: '1rem'
      }}>
        {Array(4).fill(0).map((_, index) => (
          <div key={index} style={{ 
            padding: '0.5rem 1rem',
            borderBottom: index === 0 ? '3px solid #f39c12' : 'none',
            marginBottom: '-1rem'
          }}>
            <Skeleton height={24} width={110 + (index * 10)} style={{ borderRadius: '4px' }} />
          </div>
        ))}
      </div>
      
      {/* Active Filters */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '0.8rem', 
        marginBottom: '2rem' 
      }}>
        <Skeleton height={36} width={140} style={{ borderRadius: '30px', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }} />
        <Skeleton height={36} width={120} style={{ borderRadius: '30px', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }} />
        <Skeleton height={36} width={150} style={{ borderRadius: '30px', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }} />
      </div>
      
      {/* Programs Grid */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {Array(9).fill(0).map((_, index) => (
          <ProgramCardSkeleton key={index} />
        ))}
      </div>
      
      {/* Pagination */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        gap: '0.8rem',
        marginTop: '3rem',
        marginBottom: '2rem'
      }}>
        <Skeleton height={45} width={45} style={{ borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }} />
        <Skeleton height={45} width={45} style={{ borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }} />
        <Skeleton height={45} width={45} style={{ 
          borderRadius: '8px', 
          backgroundColor: '#f0f0f0',
          boxShadow: '0 4px 8px rgba(0,0,0,0.12)'
        }} />
        <Skeleton height={45} width={45} style={{ borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }} />
        <Skeleton height={45} width={45} style={{ borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }} />
      </div>
    </PageContainer>
  );
};

// Program Details Skeleton
export const ProgramDetailsSkeleton: React.FC = () => {
  return (
    <PageContainer>
      {/* Header Bar */}
      <div style={{ 
        background: '#0c3b5e', 
        padding: '1rem 1.5rem', 
        borderRadius: '8px', 
        marginBottom: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Skeleton height={28} width={150} baseColor="#164a71" highlightColor="#205b86" />
        <Skeleton height={35} width={140} baseColor="#164a71" highlightColor="#205b86" style={{ borderRadius: '4px' }} />
      </div>
      
      {/* Content Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr', 
        gap: '2rem',
        // Responsive styling will be handled by media queries in styled components
      }}>
        {/* Main Content */}
        <div>
          {/* Program Header Card */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '12px', 
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)', 
            overflow: 'hidden',
            marginBottom: '2rem'
          }}>
            {/* Program Image */}
            <div style={{ position: 'relative', height: '400px' }}>
              <Skeleton height={400} style={{ margin: '0' }} />
              
              {/* Badge overlay */}
              <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
                <Skeleton height={30} width={120} style={{ borderRadius: '4px' }} />
              </div>
              
              {/* Text overlay */}
              <div style={{ 
                position: 'absolute', 
                bottom: '0', 
                left: '0', 
                right: '0',
                padding: '2rem',
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Skeleton circle height={16} width={16} baseColor="#757575" highlightColor="#9e9e9e" />
                  <Skeleton height={22} width={200} baseColor="#757575" highlightColor="#9e9e9e" />
                </div>
                {/* Updated Program Name with better contrast */}
                <Skeleton height={50} width={350} baseColor="#e0e0e0" highlightColor="#f5f5f5" 
                  style={{ 
                    marginBottom: '1rem',
                    borderRadius: '4px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.6)'
                  }} 
                />
                
                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                  <Skeleton height={30} width={90} baseColor="#757575" highlightColor="#9e9e9e" style={{ borderRadius: '20px' }} />
                  <Skeleton height={30} width={100} baseColor="#757575" highlightColor="#9e9e9e" style={{ borderRadius: '20px' }} />
                  <Skeleton height={30} width={80} baseColor="#757575" highlightColor="#9e9e9e" style={{ borderRadius: '20px' }} />
                </div>
              </div>
            </div>
            
            {/* Content Sections */}
            <div style={{ padding: '2rem' }}>
              {/* Program Overview Section - Moved to top */}
              <div style={{ 
                background: 'linear-gradient(135deg, #f8f9fb, #e6eef7)',
                padding: '2rem', 
                borderRadius: '16px',
                marginBottom: '2rem',
                position: 'relative',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
                textAlign: 'left'
              }}>
                {/* Colored top border */}
                <div style={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '6px',
                  background: 'linear-gradient(to right, #3498db, #8e44ad, #e74c3c, #f1c40f, #2ecc71)',
                  borderTopLeftRadius: '16px',
                  borderTopRightRadius: '16px'
                }}></div>
                
                {/* Left-aligned title */}
                <div style={{ textAlign: 'left', marginBottom: '1.5rem', position: 'relative' }}>
                  <Skeleton height={28} width={180} />
                  {/* Underline */}
                  <div style={{ 
                    position: 'absolute',
                    bottom: '-10px',
                    left: 0,
                    width: '60px',
                    height: '3px',
                    background: '#f39c12',
                    borderRadius: '1.5px'
                  }}></div>
                </div>
                
                {/* Info Grid */}
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1.5rem',
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '12px',
                  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.04)',
                  textAlign: 'left'
                }}>
                  {/* Info Items */}
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <Skeleton height={18} width={80} />
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Skeleton circle height={20} width={20} />
                        <Skeleton height={24} width={120} />
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Highlight Badges */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'flex-start', 
                  gap: '1.5rem',
                  flexWrap: 'wrap',
                  marginTop: '1.5rem'
                }}>
                  {[1, 2, 3].map((item) => (
                    <div key={item} style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      padding: '1rem 1.8rem',
                      borderRadius: '50px',
                      background: item === 1 
                        ? 'linear-gradient(135deg, #3498db, #2980b9)' 
                        : item === 2 
                          ? 'linear-gradient(135deg, #e74c3c, #c0392b)' 
                          : 'linear-gradient(135deg, #27ae60, #2ecc71)',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
                    }}>
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        marginRight: '0.75rem'
                      }}>
                        <Skeleton circle height={20} width={20} baseColor="rgba(255, 255, 255, 0.4)" highlightColor="rgba(255, 255, 255, 0.8)" />
                      </div>
                      <Skeleton height={22} width={80} baseColor="rgba(255, 255, 255, 0.4)" highlightColor="rgba(255, 255, 255, 0.8)" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Tab Card */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '12px', 
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)', 
            overflow: 'hidden',
            marginBottom: '2rem',
            padding: '2rem'
          }}>
            {/* Tabs */}
            <div style={{ 
              display: 'flex', 
              borderBottom: '1px solid #eee',
              marginBottom: '1.5rem'
            }}>
              <Skeleton height={40} width={120} style={{ borderBottom: '2px solid #f39c12' }} />
              <Skeleton height={40} width={120} />
              <Skeleton height={40} width={120} />
            </div>
            
            {/* Tab Content */}
            <Skeleton height={18} style={{ marginBottom: '0.8rem' }} count={4} />
            <Skeleton height={18} width="70%" />
          </div>
        </div>
        
        {/* Sidebar */}
        <div>
          {/* Apply Now Card */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '12px', 
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)', 
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <Skeleton height={24} width="60%" style={{ marginBottom: '1.5rem' }} />
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <Skeleton height={16} width={80} />
                <Skeleton height={16} width={60} />
              </div>
              <Skeleton height={16} width={150} />
            </div>
            <Skeleton height={55} style={{ borderRadius: '8px', marginBottom: '1rem' }} />
            <Skeleton height={55} style={{ borderRadius: '8px', marginBottom: '1rem' }} />
          </div>
          
          {/* Institution Card */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '12px', 
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <Skeleton height={24} width="80%" style={{ marginBottom: '1.5rem' }} />
            
            <div style={{ 
              padding: '1.25rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Skeleton height={64} width={64} style={{ borderRadius: '8px' }} />
                <div>
                  <Skeleton height={22} width={150} style={{ marginBottom: '0.5rem' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Skeleton circle height={12} width={12} />
                    <Skeleton height={16} width={100} />
                  </div>
                </div>
              </div>
            </div>
            
            <Skeleton height={45} style={{ borderRadius: '8px' }} />
          </div>
          
          {/* Video Card */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '12px', 
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            padding: '1.5rem'
          }}>
            <Skeleton height={24} width="60%" style={{ marginBottom: '1.5rem' }} />
            
            {/* Video Container */}
            <div style={{ 
              position: 'relative',
              width: '100%',
              paddingBottom: '56.25%',
              height: 0,
              overflow: 'hidden',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              marginBottom: '1rem'
            }}>
              <Skeleton height="100%" style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
              }} />
            </div>
            
            {/* Second Video */}
            <div style={{ 
              position: 'relative',
              width: '100%',
              paddingBottom: '56.25%',
              height: 0,
              overflow: 'hidden',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
            }}>
              <Skeleton height="100%" style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
              }} />
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
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

// Application Form Skeleton
export const ApplicationFormSkeleton: React.FC = () => {
  return (
    <PageContainer>
      <SkeletonContainer>
        {/* Card with Header */}
        <SkeletonCard style={{ 
          borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
          padding: 0,
          overflow: 'hidden'
        }}>
          {/* Card Header */}
          <div style={{ 
            backgroundColor: '#0c3b5e', 
            padding: '1.75rem 2rem',
            marginBottom: '2rem'
          }}>
            <Skeleton height={36} width="60%" style={{ 
              marginBottom: '1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.2)'
            }} />
            <Skeleton height={20} width="40%" style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.2)'
            }} />
          </div>
          
          {/* Step Indicator */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            padding: '2rem 2.5rem',
            margin: '0 auto',
            borderBottom: '1px solid #eee',
            backgroundColor: '#f9fafb',
            maxWidth: '900px'
          }}>
            {Array(6).fill(0).map((_, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                margin: 0,
                zIndex: 2
              }}>
                <Skeleton circle width={38} height={38} style={{ marginBottom: '1.5rem' }} />
                {i < 5 && (
                  <div style={{
                    position: 'absolute',
                    top: '19px',
                    left: '38px',
                    height: '3px',
                    width: '100%',
                    backgroundColor: '#e0e0e0',
                    zIndex: 1
                  }}></div>
                )}
                <Skeleton width={60} height={12} />
              </div>
            ))}
          </div>
          
          {/* Step Content */}
          <div style={{ padding: '2.5rem' }}>
            {/* Section Title */}
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              position: 'relative',
              paddingBottom: '0.8rem',
              marginBottom: '1.5rem',
              borderBottom: '2px solid #eee'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <Skeleton circle width={24} height={24} />
                <Skeleton width={180} height={28} />
              </div>
              <div style={{
                position: 'absolute',
                bottom: '-2px',
                left: 0,
                width: '80px',
                height: '2px',
                backgroundColor: '#f39c12'
              }}></div>
            </div>
            
            {/* Form Sections */}
            {Array(3).fill(0).map((_, i) => (
              <div key={i} style={{ 
                marginBottom: '4rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '10px',
                padding: '2rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
              }}>
                {/* Form Fields */}
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '2rem',
                  marginBottom: '2rem'
                }}>
                  {Array(4).fill(0).map((_, j) => (
                    <div key={j} style={{ marginBottom: '2rem' }}>
                      <Skeleton width={120} height={20} style={{ marginBottom: '0.5rem' }} />
                      <Skeleton height={40} width="100%" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Add Button */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Skeleton width={200} height={48} style={{ 
                borderRadius: '8px',
                marginBottom: '3rem'
              }} />
            </div>
            
            {/* Button Container */}
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '2rem',
              padding: '1.5rem 2.5rem',
              borderTop: '1px solid #eee',
              backgroundColor: '#f9fafb',
              marginLeft: '-2.5rem',
              marginRight: '-2.5rem',
              marginBottom: '-2.5rem'
            }}>
              <Skeleton width={120} height={48} style={{ borderRadius: '4px' }} />
              <Skeleton width={120} height={48} style={{ borderRadius: '4px' }} />
            </div>
          </div>
        </SkeletonCard>
      </SkeletonContainer>
    </PageContainer>
  );
}; 