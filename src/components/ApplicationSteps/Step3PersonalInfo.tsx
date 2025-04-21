import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faCalendarAlt, 
  faEnvelope, 
  faVenusMars, 
  faHeart, 
  faMapMarkerAlt, 
  faPassport, 
  faGraduationCap, 
  faLanguage, 
  faExclamationTriangle, 
  faUpload, 
  faCheck,
  faPlus,
  faTrash,
  faBriefcase,
  faTimes,
  faPhone,
  faUserGraduate
} from '@fortawesome/free-solid-svg-icons';

// Add styled components at the top with other styled components
const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
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

const FormSection = styled.div`
  margin-bottom: 4rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div<{ $fullWidth?: boolean }>`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }

  ${props => props.$fullWidth && `
    grid-column: 1 / -1;
  `}
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #333;
  
  span {
    color: #e74c3c;
    margin-left: 0.25rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #0c3b5e;
  }
  
  &:disabled {
    background-color: #f9f9f9;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
  
  &:focus {
    outline: none;
    border-color: #0c3b5e;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const Radio = styled.input`
  cursor: pointer;
`;

const UploadContainer = styled.div`
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  transition: all 0.2s;
  
  &:hover {
    border-color: #0c3b5e;
  }
`;

const UploadIcon = styled.div`
  font-size: 2rem;
  color: #0c3b5e;
  margin-bottom: 1rem;
`;

const UploadText = styled.p`
  color: #666;
  margin-bottom: 1rem;
`;

const UploadButton = styled.label`
  display: inline-block;
  background-color: #0c3b5e;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #0a3250;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const FilePreview = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #e8f4fc;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  margin-top: 1rem;
`;

const PreviewImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
`;

const FileName = styled.span`
  font-size: 0.9rem;
  color: #333;
`;

const FileSize = styled.span`
  font-size: 0.8rem;
  color: #666;
`;

const SuccessIcon = styled.span`
  color: #2ecc71;
  margin-left: auto;
`;

// Add button styled component
const AddButton = styled.button`
  background-color: #f39c12;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  cursor: pointer;
  margin: 1.5rem auto 3rem;
  transition: all 0.3s ease;
  width: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #e67e22;
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }
  
  svg {
    font-size: 1.2rem;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s;
  
  &:hover {
    background-color: rgba(220, 53, 69, 0.1);
  }
`;

const EducationEntry = styled.div`
  position: relative;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const RemoveButtonWrapper = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const RequiredFieldsNote = styled.p`
  font-size: 0.95rem;
  color: #555;
  margin: -0.5rem 0 1.5rem;
  font-style: italic;
  
  span {
    color: #e74c3c;
    font-weight: bold;
  }
`;

// Add FormGrid styled component
const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

// Rename the second RemoveButton to EmploymentRemoveButton
const EmploymentRemoveButton = styled.button`
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s;
  
  &:hover {
    background-color: rgba(220, 53, 69, 0.1);
  }
`;

// EmploymentCard styled component
const EmploymentCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e9ecef;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  h4 {
    margin: 0;
    color: #0c3b5e;
    font-size: 1.1rem;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  
  input[type="checkbox"] {
    width: 1.2rem;
    height: 1.2rem;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: #0c3b5e;
  }
`;

const Required = styled.span`
  color: #e74c3c;
  margin-left: 0.25rem;
`;

// Add countries list at the top of the file
const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
  'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
  'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo (Congo-Brazzaville)', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czechia (Czech Republic)',
  'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
  'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini (fmr. "Swaziland")', 'Ethiopia',
  'Fiji', 'Finland', 'France',
  'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana',
  'Haiti', 'Honduras', 'Hungary',
  'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
  'Jamaica', 'Japan', 'Jordan',
  'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kosovo', 'Kuwait', 'Kyrgyzstan',
  'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
  'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar (formerly Burma)',
  'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Norway',
  'Oman',
  'Pakistan', 'Palau', 'Palestine State', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
  'Qatar',
  'Romania', 'Russia', 'Rwanda',
  'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
  'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
  'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan',
  'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam',
  'Yemen',
  'Zambia', 'Zimbabwe'
];

// Define interfaces at the top
interface EducationEntryType {
  level: string;
  country: string;
  institution: string;
  fieldOfStudy: string;
  grade: string;
  graduationDate: string;
  enrollmentDate: string; // Adding enrollment date
}

interface EmploymentEntry {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

interface EmergencyContact {
  name: string;
  relationship: string;
  phoneNumber: string;
  email: string;
}

interface EducationSponsor {
  name: string;
  relationship: string;
  phoneNumber: string;
  email: string;
}

interface PersonalInfo {
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
}

interface WorkExperience {
  hasExperience: boolean;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  currentJob?: boolean; // Add currentJob flag
  jobDescription: string;
}

interface LanguageProficiency {
  exam: string;
  overallScore: string;
  readingScore: string;
  writingScore: string;
  listeningScore: string;
  speakingScore: string;
  testReportNumber: string;
  testDate: string;
}

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
    enrollmentDate: string; // Add enrollment date
  };
  educationEntries: Array<{
    level: string;
    country: string;
    institution: string;
    fieldOfStudy: string;
    grade: string;
    graduationDate: string;
    enrollmentDate: string; // Add enrollment date
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
    currentJob?: boolean; // Add currentJob flag
    jobDescription: string;
  };
  visaRejection: {
    hasRejection: boolean;
    country: string;
    countries?: string[]; // Add support for multiple countries
    details?: string; // Add optional details field
  };
  attemptingNextStep?: boolean;
  isPersonalInfoValid?: boolean;
  validationAttempted?: boolean;
}

interface Step3PersonalInfoProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

// Define a type for the field refs
type FieldRefsType = {
  [key: string]: React.RefObject<HTMLInputElement | HTMLSelectElement | null>;
  firstName: React.RefObject<HTMLInputElement | null>;
  lastName: React.RefObject<HTMLInputElement | null>;
  dateOfBirth: React.RefObject<HTMLInputElement | null>;
  email: React.RefObject<HTMLInputElement | null>;
  gender: React.RefObject<HTMLInputElement | null>;
  maritalStatus: React.RefObject<HTMLSelectElement | null>;
  countryOfResidence: React.RefObject<HTMLSelectElement | null>;
  emergencyContactName: React.RefObject<HTMLInputElement | null>;
  emergencyContactPhone: React.RefObject<HTMLInputElement | null>;
  emergencyContactEmail: React.RefObject<HTMLInputElement | null>;
  sponsorName: React.RefObject<HTMLInputElement | null>;
  sponsorRelationship: React.RefObject<HTMLSelectElement | null>;
  sponsorPhone: React.RefObject<HTMLInputElement | null>;
  sponsorEmail: React.RefObject<HTMLInputElement | null>;
  phoneNumber: React.RefObject<HTMLInputElement | null>;
  level: React.RefObject<HTMLSelectElement | null>;
  educationCountry: React.RefObject<HTMLSelectElement | null>;
  institution: React.RefObject<HTMLInputElement | null>;
  fieldOfStudy: React.RefObject<HTMLInputElement | null>;
  grade: React.RefObject<HTMLInputElement | null>;
  graduationDate: React.RefObject<HTMLInputElement | null>;
  enrollmentDate: React.RefObject<HTMLInputElement | null>; // Add enrollment date ref
  exam: React.RefObject<HTMLSelectElement | null>;
  overallScore: React.RefObject<HTMLInputElement | null>;
  testReportNumber: React.RefObject<HTMLInputElement | null>;
  testDate: React.RefObject<HTMLInputElement | null>;
  visaRejectionCountry: React.RefObject<HTMLSelectElement | null>;
};

// Add a styled Continue button
const ContinueButton = styled.button`
  background-color: #0c3b5e;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem auto;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #0a2e4a;
  }
`;

// Add a formatDate function to ensure consistent YYYY-MM-DD format
const formatDate = (inputDate: string): string => {
  // If empty, return empty string
  if (!inputDate) return '';
  
  // If already in correct format, return as is
  if (validateDateFormat(inputDate)) return inputDate;
  
  try {
    // Try to parse the date and format it correctly
    const dateObj = new Date(inputDate);
    if (isNaN(dateObj.getTime())) return ''; // Invalid date
    
    const year = dateObj.getFullYear();
    // Ensure year is 4 digits
    if (year < 1000 || year > 9999) return '';
    
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch (e) {
    return '';
  }
};

// Improve the date validation function
const validateDateFormat = (date: string): boolean => {
  // If empty, allow it (empty validation is handled separately)
  if (date === '') return true;
  
  // Check if the date is in YYYY-MM-DD format with 4-digit year and 2-digit month/day
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  
  if (!dateRegex.test(date)) {
    return false;
  }
  
  // Additional validation to ensure it's a valid date
  try {
    const parts = date.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // JS months are 0-based
    const day = parseInt(parts[2], 10);
    
    // Ensure year is 4 digits (1000-9999)
    if (year < 1000 || year > 9999) {
      return false;
    }
    
    // Create a date object and check if it's valid
    const dateObj = new Date(year, month, day);
    return (
      dateObj.getFullYear() === year &&
      dateObj.getMonth() === month &&
      dateObj.getDate() === day
    );
  } catch (e) {
    return false;
  }
};

// Create utility functions for input validation
const validatePhoneNumber = (input: string): string => {
  // Only allow digits and limit to 10 digits
  return input.replace(/\D/g, '').slice(0, 10);
};

const validateScoreFormat = (input: string): string => {
  // Only allow one decimal place and max value of 9.0
  const filtered = input.replace(/[^\d.]/g, ''); // Only allow digits and decimal point
  
  // Handle decimal points
  const parts = filtered.split('.');
  if (parts.length > 1) {
    // Ensure only one decimal point and one decimal place
    return `${parts[0]}.${parts[1].charAt(0)}`;
  }
  
  // Check if the number is greater than 9
  if (parseFloat(filtered) > 9) {
    return '9.0';
  }
  
  return filtered;
};

const Step3PersonalInfo: React.FC<Step3PersonalInfoProps> = ({ formData, updateFormData, onNext, onBack }) => {
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);
  const [educationEntries, setEducationEntries] = useState<EducationEntryType[]>(
    formData.educationEntries?.length ? formData.educationEntries : [formData.education]
  );
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasFocused, setHasFocused] = useState(false);
  const [validationAttempts, setValidationAttempts] = useState(0);
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>(
    formData.workExperience.hasExperience ? [formData.workExperience] : []
  );
  
  // Create refs at the top level of component
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const dateOfBirthRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const genderRef = useRef<HTMLInputElement | null>(null);
  const maritalStatusRef = useRef<HTMLSelectElement | null>(null);
  const countryOfResidenceRef = useRef<HTMLSelectElement | null>(null);
  const emergencyContactNameRef = useRef<HTMLInputElement | null>(null);
  const emergencyContactPhoneRef = useRef<HTMLInputElement | null>(null);
  const emergencyContactEmailRef = useRef<HTMLInputElement | null>(null);
  const sponsorNameRef = useRef<HTMLInputElement | null>(null);
  const sponsorRelationshipRef = useRef<HTMLSelectElement | null>(null);
  const sponsorPhoneRef = useRef<HTMLInputElement | null>(null);
  const sponsorEmailRef = useRef<HTMLInputElement | null>(null);
  const phoneNumberRef = useRef<HTMLInputElement | null>(null);
  const levelRef = useRef<HTMLSelectElement | null>(null);
  const educationCountryRef = useRef<HTMLSelectElement | null>(null);
  const institutionRef = useRef<HTMLInputElement | null>(null);
  const fieldOfStudyRef = useRef<HTMLInputElement | null>(null);
  const gradeRef = useRef<HTMLInputElement | null>(null);
  const graduationDateRef = useRef<HTMLInputElement | null>(null);
  const enrollmentDateRef = useRef<HTMLInputElement | null>(null); // Add enrollment date ref
  const examRef = useRef<HTMLSelectElement | null>(null);
  const overallScoreRef = useRef<HTMLInputElement | null>(null);
  const testReportNumberRef = useRef<HTMLInputElement | null>(null);
  const testDateRef = useRef<HTMLInputElement | null>(null);
  const visaRejectionCountryRef = useRef<HTMLSelectElement | null>(null);
  
  // Create fieldRefs object using useMemo to prevent unnecessary re-renders
  const fieldRefs = useMemo<FieldRefsType>(() => ({
    firstName: firstNameRef,
    lastName: lastNameRef,
    dateOfBirth: dateOfBirthRef,
    email: emailRef,
    gender: genderRef,
    maritalStatus: maritalStatusRef,
    countryOfResidence: countryOfResidenceRef,
    emergencyContactName: emergencyContactNameRef,
    emergencyContactPhone: emergencyContactPhoneRef,
    emergencyContactEmail: emergencyContactEmailRef,
    sponsorName: sponsorNameRef,
    sponsorRelationship: sponsorRelationshipRef,
    sponsorPhone: sponsorPhoneRef,
    sponsorEmail: sponsorEmailRef,
    phoneNumber: phoneNumberRef,
    level: levelRef,
    educationCountry: educationCountryRef,
    institution: institutionRef,
    fieldOfStudy: fieldOfStudyRef,
    grade: gradeRef,
    graduationDate: graduationDateRef,
    enrollmentDate: enrollmentDateRef, // Add enrollment date ref
    exam: examRef,
    overallScore: overallScoreRef,
    testReportNumber: testReportNumberRef,
    testDate: testDateRef,
    visaRejectionCountry: visaRejectionCountryRef
  }), []);

  // Modified handler functions
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let modifiedValue = value;

    // Apply restrictions based on field type
    if (name === 'phoneNumber' && type === 'tel') {
      modifiedValue = validatePhoneNumber(value);
    } else if (name === 'email' && type === 'email') {
      // No need to modify, HTML5 email validation will be enforced
      modifiedValue = value;
    } else {
      modifiedValue = value;
    }

    updateFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [name]: modifiedValue
      }
    });
  };

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
    const { name, value } = e.target;
    
    const updatedEntries = [...educationEntries];
    updatedEntries[index] = {
      ...updatedEntries[index],
      [name]: value
    };
    
    setEducationEntries(updatedEntries);
    
    updateFormData({
      education: updatedEntries[0], // Keep first entry as primary
      educationEntries: updatedEntries // Store all entries
    });
  };
  
  const addEducationEntry = () => {
    setEducationEntries([
      ...educationEntries,
      {
        level: '',
        country: '',
        institution: '',
        fieldOfStudy: '',
        grade: '',
        graduationDate: '',
        enrollmentDate: '', // Adding enrollment date field
      }
    ]);
  };
  
  const removeEducationEntry = (index: number) => {
    if (educationEntries.length <= 1) return; // Don't remove the last entry
    
    const updatedEntries = educationEntries.filter((_, i) => i !== index);
    setEducationEntries(updatedEntries);
    
    updateFormData({
      education: updatedEntries[0], // Keep first entry as primary
      educationEntries: updatedEntries // Store all entries
    });
  };
  
  const handleLanguageProficiencyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let modifiedValue = value;

    // Restrict score inputs for language proficiency fields
    if (['overallScore', 'readingScore', 'writingScore', 'listeningScore', 'speakingScore'].includes(name)) {
      modifiedValue = validateScoreFormat(value);
    } else {
      modifiedValue = value;
    }

    updateFormData({
      ...formData,
      languageProficiency: {
        ...formData.languageProficiency,
        [name]: modifiedValue
      }
    });
  };
  
  const handleVisaRejectionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'country') {
      // Create or update the countries array
      const currentCountries = formData.visaRejection.countries || [];
      updateFormData({
        ...formData,
        visaRejection: {
          ...formData.visaRejection,
          country: value, // Keep for backward compatibility
          countries: [...currentCountries, value]
        }
      });
    } else if (name === 'details') {
      updateFormData({
        ...formData,
        visaRejection: {
          ...formData.visaRejection,
          details: value
        }
      });
    } else {
      updateFormData({
        ...formData,
        visaRejection: {
          ...formData.visaRejection,
          [name]: type === 'radio' ? value === 'yes' : value
        }
      });
    }
  };

  const handleEmergencyContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let modifiedValue = value;

    // Apply restrictions
    if (name === 'phoneNumber' && type === 'tel') {
      modifiedValue = validatePhoneNumber(value);
    } else if (name === 'email' && type === 'email') {
      // No need to modify, HTML5 email validation will be enforced
      modifiedValue = value;
    } else {
      modifiedValue = value;
    }

    updateFormData({
      ...formData,
      emergencyContact: {
        ...formData.emergencyContact,
        [name]: modifiedValue
      }
    });
  };

  const handleSponsorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let modifiedValue = value;

    // Apply restrictions
    if (name === 'phoneNumber' && type === 'tel') {
      modifiedValue = validatePhoneNumber(value);
    } else if (name === 'email' && type === 'email') {
      // No need to modify, HTML5 email validation will be enforced
      modifiedValue = value;
    } else {
      modifiedValue = value;
    }

    updateFormData({
      ...formData,
      educationSponsor: {
        ...formData.educationSponsor,
        [name]: modifiedValue
      }
    });
  };

  const addWorkExperience = () => {
    const newExperience: WorkExperience = {
      hasExperience: true,
      companyName: '',
      position: '',
      startDate: '',
      endDate: '',
      currentJob: false,
      jobDescription: ''
    };
    
    const updatedExperiences = [...workExperiences, newExperience];
    setWorkExperiences(updatedExperiences);
    
    // If this is the first experience being added, update the form data
    if (workExperiences.length === 0) {
      updateFormData({
        ...formData,
        workExperience: {
          ...formData.workExperience,
          hasExperience: true
        }
      });
    }
  };

  const removeWorkExperience = (index: number) => {
    const updatedExperiences = workExperiences.filter((_, i) => i !== index);
    setWorkExperiences(updatedExperiences);
  };

  const handleWorkExperienceChange = (index: number, field: string, value: string | boolean) => {
    const updatedExperiences = [...workExperiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value
    };
    
    // If "currentJob" is set to true, clear the end date
    if (field === 'currentJob' && value === true) {
      updatedExperiences[index].endDate = '';
    }
    
    setWorkExperiences(updatedExperiences);
    
    // If this is the first work experience, also update formData
    if (index === 0) {
      updateFormData({
        ...formData,
        workExperience: {
          ...formData.workExperience,
          [field]: value,
          ...(field === 'currentJob' && value === true ? { endDate: '' } : {})
        }
      });
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;
    // Ensure the date is in YYYY-MM-DD format
    if (value.length > 10) {
      return; // Prevent input longer than 10 characters
    }
    
    // Handle nested fields like 'personalInfo.dateOfBirth'
    const fieldParts = field.split('.');
    if (fieldParts.length === 2) {
      const [section, property] = fieldParts;
      
      if (section === 'personalInfo') {
        updateFormData({
          ...formData,
          personalInfo: {
            ...formData.personalInfo,
            [property]: value
          }
        });
      } else if (section === 'education') {
        updateFormData({
          ...formData,
          education: {
            ...formData.education,
            [property]: value
          }
        });
      } else if (section === 'languageProficiency') {
        updateFormData({
          ...formData,
          languageProficiency: {
            ...formData.languageProficiency,
            [property]: value
          }
        });
      } else if (section === 'workExperience') {
        updateFormData({
          ...formData,
          workExperience: {
            ...formData.workExperience,
            [property]: value
          }
        });
      } else {
        // For other sections, use the default approach
        updateFormData({
          ...formData,
          [field]: value
        });
      }
    } else {
      // Handle top-level fields
      updateFormData({
        ...formData,
        [field]: value
      });
    }
  };

  // Check critical fields only (used for second attempt validation)
  const validateCriticalFields = useCallback(() => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Personal Information validation - critical fields
    if (!formData.personalInfo?.firstName?.trim()) {
      newErrors.personalInfo_firstName = 'First name is required';
      isValid = false;
    }
    if (!formData.personalInfo?.lastName?.trim()) {
      newErrors.personalInfo_lastName = 'Last name is required';
      isValid = false;
    }
    if (!formData.personalInfo?.dateOfBirth) {
      newErrors.personalInfo_dateOfBirth = 'Date of birth is required';
      isValid = false;
    }
    if (!formData.personalInfo?.email?.trim()) {
      newErrors.personalInfo_email = 'Email is required';
      isValid = false;
    }
    if (!formData.personalInfo?.gender) {
      newErrors.personalInfo_gender = 'Gender is required';
      isValid = false;
    }
    if (!formData.personalInfo?.maritalStatus) {
      newErrors.personalInfo_maritalStatus = 'Marital status is required';
      isValid = false;
    }
    if (!formData.personalInfo?.countryOfResidence) {
      newErrors.personalInfo_countryOfResidence = 'Country of residence is required';
      isValid = false;
    }
    if (!formData.personalInfo?.phoneNumber?.trim()) {
      newErrors.personalInfo_phoneNumber = 'Phone number is required';
      isValid = false;
    }

    // Emergency Contact validation - critical fields
    if (!formData.emergencyContact?.name?.trim()) {
      newErrors.emergencyContact_name = 'Emergency contact name is required';
      isValid = false;
    }
    if (!formData.emergencyContact?.phoneNumber?.trim()) {
      newErrors.emergencyContact_phoneNumber = 'Emergency contact phone number is required';
      isValid = false;
    }
    if (!formData.emergencyContact?.email?.trim()) {
      newErrors.emergencyContact_email = 'Emergency contact email is required';
      isValid = false;
    }

    // Education validation - critical fields
    if (!formData.education?.level) {
      newErrors.education_level = 'Education level is required';
      isValid = false;
    }
    if (!formData.education?.country) {
      newErrors.education_country = 'Country of education is required';
      isValid = false;
    }
    if (!formData.education?.institution?.trim()) {
      newErrors.education_institution = 'Institution name is required';
      isValid = false;
    }
    if (!formData.education?.fieldOfStudy?.trim()) {
      newErrors.education_fieldOfStudy = 'Field of study is required';
      isValid = false;
    }
    if (!formData.education?.graduationDate) {
      newErrors.education_graduationDate = 'Graduation date is required';
      isValid = false;
    }

    // Education Sponsor validation - critical fields
    if (!formData.educationSponsor?.name?.trim()) {
      newErrors.educationSponsor_name = 'Sponsor name is required';
      isValid = false;
    }
    if (!formData.educationSponsor?.phoneNumber?.trim()) {
      newErrors.educationSponsor_phoneNumber = 'Sponsor phone number is required';
      isValid = false;
    }
    if (!formData.educationSponsor?.email?.trim()) {
      newErrors.educationSponsor_email = 'Sponsor email is required';
      isValid = false;
    }

    // Language Proficiency validation - critical fields
    if (formData.languageProficiency?.exam && formData.languageProficiency.exam !== 'None') {
      if (!formData.languageProficiency?.overallScore?.trim()) {
        newErrors.languageProficiency_overallScore = 'Overall score is required';
        isValid = false;
      }
      if (!formData.languageProficiency?.testReportNumber?.trim()) {
        newErrors.languageProficiency_testReportNumber = 'Test report number is required';
        isValid = false;
      }
      if (!formData.languageProficiency?.readingScore?.trim()) {
        newErrors.readingScore = 'Reading score is required';
        isValid = false;
      }
      if (!formData.languageProficiency?.writingScore?.trim()) {
        newErrors.writingScore = 'Writing score is required';
        isValid = false;
      }
      if (!formData.languageProficiency?.listeningScore?.trim()) {
        newErrors.listeningScore = 'Listening score is required';
        isValid = false;
      }
      if (!formData.languageProficiency?.speakingScore?.trim()) {
        newErrors.speakingScore = 'Speaking score is required';
        isValid = false;
      }
      if (!formData.languageProficiency?.testDate) {
        newErrors.languageProficiency_testDate = 'Test date is required';
        isValid = false;
      }
    }

    return { isValid, errors: newErrors };
  }, [formData]);

  // Full validation function for first attempt
  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Personal Information validation
    if (!formData.personalInfo?.firstName?.trim()) {
      newErrors.personalInfo_firstName = 'First name is required';
      isValid = false;
    }
    if (!formData.personalInfo?.lastName?.trim()) {
      newErrors.personalInfo_lastName = 'Last name is required';
      isValid = false;
    }
    if (!formData.personalInfo?.dateOfBirth) {
      newErrors.personalInfo_dateOfBirth = 'Date of birth is required';
      isValid = false;
    }
    if (!formData.personalInfo?.email?.trim()) {
      newErrors.personalInfo_email = 'Email is required';
      isValid = false;
    }
    if (!formData.personalInfo?.gender) {
      newErrors.personalInfo_gender = 'Gender is required';
      isValid = false;
    }
    if (!formData.personalInfo?.maritalStatus) {
      newErrors.personalInfo_maritalStatus = 'Marital status is required';
      isValid = false;
    }
    if (!formData.personalInfo?.countryOfResidence) {
      newErrors.personalInfo_countryOfResidence = 'Country of residence is required';
      isValid = false;
    }
    if (!formData.personalInfo?.phoneNumber?.trim()) {
      newErrors.personalInfo_phoneNumber = 'Phone number is required';
      isValid = false;
    }

    // Emergency Contact validation
    if (!formData.emergencyContact?.name?.trim()) {
      newErrors.emergencyContact_name = 'Emergency contact name is required';
      isValid = false;
    }
    if (!formData.emergencyContact?.phoneNumber?.trim()) {
      newErrors.emergencyContact_phoneNumber = 'Emergency contact phone number is required';
      isValid = false;
    }
    if (!formData.emergencyContact?.email?.trim()) {
      newErrors.emergencyContact_email = 'Emergency contact email is required';
      isValid = false;
    }

    // Education validation
    if (!formData.education?.level) {
      newErrors.education_level = 'Education level is required';
      isValid = false;
    }
    if (!formData.education?.country) {
      newErrors.education_country = 'Country of education is required';
      isValid = false;
    }
    if (!formData.education?.institution?.trim()) {
      newErrors.education_institution = 'Institution name is required';
      isValid = false;
    }
    if (!formData.education?.fieldOfStudy?.trim()) {
      newErrors.education_fieldOfStudy = 'Field of study is required';
      isValid = false;
    }
    if (!formData.education?.grade?.trim()) {
      newErrors.education_grade = 'Grade is required';
      isValid = false;
    }
    if (!formData.education?.graduationDate) {
      newErrors.education_graduationDate = 'Graduation date is required';
      isValid = false;
    }

    // Education Sponsor validation
    if (!formData.educationSponsor?.name?.trim()) {
      newErrors.educationSponsor_name = 'Sponsor name is required';
      isValid = false;
    }
    if (!formData.educationSponsor?.phoneNumber?.trim()) {
      newErrors.educationSponsor_phoneNumber = 'Sponsor phone number is required';
      isValid = false;
    }
    if (!formData.educationSponsor?.email?.trim()) {
      newErrors.educationSponsor_email = 'Sponsor email is required';
      isValid = false;
    }

    // Language Proficiency validation
    if (formData.languageProficiency?.exam && formData.languageProficiency.exam !== 'None') {
      if (!formData.languageProficiency?.overallScore?.trim()) {
        newErrors.languageProficiency_overallScore = 'Overall score is required';
        isValid = false;
      }
      if (!formData.languageProficiency?.testReportNumber?.trim()) {
        newErrors.languageProficiency_testReportNumber = 'Test report number is required';
        isValid = false;
      }
      if (!formData.languageProficiency?.testDate) {
        newErrors.languageProficiency_testDate = 'Test date is required';
        isValid = false;
      }
      if (!formData.languageProficiency?.readingScore?.trim()) {
        newErrors.readingScore = 'Reading score is required';
        isValid = false;
      }
      if (!formData.languageProficiency?.writingScore?.trim()) {
        newErrors.writingScore = 'Writing score is required';
        isValid = false;
      }
      if (!formData.languageProficiency?.listeningScore?.trim()) {
        newErrors.listeningScore = 'Listening score is required';
        isValid = false;
      }
      if (!formData.languageProficiency?.speakingScore?.trim()) {
        newErrors.speakingScore = 'Speaking score is required';
        isValid = false;
      }
    }

    // Work Experience validation - only validate if user has experience
    if (formData.workExperience?.hasExperience && workExperiences.length > 0) {
      const firstExperience = workExperiences[0];
      if (!firstExperience.companyName?.trim()) {
        newErrors.workExperience_companyName = 'Company name is required';
        isValid = false;
      }
      if (!firstExperience.position?.trim()) {
        newErrors.workExperience_position = 'Position is required';
        isValid = false;
      }
      if (!firstExperience.startDate) {
        newErrors.workExperience_startDate = 'Start date is required';
        isValid = false;
      }
      if (!firstExperience.endDate) {
        newErrors.workExperience_endDate = 'End date is required';
        isValid = false;
      }
    }

    // Visa Rejection validation - only validate if user has rejection
    if (formData.visaRejection?.hasRejection) {
      if (!formData.visaRejection?.country) {
        newErrors.visaRejection_country = 'Country of visa rejection is required';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  }, [formData, workExperiences]);

  // Update handleNext to validate and scroll to first error
  const handleNext = useCallback(() => {
    console.log('handleNext called in Step3PersonalInfo');
    
    // Check if we've already validated once before
    const hasValidatedBefore = localStorage.getItem('step3_validated') === 'true';
    
    // First validation attempt - mark that we've validated
    if (!hasValidatedBefore) {
      localStorage.setItem('step3_validated', 'true');
      
      // Validate the full form
      const isValid = validateForm();
      console.log('First validation attempt - full form validation result:', isValid);
      
      if (isValid) {
        // Form is valid, proceed to next step
        console.log('Form is valid, proceeding to next step');
        
        // Update form data with work experience info if needed
        if (formData.workExperience.hasExperience && workExperiences.length > 0) {
          updateFormData({
            ...formData,
            workExperience: workExperiences[0],
            isPersonalInfoValid: true,
            attemptingNextStep: false
          });
        } else {
          updateFormData({
            ...formData,
            isPersonalInfoValid: true,
            attemptingNextStep: false
          });
        }
        
        // Directly navigate to Step 4
        onNext();
        console.log('Navigation triggered to Step 4');
      } else {
        // Form has validation errors on first attempt
        console.log('Form validation failed, showing errors');
        
        // Update form data to indicate validation failed
        updateFormData({
          ...formData,
          isPersonalInfoValid: false,
          attemptingNextStep: false
        });
        
        // Show errors and scroll to first error field
        setShowErrors(true);
        
        if (Object.keys(errors).length > 0) {
          const firstErrorField = Object.keys(errors)[0];
          console.log('First error field:', firstErrorField);
          
          // Extract field name from error key (remove section prefix)
          const fieldName = firstErrorField.split('_').pop() || firstErrorField;
          
          // Find the corresponding field ref
          const ref = fieldRefs[fieldName];
          
          if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            ref.current.focus();
            setHasFocused(true);
          }
        }
      }
    } else {
      // Second validation attempt - check only critical fields
      console.log('Second validation attempt - checking only critical fields');
      const { isValid, errors: criticalErrors } = validateCriticalFields();
      
      if (isValid) {
        // Critical fields are valid, proceed to next step
        console.log('Critical fields are valid, proceeding to next step');
        
        // Update form data with work experience info if needed
        if (formData.workExperience.hasExperience && workExperiences.length > 0) {
          updateFormData({
            ...formData,
            workExperience: workExperiences[0],
            isPersonalInfoValid: true,
            attemptingNextStep: false
          });
        } else {
          updateFormData({
            ...formData,
            isPersonalInfoValid: true,
            attemptingNextStep: false
          });
        }
        
        // Navigate to next step
        onNext();
        console.log('Navigation triggered to Step 4 after critical field validation');
      } else {
        // Critical fields still have validation errors
        console.log('Critical fields still have validation errors');
        
        // Update form data to indicate validation failed
        updateFormData({
          ...formData,
          isPersonalInfoValid: false,
          attemptingNextStep: false
        });
        
        // Show errors and scroll to first error field
        setShowErrors(true);
        setErrors(criticalErrors);
        
        if (Object.keys(criticalErrors).length > 0) {
          const firstErrorField = Object.keys(criticalErrors)[0];
          console.log('First critical error field:', firstErrorField);
          
          // Extract field name from error key (remove section prefix)
          const fieldName = firstErrorField.split('_').pop() || firstErrorField;
          
          // Find the corresponding field ref
          const ref = fieldRefs[fieldName];
          
          if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            ref.current.focus();
            setHasFocused(true);
          }
        }
      }
    }
  }, [formData, updateFormData, onNext, validateForm, validateCriticalFields, errors, fieldRefs, workExperiences]);

  // Update the parent when attempting to advance
  useEffect(() => {
    console.log("attemptingNextStep effect triggered:", formData.attemptingNextStep);
    
    if (formData.attemptingNextStep) {
      console.log("Calling handleNext from useEffect in Step3PersonalInfo");
      
      // Reset the flag first to prevent infinite loops
      updateFormData({
        ...formData,
        attemptingNextStep: false
      });
      
      // Small timeout to ensure state is updated before validation
      setTimeout(() => {
        // Call handleNext to perform validation and navigation
        handleNext();
      }, 0);
    }
  }, [formData.attemptingNextStep, handleNext, formData, updateFormData]);
  
  // Add effect to focus on first error field
  useEffect(() => {
    if (showErrors && Object.keys(errors).length > 0 && !hasFocused) {
      const firstErrorField = Object.keys(errors)[0];
      // Extract field name from error key
      const fieldName = firstErrorField.split('_').pop() || firstErrorField;
      const ref = fieldRefs[fieldName];
      
      if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        ref.current.focus();
        setHasFocused(true);
      }
    }
  }, [showErrors, errors, fieldRefs, hasFocused]);
  
  // Reset hasFocused when form changes
  useEffect(() => {
    if (!formData.attemptingNextStep) {
      setHasFocused(false);
    }
  }, [formData.attemptingNextStep]);

  // Clean up localStorage when component unmounts
  useEffect(() => {
    return () => {
      localStorage.removeItem('step3_validated');
    };
  }, []);

  // Initialize the visa rejection countries array in useEffect
  useEffect(() => {
    // If there's a country but no countries array, initialize it
    if (formData.visaRejection.hasRejection && 
        formData.visaRejection.country && 
        !formData.visaRejection.countries) {
      updateFormData({
        ...formData,
        visaRejection: {
          ...formData.visaRejection,
          countries: [formData.visaRejection.country]
        }
      });
    }
  }, []);

  // Function to remove a visa rejection country
  const removeVisaRejectionCountry = (countryToRemove: string) => {
    const updatedCountries = (formData.visaRejection.countries || [])
      .filter(country => country !== countryToRemove);
    
    updateFormData({
      ...formData,
      visaRejection: {
        ...formData.visaRejection,
        countries: updatedCountries,
        country: updatedCountries.length > 0 ? updatedCountries[0] : ''
      }
    });
  };

  return (
    <StepContainer>
      <RequiredFieldsNote>Fields marked with an <span>*</span> are required.</RequiredFieldsNote>
      
      <SectionTitle>
        <div className="icon-wrapper">
          <FontAwesomeIcon icon={faUser} />
          Personal Information
        </div>
      </SectionTitle>
      
      <FormSection>
        <FormRow>
          <FormGroup>
            <Label htmlFor="firstName">First Name <span>*</span></Label>
            <Input 
              ref={firstNameRef}
              type="text" 
              id="firstName" 
              name="firstName"
              value={formData.personalInfo.firstName}
              onChange={handlePersonalInfoChange}
              required
              placeholder="Enter your first name"
            />
            {showErrors && errors.personalInfo_firstName && <ErrorMessage>{errors.personalInfo_firstName}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="lastName">Last Name <span>*</span></Label>
            <Input 
              ref={lastNameRef}
              type="text" 
              id="lastName" 
              name="lastName"
              value={formData.personalInfo.lastName}
              onChange={handlePersonalInfoChange}
              required
              placeholder="Enter your last name"
            />
            {showErrors && errors.personalInfo_lastName && <ErrorMessage>{errors.personalInfo_lastName}</ErrorMessage>}
          </FormGroup>
        </FormRow>
        
        <FormRow>
          <FormGroup>
            <Label htmlFor="dateOfBirth">Date of Birth <span>*</span></Label>
            <Input 
              ref={dateOfBirthRef}
              type="date" 
              id="dateOfBirth" 
              name="dateOfBirth"
              value={formData.personalInfo.dateOfBirth}
              onChange={(e) => {
                const value = e.target.value;
                const formattedDate = formatDate(value);
                
                if (formattedDate || value === '') {
                  updateFormData({
                    ...formData,
                    personalInfo: {
                      ...formData.personalInfo,
                      dateOfBirth: formattedDate
                    }
                  });
                }
              }}
              max={new Date().toISOString().split('T')[0]} // Prevent future dates
              pattern="\d{4}-\d{2}-\d{2}"
              required
              placeholder="YYYY-MM-DD"
            />
            {showErrors && errors.personalInfo_dateOfBirth && <ErrorMessage>{errors.personalInfo_dateOfBirth}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">Email <span>*</span></Label>
            <Input 
              ref={emailRef}
              type="email" 
              id="email" 
              name="email"
              value={formData.personalInfo.email}
              onChange={handlePersonalInfoChange}
              required
            />
            {showErrors && errors.personalInfo_email && <ErrorMessage>{errors.personalInfo_email}</ErrorMessage>}
          </FormGroup>
        </FormRow>
        
        <FormRow>
          <FormGroup>
            <Label>Gender <span>*</span></Label>
            <RadioGroup>
              <RadioLabel>
                <Radio
                  ref={genderRef}
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.personalInfo.gender === 'male'}
                  onChange={handlePersonalInfoChange}
                  required
                />
                Male
              </RadioLabel>
              
              <RadioLabel>
                <Radio
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.personalInfo.gender === 'female'}
                  onChange={handlePersonalInfoChange}
                  required
                />
                Female
              </RadioLabel>
              
              <RadioLabel>
                <Radio
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formData.personalInfo.gender === 'other'}
                  onChange={handlePersonalInfoChange}
                  required
                />
                Other
              </RadioLabel>
            </RadioGroup>
            {showErrors && errors.personalInfo_gender && <ErrorMessage>{errors.personalInfo_gender}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="maritalStatus">Marital Status <span>*</span></Label>
            <Select 
              ref={maritalStatusRef}
              id="maritalStatus" 
              name="maritalStatus"
              value={formData.personalInfo.maritalStatus}
              onChange={handlePersonalInfoChange}
              required
            >
              <option value="">Select</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </Select>
            {showErrors && errors.personalInfo_maritalStatus && <ErrorMessage>{errors.personalInfo_maritalStatus}</ErrorMessage>}
          </FormGroup>
        </FormRow>
        
        <FormGroup>
          <Label htmlFor="countryOfResidence">Country of Residence <span>*</span></Label>
          <Select 
            ref={countryOfResidenceRef}
            id="countryOfResidence" 
            name="countryOfResidence"
            value={formData.personalInfo.countryOfResidence}
            onChange={handlePersonalInfoChange}
            required
          >
            <option value="">Select Country</option>
            {COUNTRIES.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </Select>
          {showErrors && errors.personalInfo_countryOfResidence && <ErrorMessage>{errors.personalInfo_countryOfResidence}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="phoneNumber">
            Phone Number <Required>*</Required>
          </Label>
          <Input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.personalInfo.phoneNumber}
            onChange={handlePersonalInfoChange}
            placeholder="+1 123 456 7890"
            pattern="[0-9]{10}"
            required
            ref={phoneNumberRef}
          />
          {showErrors && errors.personalInfo_phoneNumber && <ErrorMessage>{errors.personalInfo_phoneNumber}</ErrorMessage>}
        </FormGroup>
      </FormSection>

      {/* Emergency Contact Section */}
      <SectionTitle>
        <div className="icon-wrapper">
          <FontAwesomeIcon icon={faPhone} />
          Emergency Contact
        </div>
      </SectionTitle>
      
      <FormSection>
        <FormRow>
          <FormGroup>
            <Label htmlFor="emergencyContactName">Name <span>*</span></Label>
            <Input 
              ref={emergencyContactNameRef}
              type="text" 
              id="emergencyContactName" 
              name="name"
              value={formData.emergencyContact.name}
              onChange={handleEmergencyContactChange}
              placeholder="Enter emergency contact name"
              required
            />
            {showErrors && errors.emergencyContact_name && <ErrorMessage>{errors.emergencyContact_name}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="emergencyContactRelationship">Relationship</Label>
            <Select 
              id="emergencyContactRelationship" 
              name="relationship"
              value={formData.emergencyContact.relationship}
              onChange={handleEmergencyContactChange}
            >
              <option value="">Select Relationship</option>
              <option value="Parent">Parent</option>
              <option value="Guardian">Guardian</option>
              <option value="Sibling">Sibling</option>
              <option value="Spouse">Spouse</option>
              <option value="Friend">Friend</option>
              <option value="Other">Other</option>
            </Select>
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor="emergencyContactPhone">Phone Number <span>*</span></Label>
            <Input 
              ref={emergencyContactPhoneRef}
              type="tel" 
              id="emergencyContactPhone" 
              name="phoneNumber"
              value={formData.emergencyContact.phoneNumber}
              onChange={handleEmergencyContactChange}
              placeholder="Enter 10-digit phone number"
              pattern="[0-9]{10}"
              required
            />
            {showErrors && errors.emergencyContact_phoneNumber && <ErrorMessage>{errors.emergencyContact_phoneNumber}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="emergencyContactEmail">Email <span>*</span></Label>
            <Input 
              ref={emergencyContactEmailRef}
              type="email" 
              id="emergencyContactEmail" 
              name="email"
              value={formData.emergencyContact.email}
              onChange={handleEmergencyContactChange}
              placeholder="Enter valid email address"
              required
            />
            {showErrors && errors.emergencyContact_email && <ErrorMessage>{errors.emergencyContact_email}</ErrorMessage>}
          </FormGroup>
        </FormRow>
      </FormSection>

      {/* Education Section */}
      <SectionTitle>
        <div className="icon-wrapper">
          <FontAwesomeIcon icon={faGraduationCap} />
          Educational Background
        </div>
      </SectionTitle>
      
      {educationEntries.map((entry, index) => (
        <EducationEntry key={index}>
          {index > 0 && (
            <RemoveButtonWrapper>
              <RemoveButton onClick={() => removeEducationEntry(index)}>
                <FontAwesomeIcon icon={faTrash} />
              </RemoveButton>
            </RemoveButtonWrapper>
          )}
          
          <FormRow>
            <FormGroup>
              <Label htmlFor={`level-${index}`}>Level of Education <span>*</span></Label>
              <Select 
                ref={index === 0 ? levelRef : null}
                id={`level-${index}`} 
                name="level"
                value={entry.level}
                onChange={(e) => handleEducationChange(e, index)}
                required
              >
                <option value="">Select Level</option>
                <option value="High School">High School</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor's">Bachelor's Degree</option>
                <option value="Master's">Master's Degree</option>
                <option value="PhD">PhD</option>
              </Select>
              {showErrors && index === 0 && errors.education_level && <ErrorMessage>{errors.education_level}</ErrorMessage>}
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor={`country-${index}`}>Country of Education <span>*</span></Label>
              <Select 
                ref={index === 0 ? educationCountryRef : null}
                id={`country-${index}`} 
                name="country"
                value={entry.country}
                onChange={(e) => handleEducationChange(e, index)}
                required
              >
                <option value="">Select Country</option>
                {COUNTRIES.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </Select>
              {showErrors && index === 0 && errors.education_country && <ErrorMessage>{errors.education_country}</ErrorMessage>}
            </FormGroup>
          </FormRow>
          
          <FormRow>
            <FormGroup>
              <Label htmlFor={`institution-${index}`}>Institution Name <span>*</span></Label>
              <Input 
                ref={index === 0 ? institutionRef : null}
                type="text" 
                id={`institution-${index}`} 
                name="institution"
                value={entry.institution}
                onChange={(e) => handleEducationChange(e, index)}
                required
                placeholder="Name of your university or college"
              />
              {showErrors && index === 0 && errors.education_institution && <ErrorMessage>{errors.education_institution}</ErrorMessage>}
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor={`fieldOfStudy-${index}`}>Field of Study <span>*</span></Label>
              <Input 
                ref={index === 0 ? fieldOfStudyRef : null}
                type="text" 
                id={`fieldOfStudy-${index}`} 
                name="fieldOfStudy"
                value={entry.fieldOfStudy}
                onChange={(e) => handleEducationChange(e, index)}
                required
                placeholder="Your major or field of study"
              />
              {showErrors && index === 0 && errors.education_fieldOfStudy && <ErrorMessage>{errors.education_fieldOfStudy}</ErrorMessage>}
            </FormGroup>
          </FormRow>

          <FormRow>
            <FormGroup>
              <Label htmlFor={`grade-${index}`}>Grade</Label>
              <Input 
                ref={index === 0 ? gradeRef : null}
                type="text" 
                id={`grade-${index}`} 
                name="grade"
                value={entry.grade}
                onChange={(e) => handleEducationChange(e, index)}
                placeholder="Your final grade (e.g., 3.8/4.0, 85%, etc.)"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor={`graduationDate-${index}`}>Graduation Date <span>*</span></Label>
              <Input 
                ref={index === 0 ? graduationDateRef : null}
                type="date" 
                id={`graduationDate-${index}`} 
                name="graduationDate"
                value={entry.graduationDate}
                onChange={(e) => {
                  const value = e.target.value;
                  const formattedDate = formatDate(value);
                  
                  if (formattedDate || value === '') {
                    const updatedEntries = [...educationEntries];
                    updatedEntries[index] = {
                      ...updatedEntries[index],
                      graduationDate: formattedDate
                    };
                    
                    setEducationEntries(updatedEntries);
                    
                    updateFormData({
                      education: updatedEntries[0], // Keep first entry as primary
                      educationEntries: updatedEntries // Store all entries
                    });
                  }
                }}
                pattern="\d{4}-\d{2}-\d{2}"
                placeholder="When did/will you graduate?"
                required
              />
              {showErrors && index === 0 && errors.education_graduationDate && <ErrorMessage>{errors.education_graduationDate}</ErrorMessage>}
            </FormGroup>
          </FormRow>

          <FormGroup>
            <Label htmlFor={`enrollmentDate-${index}`}>Enrollment Date</Label>
            <Input 
              ref={index === 0 ? enrollmentDateRef : null}
              type="date" 
              id={`enrollmentDate-${index}`} 
              name="enrollmentDate"
              value={entry.enrollmentDate}
              onChange={(e) => {
                const value = e.target.value;
                const formattedDate = formatDate(value);
                
                if (formattedDate || value === '') {
                  const updatedEntries = [...educationEntries];
                  updatedEntries[index] = {
                    ...updatedEntries[index],
                    enrollmentDate: formattedDate
                  };
                  
                  setEducationEntries(updatedEntries);
                  
                  updateFormData({
                    education: updatedEntries[0], // Keep first entry as primary
                    educationEntries: updatedEntries // Store all entries
                  });
                }
              }}
              pattern="\d{4}-\d{2}-\d{2}"
              placeholder="When did you start this program?"
            />
          </FormGroup>
        </EducationEntry>
      ))}

      <AddButton onClick={addEducationEntry}>
        <FontAwesomeIcon icon={faPlus} />
        Add Another Education Entry
      </AddButton>

      {/* Education Sponsor Section */}
      <SectionTitle>
        <div className="icon-wrapper">
          <FontAwesomeIcon icon={faUserGraduate} />
          Education Sponsor
        </div>
      </SectionTitle>
      
      <FormSection>
        <FormRow>
          <FormGroup>
            <Label htmlFor="sponsorName">Sponsor Name <span>*</span></Label>
            <Input
              type="text"
              id="sponsorName"
              name="name"
              value={formData.educationSponsor.name}
              onChange={handleSponsorChange}
              placeholder="Enter sponsor's name"
              required
            />
            {showErrors && errors.educationSponsor_name && <ErrorMessage>{errors.educationSponsor_name}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="sponsorRelationship">Relationship</Label>
            <Select
              id="sponsorRelationship"
              name="relationship"
              value={formData.educationSponsor.relationship}
              onChange={handleSponsorChange}
            >
              <option value="">Select relationship</option>
              <option value="Parent">Parent</option>
              <option value="Guardian">Guardian</option>
              <option value="Self">Self</option>
              <option value="Other">Other</option>
            </Select>
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor="sponsorPhone">Phone Number <span>*</span></Label>
            <Input
              type="tel"
              id="sponsorPhone"
              name="phoneNumber"
              value={formData.educationSponsor.phoneNumber}
              onChange={handleSponsorChange}
              placeholder="Enter 10-digit phone number"
              pattern="[0-9]{10}"
              required
            />
            {showErrors && errors.educationSponsor_phoneNumber && <ErrorMessage>{errors.educationSponsor_phoneNumber}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="sponsorEmail">Email <span>*</span></Label>
            <Input
              type="email"
              id="sponsorEmail"
              name="email"
              value={formData.educationSponsor.email}
              onChange={handleSponsorChange}
              placeholder="Enter valid email address"
              required
            />
            {showErrors && errors.educationSponsor_email && <ErrorMessage>{errors.educationSponsor_email}</ErrorMessage>}
          </FormGroup>
        </FormRow>
      </FormSection>

      {/* Language Proficiency Section */}
      <SectionTitle>
        <div className="icon-wrapper">
          <FontAwesomeIcon icon={faLanguage} />
          Language Proficiency
        </div>
      </SectionTitle>
      
      <FormSection>
        <FormGroup>
          <Label htmlFor="exam">Language Test <span>*</span></Label>
          <Select
            id="exam"
            name="exam"
            value={formData.languageProficiency.exam}
            onChange={handleLanguageProficiencyChange}
            required
          >
            <option value="">Select a test</option>
            <option value="IELTS">IELTS</option>
            <option value="TOEFL">TOEFL</option>
            <option value="PTE">PTE</option>
            <option value="Duolingo">Duolingo</option>
            <option value="None">None</option>
          </Select>
        </FormGroup>

        {formData.languageProficiency.exam !== 'None' && (
          <>
            <FormRow>
              <FormGroup>
                <Label htmlFor="overallScore">Overall Score <span>*</span></Label>
                <Input
                  type="text"
                  id="overallScore"
                  name="overallScore"
                  value={formData.languageProficiency.overallScore}
                  onChange={handleLanguageProficiencyChange}
                  placeholder="Enter score (max 9.0)"
                  required
                />
                {showErrors && errors.languageProficiency_overallScore && <ErrorMessage>{errors.languageProficiency_overallScore}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="testReportNumber">Test Report Number <span>*</span></Label>
                <Input
                  type="text"
                  id="testReportNumber"
                  name="testReportNumber"
                  value={formData.languageProficiency.testReportNumber}
                  onChange={handleLanguageProficiencyChange}
                  placeholder="Enter test report number"
                  required
                />
                {showErrors && errors.languageProficiency_testReportNumber && <ErrorMessage>{errors.languageProficiency_testReportNumber}</ErrorMessage>}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="readingScore">Reading Score <span>*</span></Label>
                <Input
                  type="text"
                  id="readingScore"
                  name="readingScore"
                  value={formData.languageProficiency.readingScore}
                  onChange={handleLanguageProficiencyChange}
                  placeholder="Enter score (max 9.0)"
                  required
                />
                {showErrors && errors.readingScore && <ErrorMessage>{errors.readingScore}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="writingScore">Writing Score <span>*</span></Label>
                <Input
                  type="text"
                  id="writingScore"
                  name="writingScore"
                  value={formData.languageProficiency.writingScore}
                  onChange={handleLanguageProficiencyChange}
                  placeholder="Enter score (max 9.0)"
                  required
                />
                {showErrors && errors.writingScore && <ErrorMessage>{errors.writingScore}</ErrorMessage>}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="listeningScore">Listening Score <span>*</span></Label>
                <Input
                  type="text"
                  id="listeningScore"
                  name="listeningScore"
                  value={formData.languageProficiency.listeningScore}
                  onChange={handleLanguageProficiencyChange}
                  placeholder="Enter score (max 9.0)"
                  required
                />
                {showErrors && errors.listeningScore && <ErrorMessage>{errors.listeningScore}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="speakingScore">Speaking Score <span>*</span></Label>
                <Input
                  type="text"
                  id="speakingScore"
                  name="speakingScore"
                  value={formData.languageProficiency.speakingScore}
                  onChange={handleLanguageProficiencyChange}
                  placeholder="Enter score (max 9.0)"
                  required
                />
                {showErrors && errors.speakingScore && <ErrorMessage>{errors.speakingScore}</ErrorMessage>}
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label htmlFor="testDate">Test Date <span>*</span></Label>
              <Input
                type="date"
                id="testDate"
                name="testDate"
                value={formData.languageProficiency.testDate}
                onChange={(e) => {
                  const value = e.target.value;
                  const formattedDate = formatDate(value);
                  
                  if (formattedDate || value === '') {
                    updateFormData({
                      ...formData,
                      languageProficiency: {
                        ...formData.languageProficiency,
                        testDate: formattedDate
                      }
                    });
                  }
                }}
                pattern="\d{4}-\d{2}-\d{2}"
                required
              />
              {showErrors && errors.languageProficiency_testDate && <ErrorMessage>{errors.languageProficiency_testDate}</ErrorMessage>}
            </FormGroup>
          </>
        )}
      </FormSection>

      {/* Work Experience Section */}
      <SectionTitle>
        <div className="icon-wrapper">
          <FontAwesomeIcon icon={faBriefcase} />
          Work Experience
        </div>
      </SectionTitle>
      
      <FormSection>
        <FormGroup>
          <Label>Do you have work experience?</Label>
          <RadioGroup>
            <RadioLabel>
              <Radio
                type="radio"
                name="hasExperience"
                value="yes"
                checked={formData.workExperience.hasExperience}
                onChange={(e) => {
                  const hasExperience = e.target.value === 'yes';
                  updateFormData({
                    ...formData,
                    workExperience: {
                      ...formData.workExperience,
                      hasExperience
                    }
                  });
                  if (hasExperience && workExperiences.length === 0) {
                    setWorkExperiences([{
                      hasExperience: true,
                      companyName: '',
                      position: '',
                      startDate: '',
                      endDate: '',
                      currentJob: false,
                      jobDescription: ''
                    }]);
                  }
                }}
              />
              Yes
            </RadioLabel>
            <RadioLabel>
              <Radio
                type="radio"
                name="hasExperience"
                value="no"
                checked={!formData.workExperience.hasExperience}
                onChange={(e) => {
                  const hasExperience = e.target.value === 'yes';
                  updateFormData({
                    ...formData,
                    workExperience: {
                      ...formData.workExperience,
                      hasExperience
                    }
                  });
                  if (!hasExperience) {
                    setWorkExperiences([]);
                  }
                }}
              />
              No
            </RadioLabel>
          </RadioGroup>
        </FormGroup>

        {formData.workExperience.hasExperience && (
          <>
            {workExperiences.map((experience, index) => (
              <EmploymentCard key={index}>
                <CardHeader>
                  <h4>Work Experience {index + 1}</h4>
                  {index > 0 && (
                    <EmploymentRemoveButton onClick={() => removeWorkExperience(index)}>
                      <FontAwesomeIcon icon={faTimes} />
                    </EmploymentRemoveButton>
                  )}
                </CardHeader>

                <FormRow>
                  <FormGroup>
                    <Label htmlFor={`companyName-${index}`}>Company Name <span>*</span></Label>
                    <Input
                      type="text"
                      id={`companyName-${index}`}
                      value={experience.companyName}
                      onChange={(e) => handleWorkExperienceChange(index, 'companyName', e.target.value)}
                      placeholder="Enter company name"
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor={`position-${index}`}>Position <span>*</span></Label>
                    <Input
                      type="text"
                      id={`position-${index}`}
                      value={experience.position}
                      onChange={(e) => handleWorkExperienceChange(index, 'position', e.target.value)}
                      placeholder="Enter your position"
                      required
                    />
                  </FormGroup>
                </FormRow>

                <FormRow>
                  <FormGroup>
                    <Label htmlFor={`startDate-${index}`}>Start Date <span>*</span></Label>
                    <Input
                      id={`startDate-${index}`}
                      type="date"
                      value={experience.startDate}
                      onChange={(e) => {
                        if (validateDateFormat(e.target.value)) {
                          handleWorkExperienceChange(index, 'startDate', e.target.value);
                        }
                      }}
                      max={new Date().toISOString().split('T')[0]}
                      pattern="\d{4}-\d{2}-\d{2}"
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Label htmlFor={`endDate-${index}`}>End Date {!experience.currentJob && <span>*</span>}</Label>
                      <Input
                        id={`endDate-${index}`}
                        type="date"
                        value={experience.endDate}
                        onChange={(e) => {
                          if (validateDateFormat(e.target.value)) {
                            handleWorkExperienceChange(index, 'endDate', e.target.value);
                          }
                        }}
                        max={new Date().toISOString().split('T')[0]}
                        pattern="\d{4}-\d{2}-\d{2}"
                        required={!experience.currentJob}
                        disabled={experience.currentJob}
                        style={{ marginBottom: '8px' }}
                      />
                      <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                        <input 
                          type="checkbox" 
                          id={`currentJob-${index}`} 
                          checked={experience.currentJob || false}
                          onChange={(e) => handleWorkExperienceChange(index, 'currentJob', e.target.checked)}
                          style={{ marginRight: '8px' }}
                        />
                        <label htmlFor={`currentJob-${index}`}>I currently work here</label>
                      </div>
                    </div>
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <Label htmlFor={`jobDescription-${index}`}>Job Description <span>*</span></Label>
                  <TextArea
                    id={`jobDescription-${index}`}
                    value={experience.jobDescription}
                    onChange={(e) => handleWorkExperienceChange(index, 'jobDescription', e.target.value)}
                    placeholder="Enter job description"
                    required
                  />
                </FormGroup>
              </EmploymentCard>
            ))}
            
            <AddButton onClick={addWorkExperience}>
              <FontAwesomeIcon icon={faPlus} />
              Add Another Work Experience
            </AddButton>
          </>
        )}
      </FormSection>

      {/* Visa Rejection Section */}
      <SectionTitle>
        <div className="icon-wrapper">
          <FontAwesomeIcon icon={faExclamationTriangle} />
          Visa Rejection History
        </div>
      </SectionTitle>
      
      <FormSection>
        <FormGroup>
          <Label>Have you ever been rejected for a visa?</Label>
          <RadioGroup>
            <RadioLabel>
              <Radio
                type="radio"
                name="hasRejection"
                value="yes"
                checked={formData.visaRejection.hasRejection}
                onChange={handleVisaRejectionChange}
              />
              Yes
            </RadioLabel>
            <RadioLabel>
              <Radio
                type="radio"
                name="hasRejection"
                value="no"
                checked={!formData.visaRejection.hasRejection}
                onChange={handleVisaRejectionChange}
              />
              No
            </RadioLabel>
          </RadioGroup>
        </FormGroup>

        {formData.visaRejection.hasRejection && (
          <>
            {/* Show existing countries */}
            {formData.visaRejection.countries && formData.visaRejection.countries.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <Label>Selected Countries:</Label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                  {formData.visaRejection.countries.map((country, index) => (
                    <div 
                      key={index} 
                      style={{ 
                        backgroundColor: '#f0f0f0', 
                        padding: '8px 12px',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      {country}
                      <button
                        type="button"
                        onClick={() => removeVisaRejectionCountry(country)}
                        style={{ 
                          border: 'none', 
                          background: 'none', 
                          cursor: 'pointer',
                          color: '#666',
                          padding: '0',
                          display: 'flex',
                          alignItems: 'center',
                          fontSize: '14px'
                        }}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          
            <FormGroup>
              <Label htmlFor="rejectionCountry">Add Country of Rejection <span>*</span></Label>
              <Select
                ref={visaRejectionCountryRef}
                id="rejectionCountry"
                name="country"
                value=""
                onChange={handleVisaRejectionChange}
                required
              >
                <option value="">Select Country</option>
                {COUNTRIES.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="rejectionDetails">Details (Optional)</Label>
              <TextArea
                id="rejectionDetails"
                name="details"
                value={formData.visaRejection.details || ''}
                onChange={handleVisaRejectionChange}
                placeholder="Enter rejection details (reason, date, etc.)"
              />
            </FormGroup>
          </>
        )}
      </FormSection>
    </StepContainer>
  );
};

export default Step3PersonalInfo;