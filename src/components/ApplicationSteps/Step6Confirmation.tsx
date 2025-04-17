import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle, 
  faEnvelope, 
  faUser, 
  faGraduationCap, 
  faUniversity, 
  faCalendarAlt 
} from '@fortawesome/free-solid-svg-icons';
import { Program } from '../../types';

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 0;
`;

const SuccessIcon = styled.div`
  font-size: 5rem;
  color: #2ecc71;
  margin-bottom: 1.5rem;
`;

const ConfirmationTitle = styled.h2`
  font-size: 2rem;
  color: #0c3b5e;
  margin-bottom: 1rem;
`;

const ConfirmationMessage = styled.p`
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const ApplicationReference = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const ReferenceLabel = styled.p`
  color: #666;
  margin-bottom: 0.5rem;
`;

const ReferenceNumber = styled.h3`
  font-size: 1.5rem;
  color: #0c3b5e;
  letter-spacing: 1px;
`;

const ApplicationSummary = styled.div`
  background-color: #e8f4fc;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  width: 100%;
  max-width: 600px;
  text-align: left;
`;

const SummaryTitle = styled.h4`
  font-size: 1.2rem;
  color: #0c3b5e;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const SummaryItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ItemIcon = styled.div`
  width: 40px;
  color: #0c3b5e;
`;

const ItemLabel = styled.span`
  width: 120px;
  color: #666;
`;

const ItemValue = styled.span`
  color: #333;
  font-weight: 500;
`;

const NextStepsContainer = styled.div`
  background-color: #fff8e1;
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
`;

const NextStepsTitle = styled.h4`
  font-size: 1.2rem;
  color: #0c3b5e;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const StepsList = styled.ol`
  text-align: left;
  padding-left: 1.5rem;
  
  li {
    margin-bottom: 1rem;
    line-height: 1.5;
    color: #333;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const ContactInfo = styled.p`
  margin-top: 2rem;
  color: #666;
  
  a {
    color: #0c3b5e;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

interface Step6ConfirmationProps {
  formData: any;
  program: Program | null;
}

const Step6Confirmation: React.FC<Step6ConfirmationProps> = ({ formData, program }) => {
  // Generate a random reference number
  const generateReferenceNumber = () => {
    const prefix = 'SW';
    const timestamp = new Date().getTime().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
  };
  
  const referenceNumber = generateReferenceNumber();
  
  // Get program details
  const getAttributeValue = (name: string) => {
    const attr = program?.attributes?.find(a => a.name === name);
    return attr ? attr.options[0] : 'N/A';
  };
  
  const programLevel = getAttributeValue('Program Level');
  const university = getAttributeValue('School');
  
  return (
    <StepContainer>
      <SuccessIcon>
        <FontAwesomeIcon icon={faCheckCircle} />
      </SuccessIcon>
      
      <ConfirmationTitle>Application Submitted!</ConfirmationTitle>
      
      <ConfirmationMessage>
        Thank you for submitting your application to StudyWeg. We have received your information and will process your application as soon as possible.
      </ConfirmationMessage>
      
      <ApplicationReference>
        <ReferenceLabel>Your Application Reference Number</ReferenceLabel>
        <ReferenceNumber>{referenceNumber}</ReferenceNumber>
      </ApplicationReference>
      
      <ApplicationSummary>
        <SummaryTitle>Application Summary</SummaryTitle>
        
        <SummaryItem>
          <ItemIcon>
            <FontAwesomeIcon icon={faUser} />
          </ItemIcon>
          <ItemLabel>Applicant:</ItemLabel>
          <ItemValue>{formData.personalInfo.firstName} {formData.personalInfo.lastName}</ItemValue>
        </SummaryItem>
        
        <SummaryItem>
          <ItemIcon>
            <FontAwesomeIcon icon={faEnvelope} />
          </ItemIcon>
          <ItemLabel>Email:</ItemLabel>
          <ItemValue>{formData.personalInfo.email}</ItemValue>
        </SummaryItem>
        
        <SummaryItem>
          <ItemIcon>
            <FontAwesomeIcon icon={faGraduationCap} />
          </ItemIcon>
          <ItemLabel>Program:</ItemLabel>
          <ItemValue>{program?.name || 'N/A'}</ItemValue>
        </SummaryItem>
        
        <SummaryItem>
          <ItemIcon>
            <FontAwesomeIcon icon={faUniversity} />
          </ItemIcon>
          <ItemLabel>Institution:</ItemLabel>
          <ItemValue>{university}</ItemValue>
        </SummaryItem>
        
        <SummaryItem>
          <ItemIcon>
            <FontAwesomeIcon icon={faCalendarAlt} />
          </ItemIcon>
          <ItemLabel>Level:</ItemLabel>
          <ItemValue>{programLevel}</ItemValue>
        </SummaryItem>
      </ApplicationSummary>
      
      <NextStepsContainer>
        <NextStepsTitle>What Happens Next?</NextStepsTitle>
        
        <StepsList>
          <li>Our admissions team will review your application and documents within 2-3 business days.</li>
          <li>You will receive an email confirmation with your application details.</li>
          <li>If any additional documents are required, we will contact you via email.</li>
          <li>Once your application is processed, it will be forwarded to the institution for review.</li>
          <li>You will be notified of the admission decision via email and through your StudyWeg dashboard.</li>
        </StepsList>
      </NextStepsContainer>
      
      <ContactInfo>
        If you have any questions, please contact us at <a href="mailto:admissions@studyweg.ca">admissions@studyweg.ca</a> or call +1 (365) 775-2128.
      </ContactInfo>
    </StepContainer>
  );
};

export default Step6Confirmation; 