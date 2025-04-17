import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

import { Program } from '../types';
import { fetchProgramById } from '../services/api';
import ApplicationFormSkeleton from '../components/ApplicationFormSkeleton';

// Application Steps Components
import {
  Step1Welcome,
  Step2ProgramConfirmation,
  Step3PersonalInfo,
  Step4Documents,
  Step5Payment,
  Step6Confirmation
} from '../components/ApplicationSteps';

// Define styled components
const PageContainer = styled.div`
  max-width: 1000px;
  margin: 3rem auto 5rem;
  padding: 0 1.5rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  overflow: hidden;
`;

const CardHeader = styled.div`
  background-color: #0c3b5e;
  color: white;
  padding: 1.75rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem 2.5rem;
  margin: 0;
  border-bottom: 1px solid #eee;
  background-color: #f9fafb;
  max-width: 900px;
  margin: 0 auto;
`;

const StepDot = styled.div<{ active: boolean; completed: boolean }>`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => 
    props.completed ? '#4CAF50' : props.active ? '#0c3b5e' : '#e0e0e0'};
  color: white;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  position: relative;
  transition: all 0.3s ease;
  box-shadow: ${props => props.active ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none'};
  z-index: 2;
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 38px;
    width: 100%;
    height: 3px;
    background-color: ${props => props.completed ? '#4CAF50' : '#e0e0e0'};
    transform: translateY(-50%);
    z-index: 1;
  }
`;

const StepLabel = styled.span<{ active: boolean }>`
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 0.85rem;
  color: ${props => props.active ? '#0c3b5e' : '#666'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
`;

const StepContent = styled.div`
  padding: 2.5rem;
  
  h3 {
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.8rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  h3:first-of-type {
    margin-top: 0;
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

const StepContainer = styled.div`
  > * {
    margin-bottom: 2.5rem;
  }
`;

// Define types for form data
interface FormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    gender: string;
    maritalStatus: string;
    countryOfResidence: string;
    phoneNumber: string;
    address: {
      street: string;
      city: string;
      state: string;
      country: string;
      postalCode: string;
    };
    profilePicture?: File | null;
    nationality: string;
    passportNumber: string;
    passportExpiry: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phoneNumber: string;
    email: string;
  };
  education: {
    level: string;
    country: string;
    institution: string;
    fieldOfStudy: string;
    grade: string;
    graduationDate: string;
  };
  educationEntries: Array<{
    level: string;
    country: string;
    institution: string;
    fieldOfStudy: string;
    grade: string;
    graduationDate: string;
  }>;
  educationSponsor: {
    name: string;
    relationship: string;
    phoneNumber: string;
    email: string;
  };
  languageProficiency: {
    exam: string;
    overallScore: string;
    readingScore: string;
    writingScore: string;
    listeningScore: string;
    speakingScore: string;
    testReportNumber: string;
    testDate: string;
  };
  workExperience: {
    hasExperience: boolean;
    companyName: string;
    position: string;
    startDate: string;
    endDate: string;
    jobDescription: string;
  };
  visaRejection: {
    hasRejection: boolean;
    country: string;
  };
  attemptingNextStep?: boolean;
  isPersonalInfoValid?: boolean;
  documentsValid?: boolean;
  documents: {
    [key: string]: File[] | File | null | undefined;
    transcripts?: File[] | null;
    languageResults?: File | null;
    passport?: File | null;
    sponsorLetter?: File | null;
    financialDocuments?: File | null;
    resume?: File | null;
  };
  paymentMethod: string;
  applicantType?: string;
  agentId?: string;
  ambassadorId?: string;
}

const ApplicationPage: React.FC = () => {
  const { programId } = useParams();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [program, setProgram] = useState<Program | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize form data
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      gender: '',
      maritalStatus: '',
      countryOfResidence: '',
      phoneNumber: '',
      address: {
        street: '',
        city: '',
        state: '',
        country: '',
        postalCode: '',
      },
      profilePicture: null,
      nationality: '',
      passportNumber: '',
      passportExpiry: '',
    },
    emergencyContact: {
      name: '',
      relationship: '',
      phoneNumber: '',
      email: '',
    },
    education: {
      level: '',
      country: '',
      institution: '',
      fieldOfStudy: '',
      grade: '',
      graduationDate: '',
    },
    educationEntries: [],
    educationSponsor: {
      name: '',
      relationship: '',
      phoneNumber: '',
      email: '',
    },
    languageProficiency: {
      exam: '',
      overallScore: '',
      readingScore: '',
      writingScore: '',
      listeningScore: '',
      speakingScore: '',
      testReportNumber: '',
      testDate: '',
    },
    workExperience: {
      hasExperience: false,
      companyName: '',
      position: '',
      startDate: '',
      endDate: '',
      jobDescription: '',
    },
    visaRejection: {
      hasRejection: false,
      country: '',
    },
    attemptingNextStep: false,
    isPersonalInfoValid: false,
    documentsValid: false,
    documents: {
      transcripts: [],
      languageResults: null,
      passport: null,
      sponsorLetter: null,
      financialDocuments: null,
      resume: null,
    },
    paymentMethod: '',
    applicantType: '',
  });
  
  // Load program data
  useEffect(() => {
    const loadProgram = async () => {
      console.log("ApplicationPage: Loading program with ID:", programId);
      
      if (!programId) {
        console.error("ApplicationPage: No program ID provided");
        setError("No program ID provided. Please select a program first.");
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        const id = parseInt(programId, 10);
        if (isNaN(id)) {
          console.error("ApplicationPage: Invalid program ID format:", programId);
          throw new Error('Invalid program ID format');
        }
        
        console.log("ApplicationPage: Fetching program with ID:", id);
        const programData = await fetchProgramById(id);
        console.log("ApplicationPage: Program data retrieved:", programData);
        setProgram(programData);
      } catch (err) {
        console.error('Failed to load program:', err);
        setError('Failed to load program details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProgram();
  }, [programId]);
  
  // Handle next step
  const handleNext = () => {
    // Add validation here if needed
    if (currentStep === 1) {
      // For Step 1, validate applicant type and ID
      if (!formData.applicantType) {
        alert('Please select who is submitting the application');
        return;
      }
      
      if (formData.applicantType === 'Agent' && !formData.agentId) {
        alert('Please enter your agent ID');
        return;
      }
      
      if (formData.applicantType === 'Ambassador' && !formData.ambassadorId) {
        alert('Please enter your ambassador ID');
        return;
      }
      
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
      return;
    }
    
    if (currentStep === 3) {
      // Set flag in formData to trigger validation in Step3PersonalInfo component
      console.log("Setting attemptingNextStep to true in ApplicationPage");
      setFormData(prevState => ({
        ...prevState,
        attemptingNextStep: true
      }));
      
      // Check if personal info is valid before proceeding
      if (formData.isPersonalInfoValid) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      }
      // If not valid, the Child component will handle validation and error display
      
      return;
    }
    
    if (currentStep === 4) {
      // Step 4 validation happens in the Step4Documents component
      // Reference to the child component's handleNext function is passed down
      
      // If documents are already validated, proceed directly
      if (formData.documentsValid) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
        return;
      }
      
      // Otherwise check if required documents are present
      const requiredDocuments = ['highSchoolTranscripts', 'passport', 'resume'];
      
      // If language proficiency exam is provided, language results are required
      if (formData.languageProficiency?.exam && formData.languageProficiency.exam !== 'None') {
        requiredDocuments.push('languageResults');
      }
      
      // Check if any required documents are missing
      const missingDocuments = requiredDocuments.filter(
        docType => {
          const docArray = formData.documents?.[docType];
          return !docArray || (Array.isArray(docArray) && docArray.length === 0);
        }
      );
      
      if (missingDocuments.length === 0) {
        // All required documents are present
        setFormData(prevState => ({
          ...prevState,
          documentsValid: true
        }));
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      } else {
        // Some required documents are missing
        // Scroll to validation summary if it exists
        document.getElementById('validation-summary')?.scrollIntoView({ behavior: 'smooth' });
      }
      
      return;
    }
    
    if (currentStep === 5 && !formData.paymentMethod) {
      alert('Please select a payment method');
      return;
    }
    
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Handle form data changes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateFormData = (step: string, data: any) => {
    setFormData(prev => {
      const currentStepData = prev[step as keyof FormData];
      if (typeof currentStepData === 'object' && currentStepData !== null) {
        return {
          ...prev,
          [step]: {
            ...currentStepData,
            ...data
          }
        };
      } else {
        return {
          ...prev,
          [step]: data
        };
      }
    });
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    // Add your API call here to submit the application
    console.log('Form submitted:', formData);
    
    // Move to confirmation step
    setCurrentStep(6);
  };
  
  // Render the appropriate step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepContainer>
            <Step1Welcome
              formData={formData}
              updateFormData={(data) => {
                setFormData(prevState => ({
                  ...prevState,
                  ...data
                }));
              }}
              onNext={() => setCurrentStep(prev => prev + 1)}
            />
          </StepContainer>
        );
      case 2:
        return (
          <StepContainer>
            <Step2ProgramConfirmation 
              program={program} 
              isLoading={isLoading}
            />
          </StepContainer>
        );
      case 3:
        return (
          <StepContainer>
            <Step3PersonalInfo 
              formData={formData} 
              updateFormData={(data) => {
                setFormData(prevState => ({
                  ...prevState,
                  ...data
                }));
              }}
              onNext={() => setCurrentStep(prev => prev + 1)}
              onBack={() => setCurrentStep(prev => prev - 1)}
            />
          </StepContainer>
        );
      case 4:
        return (
          <StepContainer>
            <Step4Documents 
              formData={formData} 
              updateFormData={(data) => {
                setFormData(prevState => ({
                  ...prevState,
                  ...data
                }));
              }}
              onNext={() => {
                // When document validation passes in the Step4Documents component,
                // this function will be called to proceed to the next step
                setCurrentStep(prev => prev + 1);
                window.scrollTo(0, 0);
              }}
              onBack={handlePrevious}
            />
          </StepContainer>
        );
      case 5:
        return (
          <StepContainer>
            <Step5Payment 
              formData={formData} 
              program={program}
              updateFormData={(data) => {
                setFormData(prevState => ({
                  ...prevState,
                  ...data
                }));
              }}
            />
          </StepContainer>
        );
      case 6:
        return (
          <StepContainer>
            <Step6Confirmation 
              formData={formData} 
              program={program}
            />
          </StepContainer>
        );
      default:
        return null;
    }
  };
  
  // Get button configuration for current step
  const getStepButtons = () => {
    const isLastStep = currentStep === 5; // Payment is the last input step
    const isConfirmationStep = currentStep === 6;
    const isDocumentsStep = currentStep === 4;
    
    // First step has no back button
    if (currentStep === 1) {
      return (
        <>
          <div></div> {/* Empty div for spacing */}
          <Button 
            primary
            onClick={handleNext}
            disabled={false}
          >
            Continue <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </>
      );
    }
    
    // Confirmation step (Step 6) has special buttons
    if (isConfirmationStep) {
      return (
        <>
          <Button
            onClick={() => navigate('/programs')}
          >
            <FontAwesomeIcon icon={faChevronLeft} /> Browse More Programs
          </Button>
          <Button
            primary
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </>
      );
    }
    
    // Documents step (Step 4) has conditional button behavior
    if (isDocumentsStep) {
      return (
        <>
          <Button onClick={handlePrevious}>
            <FontAwesomeIcon icon={faChevronLeft} /> Back
          </Button>
          <Button 
            primary 
            onClick={handleNext}
            disabled={!formData.documentsValid && formData.documents && Object.keys(formData.documents).length > 0}
          >
            Continue <FontAwesomeIcon icon={faChevronRight} />
          </Button>
        </>
      );
    }
    
    // Default buttons for middle steps
    return (
      <>
        <Button onClick={handlePrevious}>
          <FontAwesomeIcon icon={faChevronLeft} /> Back
        </Button>
        <Button 
          primary 
          onClick={isLastStep ? handleSubmit : handleNext}
        >
          {isLastStep ? 'Submit Application' : 'Continue'} {isLastStep ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faChevronRight} />}
        </Button>
      </>
    );
  };
  
  // Show loading state
  if (isLoading) {
    return <ApplicationFormSkeleton />;
  }
  
  // Show error state
  if (error) {
    return (
      <PageContainer>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Application Error</CardTitle>
              <CardSubtitle>Something went wrong</CardSubtitle>
            </div>
          </CardHeader>
          <StepContent style={{ textAlign: 'center' }}>
            <FontAwesomeIcon 
              icon={faExclamationTriangle} 
              style={{ fontSize: '3rem', color: '#e74c3c', marginBottom: '1rem' }} 
            />
            <h3>{error}</h3>
            <Button 
              primary 
              onClick={() => navigate('/programs')}
              style={{ margin: '2rem auto', display: 'inline-flex' }}
            >
              Back to Programs
            </Button>
          </StepContent>
        </Card>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Program Application</CardTitle>
            <CardSubtitle>
              Step {currentStep} of 6: {
                currentStep === 1 ? 'Welcome' : 
                currentStep === 2 ? 'Program Confirmation' :
                currentStep === 3 ? 'Personal Information' :
                currentStep === 4 ? 'Documents' :
                currentStep === 5 ? 'Payment' :
                'Confirmation'
              }
            </CardSubtitle>
          </div>
        </CardHeader>
        
        <StepIndicator>
          {[1, 2, 3, 4, 5, 6].map(step => (
            <StepDot 
              key={step} 
              active={step === currentStep} 
              completed={step < currentStep}
            >
              {step < currentStep ? <FontAwesomeIcon icon={faCheck} /> : step}
              <StepLabel active={step === currentStep}>
                {
                  step === 1 ? 'Welcome' : 
                  step === 2 ? 'Program' :
                  step === 3 ? 'Personal Info' :
                  step === 4 ? 'Documents' :
                  step === 5 ? 'Payment' :
                  'Confirmation'
                }
              </StepLabel>
            </StepDot>
          ))}
        </StepIndicator>
        
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
        >
          <StepContent>
            {renderStepContent()}
          </StepContent>
        </motion.div>
        
        <ButtonContainer>
          {getStepButtons()}
        </ButtonContainer>
      </Card>
    </PageContainer>
  );
};

export default ApplicationPage; 