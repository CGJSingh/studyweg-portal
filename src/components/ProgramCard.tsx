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
  faTag
} from '@fortawesome/free-solid-svg-icons';

interface ProgramCardProps {
  program: Program;
}

const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #0c3b5e;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  z-index: 1;
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
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;
  color: #0c3b5e;
  transition: color 0.2s ease;
  
  &:hover {
    background: #f8f8f8;
    color: #f39c12;
  }
`;

const Content = styled.div`
  padding: 1rem;
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
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #7f8c8d;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 0.7rem;
`;

const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background-color: transparent;
  color: #0c3b5e;
  padding: 0.2rem 0.5rem;
  border: 1px solid #0c3b5e;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 500;
  
  svg {
    color: #f39c12;
  }
`;

const ProgramTitle = styled.h3`
  font-size: 1rem;
  color: #0c3b5e;
  margin: 0 0 0.7rem 0;
  line-height: 1.4;
  font-weight: 500;
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
    color: #f39c12;
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
  }
`;

const ApplyButton = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  background-color: #f39c12;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e08e0b;
  }
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
          <FontAwesomeIcon icon={faUniversity} size="sm" />
          {school || 'Institution not specified'}
        </Institution>
        
        {country && (
          <Location>
            <FontAwesomeIcon icon={faMapMarkerAlt} size="sm" />
            {country}
          </Location>
        )}
        
        <TagsContainer>
          {duration && (
            <Tag>
              <FontAwesomeIcon icon={faClock} size="xs" />
              {duration}
            </Tag>
          )}
        </TagsContainer>
        
        <ProgramTitle>{program.name}</ProgramTitle>
        
        <MetaInfo>
          <Duration>
            <FontAwesomeIcon icon={faGraduationCap} />
            {programLevel || 'Program level not specified'}
          </Duration>
          <Rating>
            <FontAwesomeIcon icon={faStar} />
            5.0
          </Rating>
        </MetaInfo>
      </Content>
    </Card>
  );
};

export default ProgramCard; 