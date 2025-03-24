import axios from 'axios';
import { Program } from '../types';
import { 
  logApiError, 
  retryRequest, 
  isValidApiResponse,
  getMetaValue,
  getAttributeValue
} from '../utils/apiHelpers';
import { samplePrograms, extractFilterOptions } from '../data/sample-programs';

const API_URL = 'https://studyweg.com/wp-json/wc/v3/products';
// Add a CORS proxy server URL as fallback if we encounter CORS issues
const CORS_PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const CONSUMER_KEY = 'ck_9a7d01544fb71e45218afee6fed7f9f8a25d1b0f';
const CONSUMER_SECRET = 'cs_f18193b595778c1cc726d336247e9c908aec3370';
const PER_PAGE = 12; // Reduced from 100 to improve initial load time

// Whether to use sample data instead of real API
const USE_SAMPLE_DATA = false; // Set to true in development if API is unavailable

// Add custom axios instance with timeout and better error handling
const axiosInstance = axios.create({
  timeout: 15000, // 15 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Origin': window.location.origin
  }
});

// Create a version using CORS proxy as a fallback
const axiosProxyInstance = axios.create({
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Origin': window.location.origin,
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// Add response interceptor for better error logging
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        url: error.config.url
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API No Response Error:', {
        request: error.request,
        url: error.config.url
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Setup Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Cache for programs to reduce API calls
const programsCache = new Map<string, { programs: Program[], totalPages: number, totalCount?: number }>();

// Clear cache every 15 minutes
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

// Helper function to extract program details from meta data
const extractProgramDetails = (metaData: any[]) => {
  // Extract institution data from meta_data
  const institutionName = getMetaValue(metaData, '_institution_name') || 
                          getMetaValue(metaData, 'institution_name') || '';

  const institutionLocation = getMetaValue(metaData, '_institution_location') || 
                              getMetaValue(metaData, 'institution_location') || '';

  const institution = {
    name: institutionName,
    location: institutionLocation
  };

  const programDetails = {
    type: getMetaValue(metaData, '_program_type') || '',
    duration: getMetaValue(metaData, '_program_duration') || '',
    category: getMetaValue(metaData, '_program_category') || '',
    start_date: getMetaValue(metaData, '_program_start_date')
  };

  // Extract YouTube video URLs
  const videoUrls: string[] = [];
  
  // Look for common video metadata keys
  metaData.forEach(meta => {
    if ((typeof meta.value === 'string') && 
        (meta.key.includes('video') || meta.key.includes('youtube') || meta.key.includes('media')) &&
        (meta.value.includes('youtube.com') || meta.value.includes('youtu.be'))) {
      videoUrls.push(meta.value);
    }
  });
  
  // Also check if there's a videos array in meta_data
  const videosArray = getMetaValue(metaData, 'videos') || 
                     getMetaValue(metaData, '_videos') || 
                     getMetaValue(metaData, 'youtube_videos');
  
  if (Array.isArray(videosArray)) {
    videosArray.forEach(video => {
      if (typeof video === 'string' && (video.includes('youtube.com') || video.includes('youtu.be'))) {
        videoUrls.push(video);
      } else if (video.url && typeof video.url === 'string' && 
                (video.url.includes('youtube.com') || video.url.includes('youtu.be'))) {
        videoUrls.push(video.url);
      }
    });
  }

  return { institution, programDetails, videoUrls };
};

// Helper function to transform WooCommerce product to Program type
const transformProduct = (product: any): Program => {
  // Check if product has required properties
  if (!product || !product.meta_data) {
    console.warn('Invalid product data:', product);
    return {
      id: product?.id || 0,
      name: product?.name || 'Unknown Program',
      slug: product?.slug || '',
      permalink: product?.permalink || '',
      date_created: product?.date_created || '',
      description: product?.description || '',
      short_description: product?.short_description || '',
      price: product?.price || '',
      regular_price: product?.regular_price || '',
      sale_price: product?.sale_price || '',
      categories: product?.categories || [],
      tags: product?.tags || [],
      images: product?.images || [],
      attributes: product?.attributes || [],
      meta_data: product?.meta_data || []
    } as Program;
  }

  const { institution, programDetails, videoUrls } = extractProgramDetails(product.meta_data);

  // Also look for institution data in attributes
  const schoolName = getAttributeValue(product.attributes, 'School');
  const countryName = getAttributeValue(product.attributes, 'Country');
  
  // Merge institution data from attributes and meta_data
  const institutionObject = {
    name: institution.name || schoolName || '',
    location: institution.location || countryName || ''
  };

  // Only include institution if we have valid data
  const finalInstitutionObject = 
    (institutionObject.name || institutionObject.location) ? institutionObject : undefined;

  return {
    ...product,
    institution: finalInstitutionObject,
    program_details: programDetails.type ? programDetails : undefined,
    video_urls: videoUrls
  };
};

// Update the fetchPrograms function to accept optional parameters
export const fetchPrograms = async (
  page = 1, 
  options?: { 
    perPage?: number, 
    forceRefresh?: boolean,
    extraParams?: Record<string, string>
  }
): Promise<{ programs: Program[], totalPages: number, totalCount?: number }> => {
  const { perPage = 12, forceRefresh = false, extraParams = {} } = options || {};
  
  // Check cache first if not forcing refresh
  if (!forceRefresh && programsCache.has(`page_${page}_${perPage}`)) {
    const cachedData = programsCache.get(`page_${page}_${perPage}`);
    console.log(`Using cached data for page ${page}`);
    return cachedData!;
  }

  console.log(`Fetching programs: page ${page}, perPage ${perPage}`);
  
  try {
    // Build query parameters
    const params = new URLSearchParams({
      consumer_key: CONSUMER_KEY,
      consumer_secret: CONSUMER_SECRET,
      page: page.toString(),
      per_page: perPage.toString(),
      ...extraParams
    });
    
    const url = `${API_URL}?${params}`;
    console.log('Sending request to:', url);
    
    // Try first with direct API access
    try {
      const response = await axiosInstance.get(url);
      
      if (!response || !response.data) {
        throw new Error('No data received from API');
      }
      
      const products = response.data;
      console.log(`Received ${products.length} products from direct API`);
      
      // Process the data
      const programs = products.map(transformProduct);
      const totalPages = parseInt(response.headers['x-wp-totalpages'] || '1');
      
      // Extract total count from headers if available
      const totalCount = parseInt(response.headers['x-wp-total'] || '0');
      
      // Update cache
      const result = { programs, totalPages, totalCount };
      programsCache.set(`page_${page}_${perPage}`, result);
      
      return result;
    } catch (directError) {
      // Log the direct API error
      console.warn(`Direct API access failed:`, directError);
      
      // Try with CORS proxy as fallback
      if (CORS_PROXY_URL) {
        try {
          console.log('Trying with CORS proxy...');
          const proxyUrl = `${CORS_PROXY_URL}${API_URL}?${params}`;
          const proxyResponse = await axiosInstance.get(proxyUrl);
          
          if (!proxyResponse || !proxyResponse.data) {
            throw new Error('No data received from API via proxy');
          }
          
          const products = proxyResponse.data;
          console.log(`Received ${products.length} products via CORS proxy`);
          
          const programs = products.map(transformProduct);
          // For proxy requests, we might not have headers, so fallback to estimation
          const totalPages = parseInt(proxyResponse.headers?.['x-wp-totalpages'] || Math.ceil(products.length / perPage) || 1);
          
          // Extract total count from headers if available, otherwise estimate
          const totalCount = parseInt(proxyResponse.headers?.['x-wp-total'] || (totalPages * perPage).toString());
          
          // Update cache
          const result = { programs, totalPages, totalCount };
          programsCache.set(`page_${page}_${perPage}`, result);
          
          return result;
        } catch (proxyError) {
          console.error('CORS proxy attempt failed:', proxyError);
          // Continue to fallback
        }
      }
      
      // Fallback to sample data if we can't reach the API
      console.log('Falling back to sample data');
      
      // Use the imported samplePrograms directly instead of trying to declare it again
      const paginatedPrograms = samplePrograms.slice((page - 1) * perPage, page * perPage);
      const calculatedTotalPages = Math.ceil(samplePrograms.length / perPage);
      const totalCount = samplePrograms.length;
      
      // Set offline mode
      localStorage.setItem('studyweg_offline_mode', 'true');
      
      return { 
        programs: paginatedPrograms, 
        totalPages: calculatedTotalPages,
        totalCount
      };
    }
  } catch (error: any) {
    // Log detailed error using our helper
    logApiError('fetchPrograms', error);
    
    // Return sample data as fallback
    console.warn('Using sample data as fallback due to error');
    const start = (page - 1) * PER_PAGE;
    const end = start + PER_PAGE;
    const paginatedPrograms = samplePrograms.slice(start, end);
    const totalPages = Math.ceil(samplePrograms.length / PER_PAGE);
    const totalCount = samplePrograms.length;
    
    return {
      programs: paginatedPrograms,
      totalPages,
      totalCount
    };
  }
};

// Add the clearProgramsCache function for when filter criteria change
export const clearProgramsCache = (): void => {
  programsCache.clear();
  localStorage.removeItem('studyweg_offline_mode');
  console.log('Programs cache cleared');
};

// Add a function to set the offline mode flag
export const setOfflineMode = (isOffline: boolean): void => {
  if (isOffline) {
    localStorage.setItem('studyweg_offline_mode', 'true');
  } else {
    localStorage.removeItem('studyweg_offline_mode');
  }
};

// Check if the app is in offline mode
export const isOfflineMode = (): boolean => {
  return localStorage.getItem('studyweg_offline_mode') === 'true';
};

// Updated function to fetch all programs for filter options with sample data fallback
export const fetchAllPrograms = async (): Promise<Program[]> => {
  // Use sample data if the flag is set
  if (USE_SAMPLE_DATA) {
    console.log('Using sample data for filters instead of API');
    return samplePrograms;
  }
  
  try {
    // Use a direct fetch with larger per_page parameter
    console.log('Fetching all programs for filter options');
    
    try {
      const response = await axiosInstance.get(`${API_URL}`, {
        params: {
          consumer_key: CONSUMER_KEY,
          consumer_secret: CONSUMER_SECRET,
          per_page: 100 // Use larger page size for this specific request
        }
      });
      
      if (!isValidApiResponse(response.data)) {
        console.error('Invalid API response when fetching all programs:', response.data);
        throw new Error('Invalid API response format');
      }
      
      // Transform each product to include program details
      const programs = Array.isArray(response.data) 
        ? response.data.map(transformProduct)
        : [];
        
      console.log(`Successfully fetched ${programs.length} programs for filters`);
      
      return programs;
    } catch (directError: any) {
      // If direct API call fails, try using the CORS proxy
      console.warn('Direct API call failed for filters, trying CORS proxy:', directError.message);
      
      try {
        const proxyResponse = await axiosProxyInstance.get(`${CORS_PROXY_URL}${API_URL}`, {
          params: {
            consumer_key: CONSUMER_KEY,
            consumer_secret: CONSUMER_SECRET,
            per_page: 100 // Use larger page size for this specific request
          }
        });
        
        if (!isValidApiResponse(proxyResponse.data)) {
          console.error('Invalid API proxy response for filters:', proxyResponse.data);
          throw new Error('Invalid API response from proxy');
        }
        
        // Transform each product to include program details
        const programs = Array.isArray(proxyResponse.data) 
          ? proxyResponse.data.map(transformProduct)
          : [];
          
        console.log(`Successfully fetched ${programs.length} programs for filters using proxy`);
        
        return programs;
      } catch (proxyError: any) {
        // If proxy also fails, use sample data as last resort
        console.warn('CORS proxy failed for filters, falling back to sample data:', proxyError.message);
        return samplePrograms;
      }
    }
  } catch (error: any) {
    logApiError('fetchAllPrograms', error);
    
    // Return sample data to avoid crashing the app
    console.warn('Using sample data for filters as fallback due to error');
    return samplePrograms;
  }
};

export const fetchProgramById = async (id: number): Promise<Program> => {
  try {
    // Check if the program is in cache
    let foundProgram: Program | undefined;
    
    // Use Array.from to iterate over the Map entries
    Array.from(programsCache.entries()).forEach(([key, value]) => {
      // Search for the program in the programs array of this cache entry
      const program = value.programs.find((p: Program) => p.id === id);
      if (program) {
        foundProgram = program;
      }
    });
    
    if (foundProgram) {
      console.log('Using cached program for id', id);
      return foundProgram;
    }
    
    console.log('Fetching program from API for id', id);
    
    // Use retry utility for better resilience
    const response = await retryRequest(() => 
      axiosInstance.get(`${API_URL}/${id}`, {
        params: {
          consumer_key: CONSUMER_KEY,
          consumer_secret: CONSUMER_SECRET
        }
      })
    );
    
    // Transform the product to include program details
    return transformProduct(response.data);
  } catch (error: any) {
    logApiError('fetchProgramById', error);
    
    // Try to find the program in sample data
    const sampleProgram = samplePrograms.find(p => p.id === id);
    if (sampleProgram) {
      console.log('Returning program from sample data');
      return sampleProgram;
    }
    
    // Return a default program to avoid crashing the app
    throw new Error(`Could not fetch program with ID ${id}`);
  }
}; 