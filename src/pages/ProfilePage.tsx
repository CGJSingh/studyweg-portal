import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProfileSkeleton } from '../components/SkeletonLoaders';

const ProfileContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const AvatarContainer = styled.div`
  position: relative;
  margin-right: 2rem;
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 1.5rem;
  }
`;

const Avatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #e0e0e0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #9e9e9e;
  background-size: cover;
  background-position: center;
`;

const EditAvatarButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #3f51b5;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #303f9f;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const ProfileMeta = styled.div`
  margin-bottom: 1rem;
  color: #666;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  
  span {
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 0.5rem;
    }
  }
`;

const ProfileBio = styled.p`
  color: #555;
  margin-bottom: 1rem;
  max-width: 600px;
`;

const EditButton = styled.button`
  background-color: transparent;
  color: #3f51b5;
  border: 1px solid #3f51b5;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  transition: all 0.3s;
  
  svg {
    margin-right: 0.5rem;
  }
  
  &:hover {
    background-color: #f0f3ff;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 1px solid #ddd;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 1rem 1.5rem;
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

const Section = styled.div`
  margin-bottom: 3rem;
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

const Card = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`;

const FormColumn = styled.div`
  flex: 1;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #3f51b5;
    outline: none;
  }
`;

const SaveButton = styled.button`
  background-color: #3f51b5;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #303f9f;
  }
`;

const CancelButton = styled.button`
  background-color: transparent;
  color: #666;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const AchievementGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const AchievementCard = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const AchievementIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: #f0f3ff;
  border-radius: 50%;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3f51b5;
  font-size: 1.5rem;
`;

const AchievementTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const AchievementDesc = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const AchievementDate = styled.div`
  margin-top: 1rem;
  font-size: 0.8rem;
  color: #888;
`;

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  university: string;
  fieldOfStudy: string;
}

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    bio: 'Computer Science student passionate about web development and artificial intelligence. Looking to expand my knowledge and connect with fellow students.',
    university: 'New York University',
    fieldOfStudy: 'Computer Science'
  });

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Show skeleton for 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleSave = () => {
    // Here you would typically send the updated profile data to your backend
    console.log('Saving profile data:', profileData);
    setEditMode(false);
  };

  const renderProfileInfo = () => {
    if (editMode) {
      return (
        <Card>
          <FormRow>
            <FormColumn>
              <FormGroup>
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </FormColumn>
            <FormColumn>
              <FormGroup>
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </FormColumn>
          </FormRow>
          
          <FormRow>
            <FormColumn>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </FormColumn>
            <FormColumn>
              <FormGroup>
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </FormColumn>
          </FormRow>
          
          <FormGroup>
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location"
              name="location"
              value={profileData.location}
              onChange={handleInputChange}
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio"
              name="bio"
              value={profileData.bio}
              onChange={handleInputChange}
            />
          </FormGroup>
          
          <FormRow>
            <FormColumn>
              <FormGroup>
                <Label htmlFor="university">University</Label>
                <Input 
                  id="university"
                  name="university"
                  value={profileData.university}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </FormColumn>
            <FormColumn>
              <FormGroup>
                <Label htmlFor="fieldOfStudy">Field of Study</Label>
                <Input 
                  id="fieldOfStudy"
                  name="fieldOfStudy"
                  value={profileData.fieldOfStudy}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </FormColumn>
          </FormRow>
          
          <ButtonGroup>
            <SaveButton onClick={handleSave}>Save Changes</SaveButton>
            <CancelButton onClick={() => setEditMode(false)}>Cancel</CancelButton>
          </ButtonGroup>
        </Card>
      );
    }
    
    return (
      <Card>
        <FormRow>
          <FormColumn>
            <FormGroup>
              <Label>First Name</Label>
              <p>{profileData.firstName}</p>
            </FormGroup>
          </FormColumn>
          <FormColumn>
            <FormGroup>
              <Label>Last Name</Label>
              <p>{profileData.lastName}</p>
            </FormGroup>
          </FormColumn>
        </FormRow>
        
        <FormRow>
          <FormColumn>
            <FormGroup>
              <Label>Email</Label>
              <p>{profileData.email}</p>
            </FormGroup>
          </FormColumn>
          <FormColumn>
            <FormGroup>
              <Label>Phone</Label>
              <p>{profileData.phone}</p>
            </FormGroup>
          </FormColumn>
        </FormRow>
        
        <FormGroup>
          <Label>Location</Label>
          <p>{profileData.location}</p>
        </FormGroup>
        
        <FormGroup>
          <Label>Bio</Label>
          <p>{profileData.bio}</p>
        </FormGroup>
        
        <FormRow>
          <FormColumn>
            <FormGroup>
              <Label>University</Label>
              <p>{profileData.university}</p>
            </FormGroup>
          </FormColumn>
          <FormColumn>
            <FormGroup>
              <Label>Field of Study</Label>
              <p>{profileData.fieldOfStudy}</p>
            </FormGroup>
          </FormColumn>
        </FormRow>
        
        <EditButton onClick={() => setEditMode(true)}>
          <FontAwesomeIcon icon={['fas', 'edit']} /> Edit Profile
        </EditButton>
      </Card>
    );
  };

  const renderAchievements = () => {
    const achievements = [
      {
        id: 1,
        title: 'Fast Learner',
        description: 'Completed 5 courses in 30 days',
        date: 'Earned on May 15, 2023',
        icon: 'bolt'
      },
      {
        id: 2,
        title: 'Perfect Score',
        description: 'Achieved 100% on 3 consecutive assignments',
        date: 'Earned on April 3, 2023',
        icon: 'star'
      },
      {
        id: 3,
        title: 'Team Player',
        description: 'Successfully collaborated on 10 group projects',
        date: 'Earned on June 20, 2023',
        icon: 'users'
      },
      {
        id: 4,
        title: 'Knowledge Seeker',
        description: 'Completed all optional learning materials',
        date: 'Earned on July 5, 2023',
        icon: 'book'
      }
    ];
    
    return (
      <AchievementGrid>
        {achievements.map(achievement => (
          <AchievementCard key={achievement.id}>
            <AchievementIcon>
              <FontAwesomeIcon icon={['fas', achievement.icon as any]} />
            </AchievementIcon>
            <AchievementTitle>{achievement.title}</AchievementTitle>
            <AchievementDesc>{achievement.description}</AchievementDesc>
            <AchievementDate>{achievement.date}</AchievementDate>
          </AchievementCard>
        ))}
      </AchievementGrid>
    );
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <AvatarContainer>
          <Avatar style={{ backgroundImage: `url(https://via.placeholder.com/150)` }}>
            {/* If no image: display initials */}
            {/* {profileData.firstName[0] + profileData.lastName[0]} */}
          </Avatar>
          <EditAvatarButton>
            <FontAwesomeIcon icon={['fas', 'camera']} />
          </EditAvatarButton>
        </AvatarContainer>
        
        <ProfileInfo>
          <ProfileName>{profileData.firstName} {profileData.lastName}</ProfileName>
          <ProfileMeta>
            <span>
              <FontAwesomeIcon icon={['fas', 'university']} />
              {profileData.university}
            </span>
            <span>
              <FontAwesomeIcon icon={['fas', 'graduation-cap']} />
              {profileData.fieldOfStudy}
            </span>
            <span>
              <FontAwesomeIcon icon={['fas', 'map-marker-alt']} />
              {profileData.location}
            </span>
          </ProfileMeta>
          <ProfileBio>{profileData.bio}</ProfileBio>
        </ProfileInfo>
      </ProfileHeader>
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'profile'} 
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </Tab>
        <Tab 
          active={activeTab === 'achievements'} 
          onClick={() => setActiveTab('achievements')}
        >
          Achievements
        </Tab>
        <Tab 
          active={activeTab === 'preferences'} 
          onClick={() => setActiveTab('preferences')}
        >
          Preferences
        </Tab>
      </TabsContainer>
      
      {activeTab === 'profile' && (
        <Section>
          <SectionTitle>
            <FontAwesomeIcon icon={['fas', 'user']} />
            Profile Information
          </SectionTitle>
          {renderProfileInfo()}
        </Section>
      )}
      
      {activeTab === 'achievements' && (
        <Section>
          <SectionTitle>
            <FontAwesomeIcon icon={['fas', 'medal']} />
            Achievements
          </SectionTitle>
          {renderAchievements()}
        </Section>
      )}
      
      {activeTab === 'preferences' && (
        <Section>
          <SectionTitle>
            <FontAwesomeIcon icon={['fas', 'cog']} />
            Account Preferences
          </SectionTitle>
          <Card>
            <p>Account preferences settings will be available soon.</p>
          </Card>
        </Section>
      )}
    </ProfileContainer>
  );
};

export default ProfilePage; 