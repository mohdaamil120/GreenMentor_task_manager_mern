import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useToast } from '@chakra-ui/react';

export default function Signup() {
  const [username, setUsername] = useState("")  
  const [email, setEmail] = useState("")  
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const toast = useToast();

  const handleRegister = ()=>{
    const data = {
        username,email,password
    }
    // console.log(data)
    fetch("https://greenmentor-task-manager-backend.onrender.com/users/register",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(data)
    })
    .then(res => {
        if (res.status === 200) {
            // Redirect to login page upon successful registration
            navigate('/login');
             // Show success toast
            toast({
                title: 'Registration Successful',
                description: 'You have successfully registered!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
          }
          return res.json();
      })
      .then((data) =>{
        console.log(data)
        // alert(data.message);
         toast({
          title: 'Registration Message',
          description: data.message, // Display registration message from the server
          status: 'success',
          duration: 3000,
          isClosable: true,
          });
    })         
    .catch(err => {
        console.log(err)
        // alert(err.message)
        toast({
            title: err.message,
            description: 'An error occurred while registering. Please try again later.',
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
    })

  }

  return (
    <DIV> 
    <SignupContainer>
    <SignupTitle>Register a new user</SignupTitle>
    <InputField
      type="text"
      value={username}
      placeholder="Enter username..."
      onChange={(e) => setUsername(e.target.value)}
    />
    <InputField
      type="email"
      value={email}
      placeholder="Enter email..."
      onChange={(e) => setEmail(e.target.value)}
    />
    <InputField
      type="password"
      value={password}
      placeholder="Enter password..."
      onChange={(e) => setPassword(e.target.value)}
    />
    <RegisterButton onClick={handleRegister}>Register</RegisterButton>
  </SignupContainer>
 </DIV> 
  )
}



const SignupContainer = styled.div`
  width: 330px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #ffffff;

  margin-top: 20px;
  height: 50vh;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const SignupTitle = styled.h1`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
`;

const RegisterButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;


const DIV = styled.div`
  /* background-color: #f8cfcf;
  height: 100vh; */
  background-color: #f8cfcf; /* Updated background color */
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`




