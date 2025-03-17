import axios from 'axios';
import { Program } from '../types';

const API_URL = 'https://studyweg.com/wp-json/wc/v3/products';
const CONSUMER_KEY = 'ck_9a7d01544fb71e45218afee6fed7f9f8a25d1b0f';
const CONSUMER_SECRET = 'cs_f18193b595778c1cc726d336247e9c908aec3370';
const PER_PAGE = 12; // Reduced from 100 to improve initial load time

// Cache for programs to reduce API calls
let programsCache: {
  [page: number]: Program[];
  totalPages?: number;
  lastFetched?: number;
} = {};

// Clear cache every 15 minutes
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

// Helper function to extract program details from meta data
const extractProgramDetails = (metaData: any[]) => {
  // Extract institution data from meta_data
  const institutionName = metaData.find(meta => 
    meta.key === '_institution_name' || 
    meta.key === 'institution_name'
  )?.value || '';

  const institutionLocation = metaData.find(meta => 
    meta.key === '_institution_location' || 
    meta.key === 'institution_location'
  )?.value || '';

  const institution = {
    name: institutionName,
    location: institutionLocation
  };

  const programDetails = {
    type: metaData.find(meta => meta.key === '_program_type')?.value || '',
    duration: metaData.find(meta => meta.key === '_program_duration')?.value || '',
    category: metaData.find(meta => meta.key === '_program_category')?.value || '',
    start_date: metaData.find(meta => meta.key === '_program_start_date')?.value
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
  const videosArray = metaData.find(meta => 
    meta.key === 'videos' || meta.key === '_videos' || meta.key === 'youtube_videos'
  )?.value;
  
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
  const { institution, programDetails, videoUrls } = extractProgramDetails(product.meta_data);

  // Only create institution object if we have valid data
  const institutionObject = (institution.name || institution.location) ? institution : undefined;

  return {
    ...product,
    institution: institutionObject,
    program_details: programDetails.type ? programDetails : undefined,
    video_urls: videoUrls
  };
};

export const fetchPrograms = async (page = 1): Promise<{ programs: Program[], totalPages: number }> => {
  try {
    // Check if we have a valid cache
    const now = Date.now();
    const cacheIsValid = programsCache[page] && 
                        programsCache.lastFetched && 
                        (now - programsCache.lastFetched < CACHE_DURATION);
    
    if (cacheIsValid && programsCache.totalPages) {
      console.log('Using cached programs for page', page);
      return {
        programs: programsCache[page],
        totalPages: programsCache.totalPages
      };
    }
    
    console.log('Fetching programs from API for page', page);
    
    // If cache is invalid, fetch from API - use the direct URL from the user
    const response = await axios.get(`${API_URL}`, {
      params: {
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET,
        per_page: PER_PAGE,
        page
      }
    });
    
    // Extract total pages from headers
    const totalPages = parseInt(response.headers['x-wp-totalpages'] || '1', 10);
    
    // Transform each product to include program details
    const programs = response.data.map(transformProduct);
    
    // Log the first program for debugging
    if (programs.length > 0) {
      console.log('First program after transformation:', programs[0].id, programs[0].name);
      console.log('Institution data:', programs[0].institution);
    }
    
    // Update cache
    programsCache[page] = programs;
    programsCache.totalPages = totalPages;
    programsCache.lastFetched = now;
    
    return {
      programs,
      totalPages
    };
  } catch (error) {
    console.error('Error fetching programs:', error);
    throw error;
  }
};

// Clear cache function for when data might be stale
export const clearProgramsCache = () => {
  programsCache = {};
  console.log('Programs cache cleared');
};

// Add a new function to fetch all programs for full filter options
export const fetchAllPrograms = async (): Promise<Program[]> => {
  try {
    // Clear cache to ensure fresh data
    clearProgramsCache();
    
    // First, get the first page and total pages count
    const firstPageResult = await fetchPrograms(1);
    const { totalPages } = firstPageResult;
    let allPrograms = [...firstPageResult.programs];
    
    // If there are more pages, fetch them concurrently
    if (totalPages > 1) {
      const remainingPagePromises = [];
      for (let page = 2; page <= totalPages; page++) {
        remainingPagePromises.push(fetchPrograms(page));
      }
      
      const remainingPagesResults = await Promise.all(remainingPagePromises);
      remainingPagesResults.forEach(result => {
        allPrograms = [...allPrograms, ...result.programs];
      });
    }
    
    return allPrograms;
  } catch (error) {
    console.error('Error fetching all programs:', error);
    throw error;
  }
};

export const fetchProgramById = async (id: number): Promise<Program> => {
  try {
    // Check if the program is in cache
    for (const page in programsCache) {
      if (page !== 'lastFetched' && page !== 'totalPages') {
        const program = programsCache[page as any].find(p => p.id === id);
        if (program) {
          console.log('Using cached program for id', id);
          return program;
        }
      }
    }
    
    console.log('Fetching program from API for id', id);
    
    // If not in cache, fetch from API
    const response = await axios.get(`${API_URL}/${id}`, {
      params: {
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET
      }
    });
    
    // Transform the product to include program details
    return transformProduct(response.data);
  } catch (error) {
    console.error(`Error fetching program with id ${id}:`, error);
    throw error;
  }
}; 