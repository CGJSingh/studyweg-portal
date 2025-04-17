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

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 2rem 1rem;
`;

// Application Form Skeleton
const ApplicationFormSkeleton: React.FC = () => {
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

export default ApplicationFormSkeleton; 