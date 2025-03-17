import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 2rem 1rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const CountryList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CountryItem = styled.li`
  padding: 1rem;
  background-color: #f5f5f5;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  font-size: 1rem;
  color: #333;
  
  &:hover {
    background-color: #e0e0e0;
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

const CountriesPage: React.FC = () => {
  const [countries, setCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        
        // Fetch data from the StudyWeg API
        const response = await axios.get(
          'https://studyweg.com/wp-json/wc/v3/products', {
            params: {
              consumer_key: 'ck_9a7d01544fb71e45218afee6fed7f9f8a25d1b0f',
              consumer_secret: 'cs_f18193b595778c1cc726d336247e9c908aec3370',
              per_page: 100
            }
          }
        );
        
        console.log('API Response received:', response.data.length, 'programs');
        
        // Extract unique countries from the data
        const uniqueCountries = new Set<string>();
        
        response.data.forEach((program: any) => {
          // Look for country in attributes
          const countryAttribute = program.attributes?.find(
            (attr: any) => attr.name === "Country"
          );
          
          // If found, add all options (countries) to our set
          if (countryAttribute && countryAttribute.options) {
            countryAttribute.options.forEach((country: string) => {
              uniqueCountries.add(country);
            });
          }
          
          // Also check for institution location if available
          if (program.institution?.location) {
            uniqueCountries.add(program.institution.location);
          }
        });
        
        // Convert set to array and sort alphabetically
        const countriesArray = Array.from(uniqueCountries).sort();
        console.log('Countries found:', countriesArray);
        
        setCountries(countriesArray);
      } catch (err: any) {
        setError(err.message || 'Failed to load countries');
        console.error('Error loading countries:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCountries();
  }, []);

  if (loading) {
    return (
      <PageContainer>
        <LoadingMessage>Loading countries...</LoadingMessage>
      </PageContainer>
    );
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
      <Header>
        <Title>Countries Available in StudyWeg Programs</Title>
      </Header>
      
      {countries.length > 0 ? (
        <CountryList>
          {countries.map((country, index) => (
            <CountryItem key={index}>
              {country}
            </CountryItem>
          ))}
        </CountryList>
      ) : (
        <ErrorMessage>No countries found in the data</ErrorMessage>
      )}
    </PageContainer>
  );
};

export default CountriesPage; 