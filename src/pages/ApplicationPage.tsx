import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCheck, faExclamationTriangle, faFilter, faTimes, faUser, faBook, faFileAlt, faCreditCard, faClipboardCheck, faStar } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import ReactDOM from 'react-dom';

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
  position: relative;
  overflow-x: hidden;
  z-index: 1;
  &.filter-active {
    overflow: hidden;
  }
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
  transition: opacity 0.3s ease, visibility 0.3s ease;
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
  flex-direction: column;
  padding: 1.75rem 2rem 1.5rem;
  border-bottom: 1px solid rgba(220, 230, 240, 0.7);
  background: linear-gradient(to right, #f8f9fb, #f1f7fc);
  position: sticky;
  top: 0;
  z-index: 3;
  transition: all 0.3s ease;
`;

const shine = keyframes`
  0% { background-position: -50px; }
  40%, 100% { background-position: 250px; }
`;

const StepTrack = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
  margin-bottom: 1.5rem;
`;

const StepConnector = styled.div`
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  height: 4px;
  background-color: #e9edf2;
  border-radius: 4px;
  z-index: 1;
`;

const StepProgress = styled.div<{ progress: number }>`
  position: absolute;
  top: 20px;
  left: 0;
  height: 4px;
  width: ${props => props.progress}%;
  background: linear-gradient(90deg, #5e8ed1, #7e68c9);
  border-radius: 4px;
  z-index: 2;
  transition: width 0.6s ease-in-out;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      rgba(255,255,255,0) 0%,
      rgba(255,255,255,0.4) 50%,
      rgba(255,255,255,0) 100%
    );
    background-size: 150px 100%;
    animation: ${shine} 2s infinite linear;
    border-radius: 4px;
  }
`;

const StepDot = styled.div<{ active: boolean; completed: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 3;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    background: ${props => 
      props.completed ? 'linear-gradient(135deg, #50b17f, #60c28e)' : 
      props.active ? 'linear-gradient(135deg, #5e8ed1, #7e68c9)' : 
      '#e0e6ee'};
    border-radius: 50%;
    z-index: -1;
    box-shadow: ${props => 
      props.active ? '0 3px 8px rgba(94, 142, 209, 0.3)' : 
      props.completed ? '0 2px 6px rgba(80, 177, 127, 0.2)' : 
      'none'};
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    border: 2px solid ${props => 
      props.completed ? '#50b17f' : 
      props.active ? '#5e8ed1' : 
      'transparent'};
    opacity: 0.6;
    z-index: -2;
  }
  
  .step-dot-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    color: ${props => props.active || props.completed ? 'white' : '#a3adb9'};
    font-weight: ${props => props.active ? 'bold' : 'normal'};
    background: ${props => 
      props.completed ? 'linear-gradient(135deg, #50b17f, #60c28e)' : 
      props.active ? 'linear-gradient(135deg, #5e8ed1, #7e68c9)' : 
      '#f0f2f7'};
    font-size: ${props => props.active ? '1rem' : '0.9rem'};
  }
`;

const StepLabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StepLabel = styled.div<{ active: boolean; completed: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  width: 16.6%;
  font-size: 0.85rem;
  color: ${props => 
    props.completed ? '#50b17f' : 
    props.active ? '#5e8ed1' : 
    '#a3adb9'};
  font-weight: ${props => props.active ? '600' : 'normal'};
  transition: all 0.3s ease;
  
  .step-name {
    white-space: nowrap;
    margin-top: 5px;
    transition: all 0.3s ease;
  }
  
  .step-icon {
    margin-bottom: 3px;
    font-size: ${props => props.active ? '1.1rem' : '0.9rem'};
    transition: all 0.3s ease;
  }
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

// New sliding filter component
const FilterSidebar = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 70px; /* Adjust this value based on your header height */
  right: ${props => props.isOpen ? '0' : '-320px'};
  width: 320px;
  height: auto; /* Change to auto height instead of full viewport */
  max-height: calc(100vh - 140px); /* Allow some space at the bottom */
  background-color: white;
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.15);
  z-index: 99999;
  transition: right 0.3s ease-in-out;
  padding: 1.5rem; /* Reduced padding */
  overflow-y: auto;
  will-change: transform;
  border-left: 4px solid #0c3b5e;
  animation: ${props => props.isOpen ? 'filterSlideIn 0.3s ease-in-out' : 'none'};
  isolation: isolate;
  border-radius: 0 0 0 8px; /* Add rounded corners at the bottom */
  pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
  
  /* Ensure filter content is always visible */
  ${props => props.isOpen && `
    display: block !important;
    visibility: visible !important;
    transform: translateZ(0) !important;
  `}
  
  @keyframes filterSlideIn {
    from {
      right: -320px;
      opacity: 0.5;
    }
    to {
      right: 0;
      opacity: 1;
    }
  }
  
  /* Add responsive adjustment for different screen sizes */
  @media (max-width: 768px) {
    top: 60px;
    max-height: calc(100vh - 120px);
    padding: 1rem;
  }
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  
  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #0c3b5e;
    font-weight: 600;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #555;
  
  &:hover {
    color: #0c3b5e;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 1rem; /* Reduced margin */
  
  h3 {
    font-size: 1rem; /* Smaller font size */
    margin-bottom: 0.75rem; /* Reduced margin */
    color: #333;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px; /* Reduced gap */
  
  div {
    display: flex;
    align-items: center;
    
    input {
      margin-right: 8px;
    }
    
    label {
      font-size: 0.9rem; /* Smaller font */
    }
  }
`;

const SelectInput = styled.select`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const ApplyFilterButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
`;

const FilterPortal: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  
  useEffect(() => {
    // Create portal root if it doesn't exist
    let root = document.getElementById('filter-portal-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'filter-portal-root';
      root.style.position = 'fixed';
      root.style.top = '70px'; // Set to match header height
      root.style.left = '0';
      root.style.width = '100%';
      root.style.height = 'calc(100% - 70px)'; // Adjust height to account for header
      root.style.zIndex = '99999';
      // Set pointer-events to 'none' by default so underlying content remains clickable
      root.style.pointerEvents = 'none';
      document.body.appendChild(root);
    }
    setPortalRoot(root);
    
    return () => {
      if (root && root.parentNode) {
        root.parentNode.removeChild(root);
      }
    };
  }, []);
  
  return portalRoot ? ReactDOM.createPortal(children, portalRoot) : null;
};

const FilterOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99998;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
  will-change: opacity;
  
  ${props => !props.isOpen && `
    display: none;
  `}
`;

const FilterButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #0c3b5e;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 9997;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
  }
  
  &:focus {
    outline: none;
  }
  
  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1.5rem;
  }
`;

// Create a global style component to adjust filter positioning for header
const GlobalFilterStyles = createGlobalStyle<{ isOpen: boolean }>`
  body {
    overflow: ${props => props.isOpen ? 'hidden' : 'auto'};
  }
  
  ${props => props.isOpen && `
    /* Only hide navigation elements, not the entire header */
    nav,
    .navigation-links,
    .header-links,
    .navbar-nav {
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
    
    /* Keep header visible but ensure filter is on top */
    .filter-sidebar-component {
      z-index: 99999 !important;
      position: fixed !important;
      isolation: isolate;
    }
  `}
  
  /* Blurred card when filter is open */
  .blurred-card {
    filter: ${props => props.isOpen ? 'blur(2px)' : 'none'};
    pointer-events: ${props => props.isOpen ? 'none' : 'auto'};
  }
  
  /* Make step content always interactive */
  .interactive-content {
    pointer-events: auto !important;
    position: relative;
    z-index: 5;
  }
  
  /* Ensure form elements are always interactive */
  .ApplicantTypeCard,
  .interactive-card,
  .interactive-section,
  .applicant-type-section,
  .applicant-type-options,
  .step-container-interactive,
  button,
  input.interactive-input,
  select,
  textarea {
    pointer-events: auto !important;
    position: relative;
    z-index: 10;
  }
  
  /* Add extra specificity to ensure interactivity */
  .step-container-interactive .applicant-type-section .applicant-type-options .ApplicantTypeCard {
    pointer-events: auto !important;
    cursor: pointer !important;
    z-index: 10;
  }
`;

// Add FileInfo interface for consistency with Step4Documents.tsx
interface FileInfo {
  file: File;
  id: string;
}

// Define type aliases for document types to ensure compatibility
type DocumentValue = File | File[] | FileInfo | FileInfo[] | null | undefined;

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
  // Use a Record type with a consistent value type
  documents: Record<string, DocumentValue>;
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
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Set up form state
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
        postalCode: ''
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
      email: ''
    },
    education: {
      level: '',
      country: '',
      institution: '',
      fieldOfStudy: '',
      grade: '',
      graduationDate: ''
    },
    educationEntries: [],
    educationSponsor: {
      name: '',
      relationship: '',
      phoneNumber: '',
      email: ''
    },
    languageProficiency: {
      exam: '',
      overallScore: '',
      readingScore: '',
      writingScore: '',
      listeningScore: '',
      speakingScore: '',
      testReportNumber: '',
      testDate: ''
    },
    workExperience: {
      hasExperience: false,
      companyName: '',
      position: '',
      startDate: '',
      endDate: '',
      jobDescription: ''
    },
    visaRejection: {
      hasRejection: false,
      country: ''
    },
    documents: {},
    paymentMethod: '',
    applicantType: '',  // Ensure this is initialized
    agentId: '',
    ambassadorId: '',
    documentsValid: false,
    isPersonalInfoValid: false
  });

  // Debug formData changes
  useEffect(() => {
    console.log("formData updated:", formData);
    console.log("Current applicantType:", formData.applicantType);
  }, [formData]);
  
  // Toggle filter sidebar and manage page state
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  
  // Close filter when clicking outside
  const closeFilter = () => {
    setIsFilterOpen(false);
  };
  
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
  
  // Update the useEffect for scroll listener to also close the filter when scrolling
  useEffect(() => {
    let lastScrollTop = 0;
    
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop && st > 100) {
        // Scrolling down and past threshold
        setIsFilterActive(true);
        // Also close the filter sidebar when scrolling down
        if (isFilterOpen) {
          setIsFilterOpen(false);
        }
      } else if (st < lastScrollTop && st < 50) {
        // Scrolling up and near top
        setIsFilterActive(false);
      }
      lastScrollTop = st <= 0 ? 0 : st;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFilterOpen]);
  
  // Handle next step
  const handleNext = () => {
    console.log("handleNext called, currentStep:", currentStep);
    console.log("Current formData:", JSON.stringify(formData, null, 2));
    
    // Add validation here if needed
    if (currentStep === 1) {
      // For Step 1, validate applicant type and ID
      console.log("Checking applicant type:", formData.applicantType);
      
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
      
      console.log("Step 1 validation passed, proceeding to step 2");
      // Force update form data before proceeding
      const updatedFormData = {
        ...formData,
        applicantType: formData.applicantType,  // Ensure this is set correctly
        isPersonalInfoValid: false
      };
      console.log("Setting updated form data:", JSON.stringify(updatedFormData, null, 2));
      setFormData(updatedFormData);
      
      // Try both ways to set the step to ensure it moves forward
      setCurrentStep(2);  // Explicitly set to step 2 rather than incrementing
      setTimeout(() => {
        // Double-check after a short delay to ensure the step has changed
        console.log("Current step after delay:", currentStep);
        if (currentStep === 1) {
          console.log("Forcing step change to 2");
          setCurrentStep(2);
        }
      }, 100);
      
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
    console.log("Rendering step content for step:", currentStep);
    console.log("Current formData:", JSON.stringify(formData, null, 2));
    
    switch (currentStep) {
      case 1:
        console.log("Rendering Step1Welcome");
        return (
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
                setCurrentStep(prev => prev + 1);
              }}
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
            onClick={() => {
              console.log("Continue button clicked for Step 1");
              console.log("Current applicant type:", formData.applicantType);
              
              // Ensure the button is always clickable and will trigger handleNext
              handleNext();
            }}
            disabled={!formData.applicantType} // Only disable if no applicant type is selected
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
    <PageContainer className={isFilterOpen ? 'filter-active' : ''}>
      {/* Global styles */}
      <GlobalFilterStyles isOpen={isFilterOpen} />
      
      {/* Filter Components */}
      <FilterButton onClick={toggleFilter} aria-label="Open filters">
        <FontAwesomeIcon icon={faFilter} />
      </FilterButton>
      
      <FilterPortal>
        <FilterOverlay isOpen={isFilterOpen} onClick={closeFilter} />
        
        <FilterSidebar isOpen={isFilterOpen} className="filter-sidebar-component">
          <FilterHeader>
            <h2>Filter Options</h2>
            <CloseButton onClick={closeFilter} aria-label="Close filters">
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </CloseButton>
          </FilterHeader>
          
          <FilterSection>
            <h3>Program Type</h3>
            <CheckboxContainer>
              <div>
                <input type="checkbox" id="bachelor" />
                <label htmlFor="bachelor"> Bachelor's Programs</label>
              </div>
              <div>
                <input type="checkbox" id="master" />
                <label htmlFor="master"> Master's Programs</label>
              </div>
              <div>
                <input type="checkbox" id="phd" />
                <label htmlFor="phd"> PhD Programs</label>
              </div>
            </CheckboxContainer>
          </FilterSection>
          
          <FilterSection>
            <h3>Location</h3>
            <SelectInput>
              <option>All Countries</option>
              <option>Germany</option>
              <option>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
            </SelectInput>
          </FilterSection>
          
          <ApplyFilterButton primary>
            Apply Filters
          </ApplyFilterButton>
        </FilterSidebar>
      </FilterPortal>
      
      <Card className={isFilterOpen ? 'blurred-card' : ''}>
        <CardHeader 
          className="card-header"
          style={{ 
            opacity: isFilterActive || isFilterOpen ? 0 : 1, 
            visibility: isFilterActive || isFilterOpen ? 'hidden' : 'visible',
            transition: 'opacity 0.3s ease, visibility 0.3s ease',
            display: isFilterOpen ? 'none' : 'flex'
          }}
        >
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
        
        <StepIndicator style={{
          opacity: isFilterOpen ? 0.3 : 1,
          transition: 'opacity 0.3s ease'
        }}>
          <StepTrack>
            <StepConnector />
            <StepProgress progress={(((currentStep - 1) / 5) * 100)} />
            
            {[1, 2, 3, 4, 5, 6].map(step => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: (step - 1) * 0.08,
                  type: "spring", 
                  stiffness: 200 
                }}
              >
                <StepDot 
                  active={step === currentStep} 
                  completed={step < currentStep}
                >
                  <div className="step-dot-inner">
                    {step < currentStep ? (
                      <FontAwesomeIcon icon={faCheck} />
                    ) : (
                      step
                    )}
                  </div>
                  {step === currentStep && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-3px',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        background: '#7e68c9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.6rem',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                        border: '1px solid white'
                      }}
                    >
                      <FontAwesomeIcon icon={faStar} />
                    </motion.div>
                  )}
                </StepDot>
              </motion.div>
            ))}
          </StepTrack>
          
          <StepLabelContainer>
            {[1, 2, 3, 4, 5, 6].map(step => {
              let stepIcon;
              let name;
              
              switch(step) {
                case 1:
                  stepIcon = faUser;
                  name = 'Welcome';
                  break;
                case 2:
                  stepIcon = faBook;
                  name = 'Program';
                  break;
                case 3:
                  stepIcon = faUser;
                  name = 'Personal Info';
                  break;
                case 4:
                  stepIcon = faFileAlt;
                  name = 'Documents';
                  break;
                case 5:
                  stepIcon = faCreditCard;
                  name = 'Payment';
                  break;
                case 6:
                  stepIcon = faClipboardCheck;
                  name = 'Confirmation';
                  break;
                default:
                  stepIcon = faUser;
                  name = '';
              }
              
              return (
                <StepLabel 
                  key={step}
                  active={step === currentStep} 
                  completed={step < currentStep}
                >
                  <motion.div
                    className="step-icon"
                    animate={{ 
                      scale: step === currentStep ? 1.1 : 1,
                      y: step === currentStep ? -2 : 0 
                    }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 10
                    }}
                  >
                    <FontAwesomeIcon icon={stepIcon} />
                  </motion.div>
                  
                  <motion.div 
                    className="step-name"
                    animate={{ 
                      opacity: step === currentStep ? 1 : 0.7
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {name}
                  </motion.div>
                </StepLabel>
              );
            })}
          </StepLabelContainer>
        </StepIndicator>
        
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
          className="interactive-content"
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