import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchProgramById } from '../services/api';
import { Program } from '../types';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-bottom: 2rem;
  color: #0066cc;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
  
  &:before {
    content: '←';
    margin-right: 0.5rem;
  }
`;

const ProgramHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 3rem;
  }
`;

const ImageContainer = styled.div`
  flex: 0 0 40%;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const ProgramImage = styled.img`
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProgramInfo = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin: 0 0 1rem;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #0066cc;
  margin-bottom: 1.5rem;
`;

const CategoryTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Tag = styled.span`
  background-color: #f0f7ff;
  color: #0066cc;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const ShortDescription = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 2rem;
`;

const ApplyButton = styled.a`
  display: inline-block;
  background-color: #0066cc;
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #0055aa;
  }
`;

const ProgramContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const MainContent = styled.div``;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin: 0 0 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f0f0f0;
`;

const Description = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
  
  p {
    margin-bottom: 1.5rem;
  }
  
  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
`;

const Sidebar = styled.div``;

const SidebarSection = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const SidebarSectionTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin: 0 0 1rem;
`;

const AttributeList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const AttributeItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const AttributeName = styled.span`
  font-weight: 500;
  color: #555;
`;

const AttributeValue = styled.span`
  color: #333;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
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

const ProgramDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProgram = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await fetchProgramById(parseInt(id));
        setProgram(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load program details. Please try again later.');
        setLoading(false);
      }
    };

    loadProgram();
  }, [id]);

  if (loading) {
    return (
      <PageContainer>
        <LoadingMessage>Loading program details...</LoadingMessage>
      </PageContainer>
    );
  }

  if (error || !program) {
    return (
      <PageContainer>
        <BackLink to="/programs">Back to Programs</BackLink>
        <ErrorMessage>{error || 'Program not found'}</ErrorMessage>
      </PageContainer>
    );
  }

  // Function to create HTML content from description
  const createMarkup = (htmlContent: string) => {
    return { __html: htmlContent };
  };

  const mainImage = program.images && program.images.length > 0 
    ? program.images[0].src 
    : 'https://via.placeholder.com/600x400?text=No+Image';

  return (
    <PageContainer>
      <BackLink to="/programs">Back to Programs</BackLink>
      
      <ProgramHeader>
        <ImageContainer>
          <ProgramImage src={mainImage} alt={program.name} />
        </ImageContainer>
        
        <ProgramInfo>
          <Title>{program.name}</Title>
          
          <CategoryTags>
            {program.categories.map((category, index) => (
              <Tag key={index}>{category.name}</Tag>
            ))}
          </CategoryTags>
          
          <Price>{program.price ? `$${program.price}` : 'Contact for Price'}</Price>
          
          <ShortDescription dangerouslySetInnerHTML={createMarkup(program.short_description)} />
          
          <ApplyButton href="#apply">Apply Now</ApplyButton>
        </ProgramInfo>
      </ProgramHeader>
      
      <ProgramContent>
        <MainContent>
          <SectionTitle>Program Description</SectionTitle>
          <Description dangerouslySetInnerHTML={createMarkup(program.description)} />
        </MainContent>
        
        <Sidebar>
          <SidebarSection>
            <SidebarSectionTitle>Program Details</SidebarSectionTitle>
            <AttributeList>
              {program.attributes.map((attribute, index) => (
                <AttributeItem key={index}>
                  <AttributeName>{attribute.name}</AttributeName>
                  <AttributeValue>{attribute.options.join(', ')}</AttributeValue>
                </AttributeItem>
              ))}
            </AttributeList>
          </SidebarSection>
          
          <SidebarSection>
            <SidebarSectionTitle>Related Tags</SidebarSectionTitle>
            <CategoryTags>
              {program.tags.map((tag, index) => (
                <Tag key={index}>{tag.name}</Tag>
              ))}
            </CategoryTags>
          </SidebarSection>
        </Sidebar>
      </ProgramContent>
    </PageContainer>
  );
};

export default ProgramDetailPage; 