import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faUser, faUserTie, faPeopleCarry, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const WelcomeMessage = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

const WelcomeTitle = styled.h2`
  font-size: 1.5rem;
  color: #0c3b5e;
  margin-bottom: 1.5rem;
`;

const WelcomeText = styled.p`
  line-height: 1.6;
  margin-bottom: 1rem;
  color: #333;
`;

const DocumentList = styled.ul`
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
  
  li {
    margin-bottom: 0.5rem;
  }
`;

const ImportantNote = styled.div`
  background-color: #fff8e1;
  border-left: 4px solid #f39c12;
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  border-radius: 4px;
  
  p {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin: 0.5rem 0;
    font-weight: 500;
    
    svg {
      color: #f39c12;
      margin-top: 0.2rem;
    }
  }
`;

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
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ApplicantTypeCard = styled.div<{ selected: boolean }>`
  flex: 1;
  min-width: 200px;
  background-color: ${props => props.selected ? '#e8f4fc' : 'white'};
  border: 2px solid ${props => props.selected ? '#0c3b5e' : '#ddd'};
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &:hover {
    border-color: ${props => props.selected ? '#0c3b5e' : '#aaa'};
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

const Select = styled.select`
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

const FormGroup = styled.div`
  margin-top: 1.5rem;
`;

const Required = styled.span`
  color: red;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
  text-align: right;
`;

const Button = styled.button<{ primary: boolean }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  background-color: ${props => props.primary ? '#0c3b5e' : '#ddd'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.primary ? '#0a2e4a' : '#ccc'};
  }
`;

interface Step1WelcomeProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
}

const Step1Welcome: React.FC<Step1WelcomeProps> = ({ formData, updateFormData, onNext }) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  const handleApplicantTypeSelect = (type: 'Student' | 'Agent' | 'Ambassador') => {
    updateFormData({
      ...formData,
      applicantType: type,
      isPersonalInfoValid: false
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData,
      [name]: value,
      isPersonalInfoValid: false
    });
  };

  const handleNext = () => {
    if (validateForm()) {
      updateFormData({
        ...formData,
        isPersonalInfoValid: true
      });
      onNext();
    }
  };

  return (
    <StepContainer>
      <WelcomeMessage>
        <WelcomeTitle>Welcome to StudyWeg!</WelcomeTitle>
        
        <WelcomeText>
          Before you begin your application, please make sure you have the following documents ready for submission:
        </WelcomeText>
        
        <DocumentList>
          <li>Passport (Front and Back)</li>
          <li>10th Marksheet</li>
          <li>12th Marksheet</li>
          <li>Updated Resume</li>
          <li>Degree Certificate & Transcript</li>
          <li>Consolidated Marksheet</li>
          <li>Semester-wise Marksheets</li>
          <li>TOEFL/IELTS Scorecard</li>
          <li>Letters of Recommendation (LORs) (Include Recommender's Name, Email, and Phone)</li>
          <li>Certifications (if applicable)</li>
        </DocumentList>
        
        <WelcomeText>
          Please provide proper scanned copies of the documents where all details are clearly visible. 
          If you're using your phone to scan, consider using apps like CamScanner to ensure the quality is sufficient.
        </WelcomeText>
        
        <WelcomeText>
          Once your documents are prepared, please upload them via the portal.
        </WelcomeText>
        
        <ImportantNote>
          <p>
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span>Important: Once you proceed to the next step, you will not be able to go back and make changes. 
            Please double-check your documents before moving forward.</span>
          </p>
        </ImportantNote>
        
        <WelcomeText>
          <strong>Additional Instructions:</strong>
        </WelcomeText>
        
        <DocumentList>
          <li>On the first page, you will need to mention the course and school you are interested in.</li>
          <li>If you haven't selected a course yet, you can browse options here.</li>
          <li>Copy and paste the course and school name from the program page into the application, so keep the program page open for reference.</li>
          <li>If you haven't decided on a program yet and would like us to recommend options, simply enter "Need Assistance" in the fields for course and school name.</li>
        </DocumentList>
        
        <WelcomeText>
          We're excited to support you on this journey! 😊
        </WelcomeText>
      </WelcomeMessage>
      
      <ApplicantTypeSection>
        <ApplicantTypeTitle>Who is submitting the application? *</ApplicantTypeTitle>
        
        <ApplicantTypeOptions>
          <ApplicantTypeCard 
            selected={formData.applicantType === 'Student'} 
            onClick={() => handleApplicantTypeSelect('Student')}
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
            selected={formData.applicantType === 'Agent'} 
            onClick={() => handleApplicantTypeSelect('Agent')}
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
            selected={formData.applicantType === 'Ambassador'} 
            onClick={() => handleApplicantTypeSelect('Ambassador')}
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
              value={formData.agentId || ''} 
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
              value={formData.ambassadorId || ''} 
              onChange={handleInputChange} 
              placeholder="Enter your Ambassador ID"
              required 
            />
            {errors.ambassadorId && <ErrorMessage>{errors.ambassadorId}</ErrorMessage>}
          </InputGroup>
        )}
      </ApplicantTypeSection>
    </StepContainer>
  );
};

export default Step1Welcome; 