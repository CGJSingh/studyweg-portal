import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from 'styled-components';

// Styled components for the Programs Page skeleton
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem 4rem;
`;

const HeaderSection = styled.div`
  margin: 2rem 0 3rem;
`;

const FiltersSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SearchWrapper = styled.div`
  flex: 1;
  min-width: 280px;
  max-width: 450px;
`;

const FiltersWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ProgramsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const ProgramCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
`;

// Programs Page skeleton loading component
const ApplicationFormSkeleton: React.FC = () => {
  return (
    <PageContainer>
      {/* Page Header */}
      <HeaderSection>
        <Skeleton height={40} width="60%" style={{ marginBottom: '1rem' }} />
        <Skeleton height={20} width="80%" />
      </HeaderSection>

      {/* Filters Section */}
      <FiltersSection>
        <SearchWrapper>
          <Skeleton height={48} width="100%" style={{ borderRadius: '8px' }} />
        </SearchWrapper>
        
        <FiltersWrapper>
          <Skeleton height={48} width={120} style={{ borderRadius: '8px' }} />
          <Skeleton height={48} width={120} style={{ borderRadius: '8px' }} />
          <Skeleton height={48} width={120} style={{ borderRadius: '8px' }} />
        </FiltersWrapper>
      </FiltersSection>
      
      {/* Filter Tags */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
        <Skeleton height={32} width={100} style={{ borderRadius: '16px' }} />
        <Skeleton height={32} width={120} style={{ borderRadius: '16px' }} />
        <Skeleton height={32} width={90} style={{ borderRadius: '16px' }} />
      </div>
      
      {/* Search Results Text */}
      <div style={{ marginBottom: '1rem' }}>
        <Skeleton height={24} width={200} />
      </div>
      
      {/* Programs Grid */}
      <ProgramsGrid>
        {Array(6).fill(0).map((_, index) => (
          <ProgramCard key={index}>
            {/* Program Image */}
            <Skeleton height={180} width="100%" style={{ borderRadius: '12px 12px 0 0' }} />
            
            {/* Program Content */}
            <div style={{ padding: '1.5rem' }}>
              {/* University Logo & Location */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Skeleton circle width={40} height={40} />
                <Skeleton width={100} height={16} />
              </div>
              
              {/* Program Title */}
              <Skeleton height={24} width="90%" style={{ marginBottom: '1rem' }} />
              
              {/* Program Details */}
              <div style={{ marginBottom: '1.5rem' }}>
                <Skeleton height={16} width="70%" style={{ marginBottom: '0.5rem' }} />
                <Skeleton height={16} width="60%" style={{ marginBottom: '0.5rem' }} />
                <Skeleton height={16} width="50%" />
              </div>
              
              {/* Key Information Items */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '0.75rem',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <Skeleton height={14} width="60%" style={{ marginBottom: '0.25rem' }} />
                  <Skeleton height={18} width="80%" />
                </div>
                <div>
                  <Skeleton height={14} width="60%" style={{ marginBottom: '0.25rem' }} />
                  <Skeleton height={18} width="80%" />
                </div>
                <div>
                  <Skeleton height={14} width="60%" style={{ marginBottom: '0.25rem' }} />
                  <Skeleton height={18} width="80%" />
                </div>
                <div>
                  <Skeleton height={14} width="60%" style={{ marginBottom: '0.25rem' }} />
                  <Skeleton height={18} width="80%" />
                </div>
              </div>
              
              {/* Action Button */}
              <Skeleton height={40} width="100%" style={{ borderRadius: '4px' }} />
            </div>
          </ProgramCard>
        ))}
      </ProgramsGrid>
      
      {/* Pagination */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginTop: '3rem',
        gap: '0.5rem'
      }}>
        <Skeleton width={40} height={40} style={{ borderRadius: '4px' }} />
        <Skeleton width={40} height={40} style={{ borderRadius: '4px' }} />
        <Skeleton width={40} height={40} style={{ borderRadius: '4px' }} />
        <Skeleton width={40} height={40} style={{ borderRadius: '4px' }} />
      </div>
    </PageContainer>
  );
};

export default ApplicationFormSkeleton; 