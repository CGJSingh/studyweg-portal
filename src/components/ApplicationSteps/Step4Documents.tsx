import React, { useState, useEffect } from 'react';
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
  faCheck, 
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

const DocumentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
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
  padding: 1.5rem; /* Reduced padding */
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
  overflow: hidden;
  
  &:hover {
    border-color: #0c3b5e;
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
`;

const UploadText = styled.p`
  color: #666;
  margin-bottom: 1rem;
  font-size: 0.95rem;
`;

const UploadButton = styled.label`
  display: inline-block;
  background-color: #0c3b5e;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #0a3250;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const FileList = styled.div`
  margin-top: 1.5rem;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: #e8f4fc;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const FileIcon = styled.div`
  font-size: 1.25rem;
  color: #0c3b5e;
  margin-right: 1rem;
`;

const FileDetails = styled.div`
  flex: 1;
`;

const FileName = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: #333;
`;

const FileSize = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const FileActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s;
  
  &:hover {
    color: #e74c3c;
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  svg {
    font-size: 1rem;
  }
`;

const SuccessIcon = styled.div`
  color: #2ecc71;
  margin-left: auto;
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
`;

const FilePreviewIcon = styled.div`
  font-size: 3rem;
  color: #0c3b5e;
  margin-bottom: 0.75rem;
  opacity: 0.9;
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
  overflow: visible; /* Changed from hidden to visible */
  white-space: normal; /* Allow text to wrap */
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
`;

interface FileInfo {
  file: File;
  preview?: string;
}

interface Step4DocumentsProps {
  formData: any;
  updateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const Step4Documents: React.FC<Step4DocumentsProps> = ({ formData, updateFormData, onNext, onBack }) => {
  const [documents, setDocuments] = useState<{
    [key: string]: FileInfo[] | null;
  }>(formData.documents || {});
  
  // Dynamic document types based on education entries
  const [documentTypes, setDocumentTypes] = useState<Record<string, {
    title: string;
    description: string;
    icon: any;
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
  
  // Update validateDocuments to return both validity and error messages
  const validateDocuments = () => {
    const errors: Record<string, string> = {};
    let isValid = true;

    // Check all required document types
    Object.entries(documentTypes).forEach(([type, config]) => {
      if (config.required && (!documents[type] || documents[type]?.length === 0)) {
        errors[type] = `${config.title} is required`;
        isValid = false;
      }
    });

    // Additional validation can be added here (file size, type, etc.)
    
    setErrors(errors);
    return isValid;
  };
  
  // Update handleFileUpload to validate after upload and handle file size limits
  const handleFileUpload = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
      
      // Filter out files that exceed size limit
      const validFiles = files.filter(file => file.size <= MAX_FILE_SIZE);
      
      if (validFiles.length < files.length) {
        // Some files were too large
        const tooLargeCount = files.length - validFiles.length;
        const errorMsg = tooLargeCount === 1 
          ? "1 file was not uploaded because it exceeds the 5MB limit" 
          : `${tooLargeCount} files were not uploaded because they exceed the 5MB limit`;
        
        setErrors(prev => ({
          ...prev,
          fileSize: errorMsg
        }));
        
        setTimeout(() => {
          setErrors(prev => {
            const newErrors = {...prev};
            delete newErrors.fileSize;
            return newErrors;
          });
        }, 5000);
      }
      
      if (validFiles.length === 0) return;
      
      const fileInfos: FileInfo[] = validFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      
      // Handle multiple vs single file uploads
      const newFiles = documentTypes[type].multiple 
        ? [...(documents[type] || []), ...fileInfos]
        : [fileInfos[0]];
      
      const updatedDocuments = {
        ...documents,
        [type]: newFiles,
      };
      
      setDocuments(updatedDocuments);
      
      // Update form data with new documents and validation status
      const isValid = true; // Pre-validate as true since we just added files
      updateFormData({ 
        documents: updatedDocuments,
        documentsValid: isValid
      });
      
      // Clear input value to allow uploading the same file again if needed
      e.target.value = '';
    }
  };
  
  // Update handleFileRemove to validate after removal
  const handleFileRemove = (type: string, index: number) => {
    if (!documents[type]) return;
    
    try {
      const updatedFiles = [...documents[type] as FileInfo[]];
      
      // Release object URL to prevent memory leaks
      if (updatedFiles[index]?.preview) {
        URL.revokeObjectURL(updatedFiles[index].preview!);
      }
      
      // Remove the file from the array
      updatedFiles.splice(index, 1);
      
      const updatedDocuments = {
        ...documents,
        [type]: updatedFiles.length > 0 ? updatedFiles : null,
      };
      
      setDocuments(updatedDocuments);
      
      // Update form data
      updateFormData({ 
        documents: updatedDocuments
      });
      
      // Validate after removal happens via the documents useEffect
    } catch (error) {
      console.error("Error removing file:", error);
    }
  };
  
  // Format file size in human-readable format
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Get icon based on file type
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
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
  
  // Update handleNext to show inline errors instead of alerts
  const handleNext = () => {
    const isValid = validateDocuments();
    
    if (isValid) {
      // Update formData with validation status before proceeding
      updateFormData({ 
        documentsValid: true,
        documents: documents
      });
      // Navigate to next step
      onNext();
    } else {
      // Set documents as invalid
      updateFormData({ 
        documentsValid: false,
        documents: documents
      });
      // Scroll to the validation summary
      document.getElementById('validation-summary')?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Run validation when component mounts to ensure parent component's buttons work correctly
  useEffect(() => {
    const isValid = validateDocuments();
    
    // Update the documentsValid status in parent component
    updateFormData({ 
      documentsValid: isValid,
      documents: documents
    });
    
  }, [documents]);
  
  // Load document types based on formData when component mounts
  useEffect(() => {
    console.log("Form data received in Step4Documents:", formData);
    
    const newDocumentTypes: Record<string, {
      title: string;
      description: string;
      icon: any;
      accept: string;
      multiple?: boolean;
      required?: boolean;
    }> = {
      // Always include required document types
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

    // Check for education entries in formData
    if (formData.educationEntries && Array.isArray(formData.educationEntries)) {
      formData.educationEntries.forEach((entry: any, index: number) => {
        // Skip high school as we already have a dedicated section for it
        if (entry.level === 'High School') return;

        const educationKey = `education_${entry.level.replace(/\s+/g, '_').toLowerCase()}_transcripts`;
        const levelName = entry.level.replace("'s", ""); // Remove possessive from "Bachelor's", "Master's" etc.

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

    // Check if sponsor documents should be required
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
      // Sponsor is not required
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
    console.log("Updated document types:", newDocumentTypes);
    
    // Initialize documents from formData if available
    if (formData.documents) {
      setDocuments(formData.documents);
    }
    
    // Validate documents after updating types
    setTimeout(() => {
      validateDocuments();
    }, 0);
    
  }, [formData]);

  return (
    <StepContainer>
      <InfoBox>
        <p>
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <span>Please ensure all documents are clear, legible scans or photos. Blurry or incomplete documents may delay your application processing.</span>
        </p>
      </InfoBox>
      
      {/* Show validation summary if there are errors */}
      {Object.keys(errors).length > 0 && (
        <ValidationSummary id="validation-summary">
          <h4><FontAwesomeIcon icon={faExclamationTriangle} /> Please upload all required documents</h4>
          <ul>
            {Object.entries(errors).map(([type, errorMessage]) => (
              <li key={type}>{errorMessage}</li>
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
        {Object.entries(documentTypes).map(([type, config]) => (
          <DocumentUploader key={type}>
            <UploaderTitle>
              <FontAwesomeIcon icon={config.icon} />
              {config.title} {config.required && <span style={{ color: '#dc3545' }}>*</span>}
            </UploaderTitle>
            <UploaderDescription>{config.description}</UploaderDescription>
            
            <UploadArea>
              {documents[type] && documents[type]!.length > 0 ? (
                <FilePreview>
                  {/* Show all files for this document type */}
                  {(documents[type] as FileInfo[]).map((fileInfo, index) => (
                    <FilePreviewItem key={index}>
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
                          onClick={() => handleFileRemove(type, index)}
                          title="Remove file"
                        >
                          <FontAwesomeIcon icon={faTimes} /> Remove
                        </FilePreviewActionButton>
                      </FilePreviewActions>
                    </FilePreviewItem>
                  ))}
                  
                  {/* For multiple files, show add more button */}
                  {config.multiple && (
                    <AddMoreButton>
                      <FontAwesomeIcon icon={faUpload} /> 
                      <span>
                        {documents[type]!.length === 1 
                          ? "Add More Files" 
                          : `Add More (${documents[type]!.length} uploaded)`}
                      </span>
                      <HiddenInput 
                        type="file" 
                        accept={config.accept}
                        multiple={config.multiple}
                        onChange={(e) => handleFileUpload(type, e)}
                      />
                    </AddMoreButton>
                  )}
                </FilePreview>
              ) : (
                <>
                  <UploadIcon>
                    <FontAwesomeIcon icon={faUpload} />
                  </UploadIcon>
                  <UploadText>
                    {config.multiple 
                      ? 'Click to upload files (max 5MB each)' 
                      : 'Click to upload a file (max 5MB)'}
                  </UploadText>
                  <UploadButton>
                    Browse Files
                    <HiddenInput 
                      type="file" 
                      accept={config.accept}
                      multiple={config.multiple}
                      onChange={(e) => handleFileUpload(type, e)}
                    />
                  </UploadButton>
                </>
              )}
            </UploadArea>
            
            {errors[type] && (
              <ErrorMessage>
                <FontAwesomeIcon icon={faExclamationTriangle} />
                {errors[type]}
              </ErrorMessage>
            )}
          </DocumentUploader>
        ))}
      </DocumentsGrid>
    </StepContainer>
  );
};

export default Step4Documents; 