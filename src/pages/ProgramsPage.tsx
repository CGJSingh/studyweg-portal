import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchPrograms, clearProgramsCache } from '../services/api';
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
  faChevronRight
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
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 1.5rem;
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
  border-radius: 4px;
`;

const NoResultsMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
  grid-column: 1 / -1;
`;

// New styled components for filtering
const FiltersContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const FilterTitle = styled.h3`
  font-size: 1rem;
  color: #0c3b5e;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FilterOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterGroupTitle = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  color: #0c3b5e;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

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

// Define tab types
type TabType = 'all' | 'top' | 'fast' | 'intake';

// Define sort options
type SortOption = 'default' | 'name-asc' | 'name-desc' | 'level-asc' | 'level-desc';

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
  }>({
    levels: [],
    durations: [],
    countries: [],
    categories: []
  });
  const [filters, setFilters] = useState<{
    level: string;
    duration: string;
    country: string;
    category: string;
  }>({
    level: '',
    duration: '',
    country: '',
    category: ''
  });
  const [sortOption, setSortOption] = useState<SortOption>('default');
  
  // Add these new state variables
  const [suggestions, setSuggestions] = useState<Array<{
    id: number;
    text: string;
    type: 'program' | 'college' | 'description';
  }>>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        setLoading(true);
        console.log('Fetching programs for page:', currentPage);
        const result = await fetchPrograms(currentPage);
        console.log('Received programs:', result.programs.length);
        setPrograms(result.programs);
        setFilteredPrograms(result.programs);
        setTotalPages(result.totalPages);
        
        // Extract filter options
        const levels = new Set<string>();
        const durations = new Set<string>();
        const countries = new Set<string>();
        const categories = new Set<string>();
        
        result.programs.forEach(program => {
          // Extract levels
          const level = program.attributes?.find(attr => attr.name === "Program Level")?.options[0];
          if (level) levels.add(level);
          
          // Extract durations
          const duration = program.attributes?.find(attr => attr.name === "Duration")?.options[0];
          if (duration) durations.add(duration);
          
          // Extract countries
          if (program.institution?.location) {
            countries.add(program.institution.location);
          }
          
          // Extract categories
          program.categories.forEach(category => {
            categories.add(category.name);
          });
        });
        
        setFilterOptions({
          levels: Array.from(levels),
          durations: Array.from(durations),
          countries: Array.from(countries),
          categories: Array.from(categories)
        });
      } catch (err: any) {
        setError(err.message || 'Failed to load programs');
        console.error('Error loading programs:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadPrograms();
  }, [currentPage]);

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
      filtered = filtered.filter(program => 
        program.institution?.location === filters.country
      );
    }
    
    if (filters.category) {
      filtered = filtered.filter(program => 
        program.categories.some(cat => cat.name === filters.category)
      );
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
    }
    
    setFilteredPrograms(filtered);
  }, [searchQuery, activeTab, filters, sortOption, programs]);

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
      category: ''
    });
    setSortOption('default');
  };
  
  // Get active filter count
  const activeFilterCount = Object.values(filters).filter(value => value !== '').length;

  // Function to handle page change
  const handlePageChange = (page: number) => {
    // Clear cache to ensure fresh data
    clearProgramsCache();
    setCurrentPage(page);
    setLoading(true); // Set loading to true when changing pages
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
        <ErrorMessage>{error}</ErrorMessage>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SearchContainer>
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
        
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <SortContainer>
            <SortLabel>
              <FontAwesomeIcon icon={faSort} style={{ marginRight: '0.25rem' }} />
              Sort:
            </SortLabel>
            <FilterSelect 
              value={sortOption} 
              onChange={handleSortChange}
            >
              <option value="default">Default</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="level-asc">Level (Ascending)</option>
              <option value="level-desc">Level (Descending)</option>
            </FilterSelect>
          </SortContainer>
          
          <Tab 
            active={showFilters} 
            onClick={toggleFilters}
          >
            <FontAwesomeIcon icon={faFilter} style={{ marginRight: '0.25rem' }} />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </Tab>
        </div>
      </TabsContainer>
      
      {showFilters && (
        <FiltersContainer>
          <FilterHeader>
            <FilterTitle>
              <FontAwesomeIcon icon={faFilter} />
              Filter Programs
            </FilterTitle>
            
            {activeFilterCount > 0 && (
              <ClearFiltersButton onClick={clearAllFilters}>
                <FontAwesomeIcon icon={faTimes} />
                Clear All Filters
              </ClearFiltersButton>
            )}
          </FilterHeader>
          
          <FilterOptions>
            <FilterGroup>
              <FilterGroupTitle>
                <FontAwesomeIcon icon={faGraduationCap} />
                Program Level
              </FilterGroupTitle>
              <FilterSelect 
                value={filters.level} 
                onChange={(e) => handleFilterChange('level', e.target.value)}
              >
                <option value="">All Levels</option>
                {filterOptions.levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </FilterSelect>
            </FilterGroup>
            
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
                {filterOptions.countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </FilterSelect>
            </FilterGroup>
            
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
          </FilterOptions>
          
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
              
              {filters.category && (
                <ActiveFilter>
                  Category: {filters.category}
                  <button onClick={() => clearFilter('category')}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </ActiveFilter>
              )}
            </ActiveFiltersContainer>
          )}
        </FiltersContainer>
      )}
      
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