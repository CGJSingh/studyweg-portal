import axios from 'axios';

// Zoho API credentials from environment variables
const ZOHO_CLIENT_ID = process.env.REACT_APP_ZOHO_CLIENT_ID || '';
const ZOHO_CLIENT_SECRET = process.env.REACT_APP_ZOHO_CLIENT_SECRET || '';
const ZOHO_REDIRECT_URI = process.env.REACT_APP_ZOHO_REDIRECT_URI || '';
const ZOHO_ACCOUNTS_URL = 'https://accounts.zoho.com';
const ZOHO_API_URL = 'https://www.zohoapis.com/crm/v3';

// Token storage - in production, use a more secure method
let accessToken: string | null = null;
let refreshToken: string | null = null;
let tokenExpiry: number = 0;

// Get auth token (handles token refresh if needed)
export const getZohoAuthToken = async (): Promise<string> => {
  const currentTime = Date.now();
  
  // If token exists and is not expired, use it
  if (accessToken && tokenExpiry > currentTime) {
    return accessToken;
  }
  
  // If we have a refresh token, use that to get a new access token
  if (refreshToken) {
    try {
      const response = await axios.post(`${ZOHO_ACCOUNTS_URL}/oauth/v2/token`, null, {
        params: {
          refresh_token: refreshToken,
          client_id: ZOHO_CLIENT_ID,
          client_secret: ZOHO_CLIENT_SECRET,
          grant_type: 'refresh_token'
        }
      });
      
      accessToken = response.data.access_token;
      tokenExpiry = currentTime + (response.data.expires_in * 1000);
      
      if (accessToken === null) {
        throw new Error('Failed to obtain access token from Zoho');
      }
      
      return accessToken;
    } catch (error) {
      console.error('Error refreshing Zoho token:', error);
      // If refresh fails, clear tokens so we generate new ones
      accessToken = null;
      refreshToken = null;
      throw new Error('Token refresh failed. User needs to reauthorize.');
    }
  }
  
  // Otherwise, we need a new auth flow
  throw new Error('No valid authentication token. User needs to authorize application.');
};

// Generate the authorization URL
export const getZohoAuthUrl = (): string => {
  return `${ZOHO_ACCOUNTS_URL}/oauth/v2/auth?scope=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL&client_id=${ZOHO_CLIENT_ID}&response_type=code&access_type=offline&redirect_uri=${encodeURIComponent(ZOHO_REDIRECT_URI)}`;
};

// Handle the oauth callback - call this with the code from the redirect URL
export const handleZohoCallback = async (code: string): Promise<void> => {
  try {
    const response = await axios.post(`${ZOHO_ACCOUNTS_URL}/oauth/v2/token`, null, {
      params: {
        code,
        client_id: ZOHO_CLIENT_ID,
        client_secret: ZOHO_CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: ZOHO_REDIRECT_URI
      }
    });
    
    accessToken = response.data.access_token;
    refreshToken = response.data.refresh_token;
    tokenExpiry = Date.now() + (response.data.expires_in * 1000);
    
    // In a real implementation, store these securely
    if (refreshToken) {
      localStorage.setItem('zoho_refresh_token', refreshToken);
    }
    
  } catch (error) {
    console.error('Error during Zoho authentication:', error);
    throw error;
  }
};

// Initialize tokens from storage
export const initZohoTokens = (): void => {
  const storedToken = localStorage.getItem('zoho_refresh_token');
  if (storedToken) {
    refreshToken = storedToken;
  }
};

// Types for Zoho submission data
export interface StudentLead {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country?: string;
  educationLevel?: string;
  interestedProgram?: string;
  notes?: string;
}

export interface StudentApplication {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  address?: string;
  city?: string;
  postalCode?: string;
  educationLevel: string;
  currentInstitution?: string;
  programOfInterest: string;
  startDate?: string;
  documents?: string[];
}

// Submit lead to Zoho CRM
export const submitLeadToZoho = async (lead: StudentLead): Promise<boolean> => {
  try {
    const token = await getZohoAuthToken();
    
    const payload = {
      data: [
        {
          Last_Name: lead.lastName,
          First_Name: lead.firstName,
          Email: lead.email,
          Phone: lead.phone || '',
          Lead_Source: 'Website',
          Lead_Status: 'Not Contacted',
          Description: `Interest: ${lead.educationLevel || 'Not specified'}`,
          Country: lead.country || ''
        }
      ]
    };
    
    const response = await axios.post(
      `${ZOHO_API_URL}/Leads`,
      payload,
      {
        headers: {
          'Authorization': `Zoho-oauthtoken ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data.data[0].status === 'success';
  } catch (error) {
    console.error('Error submitting lead to Zoho:', error);
    return false;
  }
};

// Submit full application to Zoho CRM
export const submitApplicationToZoho = async (application: StudentApplication): Promise<boolean> => {
  try {
    const token = await getZohoAuthToken();
    
    // First create or update the contact
    const contactPayload = {
      data: [
        {
          Last_Name: application.lastName,
          First_Name: application.firstName,
          Email: application.email,
          Phone: application.phone || '',
          Mailing_Country: application.country || '',
          Description: `Education Level: ${application.educationLevel || 'Not specified'}`
        }
      ]
    };
    
    // Use upsert to create or update the contact based on email
    const contactResponse = await axios.post(
      `${ZOHO_API_URL}/Contacts/upsert`,
      contactPayload,
      {
        headers: {
          'Authorization': `Zoho-oauthtoken ${token}`,
          'Content-Type': 'application/json'
        },
        params: {
          duplicate_check_fields: 'Email'
        }
      }
    );
    
    if (contactResponse.data.data[0].status !== 'success') {
      throw new Error('Failed to create or update contact');
    }
    
    // Get the contact ID from the response
    const contactId = contactResponse.data.data[0].details.id;
    
    // Now create the application record and link it to the contact
    const applicationPayload = {
      data: [
        {
          Name: `${application.firstName} ${application.lastName} - Application`,
          Contact_Name: {
            id: contactId
          },
          Status: 'New',
          Education_Level: application.educationLevel || '',
          Country_of_Interest: application.country || '',
          Program_of_Interest: application.programOfInterest || '',
          Additional_Notes: application.documents ? application.documents.join(', ') : ''
        }
      ]
    };
    
    const applicationResponse = await axios.post(
      `${ZOHO_API_URL}/Applications`,
      applicationPayload,
      {
        headers: {
          'Authorization': `Zoho-oauthtoken ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return applicationResponse.data.data[0].status === 'success';
  } catch (error) {
    console.error('Error submitting application to Zoho:', error);
    return false;
  }
}; 