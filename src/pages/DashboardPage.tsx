import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const WelcomeSection = styled.div`
  background: linear-gradient(135deg, #3f51b5 0%, #673ab7 100%);
  border-radius: 10px;
  padding: 2rem;
  color: white;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WelcomeText = styled.div`
  max-width: 70%;
`;

const WelcomeTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const WelcomeSubtitle = styled.p`
  opacity: 0.9;
  margin-bottom: 1.5rem;
`;

const ActionButton = styled.button`
  background-color: white;
  color: #3f51b5;
  border: none;
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
    transform: translateY(-2px);
  }
`;

const StatisticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: #f0f3ff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: #3f51b5;
`;

const StatTitle = styled.h3`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
    color: #3f51b5;
  }
`;

const ProgramsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const ProgramCard = styled.div`
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ProgramImage = styled.div`
  height: 160px;
  background-color: #e0e0e0;
  background-size: cover;
  background-position: center;
`;

const ProgramContent = styled.div`
  padding: 1.5rem;
`;

const ProgramTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const ProgramDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const ProgramMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #888;
  font-size: 0.85rem;
`;

const ProgressContainer = styled.div`
  margin-top: 0.75rem;
`;

const ProgressBar = styled.div`
  height: 6px;
  background-color: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ width: number }>`
  height: 100%;
  width: ${props => props.width}%;
  background-color: #4caf50;
  border-radius: 3px;
`;

const ProgressText = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.5rem;
  text-align: right;
`;

const ViewAllLink = styled(Link)`
  display: inline-block;
  color: #3f51b5;
  font-weight: 500;
  text-decoration: none;
  margin-left: auto;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #ddd;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  border: none;
  color: ${props => props.active ? '#3f51b5' : '#666'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: ${props => props.active ? '#3f51b5' : 'transparent'};
  }
  
  &:hover {
    color: #3f51b5;
  }
`;

const ActivityList = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const ActivityItem = styled.div`
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: #f9f9f9;
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: #f0f3ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: #3f51b5;
  flex-shrink: 0;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.h4`
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: #333;
`;

const ActivityMeta = styled.div`
  display: flex;
  font-size: 0.85rem;
  color: #888;
`;

const ActivityTime = styled.span`
  margin-left: 1rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.3rem;
  }
`;

const mockPrograms = [
  {
    id: 1,
    title: 'Computer Science Fundamentals',
    description: 'Learn the core concepts of computer science and programming',
    image: 'https://via.placeholder.com/300x160/3f51b5/ffffff?text=CS+Fundamentals',
    progress: 65,
    dueDate: '15 May 2023',
    university: 'MIT'
  },
  {
    id: 2,
    title: 'Web Development Masterclass',
    description: 'Master modern web development with React and Node.js',
    image: 'https://via.placeholder.com/300x160/673ab7/ffffff?text=Web+Development',
    progress: 32,
    dueDate: '22 June 2023',
    university: 'Stanford'
  },
  {
    id: 3,
    title: 'Data Science Bootcamp',
    description: 'Analyze complex datasets and build predictive models',
    image: 'https://via.placeholder.com/300x160/2196f3/ffffff?text=Data+Science',
    progress: 78,
    dueDate: '10 May 2023',
    university: 'Harvard'
  }
];

const mockActivities = [
  {
    id: 1,
    type: 'submission',
    title: 'Assignment Submitted: Database Design',
    program: 'Computer Science Fundamentals',
    time: '2 hours ago',
    icon: 'paper-plane' as IconName
  },
  {
    id: 2,
    type: 'feedback',
    title: 'Feedback Received: JavaScript Basics',
    program: 'Web Development Masterclass',
    time: 'Yesterday',
    icon: 'comment' as IconName
  },
  {
    id: 3,
    type: 'deadline',
    title: 'Upcoming Deadline: Final Project',
    program: 'Data Science Bootcamp',
    time: 'In 3 days',
    icon: 'calendar' as IconName
  },
  {
    id: 4,
    type: 'certificate',
    title: 'Certificate Earned: Python Programming',
    program: 'Computer Science Fundamentals',
    time: 'Last week',
    icon: 'certificate' as IconName
  }
];

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [activities, setActivities] = useState(mockActivities);

  // In a real application, you would fetch this data from an API
  useEffect(() => {
    // Simulate API request
    if (activeTab === 'all') {
      setActivities(mockActivities);
    } else {
      setActivities(mockActivities.filter(activity => activity.type === activeTab));
    }
  }, [activeTab]);

  return (
    <DashboardContainer>
      <WelcomeSection>
        <WelcomeText>
          <WelcomeTitle>Welcome back, Alex!</WelcomeTitle>
          <WelcomeSubtitle>Track your progress, manage your programs, and stay up to date with your studies.</WelcomeSubtitle>
          <ActionButton>
            Resume Learning
          </ActionButton>
        </WelcomeText>
      </WelcomeSection>
      
      <StatisticsGrid>
        <StatCard>
          <StatIcon>
            <FontAwesomeIcon icon={['fas', 'book']} size="lg" />
          </StatIcon>
          <StatTitle>Active Programs</StatTitle>
          <StatValue>3</StatValue>
        </StatCard>
        
        <StatCard>
          <StatIcon>
            <FontAwesomeIcon icon={['fas', 'certificate']} size="lg" />
          </StatIcon>
          <StatTitle>Completed Programs</StatTitle>
          <StatValue>12</StatValue>
        </StatCard>
        
        <StatCard>
          <StatIcon>
            <FontAwesomeIcon icon={['fas', 'file-alt']} size="lg" />
          </StatIcon>
          <StatTitle>Assignments Submitted</StatTitle>
          <StatValue>24</StatValue>
        </StatCard>
        
        <StatCard>
          <StatIcon>
            <FontAwesomeIcon icon={['fas', 'clock']} size="lg" />
          </StatIcon>
          <StatTitle>Study Hours</StatTitle>
          <StatValue>187</StatValue>
        </StatCard>
      </StatisticsGrid>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <SectionTitle>
          <FontAwesomeIcon icon={['fas', 'book-open']} />
          My Programs
        </SectionTitle>
        <ViewAllLink to="/programs">View all programs</ViewAllLink>
      </div>
      
      <ProgramsGrid>
        {mockPrograms.map(program => (
          <ProgramCard key={program.id}>
            <ProgramImage style={{ backgroundImage: `url(${program.image})` }} />
            <ProgramContent>
              <ProgramTitle>{program.title}</ProgramTitle>
              <ProgramDescription>{program.description}</ProgramDescription>
              <ProgramMeta>
                <span><FontAwesomeIcon icon={['fas', 'university']} /> {program.university}</span>
                <span><FontAwesomeIcon icon={['fas', 'calendar']} /> Due: {program.dueDate}</span>
              </ProgramMeta>
              <ProgressContainer>
                <ProgressBar>
                  <ProgressFill width={program.progress} />
                </ProgressBar>
                <ProgressText>{program.progress}% Complete</ProgressText>
              </ProgressContainer>
            </ProgramContent>
          </ProgramCard>
        ))}
      </ProgramsGrid>
      
      <SectionTitle>
        <FontAwesomeIcon icon={['fas', 'stream']} />
        Recent Activity
      </SectionTitle>
      
      <TabsContainer>
        <Tab active={activeTab === 'all'} onClick={() => setActiveTab('all')}>
          All Activities
        </Tab>
        <Tab active={activeTab === 'submission'} onClick={() => setActiveTab('submission')}>
          Submissions
        </Tab>
        <Tab active={activeTab === 'feedback'} onClick={() => setActiveTab('feedback')}>
          Feedback
        </Tab>
        <Tab active={activeTab === 'deadline'} onClick={() => setActiveTab('deadline')}>
          Deadlines
        </Tab>
      </TabsContainer>
      
      <ActivityList>
        {activities.map(activity => (
          <ActivityItem key={activity.id}>
            <ActivityIcon>
              <FontAwesomeIcon icon={['fas', activity.icon]} />
            </ActivityIcon>
            <ActivityContent>
              <ActivityTitle>{activity.title}</ActivityTitle>
              <ActivityMeta>
                <span><FontAwesomeIcon icon={['fas', 'book']} /> {activity.program}</span>
                <ActivityTime>
                  <FontAwesomeIcon icon={['fas', 'clock']} />
                  {activity.time}
                </ActivityTime>
              </ActivityMeta>
            </ActivityContent>
          </ActivityItem>
        ))}
      </ActivityList>
    </DashboardContainer>
  );
};

export default DashboardPage; 