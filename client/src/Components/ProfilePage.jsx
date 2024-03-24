import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Heading, Text, Input, Button, Stack, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://greenmentor-task-manager-backend.onrender.com/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(res.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setUsername(user.username);
    setEmail(user.email);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.patch('https://greenmentor-task-manager-backend.onrender.com/users/profile', { username, email }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(res.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Center>
      <Box marginTop="20%" p="10" borderWidth="1px" borderRadius="lg" boxShadow="lg">
        <Heading mb="4">Profile</Heading>
        {user ? (
          <Stack spacing="4">
            {!isEditing ? (
              <Box>
                <Text fontSize="lg">Name: {user.username}</Text>
                <Text fontSize="lg">Email: {user.email}</Text>
                <Button onClick={handleEdit}>Edit</Button>
                <Button onClick={handleLogout}>Logout</Button>
              </Box>
            ) : (
              <Stack spacing="4">
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                />
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handleLogout}>Logout</Button>
              </Stack>
            )}
          </Stack>
        ) :(
          <Text fontSize="lg">Please log in to view your profile.</Text>
        )
        }
      </Box>
    </Center>
  );
};

export default ProfilePage;









