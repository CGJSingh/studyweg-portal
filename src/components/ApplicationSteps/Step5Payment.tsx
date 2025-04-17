import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCreditCard, 
  faMoneyBillWave, 
  faUniversity, 
  faCheckCircle, 
  faExclamationTriangle, 
  faUser, 
  faGraduationCap, 
  faCalendarAlt, 
  faMapMarkerAlt, 
  faReceipt 
} from '@fortawesome/free-solid-svg-icons';
import { Program } from '../../types';

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

const PaymentSummary = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const SummaryTitle = styled.h4`
  font-size: 1.1rem;
  color: #0c3b5e;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: #f39c12;
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
    font-weight: bold;
    padding-top: 1rem;
    font-size: 1.1rem;
  }
`;

const SummaryLabel = styled.span`
  color: #666;
`;

const SummaryValue = styled.span`
  color: #333;
  font-weight: 500;
`;

const ApplicationDetails = styled.div`
  background-color: #e8f4fc;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const ApplicationDetailRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailIcon = styled.div`
  width: 36px;
  color: #0c3b5e;
`;

const DetailLabel = styled.span`
  width: 150px;
  color: #666;
`;

const DetailValue = styled.span`
  color: #333;
  font-weight: 500;
`;

const PaymentMethodsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const PaymentMethodCard = styled.div<{ selected: boolean }>`
  border: 2px solid ${props => props.selected ? '#0c3b5e' : '#ddd'};
  border-radius: 8px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${props => props.selected ? '#e8f4fc' : 'white'};
  position: relative;
  
  &:hover {
    border-color: ${props => props.selected ? '#0c3b5e' : '#aaa'};
  }
`;

const PaymentMethodHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const PaymentMethodIcon = styled.div`
  font-size: 1.5rem;
  color: #0c3b5e;
`;

const PaymentMethodTitle = styled.h4`
  font-size: 1.1rem;
  color: #333;
  margin: 0;
`;

const PaymentMethodDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0;
`;

const SelectedIndicator = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: #2ecc71;
  font-size: 1.25rem;
`;

const InfoBox = styled.div`
  background-color: #fff8e1;
  border-left: 4px solid #f39c12;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
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

interface Step5PaymentProps {
  formData: any;
  program: Program | null;
  updateFormData: (data: any) => void;
}

const Step5Payment: React.FC<Step5PaymentProps> = ({ formData, program, updateFormData }) => {
  const handlePaymentMethodSelect = (method: string) => {
    updateFormData({ paymentMethod: method });
  };
  
  // Calculate application fee
  const applicationFee = program?.meta_data?.find(m => m.key === 'application_fee')?.value || '250';
  const processingFee = (5).toFixed(2); // $5 processing fee
  const total = (parseFloat(applicationFee) + parseFloat(processingFee)).toFixed(2);
  
  // Get program details
  const getAttributeValue = (name: string) => {
    const attr = program?.attributes?.find(a => a.name === name);
    return attr ? attr.options[0] : 'N/A';
  };
  
  const programLevel = getAttributeValue('Program Level');
  const duration = getAttributeValue('Duration');
  const country = getAttributeValue('Country');
  
  return (
    <StepContainer>
      <SectionTitle>
        <div className="icon-wrapper">
          <FontAwesomeIcon icon={faReceipt} />
          Tuition & Application Fee
        </div>
      </SectionTitle>
      
      <InfoBox>
        <p>
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <span>Please review your application details carefully before proceeding to payment. The application fee is non-refundable.</span>
        </p>
      </InfoBox>
      
      <ApplicationDetails>
        <SummaryTitle>
          <FontAwesomeIcon icon={faUser} />
          Application Details
        </SummaryTitle>
        
        <ApplicationDetailRow>
          <DetailIcon>
            <FontAwesomeIcon icon={faUser} />
          </DetailIcon>
          <DetailLabel>Applicant Name:</DetailLabel>
          <DetailValue>{formData.personalInfo.firstName} {formData.personalInfo.lastName}</DetailValue>
        </ApplicationDetailRow>
        
        <ApplicationDetailRow>
          <DetailIcon>
            <FontAwesomeIcon icon={faGraduationCap} />
          </DetailIcon>
          <DetailLabel>Program:</DetailLabel>
          <DetailValue>{program?.name || 'N/A'}</DetailValue>
        </ApplicationDetailRow>
        
        <ApplicationDetailRow>
          <DetailIcon>
            <FontAwesomeIcon icon={faUniversity} />
          </DetailIcon>
          <DetailLabel>Institution:</DetailLabel>
          <DetailValue>{getAttributeValue('School')}</DetailValue>
        </ApplicationDetailRow>
        
        <ApplicationDetailRow>
          <DetailIcon>
            <FontAwesomeIcon icon={faCalendarAlt} />
          </DetailIcon>
          <DetailLabel>Duration:</DetailLabel>
          <DetailValue>{duration}</DetailValue>
        </ApplicationDetailRow>
        
        <ApplicationDetailRow>
          <DetailIcon>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </DetailIcon>
          <DetailLabel>Location:</DetailLabel>
          <DetailValue>{country}</DetailValue>
        </ApplicationDetailRow>
      </ApplicationDetails>
      
      <PaymentSummary>
        <SummaryTitle>
          <FontAwesomeIcon icon={faMoneyBillWave} />
          Payment Summary
        </SummaryTitle>
        
        <SummaryRow>
          <SummaryLabel>Application Fee</SummaryLabel>
          <SummaryValue>${applicationFee}</SummaryValue>
        </SummaryRow>
        
        <SummaryRow>
          <SummaryLabel>Processing Fee</SummaryLabel>
          <SummaryValue>${processingFee}</SummaryValue>
        </SummaryRow>
        
        <SummaryRow>
          <SummaryLabel>Total</SummaryLabel>
          <SummaryValue>${total}</SummaryValue>
        </SummaryRow>
      </PaymentSummary>
      
      <SectionTitle>
        <div className="icon-wrapper">
          <FontAwesomeIcon icon={faCreditCard} />
          Select Payment Method
        </div>
      </SectionTitle>
      
      <PaymentMethodsContainer>
        <PaymentMethodCard 
          selected={formData.paymentMethod === 'credit-card'} 
          onClick={() => handlePaymentMethodSelect('credit-card')}
        >
          <PaymentMethodHeader>
            <PaymentMethodIcon>
              <FontAwesomeIcon icon={faCreditCard} />
            </PaymentMethodIcon>
            <div>
              <PaymentMethodTitle>Credit/Debit Card</PaymentMethodTitle>
              <PaymentMethodDescription>Pay securely with your card</PaymentMethodDescription>
            </div>
          </PaymentMethodHeader>
          {formData.paymentMethod === 'credit-card' && (
            <SelectedIndicator>
              <FontAwesomeIcon icon={faCheckCircle} />
            </SelectedIndicator>
          )}
        </PaymentMethodCard>
        
        <PaymentMethodCard 
          selected={formData.paymentMethod === 'bank-transfer'} 
          onClick={() => handlePaymentMethodSelect('bank-transfer')}
        >
          <PaymentMethodHeader>
            <PaymentMethodIcon>
              <FontAwesomeIcon icon={faUniversity} />
            </PaymentMethodIcon>
            <div>
              <PaymentMethodTitle>Bank Transfer</PaymentMethodTitle>
              <PaymentMethodDescription>Pay via bank transfer</PaymentMethodDescription>
            </div>
          </PaymentMethodHeader>
          {formData.paymentMethod === 'bank-transfer' && (
            <SelectedIndicator>
              <FontAwesomeIcon icon={faCheckCircle} />
            </SelectedIndicator>
          )}
        </PaymentMethodCard>
        
        <PaymentMethodCard 
          selected={formData.paymentMethod === 'cash'} 
          onClick={() => handlePaymentMethodSelect('cash')}
        >
          <PaymentMethodHeader>
            <PaymentMethodIcon>
              <FontAwesomeIcon icon={faMoneyBillWave} />
            </PaymentMethodIcon>
            <div>
              <PaymentMethodTitle>Cash at Office</PaymentMethodTitle>
              <PaymentMethodDescription>Pay in-person at one of our offices</PaymentMethodDescription>
            </div>
          </PaymentMethodHeader>
          {formData.paymentMethod === 'cash' && (
            <SelectedIndicator>
              <FontAwesomeIcon icon={faCheckCircle} />
            </SelectedIndicator>
          )}
        </PaymentMethodCard>
      </PaymentMethodsContainer>
      
      {formData.paymentMethod === 'bank-transfer' && (
        <InfoBox>
          <p>
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span>After submitting your application, you will receive bank details for transferring the application fee.</span>
          </p>
        </InfoBox>
      )}
      
      {formData.paymentMethod === 'cash' && (
        <InfoBox>
          <p>
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <span>Your application will be held for 7 days pending payment at one of our offices. Please bring your application reference number.</span>
          </p>
        </InfoBox>
      )}
    </StepContainer>
  );
};

export default Step5Payment; 