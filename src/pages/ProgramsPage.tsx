import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
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
  faUniversity,
  faBookmark,
  faHistory,
  faTrash,
  faEye,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { motion as m } from 'framer-motion';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ProgramsListSkeleton as ProgramsLoadingSkeleton } from '../components/SkeletonLoaders';

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
  transition: all 0.3s ease;
  
  &:focus-within {
    transform: translateY(-2px);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
  transition: color 0.3s ease;
  
  ${SearchInputWrapper}:focus-within & {
    color: #f39c12;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.85rem 1rem 0.85rem 2.8rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  font-size: 1rem;
  background-color: white;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  
  &:focus {
    outline: none;
    border-color: #f39c12;
    box-shadow: 0 4px 10px rgba(243, 156, 18, 0.15);
  }
  
  &::placeholder {
    color: #aab;
    transition: color 0.3s ease;
  }
  
  &:focus::placeholder {
    color: #ccd;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  position: relative;
  border-bottom: 2px solid ${props => props.active ? '#f39c12' : 'transparent'};
  color: ${props => props.active ? '#f39c12' : '#666'};
  font-weight: ${props => props.active ? '600' : '400'};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    color: #f39c12;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 0;
    height: 2px;
    background-color: #f39c12;
    transition: all 0.2s ease;
    transform: translateX(-50%);
  }
  
  &:hover:after {
    width: 80%;
  }
`;

const ProgramsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  opacity: 1;
  animation: fadeIn 0.5s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #e74c3c;
  background-color: #fdeaea;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const RetryButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 5px rgba(52, 152, 219, 0.3);
  
  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(52, 152, 219, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const NoResultsMessage = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  font-size: 1.2rem;
  color: #666;
  grid-column: 1 / -1;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  
  svg {
    font-size: 2.5rem;
    color: #ddd;
    margin-bottom: 0.5rem;
  }
`;

// Add a new Backdrop component for blurring the background when filters are open
const Backdrop = styled.div<{show: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 99;
  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

// Update the FiltersContainer to slide in from the right
const FiltersContainer = styled(m.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 380px;
  height: 100vh;
  background: white;
  box-shadow: -5px 0 30px rgba(0, 0, 0, 0.15);
  padding: 2rem;
  z-index: 100;
  overflow-y: auto;
  
  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
    
    &:hover {
      background: #aaa;
    }
  }
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

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 12px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f0f7ff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
`;

const FilterGroupTitle = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  color: #0c3b5e;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
  
  svg {
    color: #f39c12;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
  position: relative;
  padding: 0.3rem 0;
  transition: all 0.2s ease;
  
  &:hover {
    color: #0c3b5e;
  }
  
  input {
    cursor: pointer;
    margin: 0;
    appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition: all 0.2s ease;
    position: relative;
    
    &:checked {
      border-color: #f39c12;
      background-color: #f39c12;
      
      &:after {
        content: '✓';
        position: absolute;
        top: -1px;
        left: 3px;
        color: white;
        font-size: 12px;
      }
    }
    
    &:hover {
      border-color: #f39c12;
    }
  }
`;

const RangeSlider = styled.input`
  width: 100%;
  margin: 1rem 0;
  -webkit-appearance: none;
  height: 8px;
  border-radius: 4px;
  background: #e1e1e1;
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #f39c12;
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
    
    &:hover {
      transform: scale(1.15);
    }
  }
  
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #f39c12;
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
    
    &:hover {
      transform: scale(1.15);
    }
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
  background-color: #f0f7ff;
  color: #0c3b5e;
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  transition: all 0.2s ease;
  border: 1px solid rgba(0, 123, 255, 0.1);
  
  &:hover {
    background-color: #e1f0fa;
    transform: translateY(-2px);
  }
  
  button {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0c3b5e;
    font-size: 0.8rem;
    padding: 0;
    margin-left: 0.25rem;
    transition: all 0.2s ease;
    
    &:hover {
      color: #f33066;
      transform: scale(1.2);
    }
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
  padding: 0.5rem 0.8rem;
  border-radius: 20px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(231, 76, 60, 0.1);
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
  padding: 1rem;
  background-color: rgba(245, 247, 250, 0.7);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const PageButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 0.8rem;
  border: 1px solid ${props => props.active ? '#f39c12' : '#ddd'};
  background-color: ${props => props.active ? '#f39c12' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border-radius: 8px;
  cursor: pointer;
  font-weight: ${props => props.active ? '600' : 'normal'};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#f39c12' : '#f7f7f7'};
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    transform: none;
    box-shadow: none;
  }
`;

const PageInfo = styled.div`
  margin: 0 1rem;
  color: #666;
  font-size: 0.9rem;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  padding: 0 1rem;
`;

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
  border-radius: 0 0 12px 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 10;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
    
    &:hover {
      background: #aaa;
    }
  }
`;

const SuggestionItem = styled.div`
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f5f7fa;
    padding-left: 1.2rem;
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
  transition: all 0.2s ease;
  
  ${SuggestionItem}:hover & {
    background-color: #e6e9ef;
  }
`;

const NoSuggestions = styled.div`
  padding: 0.75rem 1rem;
  color: #666;
  font-style: italic;
`;

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
  box-shadow: 0 2px 5px rgba(243, 156, 18, 0.3);
  
  &:hover {
    background-color: #e08e0b;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(243, 156, 18, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

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
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #f39c12;
    box-shadow: 0 0 0 3px rgba(243, 156, 18, 0.2);
  }
`;

const FilterSelect = styled.select`
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  background-color: white;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #f39c12;
    box-shadow: 0 0 0 3px rgba(243, 156, 18, 0.2);
  }
  
  &:hover {
    border-color: #ccc;
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

// Add this after the styled components and before the ProgramsPage component
const SEARCH_DEBOUNCE_DELAY = 500; // 500ms delay

// Add the ResultSummary component that was missing
const ResultSummary = styled.div`
  color: #666;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.2rem;
  background-color: #f9f9f9;
  border-radius: 12px;
  border-left: 3px solid #f39c12;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  
  strong {
    color: #0c3b5e;
    font-weight: 600;
  }
`;

// Add styled components for saved searches feature
const SaveSearchButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #fff;
  color: #0c3b5e;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.75rem 1.25rem;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f0f7ff;
    border-color: #007bff;
    color: #007bff;
  }
`;

const SavedSearchesButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #fff;
  color: #0c3b5e;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 0.75rem 1.25rem;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f8f8f8;
    border-color: #ccc;
  }
`;

const SavedSearchesPanel = styled(m.div)`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 350px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  padding: 1.5rem;
  z-index: 100;
`;

const SavedSearchItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  border-bottom: 1px solid #eee;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f5f7fa;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const SavedSearchTitle = styled.div`
  font-weight: 500;
  color: #0c3b5e;
`;

const SavedSearchInfo = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.3rem;
`;

const SavedSearchActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

// Fix the color props in SavedSearchAction styled component
const SavedSearchAction = styled.button<{ color?: string }>`
  background: none;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: ${(props) => props.color || '#0c3b5e'};
  }
`;

// Add this new constant for the direct API endpoint
const DIRECT_API_ENDPOINT = 'https://studyweg.com/wp-json/wc/v3/products?consumer_key=ck_9a7d01544fb71e45218afee6fed7f9f8a25d1b0f&consumer_secret=cs_f18193b595778c1cc726d336247e9c908aec3370&per_page=100';

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
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');
  
  // Add these new state variables
  const [suggestions, setSuggestions] = useState<Array<{
    id: number;
    text: string;
    type: 'program' | 'college' | 'description';
  }>>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);

  const location = useLocation();

  // Add new state for storing the immediate search input
  const [searchInput, setSearchInput] = useState<string>('');

  // Add new state for temporary filters
  const [tempFilters, setTempFilters] = useState<{
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

  // Add temporary program types state
  const [tempProgramTypes, setTempProgramTypes] = useState<{
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

  // Add temporary sort option state
  const [tempSortOption, setTempSortOption] = useState<SortOption>('name-asc');

  // Add a ref for the filters container
  const filtersRef = useRef<HTMLDivElement>(null);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  // Add a new state to track total filtered results
  const [totalFilteredResults, setTotalFilteredResults] = useState<number>(0);

  // After the existing state variables, add a new state variable to store the last API result info
  const [lastAPIResult, setLastAPIResult] = useState<{
    programsCount: number;
    hasExtraPrograms: boolean;
    extraProgramsCount: number;
  }>({
    programsCount: 0,
    hasExtraPrograms: false,
    extraProgramsCount: 0
  });

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

  // Add a new function to extract filter options from programs
  const extractFilterOptions = (programs: Program[]) => {
        const durations = new Set<string>();
        const countries = new Set<string>();
        const categories = new Set<string>();
    const universities = new Set<string>();
    const levels = new Set<string>();

    programs.forEach(program => {
          // Extract durations
          const duration = program.attributes?.find(attr => attr.name === "Duration")?.options[0];
          if (duration) durations.add(duration);
          
          // Extract countries
      const country = program.attributes?.find(attr => attr.name === "Country")?.options[0];
      if (country) countries.add(country);

      // Extract program levels
      const level = program.attributes?.find(attr => attr.name === "Program Level")?.options[0];
      if (level) levels.add(level);

      // Extract universities/schools
      const school = program.attributes?.find(attr => attr.name === "School")?.options[0];
      if (school) universities.add(school);
          
          // Extract categories
          program.categories.forEach(category => {
        if (category.name) categories.add(category.name);
          });
        });
        
    // Update the filter options state
        setFilterOptions({
      levels: Array.from(levels).sort(),
      durations: Array.from(durations).sort(),
      countries: Array.from(countries).sort(),
      categories: Array.from(categories).sort(),
      universities: Array.from(universities).sort()
    });

    console.log('Filter options updated:', {
          levels: Array.from(levels),
          durations: Array.from(durations),
          countries: Array.from(countries),
      categories: Array.from(categories),
      universities: Array.from(universities)
    });
  };

  // Add a new function to fetch data directly from the API endpoint
  const fetchDirectProgramData = async () => {
    try {
      console.log('Fetching program data directly from API...');
      const response = await fetch(DIRECT_API_ENDPOINT);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Direct API data received:', data.length, 'programs');
      
      // Extract filter options from the fetched data
      extractFilterOptions(data);
      
      return data as Program[];
    } catch (error) {
      console.error('Error fetching direct program data:', error);
      return [] as Program[];
    }
  };

  // Add a useEffect to populate filter options when the component mounts
  useEffect(() => {
    const populateFilterOptions = async () => {
      try {
        // First try to get all programs from our existing API
        let allPrograms: Program[] = [];
        
        try {
          // Try to get programs from our regular API first
          const result = await fetchAllPrograms();
          if (result && 'programs' in result) {
            allPrograms = result.programs as Program[] || [];
            
            if (allPrograms.length > 0) {
              console.log('Using programs from regular API for filter options');
              extractFilterOptions(allPrograms);
            }
          }
        } catch (error) {
          console.warn('Failed to get programs from regular API:', error);
        }
        
        // If we couldn't get programs from our regular API or there were none, try the direct API
        if (allPrograms.length === 0) {
          console.log('Fetching filter options from direct API...');
          const directData = await fetchDirectProgramData();
          if (directData.length > 0) {
            console.log('Using programs from direct API for filter options');
          } else {
            console.warn('No programs found in direct API');
          }
        }
      } catch (error) {
        console.error('Failed to populate filter options:', error);
      }
    };
    
    populateFilterOptions();
  }, []);

  // Modify the loadPrograms function to extract filter options from the loaded programs
  const loadPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      setIsOfflineMode(false);
      console.log('Fetching programs for page:', currentPage);
      
      // Build extra parameters based on active filters
      const extraParams: Record<string, string> = {
        per_page: programsPerPage.toString(),
        page: "1", // Always request from page 1 when applying filters
        sort: 'name' // Always sort by name ascending by default
      };
      
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

      // Override default sorting if a different sort option is selected
      if (sortOption !== 'default' && sortOption !== 'name-asc') {
        const [field, direction] = sortOption.split('-');
        extraParams['sort'] = `${direction === 'desc' ? '-' : ''}${field}`;
      }
      
      // Add a timestamp to prevent caching issues
      extraParams['timestamp'] = Date.now().toString();
      
      // Request a larger number of results per page to get as many as possible at once
      extraParams['per_page'] = '100'; // Request more items per page for better filtering
      
      // Request that all filters be applied server-side
      extraParams['apply_all_filters'] = 'true';
      
      // Add parameter to get total count
      extraParams['include_total_count'] = 'true';
      
      console.log('Fetching with filters:', extraParams);
      
      // Fetch the filtered data
      const result = await fetchPrograms(1, { // Always fetch from page 1
        extraParams,
        forceRefresh: true // Force refresh to ensure we get fresh data with the filters
      });
      
      // Extract filter options from these programs if we haven't already
      if (filterOptions.countries.length === 0 || filterOptions.durations.length === 0 ||
          filterOptions.categories.length === 0 || filterOptions.universities.length === 0) {
        console.log('Extracting filter options from fetched programs');
        if (Array.isArray(result.programs)) {
          extractFilterOptions(result.programs);
        }
        
        // If we still don't have filter options, try the direct API
        if (filterOptions.countries.length === 0 || filterOptions.durations.length === 0 ||
            filterOptions.categories.length === 0 || filterOptions.universities.length === 0) {
          console.log('Still missing filter options, trying direct API');
          fetchDirectProgramData();
        }
      }
      
      // Set the total count of filtered results immediately so we can calculate valid pages
      const resultTotalCount = 'totalCount' in result && typeof result.totalCount === 'number' 
        ? result.totalCount 
        : (result.totalPages * parseInt(extraParams['per_page']));
      
      setTotalFilteredResults(resultTotalCount);
      
      // Calculate the actual number of pages needed for the filtered results
      const calculatedTotalPages = Math.max(1, Math.ceil(resultTotalCount / programsPerPage));
      
      // If we're on a page that doesn't exist anymore after filtering, reset to page 1
      if (currentPage > calculatedTotalPages) {
        setCurrentPage(1);
      }
      
      // Get the appropriate page of results based on currentPage
      let filteredPrograms = result.programs;
      
      // If we have results, make sure to show the correct page
      if (filteredPrograms.length > 0) {
        const startIndex = (currentPage - 1) * programsPerPage;
        const endIndex = Math.min(startIndex + programsPerPage, filteredPrograms.length);
        
        // Slice the programs to get the correct page
        const currentPagePrograms = filteredPrograms.slice(startIndex, endIndex);
        
        setPrograms(filteredPrograms); // Store all programs
        setFilteredPrograms(currentPagePrograms); // Show only current page
      } else {
        setPrograms([]);
        setFilteredPrograms([]);
      }
      
      // Update the total pages based on the filtered results
      setTotalPages(calculatedTotalPages);
    } catch (error) {
      console.error('Error fetching programs:', error);
      setError('Failed to load program data. Please try again.');
      setIsOfflineMode(true);
      setOfflineMode(true);
      
      // If we've failed to load programs, try to at least get filter options from the direct API
      if (filterOptions.countries.length === 0 || filterOptions.durations.length === 0 ||
          filterOptions.categories.length === 0 || filterOptions.universities.length === 0) {
        console.log('Failed to load programs. Trying to get filter options from direct API');
        fetchDirectProgramData();
      }
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

  // Update the useEffect that responds to filter changes
  useEffect(() => {
    // Always clear the cache and reload data when filters change
    clearProgramsCache();
    
    // Always reset to page 1 when filters are applied
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      // If already on page 1, just reload the programs with the new filters
      loadPrograms();
    }
  }, [searchQuery, activeTab, filters, sortOption, programTypes]); // eslint-disable-line react-hooks/exhaustive-deps

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

  // Add this new function to handle Enter key press
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchQuery(searchInput);
      setCurrentPage(1);
      setShowSuggestions(false);
    }
  };

  // Update the handleSearchChange function
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
  };

  // Update the suggestions useEffect to use searchInput
  useEffect(() => {
    if (!searchInput || searchInput.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Generate suggestions based on searchInput
    const query = searchInput.toLowerCase();
    const newSuggestions: Array<{
      id: number;
      text: string;
      type: 'program' | 'college' | 'description';
    }> = [];
    
    // Limit to 10 suggestions total
    const maxSuggestions = 10;
    
    // Add program name suggestions first (prioritize these)
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
    
    setSuggestions(newSuggestions);
    setShowSuggestions(newSuggestions.length > 0);
  }, [searchInput, programs]);

  // Update the handleSelectSuggestion function
  const handleSelectSuggestion = (suggestion: { id: number; text: string; type: string }) => {
    setSearchInput(suggestion.text);
    setSearchQuery(suggestion.text);
    setCurrentPage(1);
    setShowSuggestions(false);
  };

  // Effect to handle navigation from program detail page
  useEffect(() => {
    if (location.state) {
      console.log('Received navigation state:', location.state);
      const { filterType, value } = location.state as { filterType: string, value: string };
      
      if (filterType && value) {
        console.log(`Applying filter: ${filterType} = ${value}`);
        // Reset other filters first
        clearAllFilters();
        
        // Apply the specific filter
        if (filterType === 'category' || 
            filterType === 'level' || 
            filterType === 'duration' || 
            filterType === 'country' || 
            filterType === 'university') {
          handleFilterChange(filterType as keyof typeof filters, value);
          console.log('Filter applied successfully');
        } else if (filterType === 'tag') {
          // Handle tag filtering by setting the appropriate tab
          if (value.toLowerCase() === 'top program') {
            setActiveTab('top');
          } else if (value.toLowerCase() === 'fast acceptance') {
            setActiveTab('fast');
          } else if (value.toLowerCase() === 'intake offer') {
            setActiveTab('intake');
          } else {
            // For other tags, set a search query
            setSearchQuery(value);
          }
          console.log('Tag filtering applied successfully');
        }
        
        // Clear the location state after applying filters
        window.history.replaceState({}, document.title);
        console.log('Location state cleared');
      }
    }
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  // Modify the handleTabChange function
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to page 1 when changing tabs
  };
  
  // New handlers for filters and sorting
  const toggleFilters = () => {
    if (!showFilters) {
      // When opening, set temporary states to current values
      setTempFilters({...filters});
      setTempProgramTypes({...programTypes});
      setTempSortOption(sortOption);
      // Prevent scrolling on the body when filter is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when filter is closed
      document.body.style.overflow = 'auto';
    }
    setShowFilters(!showFilters);
  };
  
  const handleFilterChange = (filterType: keyof typeof filters, value: string) => {
    setTempFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTempSortOption(e.target.value as SortOption);
  };
  
  const handleProgramTypeChange = (type: ProgramType, checked: boolean) => {
    setTempProgramTypes(prev => ({
      ...prev,
      [type]: checked
    }));
  };
  
  const handleFeeRangeChange = (type: 'min' | 'max', value: number) => {
    setFeeRange(prev => ({
      ...prev,
      [type === 'min' ? 'currentMin' : 'currentMax']: value
    }));
    
    setTempFilters(prev => ({
      ...prev,
      [type === 'min' ? 'feeMin' : 'feeMax']: value.toString()
    }));
  };
  
  const handleFeeMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setFeeRange(prev => ({
      ...prev,
      currentMin: value
    }));
    setTempFilters(prev => ({
      ...prev,
      feeMin: value.toString()
    }));
  };

  const handleFeeMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || feeRange.max;
    setFeeRange(prev => ({
      ...prev,
      currentMax: value
    }));
    setTempFilters(prev => ({
      ...prev,
      feeMax: value.toString()
    }));
  };

  const handleUniversityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTempFilters(prev => ({
      ...prev,
      university: e.target.value
    }));
  };
  
  // Get active filter count
  const activeFilterCount = Object.values(filters).filter(value => value !== '').length;

  // Update the isValidPage function to be more accurate
  const isValidPage = (page: number): boolean => {
    // Invalid if below 1 or above calculated total pages
    if (page < 1) return false;
    
    // Calculate how many pages should actually have content based on total results
    const calculatedTotalPages = Math.ceil(totalFilteredResults / programsPerPage);
    
    // Page is invalid if it's beyond the number of pages needed for the filtered results
    if (page > calculatedTotalPages) return false;
    
    // If we have no results, only page 1 is valid (to show "no results" message)
    if (totalFilteredResults === 0) {
      return page === 1;
    }
    
    return true;
  };

  // Update the handlePageChange function to skip to the next page with content
  const handlePageChange = (page: number) => {
    if (!isValidPage(page) || page === currentPage) return;
    
    // When clicking "next" - find the next valid page with content
    if (page > currentPage) {
      findNextPageWithContent(page);
    } 
    // When clicking "previous" - find the previous valid page with content
    else if (page < currentPage) {
      findPreviousPageWithContent(page);
    }
  };

  // New function to find the next valid page with content
  const findNextPageWithContent = (startPage: number) => {
    // Calculate how many pages should actually have content based on total results
    const calculatedTotalPages = Math.ceil(totalFilteredResults / programsPerPage);
    
    // Set loading state immediately for better UX
    setLoading(true);
    
    // Navigate to the page and let the loadPrograms function handle redirecting if empty
    setCurrentPage(startPage);
    window.scrollTo(0, 0); // Scroll to top when changing page
  };

  // New function to find the previous valid page with content
  const findPreviousPageWithContent = (startPage: number) => {
    // Set loading state immediately for better UX
    setLoading(true);
    
    // Navigate to the page and let the loadPrograms function handle redirecting if empty
    setCurrentPage(startPage);
    window.scrollTo(0, 0); // Scroll to top when changing page
  };

  // Update the getCurrentPagePrograms function to handle pagination
  const getCurrentPagePrograms = () => {
    // Simply return the filteredPrograms since we've already paginated them in loadPrograms
    return filteredPrograms;
  };

  // Update the getPageNumbers function to generate valid page numbers only
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 5;
    
    // Calculate actual total pages based on filtered results
    const calculatedTotalPages = Math.max(1, Math.ceil(totalFilteredResults / programsPerPage));
    
    // If no results or only one page, return empty or just page 1
    if (calculatedTotalPages <= 1) {
      return calculatedTotalPages === 1 ? [1] : [];
    }
    
    if (calculatedTotalPages <= maxPageButtons) {
      // If we have fewer pages than max buttons, show all pages
      for (let i = 1; i <= calculatedTotalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show a sliding window of page numbers centered around current page
      let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
      let endPage = startPage + maxPageButtons - 1;
      
      if (endPage > calculatedTotalPages) {
        endPage = calculatedTotalPages;
        startPage = Math.max(1, endPage - maxPageButtons + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    
    return pageNumbers;
  };

  // Add this function to hide suggestions when clicking outside
  const handleClickOutside = () => {
    setShowSuggestions(false);
  };

  // Update the applyFilters function
  const applyFilters = () => {
    // Apply all temporary states to actual states
    setFilters(tempFilters);
    setProgramTypes(tempProgramTypes);
    setSortOption(tempSortOption);
    
    // Always reset to page 1 when filters are applied
    setCurrentPage(1);
    
    // Clear cache to make sure we get fresh data
    clearProgramsCache();
    
    // Close filter panel and re-enable scrolling
    setShowFilters(false);
    document.body.style.overflow = 'auto';
    
    // Set loading state immediately for better UX
    setLoading(true);
    
    // Reset total filtered results until new data is loaded
    setTotalFilteredResults(0);
    
    // Force immediate reload with new filters instead of waiting for useEffect
    setTimeout(() => {
      loadPrograms();
    }, 0);
  };

  // Update clear filters function
  const clearAllFilters = () => {
    const emptyFilters = {
      level: '',
      duration: '',
      country: '',
      category: '',
      university: '',
      feeMin: '',
      feeMax: ''
    };

    const emptyProgramTypes = {
      bachelors: false,
      diploma: false,
      masters: false,
      phd: false,
      certificate: false
    };

    // Update both temporary and actual states
    setTempFilters(emptyFilters);
    setFilters(emptyFilters);
    setTempProgramTypes(emptyProgramTypes);
    setProgramTypes(emptyProgramTypes);
    setTempSortOption('name-asc');
    setSortOption('name-asc');
    setCurrentPage(1);
  };

  // Add a click outside handler to close the filters panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showFilters && 
        filtersRef.current && 
        !filtersRef.current.contains(event.target as Node) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target as Node)
      ) {
        setShowFilters(false);
        document.body.style.overflow = 'auto'; // Re-enable scrolling when closed
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilters]);

  // Add new state variables near the top of the component with the other state variables
  const [savedSearches, setSavedSearches] = useLocalStorage<Array<{
    id: string;
    name: string;
    filters: typeof filters;
    programTypes: typeof programTypes;
    searchQuery: string;
    sortOption: SortOption;
    dateCreated: string;
  }>>('saved_searches', []);

  const [showSavedSearches, setShowSavedSearches] = useState<boolean>(false);
  const [showSaveSearchModal, setShowSaveSearchModal] = useState<boolean>(false);
  const [saveSearchName, setSaveSearchName] = useState<string>('');
  const savedSearchesRef = useRef<HTMLDivElement>(null);

  // Add functions to handle saved searches
  const handleSaveSearch = () => {
    setShowSaveSearchModal(true);
    setSaveSearchName(`Search on ${new Date().toLocaleString()}`);
  };

  const submitSaveSearch = () => {
    const newSavedSearch = {
      id: Date.now().toString(),
      name: saveSearchName,
      filters: {...filters},
      programTypes: {...programTypes},
      searchQuery,
      sortOption,
      dateCreated: new Date().toISOString()
    };
    
    setSavedSearches([...savedSearches, newSavedSearch]);
    setShowSaveSearchModal(false);
    
    // Show a confirmation message or toast
    alert(`Search "${saveSearchName}" has been saved!`);
  };

  const applySavedSearch = (savedSearch: typeof savedSearches[0]) => {
    setFilters(savedSearch.filters);
    setProgramTypes(savedSearch.programTypes);
    setSearchQuery(savedSearch.searchQuery);
    setSortOption(savedSearch.sortOption);
    setCurrentPage(1);
    
    // Also update the temp states
    setTempFilters(savedSearch.filters);
    setTempProgramTypes(savedSearch.programTypes);
    setTempSortOption(savedSearch.sortOption);
    
    // Clear cache and reload
    clearProgramsCache();
    setLoading(true);
    
    // Hide the saved searches panel
    setShowSavedSearches(false);
  };

  const deleteSavedSearch = (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this saved search?");
    if (confirmed) {
      setSavedSearches(savedSearches.filter(search => search.id !== id));
    }
  };

  // Add click outside handler for saved searches panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showSavedSearches && 
        savedSearchesRef.current && 
        !savedSearchesRef.current.contains(event.target as Node)
      ) {
        setShowSavedSearches(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSavedSearches]);

  // Update the NoResultsMessage component
  const NoResultsContent = () => (
    <NoResultsMessage>
      <FontAwesomeIcon icon={faSearch} size="2x" />
      <div>No programs found matching your criteria</div>
      <div style={{ fontSize: '0.9rem', maxWidth: '500px' }}>
        Try adjusting your filters or search terms to find more programs. 
        You can clear all filters to see all available programs.
      </div>
      <RetryButton onClick={clearAllFilters}>
        Clear All Filters
      </RetryButton>
    </NoResultsMessage>
  );

  if (loading) {
    return <ProgramsLoadingSkeleton />;
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
              placeholder="Search for programs, universities, or subject areas..." 
              value={searchInput}
          onChange={handleSearchChange}
              onKeyPress={handleSearchKeyPress}
              onFocus={() => searchInput.length >= 2 && suggestions.length > 0 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => handleClickOutside(), 200)}
            />
          </SearchInputWrapper>
          
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            {(searchQuery || activeFilterCount > 0) && (
              <SaveSearchButton onClick={handleSaveSearch}>
                <FontAwesomeIcon icon={faBookmark} />
                Save Search
              </SaveSearchButton>
            )}
            
            {savedSearches.length > 0 && (
              <div style={{ position: 'relative' }}>
                <SavedSearchesButton onClick={() => setShowSavedSearches(!showSavedSearches)}>
                  <FontAwesomeIcon icon={faHistory} />
                  Saved Searches
                </SavedSearchesButton>
                
                {showSavedSearches && (
                  <SavedSearchesPanel
                    key="saved-searches-panel"
                    ref={savedSearchesRef}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 style={{ margin: '0 0 1rem 0', color: '#0c3b5e' }}>Your Saved Searches</h3>
                    
                    {savedSearches.map(search => (
                      <SavedSearchItem key={search.id}>
                        <div>
                          <SavedSearchTitle>{search.name}</SavedSearchTitle>
                          <SavedSearchInfo>
                            {new Date(search.dateCreated).toLocaleDateString()}
                            {' • '}
                            {Object.values(search.filters).filter(Boolean).length} filters
                          </SavedSearchInfo>
                        </div>
                        <SavedSearchActions>
                          <SavedSearchAction 
                            title="Apply this search"
                            onClick={() => applySavedSearch(search)}
                          >
                            <FontAwesomeIcon icon={faSearch} />
                          </SavedSearchAction>
                          <SavedSearchAction 
                            title="Delete this search"
                            onClick={() => deleteSavedSearch(search.id)}
                            color="#e74c3c"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </SavedSearchAction>
                        </SavedSearchActions>
                      </SavedSearchItem>
                    ))}
                    
                    {savedSearches.length === 0 && (
                      <div style={{ padding: '1rem', textAlign: 'center', color: '#666' }}>
                        No saved searches yet
                      </div>
                    )}
                  </SavedSearchesPanel>
                )}
              </div>
            )}
            
            <FilterButton 
              ref={filterButtonRef}
            onClick={toggleFilters}
          >
              <FontAwesomeIcon icon={faFilter} />
              Filter {activeFilterCount > 0 && `(${activeFilterCount})`}
            </FilterButton>
        </div>
        </SearchFilterRow>
        
        {showSuggestions && (
          <SuggestionsContainer>
            {suggestions.length > 0 ? (
              suggestions.map((suggestion, index) => {
                // Highlight the matching part of the suggestion
                const query = searchInput.toLowerCase();
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
      
      {/* Backdrop that blurs content when filter is open */}
      <Backdrop show={showFilters} onClick={() => {
        setShowFilters(false);
        document.body.style.overflow = 'auto';
      }} />
      
      {/* Filter Container */}
      {showFilters && (
        <FiltersContainer 
          ref={filtersRef}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
        >
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
                value={tempSortOption} 
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
                    checked={tempProgramTypes.bachelors}
                    onChange={(e) => handleProgramTypeChange('bachelors', e.target.checked)}
                  />
                  Bachelor's Degree
                </CheckboxLabel>
                <CheckboxLabel>
                  <input 
                    type="checkbox" 
                    checked={tempProgramTypes.diploma}
                    onChange={(e) => handleProgramTypeChange('diploma', e.target.checked)}
                  />
                  Diploma Programs
                </CheckboxLabel>
                <CheckboxLabel>
                  <input 
                    type="checkbox" 
                    checked={tempProgramTypes.masters}
                    onChange={(e) => handleProgramTypeChange('masters', e.target.checked)}
                  />
                  Master's Degree
                </CheckboxLabel>
                <CheckboxLabel>
                  <input 
                    type="checkbox" 
                    checked={tempProgramTypes.phd}
                    onChange={(e) => handleProgramTypeChange('phd', e.target.checked)}
                  />
                  PhD / Doctorate
                </CheckboxLabel>
                <CheckboxLabel>
                  <input 
                    type="checkbox" 
                    checked={tempProgramTypes.certificate}
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
                    value={feeRange.currentMin}
                    onChange={handleFeeMinChange}
                  />
                  <span>-</span>
                  <RangeInput 
                    type="number" 
                    placeholder="Max" 
                    min="0"
                    value={feeRange.currentMax}
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
                value={tempFilters.duration} 
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
                value={tempFilters.country} 
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
                value={tempFilters.university} 
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
                value={tempFilters.category} 
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
                    <button onClick={() => handleFilterChange('level', '')}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </ActiveFilter>
              )}
              
              {filters.duration && (
                <ActiveFilter>
                  Duration: {filters.duration}
                    <button onClick={() => handleFilterChange('duration', '')}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </ActiveFilter>
              )}
              
              {filters.country && (
                <ActiveFilter>
                  Country: {filters.country}
                    <button onClick={() => handleFilterChange('country', '')}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </ActiveFilter>
                )}
                
                {filters.university && (
                  <ActiveFilter>
                    University: {filters.university}
                    <button onClick={() => handleFilterChange('university', '')}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </ActiveFilter>
              )}
              
              {filters.category && (
                <ActiveFilter>
                  Category: {filters.category}
                    <button onClick={() => handleFilterChange('category', '')}>
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </ActiveFilter>
                )}
                
                {(filters.feeMin || filters.feeMax) && (
                  <ActiveFilter>
                    Fee: {filters.feeMin ? `$${parseInt(filters.feeMin).toLocaleString()}` : '$0'} - {filters.feeMax ? `$${parseInt(filters.feeMax).toLocaleString()}` : 'Any'}
                    <button onClick={() => {
                      handleFilterChange('feeMin', '');
                      handleFilterChange('feeMax', '');
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
                      handleProgramTypeChange('bachelors', false);
                      handleProgramTypeChange('diploma', false);
                      handleProgramTypeChange('masters', false);
                      handleProgramTypeChange('phd', false);
                      handleProgramTypeChange('certificate', false);
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
              onClick={applyFilters}
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
      
      {/* Add Results Summary */}
      {!loading && (
        <ResultSummary>
          <div>
            {totalFilteredResults > 0 ? (
              <>
                Found <strong>{totalFilteredResults}</strong> programs 
                {activeFilterCount > 0 ? ' matching your filters' : ''} 
                {totalPages > 0 && <>
                  {totalPages === 1 
                    ? ' (all on this page)' 
                    : getCurrentPagePrograms().length > 0 
                      ? ` (showing page ${currentPage} of ${totalPages})` 
                      : ` (across ${totalPages} pages)`}
                </>}
              </>
            ) : (
              filteredPrograms.length > 0 ? (
                <>Showing <strong>{filteredPrograms.length}</strong> programs</>
              ) : (
                <>No programs match your filters</>
              )
            )}
          </div>
          
          {activeFilterCount > 0 && (
            <ClearFiltersButton onClick={clearAllFilters}>
              <FontAwesomeIcon icon={faTimes} />
              Clear All Filters
            </ClearFiltersButton>
          )}
        </ResultSummary>
      )}
      
      <ProgramsGrid>
        {getCurrentPagePrograms().length > 0 ? (
          getCurrentPagePrograms().map((program: Program) => (
            <ProgramCard key={program.id} program={program} />
          ))
        ) : (
          <NoResultsContent />
        )}
      </ProgramsGrid>
      
      {/* Pagination Controls - Only show if there are multiple pages and we have programs */}
      {totalFilteredResults > 0 && totalPages > 1 && (
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
            {totalFilteredResults > 0 && (
              <>
                Page {currentPage} of {totalPages}: Showing <strong>{getCurrentPagePrograms().length}</strong> of <strong>{totalFilteredResults}</strong> programs
                {lastAPIResult.hasExtraPrograms && (
                  <span style={{ marginLeft: '8px', color: '#f39c12', fontSize: '0.8rem', fontStyle: 'italic' }}>
                    (includes {lastAPIResult.extraProgramsCount} from next page)
                  </span>
                )}
              </>
            )}
            {loading && (
              <span style={{ 
                marginLeft: '10px', 
                color: '#f39c12', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '5px' 
              }}>
                <i className="fa fa-spinner fa-spin"></i> Loading...
              </span>
            )}
          </PageInfo>
        </PaginationContainer>
      )}
    </PageContainer>
  );
};

export default ProgramsPage; 