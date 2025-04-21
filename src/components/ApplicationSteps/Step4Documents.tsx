import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUpload, 
  faFile, 
  faFileAlt, 
  faFilePdf, 
  faFileImage, 
  faFileWord, 
  faFileExcel, 
  faFilePowerpoint, 
  faFileArchive, 
  faFileCode, 
  faFileVideo, 
  faFileAudio, 
  faTimes, 
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

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

const DocumentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DocumentUploader = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  min-height: 360px;
  height: auto;
  margin-bottom: 1.5rem;
  
  /* Responsive adjustments */
  @media (max-width: 480px) {
    padding: 1rem;
    min-height: 320px;
  }
`;

const UploaderTitle = styled.h4`
  font-size: 1.1rem;
  color: #0c3b5e;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  line-height: 1.3;
  flex-wrap: wrap;
  
  svg {
    color: #f39c12;
    flex-shrink: 0;
  }
  
  /* Responsive adjustments */
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const UploaderDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
  min-height: auto;
  line-height: 1.4;
`;

const UploadArea = styled.div`
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.2s;
  margin-top: auto;
  margin-bottom: auto;
  min-height: 220px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: visible;
  cursor: pointer;
  
  &:hover {
    border-color: #0c3b5e;
  }
  
  /* Responsive adjustments */
  @media (max-width: 480px) {
    padding: 1rem;
    min-height: 180px;
  }
  
  /* Fix for iOS */
  @media (hover: none) {
    &:hover {
      border-color: #ddd;
    }
    &:active {
      border-color: #0c3b5e;
    }
  }
`;

const UploadIcon = styled.div`
  font-size: 2.5rem;
  color: #0c3b5e;
  margin-bottom: 1rem;
  opacity: 0.8;
  transition: transform 0.3s ease;
  
  ${UploadArea}:hover & {
    transform: translateY(-5px);
  }
  
  /* Responsive adjustments */
  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }
  
  /* Fix for iOS */
  @media (hover: none) {
    ${UploadArea}:hover & {
      transform: none;
    }
    ${UploadArea}:active & {
      transform: translateY(-5px);
    }
  }
`;

const UploadText = styled.p`
  color: #666;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  
  /* Responsive adjustments */
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
  }
`;

const UploadButton = styled.button`
  display: inline-block;
  background-color: #0c3b5e;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: none;
  
  &:hover {
    background-color: #0a3250;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  /* Responsive adjustments */
  @media (max-width: 480px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
  
  /* Fix for iOS */
  @media (hover: none) {
    &:hover {
      transform: none;
      background-color: #0c3b5e;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    &:active {
      background-color: #0a3250;
      transform: translateY(-2px);
    }
  }
`;

const FilePreview = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 0.5rem;
  
  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
  
  /* Responsive adjustments - wider area for touch */
  @media (max-width: 480px) {
    &::-webkit-scrollbar {
      width: 8px;
    }
  }
`;

const FilePreviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin-bottom: 0.5rem;
  width: 90%;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.02);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  /* Responsive adjustments */
  @media (max-width: 480px) {
    width: 95%;
    padding: 0.75rem;
  }
  
  /* Fix for iOS */
  @media (hover: none) {
    &:hover {
      transform: none;
    }
  }
`;

const FilePreviewIcon = styled.div`
  font-size: 3rem;
  color: #0c3b5e;
  margin-bottom: 0.75rem;
  opacity: 0.9;
  
  /* Responsive adjustments */
  @media (max-width: 480px) {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
`;

const FilePreviewDetails = styled.div`
  text-align: center;
  width: 100%;
  padding: 0 1rem;
  margin-bottom: 0.5rem;
`;

const FilePreviewName = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: #333;
  word-break: break-word;
  max-width: 100%;
  line-height: 1.3;
`;

const FilePreviewSize = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const FilePreviewActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const FilePreviewActionButton = styled.button`
  background: none;
  border: 1px solid #ddd;
  color: #666;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    border-color: #999;
  }
  
  &.remove:hover {
    color: #e74c3c;
    border-color: #e74c3c;
  }
  
  svg {
    font-size: 0.9rem;
  }
  
  /* Responsive adjustments - larger tap targets for mobile */
  @media (max-width: 480px) {
    padding: 0.4rem 0.7rem;
    font-size: 0.95rem;
    
    svg {
      font-size: 1rem;
    }
  }
  
  /* Fix for iOS */
  @media (hover: none) {
    &:hover {
      background: none;
      border-color: #ddd;
      color: #666;
    }
    
    &.remove:hover {
      color: #666;
      border-color: #ddd;
    }
    
    &:active {
      background-color: rgba(0, 0, 0, 0.05);
      border-color: #999;
    }
    
    &.remove:active {
      color: #e74c3c;
      border-color: #e74c3c;
    }
  }
`;

const AddMoreButton = styled.button`
  background: #0c3b5e;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: visible;
  white-space: normal;
  max-width: 100%;
  
  &:hover {
    background-color: #0a3250;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  svg {
    font-size: 0.9rem;
    flex-shrink: 0;
  }
  
  span {
    display: inline-block;
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  /* Responsive adjustments - larger tap targets for mobile */
  @media (max-width: 480px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.95rem;
    
    svg {
      font-size: 1rem;
    }
    
    span {
      max-width: 160px;
    }
  }
  
  /* Fix for iOS */
  @media (hover: none) {
    &:hover {
      transform: none;
      background-color: #0c3b5e;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    
    &:active {
      background-color: #0a3250;
      transform: translateY(-2px);
    }
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InfoBox = styled.div`
  background-color: #f8f9fa;
  border-left: 4px solid #f39c12;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 4px;
  
  p {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #555;
    font-size: 0.95rem;
    
    svg {
      color: #f39c12;
      font-size: 1.25rem;
      flex-shrink: 0;
    }
  }
  
  /* Responsive adjustments */
  @media (max-width: 480px) {
    padding: 0.75rem;
    
    p {
      font-size: 0.9rem;
      gap: 0.5rem;
      
      svg {
        font-size: 1.1rem;
      }
    }
  }
`;

const ValidationSummary = styled.div`
  background-color: #fdeaea;
  border-left: 4px solid #e74c3c;
  padding: 1rem;
  margin: 1rem 0 2rem;
  border-radius: 4px;
  
  h4 {
    color: #e74c3c;
    margin-top: 0;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    svg {
      font-size: 1rem;
    }
  }
  
  ul {
    margin: 0;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.25rem;
      font-size: 0.9rem;
    }
  }
  
  /* Responsive adjustments */
  @media (max-width: 480px) {
    padding: 0.75rem;
    
    h4 {
      font-size: 1rem;
    }
    
    ul {
      padding-left: 1.25rem;
      
      li {
        font-size: 0.85rem;
      }
    }
  }
`;

interface FileInfo {
  file: File;
  id: string;
}

// Import or define the DocumentValue type for consistency
type DocumentValue = File | File[] | FileInfo | FileInfo[] | null | undefined;

// Update DocumentFormData to match the parent FormData interface
interface DocumentFormData {
  documents?: Record<string, DocumentValue>;
  documentsValid?: boolean;
  [key: string]: any;
}

// Update convertToInternalFormat to use the new type
function convertToInternalFormat(
  docs: Record<string, DocumentValue> | undefined
): Record<string, FileInfo[] | null> {
  if (!docs) return {};
  
  const result: Record<string, FileInfo[] | null> = {};
  
  Object.entries(docs).forEach(([key, value]) => {
    // Handle array of Files or FileInfos
    if (Array.isArray(value) && value.length > 0) {
      // Check if it's an array of FileInfo
      if (value[0] && typeof value[0] === 'object' && 'file' in value[0] && 'id' in value[0]) {
        // It's already a FileInfo array
        result[key] = value as FileInfo[];
      } else {
        // Assume it's a File array and convert to FileInfo array
        // Cast to any[] first to avoid filter compatibility issues
        const fileArray = value as any[];
        const validFiles = fileArray.filter((file: any) => file instanceof File) as File[];
        
        if (validFiles.length > 0) {
          result[key] = validFiles.map((file: File) => ({
            file: file,
            id: `file-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
          }));
        } else {
          result[key] = null;
        }
      }
    } 
    // Handle single File or FileInfo
    else if (value && typeof value === 'object') {
      if ('file' in value && 'id' in value) {
        // Single FileInfo
        result[key] = [value as FileInfo];
      } else if (value instanceof File) {
        // Single File
        result[key] = [{
          file: value,
          id: `file-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
        }];
      } else {
        result[key] = null;
      }
    } else {
      result[key] = null;
    }
  });
  
  return result;
}

interface Step4DocumentsProps {
  formData: DocumentFormData;
  updateFormData: (data: Partial<DocumentFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step4Documents = ({ formData, updateFormData, onNext, onBack }: Step4DocumentsProps) => {
  // This state stores our internal representation with FileInfo objects
  const [documents, setDocuments] = useState<Record<string, FileInfo[] | null>>(() => {
    try {
      if (formData.documents) {
        return convertToInternalFormat(formData.documents);
      }
    } catch (error) {
      console.error("Error initializing documents state:", error);
    }
    return {};
  });
  
  const [documentTypes, setDocumentTypes] = useState<Record<string, {
    title: string;
    description: string;
    icon: IconDefinition;
    accept: string;
    multiple?: boolean;
    required?: boolean;
  }>>({
    highSchoolTranscripts: {
      title: 'High School Transcripts',
      description: 'Please upload your high school transcripts and completion letter',
      icon: faFileAlt,
      accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
      multiple: true,
      required: true
    },
    languageResults: {
      title: 'Language Test Results',
      description: 'Please upload your language proficiency test results (IELTS, TOEFL, etc.)',
      icon: faFilePdf,
      accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
      required: true
    },
    passport: {
      title: 'Passport Copy',
      description: 'Please upload a clear copy of your passport',
      icon: faFileImage,
      accept: '.pdf,.jpg,.jpeg,.png',
      required: true
    },
    resume: {
      title: 'Resume/CV',
      description: 'Please upload your current resume',
      icon: faFileWord,
      accept: '.pdf,.doc,.docx',
      required: true
    },
    financialDocuments: {
      title: 'Financial Documents',
      description: 'Please upload bank statements, fixed deposits, or other financial documents showing sufficient funds',
      icon: faFileExcel,
      accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
      multiple: true,
      required: false
    },
    sponsorLetter: {
      title: 'Sponsor Letter',
      description: 'If you have a sponsor, please upload their letter of support',
      icon: faFileAlt,
      accept: '.pdf,.doc,.docx',
      required: false
    },
    sponsorDocuments: {
      title: 'Sponsor Documents',
      description: 'If you have a sponsor, please upload their financial documents and ID proof',
      icon: faFileAlt,
      accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
      multiple: true,
      required: false
    }
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Memoize the validation function to prevent unnecessary re-renders
  const validateDocuments = useCallback(() => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.entries(documentTypes).forEach(([docType, config]) => {
      if (config.required && (!documents[docType] || !Array.isArray(documents[docType]) || (documents[docType] as FileInfo[]).length === 0)) {
        newErrors[docType] = `${config.title} is required`;
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  }, [documentTypes, documents]);
  
  // Simplified file upload handler
  const handleFileUpload = (docType: string, e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`File upload triggered for ${docType}`);
    
    try {
      // Check for files
      const files = e.target.files;
      if (!files || files.length === 0) {
        console.log("No files selected");
        return;
      }
      
      console.log(`Selected ${files.length} files`);
      
      // Create a safe copy of the files array
      const fileList = Array.from(files);
      
      // Simple filtering of valid files
      const validFiles = fileList.filter(file => file instanceof File && file.size > 0);
      
      if (validFiles.length === 0) {
        console.log("No valid files to process");
        return;
      }
      
      // Create file info objects
      const fileInfos: FileInfo[] = validFiles.map(file => ({
        file,
        id: `file-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
      }));
      
      // Create a new documents object to avoid mutations
      const updatedDocuments = {...documents};
      
      // Update the specific document type
      if (documentTypes[docType]?.multiple) {
        // For multiple files, append to any existing files
        const existingFiles = Array.isArray(updatedDocuments[docType]) 
          ? updatedDocuments[docType] as FileInfo[]
          : [];
        
        updatedDocuments[docType] = [...existingFiles, ...fileInfos];
      } else {
        // For single file, replace existing
        updatedDocuments[docType] = [fileInfos[0]];
      }
      
      // Update local state
      setDocuments(updatedDocuments);
      
      // For parent component
      updateFormData({
        documents: updatedDocuments,
        documentsValid: true
      });
      
      // Immediately clear any errors for this document type
      setErrors(prev => {
        if (!prev[docType]) return prev; // No change needed
        const newErrors = {...prev};
        delete newErrors[docType];
        return newErrors;
      });
      
      // Reset the input value to allow selecting the same file again
      if (e.target) {
        e.target.value = '';
      }
      
      console.log(`Successfully processed ${fileInfos.length} files for ${docType}`);
    } catch (error) {
      console.error("Error processing files:", error);
      // Reset input field even on error
      if (e.target) {
        e.target.value = '';
      }
    }
  };
  
  const handleFileRemove = (docType: string, fileId: string) => {
    try {
      // Safe check for documents
      const typeDocuments = documents[docType];
      if (!typeDocuments || !Array.isArray(typeDocuments) || typeDocuments.length === 0) {
        console.log(`No documents found for ${docType}`);
        return;
      }
      
      // Filter out the file to remove
      const filteredFiles = typeDocuments.filter(item => item.id !== fileId);
      
      // Create a new documents object
      const updatedDocuments = {
        ...documents,
        [docType]: filteredFiles.length > 0 ? filteredFiles : null
      };
      
      // Update local state
      setDocuments(updatedDocuments);
      
      // For parent component
      updateFormData({
        documents: updatedDocuments
      });
      
      console.log(`File removed from ${docType}`);
      
      // Re-validate documents if a required document was removed
      if (documentTypes[docType]?.required) {
        setTimeout(() => validateDocuments(), 0);
      }
    } catch (error) {
      console.error("Error removing file:", error);
    }
  };
  
  // Create a simple function to trigger file selection
  const triggerFileInput = useCallback((docType: string, isMoreFiles = false) => {
    const inputId = `file-input-${docType}`;
    // Create a temporary file input 
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = documentTypes[docType].accept;
    input.multiple = Boolean(isMoreFiles || documentTypes[docType].multiple);
    
    // Handle the file selection
    input.addEventListener('change', (e: Event) => {
      handleFileUpload(docType, e as unknown as React.ChangeEvent<HTMLInputElement>);
    });
    
    // Add to document temporarily
    document.body.appendChild(input);
    
    // Trigger click and then remove
    input.click();
    
    // Remove after a delay to ensure the change event has time to fire
    setTimeout(() => {
      if (input.parentNode) {
        input.parentNode.removeChild(input);
      }
    }, 1000);
  }, [documentTypes, handleFileUpload]);

  // Update document types based on form data
  useEffect(() => {
    console.log("Form data received in Step4Documents:", formData);
    
    const newDocumentTypes: Record<string, {
      title: string;
      description: string;
      icon: IconDefinition;
      accept: string;
      multiple?: boolean;
      required?: boolean;
    }> = {
      highSchoolTranscripts: {
        title: 'High School Transcripts',
        description: 'Please upload your high school transcripts and completion letter',
        icon: faFileAlt,
        accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
        multiple: true,
        required: true
      },
      languageResults: {
        title: 'Language Test Results',
        description: 'Please upload your language proficiency test results (IELTS, TOEFL, etc.)',
        icon: faFilePdf,
        accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
        required: formData.languageProficiency?.exam && formData.languageProficiency.exam !== 'None'
      },
      passport: {
        title: 'Passport Copy',
        description: 'Please upload a clear copy of your passport',
        icon: faFileImage,
        accept: '.pdf,.jpg,.jpeg,.png',
        required: true
      },
      resume: {
        title: 'Resume/CV',
        description: 'Please upload your current resume',
        icon: faFileWord,
        accept: '.pdf,.doc,.docx',
        required: true
      },
      financialDocuments: {
        title: 'Financial Documents',
        description: 'Please upload bank statements, fixed deposits, or other financial documents showing sufficient funds',
        icon: faFileExcel,
        accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
        multiple: true,
        required: false
      }
    };

    if (formData.educationEntries && Array.isArray(formData.educationEntries)) {
      formData.educationEntries.forEach((entry: any, index: number) => {
        if (entry.level === 'High School') return;

        const educationKey = `education_${entry.level.replace(/\s+/g, '_').toLowerCase()}_transcripts`;
        const levelName = entry.level.replace("'s", "");

        newDocumentTypes[educationKey] = {
          title: `${entry.level} Transcripts`,
          description: `Please upload your ${levelName.toLowerCase()} transcripts and completion letter from ${entry.institution || ''}`,
          icon: faFileAlt,
          accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
          multiple: true,
          required: true
        };
      });
    }

    if (formData.educationSponsor && formData.educationSponsor.name) {
      newDocumentTypes.sponsorLetter = {
        title: 'Sponsor Letter',
        description: 'Please upload your sponsor\'s letter of support',
        icon: faFileAlt,
        accept: '.pdf,.doc,.docx',
        required: true
      };
      
      newDocumentTypes.sponsorDocuments = {
        title: 'Sponsor Documents',
        description: 'Please upload your sponsor\'s financial documents and ID proof',
        icon: faFileAlt,
        accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
        multiple: true,
        required: true
      };
    } else {
      newDocumentTypes.sponsorLetter = {
        title: 'Sponsor Letter',
        description: 'If you have a sponsor, please upload their letter of support',
        icon: faFileAlt,
        accept: '.pdf,.doc,.docx',
        required: false
      };
      
      newDocumentTypes.sponsorDocuments = {
        title: 'Sponsor Documents',
        description: 'If you have a sponsor, please upload their financial documents and ID proof',
        icon: faFileAlt,
        accept: '.pdf,.doc,.docx,.jpg,.jpeg,.png',
        multiple: true,
        required: false
      };
    }

    setDocumentTypes(newDocumentTypes);
    
  }, [formData.languageProficiency, formData.educationEntries, formData.educationSponsor]);

  // Handle document loading from formData
  useEffect(() => {
    // If documents are already in form data, preserve them
    if (formData.documents) {
      // Only update if there's a difference to avoid re-renders
      const internalDocs = convertToInternalFormat(formData.documents);
      if (JSON.stringify(internalDocs) !== JSON.stringify(documents)) {
        console.log("Loading documents from formData:", internalDocs);
        setDocuments(internalDocs);
      }
    }
  }, [formData.documents]);

  // Validate documents when needed
  useEffect(() => {
    validateDocuments();
  }, [validateDocuments]);

  // Update parent about validation state
  useEffect(() => {
    const isValid = Object.keys(errors).length === 0;
    updateFormData({
      documentsValid: isValid
    });
  }, [errors, updateFormData]);

  // Memoize helper functions
  const hasFiles = useCallback((docType: string): boolean => {
    const fileInfos = documents[docType];
    return Boolean(fileInfos && Array.isArray(fileInfos) && fileInfos.length > 0);
  }, [documents]);

  const getFileInfos = useCallback((docType: string): FileInfo[] => {
    const files = documents[docType];
    if (files && Array.isArray(files) && files.length > 0) {
      return files;
    }
    return [];
  }, [documents]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    
    switch (extension) {
      case 'pdf':
        return faFilePdf;
      case 'doc':
      case 'docx':
        return faFileWord;
      case 'xls':
      case 'xlsx':
        return faFileExcel;
      case 'ppt':
      case 'pptx':
        return faFilePowerpoint;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
        return faFileImage;
      case 'zip':
      case 'rar':
      case '7z':
        return faFileArchive;
      case 'mp4':
      case 'avi':
      case 'mov':
        return faFileVideo;
      case 'mp3':
      case 'wav':
        return faFileAudio;
      case 'html':
      case 'css':
      case 'js':
        return faFileCode;
      default:
        return faFile;
    }
  };

  return (
    <StepContainer>
      <InfoBox>
        <p>
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <span>Please ensure all documents are clear, legible scans or photos. Blurry or incomplete documents may delay your application processing.</span>
        </p>
      </InfoBox>
      
      {Object.keys(errors).length > 0 && (
        <ValidationSummary id="validation-summary">
          <h4><FontAwesomeIcon icon={faExclamationTriangle} /> Please upload all required documents</h4>
          <ul>
            {Object.entries(errors).map(([docType, errorMessage]) => (
              <li key={docType}>{errorMessage}</li>
            ))}
          </ul>
        </ValidationSummary>
      )}
      
      <SectionTitle>
        <div className="icon-wrapper">
          <FontAwesomeIcon icon={faFileAlt} />
          Upload Required Documents
        </div>
      </SectionTitle>
      
      <DocumentsGrid>
        {Object.entries(documentTypes).map(([docType, config]) => (
          <DocumentUploader key={docType}>
            <UploaderTitle>
              <FontAwesomeIcon icon={config.icon} />
              {config.title} {config.required && <span style={{ color: '#dc3545' }}>*</span>}
            </UploaderTitle>
            <UploaderDescription>{config.description}</UploaderDescription>
            
            <UploadArea 
              onClick={(e) => {
                e.preventDefault();
                triggerFileInput(docType);
              }}
              style={{ 
                borderColor: errors[docType] ? '#dc3545' : undefined,
                borderWidth: errors[docType] ? '2px' : undefined 
              }}
            >
              {hasFiles(docType) ? (
                <FilePreview onClick={(e) => e.stopPropagation()}>
                  {getFileInfos(docType).map((fileInfo) => (
                    <FilePreviewItem key={fileInfo.id}>
                      <FilePreviewIcon>
                        <FontAwesomeIcon icon={getFileIcon(fileInfo.file.name)} />
                      </FilePreviewIcon>
                      <FilePreviewDetails>
                        <FilePreviewName title={fileInfo.file.name}>{fileInfo.file.name}</FilePreviewName>
                        <FilePreviewSize>{formatFileSize(fileInfo.file.size)}</FilePreviewSize>
                      </FilePreviewDetails>
                      <FilePreviewActions>
                        <FilePreviewActionButton 
                          className="remove"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleFileRemove(docType, fileInfo.id);
                          }}
                          title="Remove file"
                          type="button"
                        >
                          <FontAwesomeIcon icon={faTimes} /> Remove
                        </FilePreviewActionButton>
                      </FilePreviewActions>
                    </FilePreviewItem>
                  ))}
                  
                  {config.multiple && (
                    <AddMoreButton 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        triggerFileInput(docType, true);
                      }}
                    >
                      <FontAwesomeIcon icon={faUpload} /> 
                      <span>
                        {getFileInfos(docType).length === 1 
                          ? "Add More Files" 
                          : `Add More (${getFileInfos(docType).length} uploaded)`}
                      </span>
                    </AddMoreButton>
                  )}
                </FilePreview>
              ) : (
                <>
                  <UploadIcon>
                    <FontAwesomeIcon icon={faUpload} />
                  </UploadIcon>
                  <UploadText>
                    Click to browse and select {config.multiple ? "files" : "a file"}
                  </UploadText>
                  <UploadButton 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      triggerFileInput(docType);
                    }}
                  >
                    Browse Files
                  </UploadButton>
                </>
              )}
            </UploadArea>
            
            {errors[docType] && (
              <ErrorMessage>
                <FontAwesomeIcon icon={faExclamationTriangle} />
                {errors[docType]}
              </ErrorMessage>
            )}
          </DocumentUploader>
        ))}
      </DocumentsGrid>
    </StepContainer>
  );
};

export default Step4Documents; 