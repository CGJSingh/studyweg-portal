import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Program } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faClock,
  faGraduationCap,
  faUniversity,
  faBookmark,
  faStar,
  faTag,
  faEye,
  faUsers
} from '@fortawesome/free-solid-svg-icons';

interface ProgramCardProps {
  program: Program;
}

const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;
  position: relative;
  border: 1px solid transparent;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
    border-color: rgba(243, 156, 18, 0.3);
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background-color: #f39c12;
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(12, 59, 94, 0.85);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  z-index: 1;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transform: translateY(0);
  transition: transform 0.2s ease, background-color 0.2s ease;
  
  ${Card}:hover & {
    background-color: #0c3b5e;
    transform: translateY(-2px);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  background-color: #f5f5f5;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BookmarkButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;
  color: #0c3b5e;
  transition: all 0.2s ease;
  transform: scale(1);
  
  &:hover {
    background: #f8f8f8;
    color: #f39c12;
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const PopularityBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 58px;
  background-color: rgba(243, 156, 18, 0.9);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  opacity: 0.9;
  
  ${Card}:hover & {
    opacity: 1;
  }
`;

const Content = styled.div`
  padding: 1.2rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Institution = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #0c3b5e;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  
  svg {
    color: #007BFF;
    font-size: 1rem;
  }
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #000;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  
  svg {
    color: #F33066;
    font-size: 1rem;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.7rem;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  color: #0c3b5e;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  
  svg {
    color: #27B737;
    font-size: 1rem;
  }
`;

const ProgramTitle = styled.h3`
  font-size: 1.05rem;
  color: #0c3b5e;
  margin: 0 0 0.7rem 0;
  line-height: 1.4;
  font-weight: 600;
  transition: color 0.2s ease;
  
  ${Card}:hover & {
    color: #f39c12;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 0.7rem;
  border-top: 1px solid #eee;
`;

const Duration = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #0c3b5e;
  font-size: 0.8rem;

  svg {
    color: #0c3b5e;
    font-size: 1rem;
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #f39c12;
  font-size: 0.8rem;

  svg {
    color: #f39c12;
    font-size: 1rem;
  }
`;

const ApplyButton = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 30px;
  background-color: #f39c12;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 5px rgba(243, 156, 18, 0.3);
  
  &:hover {
    background-color: #e08e0b;
    box-shadow: 0 4px 10px rgba(243, 156, 18, 0.4);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const PopularityMetrics = styled.div`
  display: flex;
  gap: 0.8rem;
  font-size: 0.75rem;
  color: #666;
  margin-top: 0.5rem;
`;

const Metric = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  const navigate = useNavigate();
  
  // Extract program information
  const school = program.attributes?.find(attr => attr.name === "School")?.options[0];
  const country = program.attributes?.find(attr => attr.name === "Country")?.options[0];
  const programLevel = program.attributes?.find(attr => attr.name === "Program Level")?.options[0];
  const duration = program.attributes?.find(attr => attr.name === "Duration")?.options[0];
  const category = program.categories?.[0]?.name || 'General';

  // Extract just the number of years for display
  const yearsMatch = duration?.match(/(\d+)/);
  const years = yearsMatch ? yearsMatch[0] : '';
  
  // Generate random metrics for views and applications
  const views = Math.floor(Math.random() * 1000) + 100;
  const applications = Math.floor(Math.random() * 100) + 10;
  
  // Determine if program is popular (for demo purposes)
  const isPopular = views > 500;

  const handleClick = () => {
    navigate(`/programs/${program.id}`);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Implement bookmark functionality later
    console.log('Bookmarked:', program.id);
  };

  return (
    <Card onClick={handleClick}>
      <ImageContainer>
        {category && (
          <Badge>{category}</Badge>
        )}
        {isPopular && (
          <PopularityBadge>
            <FontAwesomeIcon icon={faStar} /> Popular
          </PopularityBadge>
        )}
        <Image 
          src={program.images?.[0]?.src || '/placeholder-program.jpg'} 
          alt={program.name}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-program.jpg';
          }}
        />
        <BookmarkButton onClick={handleBookmark}>
          <FontAwesomeIcon icon={faBookmark} />
        </BookmarkButton>
      </ImageContainer>
      <Content>
        <Institution>
          <FontAwesomeIcon icon={faUniversity} />
          {school || program.institution?.name || 'University'}
        </Institution>
        
        <Location>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          {country || program.institution?.location || 'Unknown Location'}
        </Location>
        
        <ProgramTitle>{program.name}</ProgramTitle>
        
        <TagsContainer>
          {programLevel && (
            <Tag>
              <FontAwesomeIcon icon={faGraduationCap} />
              {programLevel}
            </Tag>
          )}
          {duration && (
            <Tag>
              <FontAwesomeIcon icon={faClock} />
              {duration}
            </Tag>
          )}
          {program.tags && program.tags.length > 0 && (
            <Tag>
              <FontAwesomeIcon icon={faTag} />
              {program.tags[0].name}
            </Tag>
          )}
        </TagsContainer>
        
        <PopularityMetrics>
          <Metric>
            <FontAwesomeIcon icon={faEye} style={{ color: '#666' }} />
            {views} views
          </Metric>
          <Metric>
            <FontAwesomeIcon icon={faUsers} style={{ color: '#666' }} />
            {applications} applicants
          </Metric>
        </PopularityMetrics>
        
        <MetaInfo>
          <Rating>
            <FontAwesomeIcon icon={faStar} />
            {(Math.random() * 2 + 3).toFixed(1)}
          </Rating>
          <Duration>
            <FontAwesomeIcon icon={faClock} />
            {years} {parseInt(years || '0') === 1 ? 'year' : 'years'}
          </Duration>
          <ApplyButton>View Details</ApplyButton>
        </MetaInfo>
      </Content>
    </Card>
  );
};

export default ProgramCard; 