import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Step1Welcome } from '../components/ApplicationSteps';

const PageContainer = styled.div`
  max-width: 1000px;
  margin: 3rem auto 5rem;
  padding: 0 1.5rem;
  position: relative;
  overflow-x: hidden;
  z-index: 1;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  position: relative;
  z-index: 1;
`;

const CardHeader = styled.div`
  background-color: #0c3b5e;
  color: white;
  padding: 1.75rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
`;

const CardTitle = styled.h1`
  font-size: 1.75rem;
  margin: 0;
  font-weight: 500;
`;

const CardSubtitle = styled.p`
  margin: 0.5rem 0 0;
  font-size: 1rem;
  opacity: 0.9;
`;

const StepContent = styled.div`
  padding: 2.5rem;
`;

const StepContainer = styled.div`
  > * {
    margin-bottom: 2.5rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding: 1.5rem 2.5rem;
  border-top: 1px solid #eee;
  background-color: #f9fafb;
`;

const Button = styled.button<{ primary?: boolean; disabled?: boolean }>`
  background-color: ${props => props.primary ? '#0c3b5e' : 'white'};
  color: ${props => props.primary ? 'white' : '#0c3b5e'};
  border: ${props => props.primary ? 'none' : '1px solid #0c3b5e'};
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.7 : 1};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.disabled ? (props.primary ? '#0c3b5e' : 'white') : (props.primary ? '#0a3250' : '#f8f9fa')};
  }
`;

// Define basic form data interface
interface FormData {
  applicantType?: string;
  agentId?: string;
  ambassadorId?: string;
  [key: string]: any;
}

const DebugApplicationPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    applicantType: '',
    agentId: '',
    ambassadorId: '',
  });

  console.log("Debug application page rendering with formData:", formData);

  const handleNext = () => {
    console.log("handleNext called");
    
    // Validate form data
    if (!formData.applicantType) {
      console.log("Error: No applicant type selected");
      alert('Please select who is submitting the application');
      return;
    }
    
    if (formData.applicantType === 'Agent' && !formData.agentId) {
      console.log("Error: Agent selected but no Agent ID provided");
      alert('Please enter your agent ID');
      return;
    }
    
    if (formData.applicantType === 'Ambassador' && !formData.ambassadorId) {
      console.log("Error: Ambassador selected but no Ambassador ID provided");
      alert('Please enter your ambassador ID');
      return;
    }
    
    console.log("Form is valid, moving to next step");
    setCurrentStep(2);
    alert("Moving to step 2! Applicant type: " + formData.applicantType);
  };

  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Debug Application Form</CardTitle>
            <CardSubtitle>Step 1: Welcome</CardSubtitle>
          </div>
        </CardHeader>
        
        <StepContent>
          <StepContainer>
            <Step1Welcome
              formData={formData}
              updateFormData={(data) => {
                console.log("Step1Welcome updateFormData called with:", JSON.stringify(data, null, 2));
                setFormData(prevState => ({
                  ...prevState,
                  ...data
                }));
              }}
              onNext={() => {
                console.log("Step1Welcome onNext called");
                setCurrentStep(2);
              }}
            />
          </StepContainer>
        </StepContent>
        
        <ButtonContainer>
          <div></div>
          <Button 
            primary
            onClick={() => {
              console.log("Continue button clicked");
              console.log("Current applicant type:", formData.applicantType);
              handleNext();
            }}
            disabled={!formData.applicantType}
            style={{ 
              cursor: formData.applicantType ? 'pointer' : 'not-allowed', 
              padding: '12px 24px',
              fontWeight: 'bold',
              fontSize: '16px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            Continue <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </ButtonContainer>
      </Card>
    </PageContainer>
  );
};

export default DebugApplicationPage; 