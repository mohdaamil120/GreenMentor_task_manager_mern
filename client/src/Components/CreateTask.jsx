import React,{useState} from 'react'
import styled from 'styled-components'
import { useToast } from '@chakra-ui/react';

export default function CreateTask() {  
    const [title, setTitle] = useState("")  
    const [description, setDescription] = useState("")
    const toast = useToast();
  
    const handleSubmit = ()=>{
      const data = {
          title, description
      }
      // console.log(data)
      fetch("https://greenmentor-task-manager-backend.onrender.com/tasks/create",{
          method:"POST",
          headers:{
              "Content-type":"application/json",
              "Authorization":`Bearer ${localStorage.getItem("token")}`
          },
          body:JSON.stringify(data)
      })
    //   .then(res => res.json())
      .then((res) => {
        if (res.status === 200) {
          toast({
            title: 'Task Created',
            description: 'Your task has been successfully created!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          // Reset input fields after successful submission
          setTitle('');
          setDescription('');
        } else {
          toast({
            title: 'Error',
            description: 'Failed to create task. Please try again later.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log(data)
        toast({
            title: data.message,
            // description: 'Failed to create task. Please try again later.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
      })
      .catch(err => console.log(err))
  
    }
  
    return (
        <DIV>
        <Container>
        <Form>
        <Title>Create a new task</Title>
        <Input
            type="text"
            value={title}
            placeholder="Enter title..."
            onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
            value={description}
            placeholder="Enter description..."
            onChange={(e) => setDescription(e.target.value)}
        />
        <Button onClick={handleSubmit}>Submit</Button>
        </Form>
        </Container>
        </DIV>
    );
    }

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
`;

const Form = styled.div`
max-width: 400px;
padding: 20px;
border-radius: 8px;
background-color: #f4f4f4;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
font-size: 24px;
text-align: center;
margin-bottom: 20px;
`;

const Input = styled.input`
width: 100%;
padding: 10px;
margin-bottom: 15px;
border: 1px solid #ccc;
border-radius: 4px;
box-sizing: border-box;
font-size: 16px;
`;

const Textarea = styled.textarea`
width: 100%;
padding: 10px;
margin-bottom: 15px;
border: 1px solid #ccc;
border-radius: 4px;
box-sizing: border-box;
font-size: 16px;
`;

const Button = styled.button`
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









