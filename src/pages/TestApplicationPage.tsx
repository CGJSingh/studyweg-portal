import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTie, faPeopleCarry } from '@fortawesome/free-solid-svg-icons';

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding: 1.5rem 2.5rem;
  border-top: 1px solid #eee;
  background-color: #f9fafb;
`;

const Button = styled.button<{ primary?: boolean }>`
  background-color: ${props => props.primary ? '#0c3b5e' : 'white'};
  color: ${props => props.primary ? 'white' : '#0c3b5e'};
  border: ${props => props.primary ? 'none' : '1px solid #0c3b5e'};
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.primary ? '#0a3250' : '#f8f9fa'};
  }
`;

// Simple applicant type card components
const ApplicantTypeSection = styled.div`
  margin-top: 2rem;
`;

const ApplicantTypeTitle = styled.h3`
  font-size: 1.2rem;
  color: #0c3b5e;
  margin-bottom: 1rem;
`;

const ApplicantTypeOptions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ApplicantTypeCard = styled.button<{ selected: boolean }>`
  flex: 1;
  min-width: 200px;
  background-color: ${props => props.selected ? '#e8f4fc' : 'white'};
  border: 2px solid ${props => props.selected ? '#0c3b5e' : '#ddd'};
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer !important;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 10;
  user-select: none;
  text-align: center;
  font-family: inherit;
  margin: 0.5rem;
  outline: none;
  
  &:hover {
    border-color: #0c3b5e;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
    transform: translateY(-5px);
    background-color: ${props => props.selected ? '#e8f4fc' : '#f7fbff'};
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  &:focus {
    outline: none;
    border-color: #0c3b5e;
    box-shadow: 0 0 0 3px rgba(12, 59, 94, 0.3);
  }
  
  &:disabled {
    cursor: not-allowed !important;
    opacity: 0.7;
  }
`;

const ApplicantTypeIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #0c3b5e;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  
  svg {
    font-size: 1.5rem;
  }
`;

const ApplicantTypeName = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const ApplicantTypeDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  text-align: center;
`;

const InputGroup = styled.div`
  margin-top: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #0c3b5e;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  display: block;
`;

const TestApplicationPage: React.FC = () => {
  const [formData, setFormData] = useState<{
    applicantType: '' | 'Student' | 'Agent' | 'Ambassador';
    agentId: string;
    ambassadorId: string;
  }>({
    applicantType: '',
    agentId: '',
    ambassadorId: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  console.log("Test application page rendering with formData:", formData);

  const handleApplicantTypeSelect = (type: 'Student' | 'Agent' | 'Ambassador') => {
    console.log(`Selected applicant type: ${type}`);
    
    setFormData({
      ...formData,
      applicantType: type,
      agentId: type === 'Agent' ? formData.agentId : '',
      ambassadorId: type === 'Ambassador' ? formData.ambassadorId : ''
    });
    
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.applicantType) {
      newErrors.applicantType = 'Please select who is submitting the application';
    } else if (formData.applicantType === 'Agent' && !formData.agentId) {
      newErrors.agentId = 'Please enter your agent ID';
    } else if (formData.applicantType === 'Ambassador' && !formData.ambassadorId) {
      newErrors.ambassadorId = 'Please enter your ambassador ID';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Test Application Form</CardTitle>
            <CardSubtitle>Select your applicant type</CardSubtitle>
          </div>
        </CardHeader>
        
        <StepContent>
          <ApplicantTypeSection>
            <ApplicantTypeTitle>Who is submitting the application? *</ApplicantTypeTitle>
            
            <ApplicantTypeOptions>
              <ApplicantTypeCard 
                type="button"
                selected={formData.applicantType === 'Student'} 
                onClick={() => handleApplicantTypeSelect('Student')}
                aria-pressed={formData.applicantType === 'Student'}
                tabIndex={0}
              >
                <ApplicantTypeIcon>
                  <FontAwesomeIcon icon={faUser} />
                </ApplicantTypeIcon>
                <ApplicantTypeName>Student</ApplicantTypeName>
                <ApplicantTypeDescription>
                  I am applying for myself
                </ApplicantTypeDescription>
              </ApplicantTypeCard>
              
              <ApplicantTypeCard 
                type="button"
                selected={formData.applicantType === 'Agent'} 
                onClick={() => handleApplicantTypeSelect('Agent')}
                aria-pressed={formData.applicantType === 'Agent'}
                tabIndex={0}
              >
                <ApplicantTypeIcon>
                  <FontAwesomeIcon icon={faUserTie} />
                </ApplicantTypeIcon>
                <ApplicantTypeName>Agent</ApplicantTypeName>
                <ApplicantTypeDescription>
                  I am an education agent
                </ApplicantTypeDescription>
              </ApplicantTypeCard>
              
              <ApplicantTypeCard 
                type="button"
                selected={formData.applicantType === 'Ambassador'} 
                onClick={() => handleApplicantTypeSelect('Ambassador')}
                aria-pressed={formData.applicantType === 'Ambassador'}
                tabIndex={0}
              >
                <ApplicantTypeIcon>
                  <FontAwesomeIcon icon={faPeopleCarry} />
                </ApplicantTypeIcon>
                <ApplicantTypeName>Ambassador</ApplicantTypeName>
                <ApplicantTypeDescription>
                  I am a StudyWeg ambassador
                </ApplicantTypeDescription>
              </ApplicantTypeCard>
            </ApplicantTypeOptions>
            
            {errors.applicantType && <ErrorMessage>{errors.applicantType}</ErrorMessage>}
            
            {formData.applicantType === 'Agent' && (
              <InputGroup>
                <Label htmlFor="agentId">Agent ID *</Label>
                <Input 
                  type="text" 
                  id="agentId" 
                  name="agentId" 
                  value={formData.agentId} 
                  onChange={handleInputChange} 
                  placeholder="Enter your Agent ID"
                  required 
                />
                {errors.agentId && <ErrorMessage>{errors.agentId}</ErrorMessage>}
              </InputGroup>
            )}
            
            {formData.applicantType === 'Ambassador' && (
              <InputGroup>
                <Label htmlFor="ambassadorId">Ambassador ID *</Label>
                <Input 
                  type="text" 
                  id="ambassadorId" 
                  name="ambassadorId" 
                  value={formData.ambassadorId} 
                  onChange={handleInputChange} 
                  placeholder="Enter your Ambassador ID"
                  required 
                />
                {errors.ambassadorId && <ErrorMessage>{errors.ambassadorId}</ErrorMessage>}
              </InputGroup>
            )}
          </ApplicantTypeSection>
        </StepContent>
        
        <ButtonContainer>
          <div></div>
          <Button 
            primary
            onClick={() => {
              console.log("Continue button clicked");
              console.log("Current applicant type:", formData.applicantType);
              
              if (validateForm()) {
                alert("Form is valid! Applicant type: " + formData.applicantType);
              }
            }}
          >
            Continue
          </Button>
        </ButtonContainer>
      </Card>
    </PageContainer>
  );
};

export default TestApplicationPage; 