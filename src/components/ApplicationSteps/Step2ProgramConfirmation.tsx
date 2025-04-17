import React from 'react';
import styled from 'styled-components';
import { Program } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUniversity, 
  faGraduationCap, 
  faCalendarAlt, 
  faMapMarkerAlt, 
  faMoneyBillWave, 
  faLanguage,
  faSpinner,
  faCheckCircle,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.4rem;
  color: #0c3b5e;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid #eee;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  
  &:first-of-type {
    margin-top: 0;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 80px;
    height: 2px;
    background-color: #f39c12;
  }
  
  .icon-wrapper {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    
    svg {
      font-size: 1.2rem;
      color: #f39c12;
    }
  }
`;

const ProgramCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  background-color: white;
`;

const ProgramHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  gap: 1.5rem;
  align-items: center;
  border-bottom: 1px solid #eee;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ProgramImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
`;

const ProgramInfo = styled.div`
  flex: 1;
`;

const ProgramName = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #0c3b5e;
`;

const UniversityName = styled.div`
  font-size: 1rem;
  color: #444;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  
  svg {
    color: #f39c12;
  }
`;

const ProgramType = styled.div`
  display: inline-block;
  background-color: #e8f4fc;
  color: #0c3b5e;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: 0.5rem;
`;

const ProgramDetails = styled.div`
  padding: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.span`
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: #f39c12;
  }
`;

const DetailValue = styled.span`
  font-size: 1.1rem;
  color: #333;
  font-weight: 500;
`;

const RequirementsCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 1.5rem;
`;

const RequirementsTitle = styled.h4`
  font-size: 1.1rem;
  color: #0c3b5e;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: #f39c12;
  }
`;

const RequirementsList = styled.ul`
  margin-left: 1.5rem;
  
  li {
    margin-bottom: 0.5rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  gap: 1rem;
  color: #666;
`;

const LoadingText = styled.p`
  margin: 0;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  gap: 1rem;
  color: #666;
`;

const ErrorText = styled.p`
  margin: 0;
`;

interface Step2ProgramConfirmationProps {
  program: Program | null;
  isLoading: boolean;
}

const Step2ProgramConfirmation: React.FC<Step2ProgramConfirmationProps> = ({ program, isLoading }) => {
  if (isLoading) {
    return (
      <LoadingContainer>
        <FontAwesomeIcon icon={faSpinner} spin />
        <LoadingText>Loading program details...</LoadingText>
      </LoadingContainer>
    );
  }
  
  if (!program) {
    return (
      <ErrorContainer>
        <FontAwesomeIcon icon={faExclamationTriangle} />
        <ErrorText>Program not found.</ErrorText>
      </ErrorContainer>
    );
  }
  
  // Extract program attributes
  const getAttributeValue = (name: string) => {
    const attr = program.attributes?.find(a => a.name === name);
    return attr ? attr.options[0] : 'N/A';
  };
  
  const programLevel = getAttributeValue('Program Level');
  const duration = getAttributeValue('Duration');
  const country = getAttributeValue('Country');
  const university = getAttributeValue('School');
  
  // Extract requirement info
  const requirementsMetaData = program.meta_data?.find(m => m.key === 'requirements');
  const requirementsHTML = requirementsMetaData?.value || '';
  
  // Function to get IELTS requirement from HTML content
  const getIeltsRequirement = (html: string) => {
    // This is a very simple extraction example
    // In a real app, you would need more robust parsing
    if (html.includes('IELTS')) {
      const match = html.match(/IELTS.*?([\d.]+)/i);
      return match ? match[1] + ' band' : 'Required';
    }
    return 'Required';
  };
  
  const ieltsRequirement = getIeltsRequirement(requirementsHTML);
  
  // Get application fee
  const applicationFee = program.meta_data?.find(m => m.key === 'application_fee')?.value || 'N/A';
  
  return (
    <StepContainer>
      <SectionTitle>
        <div className="icon-wrapper">
          <FontAwesomeIcon icon={faCheckCircle} />
          Program Confirmation
        </div>
      </SectionTitle>
      
      <ProgramCard>
        <ProgramHeader>
          <ProgramImage 
            src={program.images?.[0]?.src || 'https://via.placeholder.com/150?text=Program'} 
            alt={program.name} 
          />
          <ProgramInfo>
            <ProgramName>{program.name}</ProgramName>
            <UniversityName>
              <FontAwesomeIcon icon={faUniversity} />
              {university}
            </UniversityName>
            <ProgramType>{programLevel}</ProgramType>
          </ProgramInfo>
        </ProgramHeader>
        
        <ProgramDetails>
          <DetailItem>
            <DetailLabel>
              <FontAwesomeIcon icon={faGraduationCap} />
              Program Type
            </DetailLabel>
            <DetailValue>{programLevel}</DetailValue>
          </DetailItem>
          
          <DetailItem>
            <DetailLabel>
              <FontAwesomeIcon icon={faCalendarAlt} />
              Duration
            </DetailLabel>
            <DetailValue>{duration}</DetailValue>
          </DetailItem>
          
          <DetailItem>
            <DetailLabel>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              Location
            </DetailLabel>
            <DetailValue>{country}</DetailValue>
          </DetailItem>
          
          <DetailItem>
            <DetailLabel>
              <FontAwesomeIcon icon={faMoneyBillWave} />
              Application Fee
            </DetailLabel>
            <DetailValue>${applicationFee}</DetailValue>
          </DetailItem>
          
          <DetailItem>
            <DetailLabel>
              <FontAwesomeIcon icon={faLanguage} />
              IELTS Requirement
            </DetailLabel>
            <DetailValue>{ieltsRequirement}</DetailValue>
          </DetailItem>
        </ProgramDetails>
      </ProgramCard>
      
      {requirementsHTML && (
        <RequirementsCard>
          <RequirementsTitle>
            <FontAwesomeIcon icon={faGraduationCap} />
            Program Requirements
          </RequirementsTitle>
          {/* This would normally be dangerous, but we assume the HTML is from a trusted source */}
          <div dangerouslySetInnerHTML={{ __html: requirementsHTML.substring(0, 500) + '...' }} />
        </RequirementsCard>
      )}
    </StepContainer>
  );
};

export default Step2ProgramConfirmation; 