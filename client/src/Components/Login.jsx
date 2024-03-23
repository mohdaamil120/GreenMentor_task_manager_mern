import React,{useState} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import {useToast } from '@chakra-ui/react';

export default function Login() {  
    const [email, setEmail] = useState("")  
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const toast = useToast();
  
    const handleLogin = ()=>{
      const data = {
          email,password
      }
      // console.log(data)
      fetch("https://greenmentor-task-manager-backend.onrender.com/users/login",{
          method:"POST",
          headers:{
              "Content-type":"application/json"
          },
          body:JSON.stringify(data)
      })
      .then(res => {
        if (res.status === 200) {
            // Redirect to Task page upon successful Login
            navigate('/');
            // Show success toast
            toast({
                title: 'Login Successful',
                description: 'You have successfully logged in!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
          }
          return res.json();
      })
      .then((data) =>{
        console.log(data)
        localStorage.setItem("token",data.token)
        // alert(data.message);
        toast({
            title: data.message,
            // description: 'Please Enter right Credentials!',
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
            description: 'Invalid email or password. Please try again.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
    })

    }
  
    return (
      <DIV>
      <LoginContainer>
     
      <LoginTitle>Login with your credentials</LoginTitle>
      <InputField type="email" value={email} placeholder='Enter email...' onChange={(e) => setEmail(e.target.value)}/>
      <InputField type="password" value={password} placeholder='Enter password...' onChange={(e) => setPassword(e.target.value)}/>
      <LoginButton onClick={handleLogin}>Login</LoginButton>
     
      </LoginContainer>
      </DIV>
    )
}



const LoginContainer = styled.div`
  margin-top: 20px;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #ffffff;
  height: 40vh;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const LoginTitle = styled.h1`
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

const LoginButton = styled.button`
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
  background-color: #f8cfcf;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`