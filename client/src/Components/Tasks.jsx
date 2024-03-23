import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Textarea, Input, useDisclosure } from "@chakra-ui/react";
import styled from 'styled-components';
import { useToast } from "@chakra-ui/react"; 


export default function Tasks() {
  const [data,setData] = useState([])
  const [render,setRender] = useState(false)
  const [editedTask, setEditedTask] = useState({ id: '', title: '', description: '' });
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();

  useEffect(()=>{
    fetch("https://greenmentor-task-manager-backend.onrender.com/tasks",{
          headers:{
              "Content-type":"application/json",
              "Authorization":`Bearer ${localStorage.getItem("token")}`
          }
      })
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        setData([...data])
      })
      .catch(err => console.log(err))

  },[render])

  const handleDelete = (id)=>{
    fetch(`https://greenmentor-task-manager-backend.onrender.com/tasks/delete/${id}`,{
          method:"DELETE",
          headers:{
              "Content-type":"application/json",
              "Authorization":`Bearer ${localStorage.getItem("token")}`
          }
      })
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        setData((prevData) => prevData.filter((note) => note._id !== id))
         // toast for successful task deletion
        toast({
            title: "Task Deleted",
            description: "Task has been successfully deleted.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
      })
      .catch(err => {
        console.log(err);
        // toast for error in task deletion
        toast({
            title: "Error",
            description: "An error occurred while deleting the task.",
            status: "error",
            duration: 3000,
            isClosable: true,
        });
    });

      setRender((prev)=>!prev)
  }


  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevNote) => ({ ...prevNote, [name]: value }));
  }


  const handleEditSubmit = () => {
    fetch(`https://greenmentor-task-manager-backend.onrender.com/tasks/update/${editedTask.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        title: editedTask.title,
        description: editedTask.description
      })
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        setData((prevData) => prevData.map((note) => (note._id === editedTask.id ? { ...note, title: editedTask.title, description: editedTask.description } : note)));
        // handleCloseEditModal();
         //  toast for successful task edition
         toast({
            title: "Task Edited",
            description: "Task has been successfully edited.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        onClose();
    })
    .catch(err => {
        console.log(err);
        // toast for error in task edition
        toast({
            title: "Error",
            description: "An error occurred while editing the task.",
            status: "error",
            duration: 3000,
            isClosable: true,
        });
    });

    setRender((prev) => !prev);
    onClose();
  }

  
  const handleEditClick = (note) => {
    onOpen(); // Open the modal
    setEditedTask({ id: note._id, title: note.title, description: note.description });
  }

  return (
    <NotesContainer>
    <div   >
        <h1 className='head' >All the tasks are here...</h1>
            {
                data.length === 0 ? <h2 style={{color:"#CCE5FF"}}>No tasks found.</h2> :
                    data.map((el, indx) => {
                        return (
                            <NoteCard key={indx + 1}>
                                <div id='card' >
                                    <h3>{el.title}</h3>
                                    <p>{el.description}</p>
                                    <button onClick={() => handleEditClick(el)}>Edit</button>
                                    <button onClick={() => handleDelete(el._id)} >Delete</button>
                                </div>
                            </NoteCard>
                        )
                    })
            }

        <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Edit Task</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <label>Title:</label>
                    <Input type="text" name="title" value={editedTask.title} onChange={handleEditInputChange} />
                    <label>Description:</label>
                    <Textarea name="description" value={editedTask.description} onChange={handleEditInputChange} />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3}  onClick={handleEditSubmit}>
                    Submit
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>

    </div>
    </NotesContainer>
  )
}



const NotesContainer = styled.div`
height: 90vh;
 background-color: #091758;
  padding: 20px;
  border-radius: 5px;

  h1{
    color: white;
    font-size: 30px;
  }
`;

const NoteCard = styled.div`
  /* background-color: #090958; */
  background-color: #050541;
  color: white;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
  }

  button {
    margin-right: 10px;
    background-color: #4caf50;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #388e3c; /* Darker green color on hover */
    }
  }
`;