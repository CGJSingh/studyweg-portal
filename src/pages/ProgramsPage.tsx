import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchPrograms, clearProgramsCache, fetchAllPrograms, isOfflineMode as checkOfflineMode, setOfflineMode } from '../services/api';
import { Program } from '../types';
import ProgramCard from '../components/ProgramCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faUser,
  faFilter,
  faSort,
  faGraduationCap,
  faMapMarkerAlt,
  faClock,
  faTag,
  faTimes,
  faChevronLeft,
  faChevronRight,
  faDollarSign,
  faUniversity
} from '@fortawesome/free-solid-svg-icons';
import { ProgramsListSkeleton } from '../components/SkeletonLoaders';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 2rem 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #fff;
  margin: 0;
  font-weight: 500;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #0c3b5e;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f39c12;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
`;

const UserEmail = styled.span`
  font-size: 0.8rem;
  opacity: 0.8;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1.5rem;
`;

const SearchFilterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
  max-width: 600px;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #f39c12;
    box-shadow: 0 0 0 2px rgba(243, 156, 18, 0.2);
  }
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  margin-bottom: 1.5rem;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#f39c12' : 'transparent'};
  color: ${props => props.active ? '#f39c12' : '#666'};
  font-weight: ${props => props.active ? '600' : '400'};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    color: #f39c12;
  }
`;

const ProgramsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #e74c3c;
  background-color: #fdeaea;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const RetryButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #2980b9;
  }
`;

const NoResultsMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
  grid-column: 1 / -1;
`;

// Update FiltersContainer for a more modern design
const FiltersContainer = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 320px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  z-index: 100;
  max-height: 80vh;
  overflow-y: auto;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`;

const FilterTitle = styled.h3`
  font-size: 1.1rem;
  color: #0c3b5e;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
`;

// Update FilterGroup for better spacing
const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.2rem;
`;

// Update FilterGroupTitle for better visibility
const FilterGroupTitle = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  color: #0c3b5e;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.3rem;
`;

// Style for checkboxes
const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
  
  input {
    cursor: pointer;
  }
`;

// Improved range slider styling
const RangeSlider = styled.input`
  width: 100%;
  margin: 0.5rem 0;
  -webkit-appearance: none;
  height: 8px;
  border-radius: 4px;
  background: #e1e1e1;
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #f39c12;
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #f39c12;
    cursor: pointer;
    border: none;
  }
`;

const ActiveFiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ActiveFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background-color: #e1f0fa;
  color: #f39c12;
  padding: 0.4rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  
  button {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f39c12;
    font-size: 0.8rem;
    padding: 0;
    margin-left: 0.25rem;
  }
`;

const ClearFiltersButton = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SortLabel = styled.span`
  font-size: 0.9rem;
  color: #0c3b5e;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 0.5rem;
`;

const PageButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 0.8rem;
  border: 1px solid ${props => props.active ? '#f39c12' : '#ddd'};
  background-color: ${props => props.active ? '#f39c12' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border-radius: 4px;
  cursor: pointer;
  font-weight: ${props => props.active ? '600' : 'normal'};
  
  &:hover {
    background-color: ${props => props.active ? '#f39c12' : '#f7f7f7'};
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const PageInfo = styled.div`
  margin: 0 1rem;
  color: #666;
  font-size: 0.9rem;
`;

// Add these styled components after the existing styled components
const SuggestionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 300px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const SuggestionItem = styled.div`
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  
  &:hover {
    background-color: #f5f7fa;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const SuggestionHighlight = styled.span`
  font-weight: 600;
  color: #f39c12;
`;

const SuggestionCategory = styled.span`
  font-size: 0.8rem;
  color: #666;
  margin-left: 0.5rem;
  padding: 0.2rem 0.5rem;
  background-color: #f0f0f0;
  border-radius: 4px;
`;

const NoSuggestions = styled.div`
  padding: 0.75rem 1rem;
  color: #666;
  font-style: italic;
`;

// Add a new FilterButton style
const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f39c12;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.25rem;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #e08e0b;
  }
`;

// Add a new range filter component
const RangeFilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const RangeInputs = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const RangeInput = styled.input`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: #f39c12;
  }
`;

// Add FilterSelect back
const FilterSelect = styled.select`
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #f39c12;
  }
`;

// Define program types
type ProgramType = 'bachelors' | 'diploma' | 'masters' | 'phd' | 'certificate';

// Define tab types
type TabType = 'all' | 'top' | 'fast' | 'intake';

// Define sort options
type SortOption = 'default' | 'name-asc' | 'name-desc' | 'level-asc' | 'level-desc' | 'fee-asc' | 'fee-desc' | 'rating-asc' | 'rating-desc';

const OfflineNotice = styled.div`
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const OfflineLabel = styled.span`
  font-weight: 600;
  color: #f39c12;
  margin-right: 0.5rem;
`;

const ProgramsPage: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [programsPerPage] = useState<number>(12); // Show 12 programs per page
  
  // New state for filters and sorting
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filterOptions, setFilterOptions] = useState<{
    levels: string[];
    durations: string[];
    countries: string[];
    categories: string[];
    universities: string[];
  }>({
    levels: [],
    durations: [],
    countries: [],
    categories: [],
    universities: []
  });
  
  // Program types checkbox state
  const [programTypes, setProgramTypes] = useState<{
    bachelors: boolean;
    diploma: boolean;
    masters: boolean;
    phd: boolean;
    certificate: boolean;
  }>({
    bachelors: false,
    diploma: false,
    masters: false,
    phd: false,
    certificate: false
  });
  
  // Fee range slider state
  const [feeRange, setFeeRange] = useState<{
    min: number;
    max: number;
    currentMin: number;
    currentMax: number;
  }>({
    min: 0,
    max: 100000,
    currentMin: 0,
    currentMax: 100000
  });
  
  const [filters, setFilters] = useState<{
    level: string;
    duration: string;
    country: string;
    category: string;
    university: string;
    feeMin: string;
    feeMax: string;
  }>({
    level: '',
    duration: '',
    country: '',
    category: '',
    university: '',
    feeMin: '',
    feeMax: ''
  });
  const [sortOption, setSortOption] = useState<SortOption>('default');
  
  // Add these new state variables
  const [suggestions, setSuggestions] = useState<Array<{
    id: number;
    text: string;
    type: 'program' | 'college' | 'description';
  }>>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);

  // Check offline mode from localStorage on component mount
  useEffect(() => {
    try {
      const offlineStatus = checkOfflineMode();
      if (offlineStatus) {
        setIsOfflineMode(true);
        console.log('App started in offline mode');
      }
    } catch (err) {
      console.error('Error checking offline mode:', err);
    }
  }, []);

  // Extract loadPrograms outside useEffect
  const loadPrograms = async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      setIsOfflineMode(false); // Reset offline mode flag
      console.log('Fetching programs for page:', currentPage);
      
      // Build extra parameters based on active filters
      const extraParams: Record<string, string> = {};
      
      // Add filter parameters to the API call
      if (filters.level) extraParams['filter[program_level]'] = filters.level;
      if (filters.duration) extraParams['filter[duration]'] = filters.duration;
      if (filters.country) extraParams['filter[country]'] = filters.country;
      if (filters.category) extraParams['filter[category]'] = filters.category;
      if (filters.university) extraParams['filter[university]'] = filters.university;
      if (filters.feeMin) extraParams['filter[min_price]'] = filters.feeMin;
      if (filters.feeMax) extraParams['filter[max_price]'] = filters.feeMax;
      
      // Add program type filters if any are active
      const activeTypes = Object.entries(programTypes)
        .filter(([_, isActive]) => isActive)
        .map(([type]) => type);
        
      if (activeTypes.length > 0) {
        extraParams['filter[program_types]'] = activeTypes.join(',');
      }
      
      // Add search query if present
      if (searchQuery) {
        extraParams['search'] = searchQuery;
      }
      
      // Add tab filter if needed
      if (activeTab !== 'all') {
        extraParams['filter[tag]'] = activeTab === 'top' ? 'top program' : 
                                   activeTab === 'fast' ? 'fast acceptance' : 'intake offer';
      }
      
      // First, fetch the paginated data for display with filters applied
      const result = await fetchPrograms(currentPage, {
        extraParams,
        forceRefresh: true // Force refresh to ensure we get fresh data with the filters
      });
      
      if (result.programs.length === 0) {
        console.warn('No programs received for the current page');
      } else {
        console.log('Received programs:', result.programs.length);
        
        // Debug - check structure of the first program
        if (result.programs.length > 0) {
          console.log('First program structure:', JSON.stringify(result.programs[0], null, 2));
        }
      }
      
      setPrograms(result.programs);
      setFilteredPrograms(result.programs);
      setTotalPages(result.totalPages);
      
      // Then, fetch all programs to extract comprehensive filter options (only if needed)
      try {
        // Only load all programs for filter options if we haven't already
        if (filterOptions.levels.length === 0 || filterOptions.countries.length === 0) {
          const allPrograms = await fetchAllPrograms();
          console.log('Fetched all programs for filters:', allPrograms.length);
          
          // Extract filter options from all programs
          const levels = new Set<string>();
          const durations = new Set<string>();
          const countries = new Set<string>();
          const categories = new Set<string>();
          const universities = new Set<string>();
          
          allPrograms.forEach(program => {
            // Extract levels
            const level = program.attributes?.find(attr => attr.name === "Program Level")?.options[0];
            if (level) levels.add(level);
            
            // Extract durations
            const duration = program.attributes?.find(attr => attr.name === "Duration")?.options[0];
            if (duration) durations.add(duration);
            
            // Extract countries from both attribute and meta_data
            if (program.attributes?.find(attr => attr.name === "Country")?.options[0]) {
              const countryAttr = program.attributes?.find(attr => attr.name === "Country" || attr.name === "pa_country")?.options[0];
              if (countryAttr) {
                countries.add(countryAttr);
                console.log('Added country from attribute:', countryAttr);
              }
            }
            
            if (program.institution?.location) {
              countries.add(program.institution.location);
              console.log('Added country from institution:', program.institution.location);
            } else {
              // Try to find location from meta_data if institution object is not available
              const locationMeta = program.meta_data?.find(meta => 
                meta.key === '_institution_location' || 
                meta.key === 'institution_location'
              );
              if (locationMeta && locationMeta.value) {
                countries.add(locationMeta.value);
                console.log('Added country from meta_data:', locationMeta.value);
              }
            }
            
            // Extract universities from both attribute and meta_data
            if (program.attributes?.find(attr => attr.name === "School")?.options[0]) {
              const schoolAttr = program.attributes?.find(attr => attr.name === "School" || attr.name === "pa_school")?.options[0];
              if (schoolAttr) {
                universities.add(schoolAttr);
                console.log('Added university from attribute:', schoolAttr);
              }
            }
            
            if (program.institution?.name) {
              universities.add(program.institution.name);
              console.log('Added university from institution:', program.institution.name);
            } else {
              // Try to find institution name from meta_data if institution object is not available
              const institutionMeta = program.meta_data?.find(meta => 
                meta.key === '_institution_name' || 
                meta.key === 'institution_name'
              );
              if (institutionMeta && institutionMeta.value) {
                universities.add(institutionMeta.value);
                console.log('Added university from meta_data:', institutionMeta.value);
              }
            }
            
            // Extract categories
            program.categories.forEach(category => {
              categories.add(category.name);
            });
          });
          
          const filterOpts = {
            levels: Array.from(levels),
            durations: Array.from(durations),
            countries: Array.from(countries),
            categories: Array.from(categories),
            universities: Array.from(universities)
          };
          
          console.log('Filter options generated:', filterOpts);
          setFilterOptions(filterOpts);
        }
      } catch (filterError) {
        console.error('Error fetching filter options:', filterError);
        // If we fail to fetch all programs for filters, check if we're in offline mode
        try {
          const offlineStatus = checkOfflineMode();
          if (offlineStatus) {
            setIsOfflineMode(true);
            console.log('Setting offline mode based on localStorage flag');
          }
        } catch (err) {
          console.error('Error checking offline mode:', err);
        }
      }
    } catch (mainError) {
      console.error('Error in main data fetch:', mainError);
      setError('Failed to load program data. Using sample data instead.');
      setIsOfflineMode(true);
      setOfflineMode(true); // Set the offline mode flag in localStorage
      // Set empty programs to avoid undefined errors if no fallback
      setPrograms([]);
      setFilteredPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  // Add this function for retrying
  const handleRetry = () => {
    setLoading(true);
    setError(null);
    clearProgramsCache(); // Clear cache to ensure fresh data
    try {
      setOfflineMode(false); // Attempt to exit offline mode
    } catch (err) {
      console.error('Error clearing offline mode:', err);
    }
    loadPrograms(); // Call loadPrograms directly
  };

  // Update useEffect to use the extracted function
  useEffect(() => {
    loadPrograms();
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  // Modified useEffect for filter and search changes to reload data
  useEffect(() => {
    // When filters or search change, reset to page 1 and reload data
    if (currentPage === 1) {
      // Already on page 1, just reload
      loadPrograms();
    } else {
      // Not on page 1, need to reset page which will trigger the other useEffect
      setCurrentPage(1);
    }
  }, [searchQuery, activeTab, filters, sortOption, programTypes]);  // eslint-disable-line react-hooks/exhaustive-deps

  // Keep the existing filter effect for client-side filtering
  useEffect(() => {
    // Filter programs based on search and filters
    let filtered = [...programs];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(program => 
        program.name.toLowerCase().includes(query) || 
        program.description.toLowerCase().includes(query) || 
        program.short_description.toLowerCase().includes(query)
      );
    }
    
    // Apply tab filter
    if (activeTab === 'top') {
      filtered = filtered.filter(program => 
        program.tags.some(tag => tag.name.toLowerCase() === 'top program')
      );
    } else if (activeTab === 'fast') {
      filtered = filtered.filter(program => 
        program.tags.some(tag => tag.name.toLowerCase() === 'fast acceptance')
      );
    } else if (activeTab === 'intake') {
      filtered = filtered.filter(program => 
        program.tags.some(tag => tag.name.toLowerCase() === 'intake offer')
      );
    }
    
    // Apply program type filters
    const activeTypes = Object.entries(programTypes)
      .filter(([_, isActive]) => isActive)
      .map(([type]) => type);
      
    if (activeTypes.length > 0) {
      filtered = filtered.filter(program => {
        const programLevel = program.attributes?.find(attr => attr.name === "Program Level")?.options[0]?.toLowerCase() || '';
        
        return activeTypes.some(type => {
          switch (type) {
            case 'bachelors':
              return programLevel.includes('bachelor') || programLevel.includes('undergraduate');
            case 'diploma':
              return programLevel.includes('diploma') || programLevel.includes('certificate');
            case 'masters':
              return programLevel.includes('master') || programLevel.includes('graduate');
            case 'phd':
              return programLevel.includes('phd') || programLevel.includes('doctorate');
            case 'certificate':
              return programLevel.includes('certificate') || programLevel.includes('short');
            default:
              return false;
          }
        });
      });
    }
    
    // Apply additional filters
    if (filters.level) {
      filtered = filtered.filter(program => 
        program.attributes?.some(attr => 
          attr.name === "Program Level" && attr.options.includes(filters.level)
        )
      );
    }
    
    if (filters.duration) {
      filtered = filtered.filter(program => 
        program.attributes?.some(attr => 
          attr.name === "Duration" && attr.options.includes(filters.duration)
        )
      );
    }
    
    if (filters.country) {
      filtered = filtered.filter(program => {
        // Check if country matches from institution object
        if (program.institution?.location === filters.country) {
          return true;
        }
        
        // If not found in institution object, check meta_data
        const locationMeta = program.meta_data?.find(meta => 
          meta.key === '_institution_location' || 
          meta.key === 'institution_location'
        );
        return locationMeta?.value === filters.country;
      });
    }
    
    if (filters.category) {
      filtered = filtered.filter(program => 
        program.categories.some(cat => cat.name === filters.category)
      );
    }
    
    // Apply university filter
    if (filters.university) {
      filtered = filtered.filter(program => {
        // Check if university matches from institution object
        if (program.institution?.name === filters.university) {
          return true;
        }
        
        // If not found in institution object, check meta_data
        const institutionMeta = program.meta_data?.find(meta => 
          meta.key === '_institution_name' || 
          meta.key === 'institution_name'
        );
        return institutionMeta?.value === filters.university;
      });
    }
    
    // Apply fee range filter
    if (filters.feeMin || filters.feeMax) {
      filtered = filtered.filter(program => {
        const price = parseFloat(program.regular_price || program.sale_price || '0');
        const minOk = !filters.feeMin || price >= parseFloat(filters.feeMin);
        const maxOk = !filters.feeMax || price <= parseFloat(filters.feeMax);
        return minOk && maxOk;
      });
    }
    
    // Apply sorting
    if (sortOption === 'name-asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'name-desc') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === 'level-asc' || sortOption === 'level-desc') {
      filtered.sort((a, b) => {
        const levelA = a.attributes?.find(attr => attr.name === "Program Level")?.options[0] || '';
        const levelB = b.attributes?.find(attr => attr.name === "Program Level")?.options[0] || '';
        
        return sortOption === 'level-asc' 
          ? levelA.localeCompare(levelB) 
          : levelB.localeCompare(levelA);
      });
    } else if (sortOption === 'fee-asc' || sortOption === 'fee-desc') {
      filtered.sort((a, b) => {
        // Extract price from regular_price or sale_price attribute, defaulting to 0
        const feeA = parseFloat(a.regular_price || a.sale_price || '0');
        const feeB = parseFloat(b.regular_price || b.sale_price || '0');
        
        return sortOption === 'fee-asc' 
          ? feeA - feeB 
          : feeB - feeA;
      });
    } else if (sortOption === 'rating-asc' || sortOption === 'rating-desc') {
      filtered.sort((a, b) => {
        // Extract rating from the attributes, defaulting to 0
        const ratingA = parseFloat(a.attributes?.find(attr => attr.name === "Rating")?.options[0] || '0');
        const ratingB = parseFloat(b.attributes?.find(attr => attr.name === "Rating")?.options[0] || '0');
        
        return sortOption === 'rating-asc' 
          ? ratingA - ratingB 
          : ratingB - ratingA;
      });
    }
    
    setFilteredPrograms(filtered);
  }, [searchQuery, activeTab, filters, sortOption, programs, programTypes]);

  // Add this new useEffect to generate suggestions based on search query
  useEffect(() => {
    if (!searchQuery || searchQuery.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const newSuggestions: Array<{
      id: number;
      text: string;
      type: 'program' | 'college' | 'description';
    }> = [];
    
    // Limit to 10 suggestions total
    const maxSuggestions = 10;
    
    // Add program name suggestions
    programs.forEach(program => {
      if (newSuggestions.length >= maxSuggestions) return;
      
      const name = program.name;
      if (name.toLowerCase().includes(query)) {
        newSuggestions.push({
          id: program.id,
          text: name,
          type: 'program'
        });
      }
    });
    
    // Add college/institution suggestions
    const collegesAdded = new Set<string>();
    programs.forEach(program => {
      if (newSuggestions.length >= maxSuggestions) return;
      
      if (program.institution?.name) {
        const college = program.institution.name;
        if (
          college.toLowerCase().includes(query) && 
          !collegesAdded.has(college.toLowerCase())
        ) {
          collegesAdded.add(college.toLowerCase());
          newSuggestions.push({
            id: program.id,
            text: college,
            type: 'college'
          });
        }
      }
    });
    
    // Add short descriptions that match
    programs.forEach(program => {
      if (newSuggestions.length >= maxSuggestions) return;
      
      const description = program.short_description;
      if (
        description && 
        description.toLowerCase().includes(query) &&
        description.length > 10
      ) {
        // Trim the description to a reasonable length
        const truncatedDesc = description.length > 50 
          ? description.substring(0, 50) + '...'
          : description;
          
        newSuggestions.push({
          id: program.id,
          text: truncatedDesc,
          type: 'description'
        });
      }
    });
    
    setSuggestions(newSuggestions);
    setShowSuggestions(newSuggestions.length > 0);
  }, [searchQuery, programs]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to page 1 when searching
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to page 1 when changing tabs
  };
  
  // New handlers for filters and sorting
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1); // Reset to page 1 when changing filters
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as SortOption);
    setCurrentPage(1); // Reset to page 1 when changing sort
  };
  
  const clearFilter = (filterType: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: ''
    }));
  };
  
  const clearAllFilters = () => {
    setFilters({
      level: '',
      duration: '',
      country: '',
      category: '',
      university: '',
      feeMin: '',
      feeMax: ''
    });
    
    // Reset program types
    setProgramTypes({
      bachelors: false,
      diploma: false,
      masters: false,
      phd: false,
      certificate: false
    });
    
    // Reset fee range
    setFeeRange({
      ...feeRange,
      currentMin: feeRange.min,
      currentMax: feeRange.max
    });
    
    setSortOption('default');
  };
  
  // Handle program type checkbox changes
  const handleProgramTypeChange = (type: ProgramType, checked: boolean) => {
    setProgramTypes(prev => ({
      ...prev,
      [type]: checked
    }));
    setCurrentPage(1);
  };
  
  // Handle fee range slider changes
  const handleFeeRangeChange = (type: 'min' | 'max', value: number) => {
    setFeeRange(prev => ({
      ...prev,
      [type === 'min' ? 'currentMin' : 'currentMax']: value
    }));
    
    // Update the filter values
    setFilters(prev => ({
      ...prev,
      [type === 'min' ? 'feeMin' : 'feeMax']: value.toString()
    }));
    
    setCurrentPage(1);
  };
  
  // Handle fee range changes
  const handleFeeMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters(prev => ({
      ...prev,
      feeMin: value
    }));
    setFeeRange(prev => ({
      ...prev,
      currentMin: value ? parseInt(value) : 0
    }));
    setCurrentPage(1);
  };

  const handleFeeMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters(prev => ({
      ...prev,
      feeMax: value
    }));
    setFeeRange(prev => ({
      ...prev,
      currentMax: value ? parseInt(value) : feeRange.max
    }));
    setCurrentPage(1);
  };

  const handleUniversityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({
      ...prev,
      university: e.target.value
    }));
    setCurrentPage(1);
  };
  
  // Get active filter count
  const activeFilterCount = Object.values(filters).filter(value => value !== '').length;

  // Function to handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setLoading(true); // Set loading to true when changing pages
    // No need to clear cache here as we'll force refresh in loadPrograms
    window.scrollTo(0, 0); // Scroll to top when changing page
  };

  // Get current programs for the current page - we'll directly use the filtered programs
  // instead of slicing, since the API is already returning paginated data
  const getCurrentPagePrograms = () => {
    // When using API pagination, simply return the filtered programs
    // since the API already returns the right page
    return filteredPrograms;
  };

  // Calculate page numbers for pagination display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 5;
    
    if (totalPages <= maxPageButtons) {
      // If we have fewer pages than max buttons, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show a sliding window of page numbers centered around current page
      let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
      let endPage = startPage + maxPageButtons - 1;
      
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxPageButtons + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    
    return pageNumbers;
  };

  // Add this function to handle selecting a suggestion
  const handleSelectSuggestion = (suggestion: { id: number; text: string; type: string }) => {
    if (suggestion.type === 'program' || suggestion.type === 'college') {
      setSearchQuery(suggestion.text);
    } else {
      // For descriptions, we set a shorter version as the search query
      const words = suggestion.text.split(' ');
      const shortQuery = words.slice(0, 3).join(' ');
      setSearchQuery(shortQuery);
    }
    setShowSuggestions(false);
  };
  
  // Add this function to hide suggestions when clicking outside
  const handleClickOutside = () => {
    setShowSuggestions(false);
  };

  if (loading) {
    return <ProgramsListSkeleton />;
  }

  if (error) {
    return (
      <PageContainer>
        {isOfflineMode && (
          <OfflineNotice>
            <div>
              <OfflineLabel>Offline Mode:</OfflineLabel>
              You're viewing limited program data because we couldn't connect to the server. 
              Some features may be unavailable.
            </div>
            <RetryButton onClick={handleRetry}>
              Try Again
            </RetryButton>
          </OfflineNotice>
        )}
        <ErrorMessage>
          <div>{error}</div>
          <div>There was a problem connecting to the server. Please check your network connection.</div>
          <RetryButton onClick={handleRetry}>
            Retry
          </RetryButton>
        </ErrorMessage>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {isOfflineMode && (
        <OfflineNotice>
          <div>
            <OfflineLabel>Offline Mode:</OfflineLabel>
            You're viewing limited program data because we couldn't connect to the server. 
            Some features may be unavailable.
          </div>
          <RetryButton onClick={handleRetry}>
            Try Again
          </RetryButton>
        </OfflineNotice>
      )}
      <SearchContainer>
        <SearchFilterRow>
          <SearchInputWrapper>
            <SearchIcon>
              <FontAwesomeIcon icon={faSearch} />
            </SearchIcon>
            <SearchInput 
              type="text" 
              placeholder="Search programs, colleges, or descriptions" 
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery.length >= 2 && suggestions.length > 0 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => handleClickOutside(), 200)}
            />
          </SearchInputWrapper>
          
          <FilterButton onClick={toggleFilters}>
            <FontAwesomeIcon icon={faFilter} />
            Filter {activeFilterCount > 0 && `(${activeFilterCount})`}
          </FilterButton>
        </SearchFilterRow>
        
        {showSuggestions && (
          <SuggestionsContainer>
            {suggestions.length > 0 ? (
              suggestions.map((suggestion, index) => {
                // Highlight the matching part of the suggestion
                const query = searchQuery.toLowerCase();
                const text = suggestion.text;
                const lowerText = text.toLowerCase();
                const matchIndex = lowerText.indexOf(query);
                
                let before = '';
                let match = '';
                let after = '';
                
                if (matchIndex >= 0) {
                  before = text.substring(0, matchIndex);
                  match = text.substring(matchIndex, matchIndex + query.length);
                  after = text.substring(matchIndex + query.length);
                } else {
                  match = text; // If no direct match, show the whole text
                }
                
                return (
                  <SuggestionItem 
                    key={index} 
                    onMouseDown={() => handleSelectSuggestion(suggestion)}
                  >
                    {before}
                    <SuggestionHighlight>{match}</SuggestionHighlight>
                    {after}
                    <SuggestionCategory>
                      {suggestion.type === 'program' ? 'Program' : 
                       suggestion.type === 'college' ? 'College' : 'Description'}
                    </SuggestionCategory>
                  </SuggestionItem>
                );
              })
            ) : (
              <NoSuggestions>No suggestions found</NoSuggestions>
            )}
          </SuggestionsContainer>
        )}
        
        {showFilters && (
          <FiltersContainer>
            <FilterHeader>
              <FilterTitle>
                <FontAwesomeIcon icon={faFilter} />
                Filter & Sort Programs
              </FilterTitle>
              
              {activeFilterCount > 0 && (
                <ClearFiltersButton onClick={clearAllFilters}>
                  <FontAwesomeIcon icon={faTimes} />
                  Clear All Filters
                </ClearFiltersButton>
              )}
            </FilterHeader>
            
            {/* Sort Options */}
            <FilterGroup>
              <FilterGroupTitle>
                <FontAwesomeIcon icon={faSort} />
                Sort By
              </FilterGroupTitle>
              <FilterSelect 
                value={sortOption} 
                onChange={handleSortChange}
              >
                <option value="default">Default</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="level-asc">Level (Ascending)</option>
                <option value="level-desc">Level (Descending)</option>
                <option value="fee-asc">Fee (Lowest First)</option>
                <option value="fee-desc">Fee (Highest First)</option>
                <option value="rating-asc">Rating (Lowest First)</option>
                <option value="rating-desc">Rating (Highest First)</option>
              </FilterSelect>
            </FilterGroup>
            
            {/* Program Type Checkboxes */}
            <FilterGroup>
              <FilterGroupTitle>
                <FontAwesomeIcon icon={faGraduationCap} />
                Program Type
              </FilterGroupTitle>
              <CheckboxGroup>
                <CheckboxLabel>
                  <input 
                    type="checkbox" 
                    checked={programTypes.bachelors}
                    onChange={(e) => handleProgramTypeChange('bachelors', e.target.checked)}
                  />
                  Bachelor's Degree
                </CheckboxLabel>
                <CheckboxLabel>
                  <input 
                    type="checkbox" 
                    checked={programTypes.diploma}
                    onChange={(e) => handleProgramTypeChange('diploma', e.target.checked)}
                  />
                  Diploma Programs
                </CheckboxLabel>
                <CheckboxLabel>
                  <input 
                    type="checkbox" 
                    checked={programTypes.masters}
                    onChange={(e) => handleProgramTypeChange('masters', e.target.checked)}
                  />
                  Master's Degree
                </CheckboxLabel>
                <CheckboxLabel>
                  <input 
                    type="checkbox" 
                    checked={programTypes.phd}
                    onChange={(e) => handleProgramTypeChange('phd', e.target.checked)}
                  />
                  PhD / Doctorate
                </CheckboxLabel>
                <CheckboxLabel>
                  <input 
                    type="checkbox" 
                    checked={programTypes.certificate}
                    onChange={(e) => handleProgramTypeChange('certificate', e.target.checked)}
                  />
                  Certificate Programs
                </CheckboxLabel>
              </CheckboxGroup>
            </FilterGroup>
            
            {/* Tuition Range Filter */}
            <FilterGroup>
              <FilterGroupTitle>
                <FontAwesomeIcon icon={faDollarSign} />
                Tuition Fee Range
              </FilterGroupTitle>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>${feeRange.currentMin.toLocaleString()}</span>
                  <span>${feeRange.currentMax.toLocaleString()}</span>
                </div>
                <RangeSlider 
                  type="range"
                  min={feeRange.min}
                  max={feeRange.max}
                  value={feeRange.currentMin}
                  onChange={(e) => handleFeeRangeChange('min', parseInt(e.target.value))}
                />
                <RangeSlider 
                  type="range"
                  min={feeRange.min}
                  max={feeRange.max}
                  value={feeRange.currentMax}
                  onChange={(e) => handleFeeRangeChange('max', parseInt(e.target.value))}
                />
                <RangeInputs>
                  <RangeInput 
                    type="number" 
                    placeholder="Min" 
                    min="0"
                    value={filters.feeMin}
                    onChange={handleFeeMinChange}
                  />
                  <span>-</span>
                  <RangeInput 
                    type="number" 
                    placeholder="Max" 
                    min="0"
                    value={filters.feeMax}
                    onChange={handleFeeMaxChange}
                  />
                </RangeInputs>
              </div>
            </FilterGroup>
            
            {/* Duration Filter */}
            <FilterGroup>
              <FilterGroupTitle>
                <FontAwesomeIcon icon={faClock} />
                Duration
              </FilterGroupTitle>
              <FilterSelect 
                value={filters.duration} 
                onChange={(e) => handleFilterChange('duration', e.target.value)}
              >
                <option value="">All Durations</option>
                {filterOptions.durations.map(duration => (
                  <option key={duration} value={duration}>{duration}</option>
                ))}
              </FilterSelect>
            </FilterGroup>
            
            {/* Country Filter */}
            <FilterGroup>
              <FilterGroupTitle>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                Country
              </FilterGroupTitle>
              <FilterSelect 
                value={filters.country} 
                onChange={(e) => handleFilterChange('country', e.target.value)}
              >
                <option value="">All Countries</option>
                {filterOptions.countries.map(country => {
                  if (!country) return null; // Skip empty values
                  return (
                    <option key={country} value={country}>{country}</option>
                  );
                })}
              </FilterSelect>
              {filterOptions.countries.length === 0 && (
                <div style={{color: 'red', fontSize: '0.8rem', marginTop: '0.25rem'}}>
                  No countries available
                </div>
              )}
            </FilterGroup>
            
            {/* University Filter */}
            <FilterGroup>
              <FilterGroupTitle>
                <FontAwesomeIcon icon={faUniversity} />
                University
              </FilterGroupTitle>
              <FilterSelect 
                value={filters.university} 
                onChange={handleUniversityChange}
              >
                <option value="">All Universities</option>
                {filterOptions.universities.map(university => {
                  if (!university) return null; // Skip empty values
                  return (
                    <option key={university} value={university}>{university}</option>
                  );
                })}
              </FilterSelect>
              {filterOptions.universities.length === 0 && (
                <div style={{color: 'red', fontSize: '0.8rem', marginTop: '0.25rem'}}>
                  No universities available
                </div>
              )}
            </FilterGroup>
            
            {/* Category Filter */}
            <FilterGroup>
              <FilterGroupTitle>
                <FontAwesomeIcon icon={faTag} />
                Category
              </FilterGroupTitle>
              <FilterSelect 
                value={filters.category} 
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {filterOptions.categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </FilterSelect>
            </FilterGroup>
            
            {/* Active Filters */}
            {activeFilterCount > 0 && (
              <ActiveFiltersContainer>
                {filters.level && (
                  <ActiveFilter>
                    Level: {filters.level}
                    <button onClick={() => clearFilter('level')}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </ActiveFilter>
                )}
                
                {filters.duration && (
                  <ActiveFilter>
                    Duration: {filters.duration}
                    <button onClick={() => clearFilter('duration')}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </ActiveFilter>
                )}
                
                {filters.country && (
                  <ActiveFilter>
                    Country: {filters.country}
                    <button onClick={() => clearFilter('country')}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </ActiveFilter>
                )}
                
                {filters.university && (
                  <ActiveFilter>
                    University: {filters.university}
                    <button onClick={() => clearFilter('university')}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </ActiveFilter>
                )}
                
                {filters.category && (
                  <ActiveFilter>
                    Category: {filters.category}
                    <button onClick={() => clearFilter('category')}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </ActiveFilter>
                )}
                
                {(filters.feeMin || filters.feeMax) && (
                  <ActiveFilter>
                    Fee: {filters.feeMin ? `$${parseInt(filters.feeMin).toLocaleString()}` : '$0'} - {filters.feeMax ? `$${parseInt(filters.feeMax).toLocaleString()}` : 'Any'}
                    <button onClick={() => {
                      clearFilter('feeMin');
                      clearFilter('feeMax');
                    }}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </ActiveFilter>
                )}
                
                {Object.values(programTypes).some(Boolean) && (
                  <ActiveFilter>
                    Types: {Object.entries(programTypes)
                      .filter(([_, checked]) => checked)
                      .map(([type]) => type.charAt(0).toUpperCase() + type.slice(1))
                      .join(', ')}
                    <button onClick={() => {
                      setProgramTypes({
                        bachelors: false,
                        diploma: false,
                        masters: false,
                        phd: false,
                        certificate: false
                      });
                    }}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </ActiveFilter>
                )}
              </ActiveFiltersContainer>
            )}
            
            {/* Apply Button */}
            <FilterButton 
              style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}
              onClick={toggleFilters}
            >
              Apply Filters
            </FilterButton>
          </FiltersContainer>
        )}
      </SearchContainer>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'all'} 
          onClick={() => handleTabChange('all')}
        >
          All Programs
        </Tab>
        <Tab 
          active={activeTab === 'top'} 
          onClick={() => handleTabChange('top')}
        >
          Top Programs
        </Tab>
        <Tab 
          active={activeTab === 'fast'} 
          onClick={() => handleTabChange('fast')}
        >
          Fast Acceptance
        </Tab>
        <Tab 
          active={activeTab === 'intake'} 
          onClick={() => handleTabChange('intake')}
        >
          Intake Offer
        </Tab>
      </TabsContainer>
      
      <ProgramsGrid>
        {getCurrentPagePrograms().length > 0 ? (
          getCurrentPagePrograms().map(program => (
            <ProgramCard key={program.id} program={program} />
          ))
        ) : (
          <NoResultsMessage>
            No programs found matching your criteria. Please try a different search or filter.
          </NoResultsMessage>
        )}
      </ProgramsGrid>
      
      {/* Pagination Controls */}
      {filteredPrograms.length > 0 && (
        <PaginationContainer>
          <PageButton 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </PageButton>
          
          {getPageNumbers().map(number => (
            <PageButton
              key={number}
              active={number === currentPage}
              onClick={() => handlePageChange(number)}
              disabled={loading}
            >
              {number}
            </PageButton>
          ))}
          
          <PageButton 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages || loading}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </PageButton>
          
          <PageInfo>
            Page {currentPage} of {totalPages}
            {loading && <span style={{ marginLeft: '10px', color: '#f39c12' }}>Loading...</span>}
          </PageInfo>
        </PaginationContainer>
      )}
    </PageContainer>
  );
};

export default ProgramsPage; 