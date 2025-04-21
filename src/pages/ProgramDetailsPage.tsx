import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Program } from '../types';
import { fetchProgramById } from '../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faClock,
  faGraduationCap,
  faUniversity,
  faTag,
  faMoneyBill,
  faChevronLeft,
  faBookmark,
  faCheck,
  faExternalLinkAlt,
  faInfoCircle,
  faCalendarAlt,
  faAward,
  faFile,
  faLightbulb,
  faPlay,
  faVideo,
  faBriefcase,
  faLaptopCode,
  faTools,
  faMedkit,
  faPalette,
  faAtom,
  faGavel,
  faChalkboardTeacher,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { ProgramDetailsSkeleton } from '../components/SkeletonLoaders';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 2rem 1rem;
`;

const HeaderBar = styled.div`
  background-color: #0c3b5e;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  font-weight: 500;
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContentCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin-bottom: 2rem;
`;

const ProgramHeader = styled.div`
  position: relative;
`;

const ProgramImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;

const ProgramBadge = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #0c3b5e;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;
  z-index: 1;
`;

const ProgramOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
  padding: 2rem;
  color: white;
`;

const CategoryLabel = styled.div`
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-bottom: 0.75rem;
`;

const ProgramTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8), 0 0 5px rgba(0, 0, 0, 0.5);
  line-height: 1.2;
  color: #ffffff;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
  padding: 10px 0;
  border-radius: 4px;
`;

const SchoolName = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const ProgramTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ProgramTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
`;

const ContentSection = styled.div`
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.6rem;
  color: #0c3b5e;
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #eee;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  svg {
    color: #f39c12;
    font-size: 1.4rem;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
  text-align: left;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
  }
`;

const InfoLabel = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
  font-weight: 500;
`;

const InfoValue = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #0c3b5e;
  font-weight: 600;
  font-size: 1.05rem;
  
  svg {
    color: #f39c12;
    font-size: 1.1rem;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  margin-bottom: 1.5rem;
`;

interface TabProps {
  active: boolean;
}

const Tab = styled.button<TabProps>`
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#f39c12' : 'transparent'};
  color: ${props => props.active ? '#0c3b5e' : '#7f8c8d'};
  font-weight: ${props => props.active ? '600' : '400'};
  font-size: 1rem;
  cursor: pointer;
  
  &:hover {
    color: #0c3b5e;
  }
`;

const TabContent = styled.div`
  padding: 1rem 0;
`;

const Description = styled.div`
  color: #34495e;
  line-height: 1.6;
  
  h2 {
    color: #2c3e50;
    margin: 1.5rem 0 1rem;
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  ul, ol {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SidebarCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  height: fit-content;
`;

const SidebarTitle = styled.h3`
  font-size: 1.2rem;
  color: #0c3b5e;
  margin: 0 0 1.5rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: #f39c12;
  }
`;

const InstitutionCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const InstitutionLogo = styled.div`
  width: 64px;
  height: 64px;
  background-color: #e9ecef;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    color: #0c3b5e;
    font-size: 1.5rem;
  }
`;

const InstitutionInfo = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const InstitutionName = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  color: #2c3e50;
`;

const InstitutionLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-top: 0.25rem;
`;

const RequirementItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: #f8f9fa;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const RequirementIcon = styled.div`
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 50%;
  background-color: #e1f0fa;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    color: #f39c12;
    font-size: 1rem;
  }
`;

const RequirementText = styled.div`
  color: #34495e;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const RequirementTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #2c3e50;
`;

const ActionButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  background-color: #0c3b5e;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  margin-top: 1rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #092b47;
  }
`;

const SecondaryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  background-color: #f8f9fa;
  color: #34495e;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  margin-top: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e9ecef;
  }
`;

const HighlightsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const HighlightItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  
  svg {
    color: #2ecc71;
    margin-top: 0.25rem;
  }
`;

const ProgramSummary = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border-left: 5px solid #0c3b5e;
  
  p {
    color: #2c3e50;
    line-height: 1.8;
    margin: 0;
    font-size: 1.05rem;
  }
  
  strong {
    color: #0c3b5e;
  }
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

const VideoSection = styled.div`
  margin-bottom: 2rem;
`;

const VideoTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2c3e50;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  margin-bottom: 1rem;
`;

const VideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

// First, add new styled components for the category display
const CategoryHighlight = styled.div<{ gradient: string }>`
  display: flex;
  align-items: center;
  margin: -2rem auto 2rem;
  max-width: fit-content;
  background: ${props => props.gradient};
  padding: 0.6rem 1.2rem;
  border-radius: 40px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 10;
  position: relative;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.gradient};
    border-radius: 40px;
    z-index: -1;
    filter: blur(8px);
    opacity: 0.6;
  }
`;

const CategoryIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.25);
  margin-right: 0.75rem;
  
  svg {
    color: white;
    font-size: 1rem;
  }
`;

const CategoryDisplay = styled.div`
  text-align: center;
  margin: 0 0 2rem 0;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, #3498db, #8e44ad, #e74c3c, #f1c40f, #2ecc71);
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 1rem 0;
  color: #34495e;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const CategoryBadgeContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const CategoryBadge = styled.div<{ gradient: string }>`
  display: inline-flex;
   align-items: center;
  padding: 0.7rem 1.5rem;
  border-radius: 50px;
  background: ${props => props.gradient};
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

// Update component name and purpose
const ProgramDetailsHighlight = styled.div`
  margin: 0 0.5rem 2rem 0.5rem;
  padding: 2rem;
  background: linear-gradient(135deg, #f8f9fb, #e6eef7);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  text-align: left;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(to right, #3498db, #8e44ad, #e74c3c, #f1c40f, #2ecc71);
  }
`;

const HighlightTitle = styled.h3`
  font-size: 1.4rem;
  margin: 0 0 1.5rem 0;
  color: #0c3b5e;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  position: relative;
  display: inline-block;
  padding-bottom: 10px;
  text-align: left;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: #f39c12;
    border-radius: 1.5px;
  }
`;

const HighlightBadgeContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
`;

const HighlightBadge = styled.div<{ gradient: string }>`
  display: inline-flex;
  align-items: center;
  padding: 1rem 1.8rem;
  border-radius: 50px;
  background: ${props => props.gradient};
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
  }
`;

const HighlightIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.25);
  margin-right: 0.75rem;
  
  svg {
    color: white;
    font-size: 1.1rem;
  }
`;

// Function to get gradient colors for different detail types
const getDetailGradient = (type: string) => {
  switch (type) {
    case 'country':
      return 'linear-gradient(135deg, #3498db, #2980b9)';
    case 'duration':
      return 'linear-gradient(135deg, #e74c3c, #c0392b)';
    case 'level':
      return 'linear-gradient(135deg, #27ae60, #2ecc71)';
    default:
      return 'linear-gradient(135deg, #3498db, #2980b9)';
  }
};

// Function to get an appropriate icon for the category
const getCategoryIcon = (category: string) => {
  const categoryLower = category.toLowerCase();
  
  if (categoryLower.includes('business') || categoryLower.includes('management') || categoryLower.includes('mba')) {
    return faBriefcase;
  } else if (categoryLower.includes('computer') || categoryLower.includes('it') || categoryLower.includes('tech')) {
    return faLaptopCode;
  } else if (categoryLower.includes('engineering')) {
    return faTools;
  } else if (categoryLower.includes('health') || categoryLower.includes('medicine') || categoryLower.includes('nursing')) {
    return faMedkit;
  } else if (categoryLower.includes('art') || categoryLower.includes('design')) {
    return faPalette;
  } else if (categoryLower.includes('science')) {
    return faAtom;
  } else if (categoryLower.includes('law') || categoryLower.includes('legal')) {
    return faGavel;
  } else if (categoryLower.includes('education') || categoryLower.includes('teaching')) {
    return faChalkboardTeacher;
  } else {
    return faGraduationCap;
  }
};

// Function to get a gradient color based on category
const getCategoryGradient = (category: string) => {
  switch (category.toLowerCase()) {
    case 'technology':
      return 'linear-gradient(135deg, #0c3b5e, #1a5486)';
    case 'business':
      return 'linear-gradient(135deg, #0c3b5e, #f39c12)';
    default:
      return 'linear-gradient(135deg, #0c3b5e, #1a5486)';
  }
};

type TabType = 'description' | 'requirements' | 'highlights';

const ProgramDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('description');

  useEffect(() => {
    const loadProgram = async () => {
      try {
        setLoading(true);
        const programData = await fetchProgramById(parseInt(id!, 10));
        setProgram(programData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load program details. Please try again later.');
        setLoading(false);
      }
    };

    if (id) {
      loadProgram();
    }
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Show skeleton for 2 seconds to simulate API fetch

    return () => clearTimeout(timer);
  }, []);

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  if (loading) {
    return <ProgramDetailsSkeleton />;
  }

  if (error || !program) {
    return (
      <PageContainer>
        <ErrorMessage>{error || 'Program not found'}</ErrorMessage>
      </PageContainer>
    );
  }

  // Extract program attributes
  const school = program.attributes?.find(attr => attr.name === "School")?.options[0];
  const country = program.attributes?.find(attr => attr.name === "Country")?.options[0];
  const duration = program.attributes?.find(attr => attr.name === "Duration")?.options[0];
  const programLevel = program.attributes?.find(attr => attr.name === "Program Level")?.options[0];
  const applicationFee = program.meta_data?.find(meta => meta.key === "application_fee")?.value;
  const requirements = program.meta_data?.find(meta => meta.key === "requirements")?.value;
  const category = program.categories?.[0]?.name || 'General';
  
  // Extract tuition fee from multiple possible sources
  const getTuitionFee = () => {
    // First, check specific metadata keys for tuition
    const tuitionMeta = program.meta_data?.find(meta => 
      meta.key === "tuition_fee" || 
      meta.key === "_tuition_fee" || 
      meta.key === "tuition" ||
      meta.key === "_tuition"
    );
    
    if (tuitionMeta?.value) {
      return tuitionMeta.value;
    }
    
    // If not found in metadata, check if it's in regular price
    if (program.regular_price && program.regular_price !== '0') {
      return program.regular_price;
    }
    
    // If not found in regular price, check price field
    if (program.price && program.price !== '0') {
      return program.price;
    }
    
    return null;
  };
  
  const tuitionFee = getTuitionFee();
  
  // Convert YouTube URLs to embed format
  const getEmbedUrl = (url: string): string => {
    // Handle different YouTube URL formats
    let videoId = '';
    
    if (url.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(new URL(url).search);
      videoId = urlParams.get('v') || '';
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('youtube.com/embed/')[1].split('?')[0];
    }
    
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // If we couldn't parse the URL, just return the original
    return url;
  };
  
  // Use video URLs from the Program object
  const videoUrls = program.video_urls || [];

  // Create simplified program highlights and requirements for structured display
  const highlights = [
    "Internationally recognized degree",
    "Opportunity for internships and practical experience",
    "Expert faculty with industry experience",
    "Modern facilities and resources"
  ];

  // Format requirements into structured list
  const formattedRequirements = [
    {
      title: "Academic Requirements",
      icon: faGraduationCap,
      description: "Bachelor's degree or equivalent from a recognized institution with a minimum GPA of 3.0."
    },
    {
      title: "Language Proficiency",
      icon: faFile,
      description: "IELTS score of 6.5+ or TOEFL iBT score of 90+ or equivalent English language proficiency."
    },
    {
      title: "Application Documents",
      icon: faFile,
      description: "CV/Resume, Statement of Purpose, 2 Letters of Recommendation, Academic Transcripts."
    },
    {
      title: "Additional Requirements",
      icon: faAward,
      description: "Portfolio submission may be required for some specializations. Interview may be required."
    }
  ];

  return (
    <PageContainer>
      <HeaderBar>
        <PageTitle>Program Details</PageTitle>
        <BackLink to="/programs">
          <FontAwesomeIcon icon={faChevronLeft} />
          Back to Programs
        </BackLink>
      </HeaderBar>

      <ContentGrid>
        <div>
          <ContentCard>
            <ProgramHeader>
              {programLevel && (
                <ProgramBadge>{programLevel}</ProgramBadge>
              )}
              <ProgramImage 
                src={program.images?.[0]?.src || '/placeholder-program.jpg'} 
                alt={program.name}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-program.jpg';
                }}
              />
              <ProgramOverlay>
                <SchoolName>
                  <FontAwesomeIcon icon={faUniversity} />
                  {school || 'Institution not specified'}
                </SchoolName>
                <ProgramTitle>{program.name}</ProgramTitle>
                <ProgramTags>
                  {country && (
                    <ProgramTag>
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                      {country}
                    </ProgramTag>
                  )}
                  {duration && (
                    <ProgramTag>
                      <FontAwesomeIcon icon={faClock} />
                      {duration}
                    </ProgramTag>
                  )}
                  {tuitionFee && (
                    <ProgramTag>
                      <FontAwesomeIcon icon={faMoneyBill} />
                      Tuition: ${typeof tuitionFee === 'number' ? tuitionFee.toLocaleString() : tuitionFee}
                    </ProgramTag>
                  )}
                  {applicationFee && (
                    <ProgramTag>
                      <FontAwesomeIcon icon={faMoneyBill} />
                      Application Fee: ${applicationFee}
                    </ProgramTag>
                  )}
                </ProgramTags>
              </ProgramOverlay>
            </ProgramHeader>
            
            <ContentSection>
              {/* Program Overview Section - Renamed from Program Details */}
              {(country || duration || programLevel) && (
                <ProgramDetailsHighlight>
                  <HighlightTitle>Program Overview</HighlightTitle>
                  <InfoGrid>
                    <InfoItem>
                      <InfoLabel>Program Level</InfoLabel>
                      <InfoValue>
                        <FontAwesomeIcon icon={faGraduationCap} />
                        {programLevel || 'Not specified'}
                      </InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Institution</InfoLabel>
                      <InfoValue>
                        <FontAwesomeIcon icon={faUniversity} />
                        {school || 'Not specified'}
                      </InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Location</InfoLabel>
                      <InfoValue>
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                        {country || 'Not specified'}
                      </InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Duration</InfoLabel>
                      <InfoValue>
                        <FontAwesomeIcon icon={faClock} />
                        {duration || 'Not specified'}
                      </InfoValue>
                    </InfoItem>
                    {category && (
                      <InfoItem>
                        <InfoLabel>Category</InfoLabel>
                        <InfoValue>
                          <FontAwesomeIcon icon={faTag} />
                          {category}
                        </InfoValue>
                      </InfoItem>
                    )}
                    {tuitionFee && (
                      <InfoItem>
                        <InfoLabel>Tuition Fee</InfoLabel>
                        <InfoValue>
                          <FontAwesomeIcon icon={faMoneyBill} />
                          ${typeof tuitionFee === 'number' ? tuitionFee.toLocaleString() : tuitionFee}
                        </InfoValue>
                      </InfoItem>
                    )}
                    {applicationFee && (
                      <InfoItem>
                        <InfoLabel>Application Fee</InfoLabel>
                        <InfoValue>
                          <FontAwesomeIcon icon={faMoneyBill} />
                          ${applicationFee}
                        </InfoValue>
                      </InfoItem>
                    )}
                  </InfoGrid>
                  
                  <HighlightBadgeContainer>
                    {country && (
                      <HighlightBadge gradient={getDetailGradient('country')}>
                        <HighlightIcon>
                          <FontAwesomeIcon icon={faMapMarkerAlt} />
                        </HighlightIcon>
                        {country}
                      </HighlightBadge>
                    )}
                    
                    {duration && (
                      <HighlightBadge gradient={getDetailGradient('duration')}>
                        <HighlightIcon>
                          <FontAwesomeIcon icon={faClock} />
                        </HighlightIcon>
                        {duration}
                      </HighlightBadge>
                    )}
                    
                    {programLevel && (
                      <HighlightBadge gradient={getDetailGradient('level')}>
                        <HighlightIcon>
                          <FontAwesomeIcon icon={faGraduationCap} />
                        </HighlightIcon>
                        {programLevel}
                      </HighlightBadge>
                    )}
                  </HighlightBadgeContainer>
                </ProgramDetailsHighlight>
              )}
            </ContentSection>
          </ContentCard>

          <ContentCard>
            <ContentSection>
              <TabsContainer>
                <Tab 
                  active={activeTab === 'description'} 
                  onClick={() => setActiveTab('description')}
                >
                  Program Description
                </Tab>
                <Tab 
                  active={activeTab === 'requirements'} 
                  onClick={() => setActiveTab('requirements')}
                >
                  Requirements
                </Tab>
                <Tab 
                  active={activeTab === 'highlights'} 
                  onClick={() => setActiveTab('highlights')}
                >
                  Program Highlights
                </Tab>
              </TabsContainer>

              {activeTab === 'description' && (
                <TabContent>
                  <Description dangerouslySetInnerHTML={{ __html: program.description }} />
                </TabContent>
              )}

              {activeTab === 'requirements' && (
                <TabContent>
                  {requirements ? (
                    <div dangerouslySetInnerHTML={{ __html: requirements }} />
                  ) : (
                    <>
                      {formattedRequirements.map((req, index) => (
                        <RequirementItem key={index}>
                          <RequirementIcon>
                            <FontAwesomeIcon icon={req.icon} />
                          </RequirementIcon>
                          <div>
                            <RequirementTitle>{req.title}</RequirementTitle>
                            <RequirementText>{req.description}</RequirementText>
                          </div>
                        </RequirementItem>
                      ))}
                    </>
                  )}
                </TabContent>
              )}

              {activeTab === 'highlights' && (
                <TabContent>
                  {highlights.map((highlight, index) => (
                    <RequirementItem key={index}>
                      <RequirementIcon>
                        <FontAwesomeIcon icon={faLightbulb} />
                      </RequirementIcon>
                      <RequirementText>{highlight}</RequirementText>
                    </RequirementItem>
                  ))}
                </TabContent>
              )}
            </ContentSection>
          </ContentCard>
        </div>

        <Sidebar>
          <SidebarCard>
            <SidebarTitle>
              <FontAwesomeIcon icon={faGraduationCap} />
              Application
            </SidebarTitle>
            {tuitionFee && (
              <RequirementItem>
                <RequirementIcon>
                  <FontAwesomeIcon icon={faMoneyBill} />
                </RequirementIcon>
                <div>
                  <RequirementTitle>Tuition Fee</RequirementTitle>
                  <RequirementText>${typeof tuitionFee === 'number' ? tuitionFee.toLocaleString() : tuitionFee}</RequirementText>
                </div>
              </RequirementItem>
            )}
            {applicationFee && (
              <RequirementItem>
                <RequirementIcon>
                  <FontAwesomeIcon icon={faMoneyBill} />
                </RequirementIcon>
                <div>
                  <RequirementTitle>Application Fee</RequirementTitle>
                  <RequirementText>${applicationFee}</RequirementText>
                </div>
              </RequirementItem>
            )}
            <RequirementItem>
              <RequirementIcon>
                <FontAwesomeIcon icon={faCalendarAlt} />
              </RequirementIcon>
              <div>
                <RequirementTitle>Application Deadline</RequirementTitle>
                <RequirementText>May 15, 2025 for Fall admission</RequirementText>
              </div>
            </RequirementItem>
            <ActionButton 
              as={Link} 
              to={`/apply/${program.id}`}
              onClick={() => console.log("Applying to program with ID:", program.id)}
            >
              Apply Now
              <FontAwesomeIcon icon={faChevronRight} />
            </ActionButton>
            <SecondaryButton onClick={handleBookmark}>
              {bookmarked ? 'Bookmarked' : 'Bookmark Program'}
              <FontAwesomeIcon icon={faBookmark} />
            </SecondaryButton>
          </SidebarCard>

          {school && (
            <SidebarCard>
              <SidebarTitle>
                <FontAwesomeIcon icon={faUniversity} />
                Institution
              </SidebarTitle>
              <InstitutionCard>
                <InstitutionInfo>
                  <InstitutionLogo>
                    <FontAwesomeIcon icon={faUniversity} />
                  </InstitutionLogo>
                  <div>
                    <InstitutionName>{school}</InstitutionName>
                    {country && (
                      <InstitutionLocation>
                        <FontAwesomeIcon icon={faMapMarkerAlt} />
                        {country}
                      </InstitutionLocation>
                    )}
                  </div>
                </InstitutionInfo>
              </InstitutionCard>
              <SecondaryButton>
                <FontAwesomeIcon icon={faInfoCircle} />
                Learn more about this institution
              </SecondaryButton>
            </SidebarCard>
          )}
          
          {/* Video Section */}
          {videoUrls.length > 0 && (
            <SidebarCard>
              <SidebarTitle>
                <FontAwesomeIcon icon={faVideo} />
                Program Videos
              </SidebarTitle>
              
              {videoUrls.map((url, index) => (
                <VideoContainer key={index} style={{marginBottom: '1rem'}}>
                  <VideoIframe 
                    src={getEmbedUrl(url)}
                    title={`Program Video ${index + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </VideoContainer>
              ))}
            </SidebarCard>
          )}
        </Sidebar>
      </ContentGrid>
    </PageContainer>
  );
};

export default ProgramDetailsPage; 