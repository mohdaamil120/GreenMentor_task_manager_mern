import styled from 'styled-components';
import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {

  return (

    <NavbarContainer>
        <Logo>
       
        <Link to={"/"}> <h1>Tasks Management App</h1></Link>
        </Logo>
        <Menu>
        <Link to={"/"}>Tasks</Link>
        <Link to={"/login"}>Login</Link>
        <Link to={"/register"}>Register</Link>
        <Link to={"/profile"}>Profile</Link> 
        <Link to={"/addtask"}>Add New Task</Link>
        </Menu>
    
  </NavbarContainer>
    
    
  )
}


const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #4caf50;
  color: white;
  padding: 10px 40px 10px 40px;
  border: 2px solid #4caf50 ;
  border-radius: 5px;
`;

const Logo = styled.div`
  font-size: 40px;

  h1{
    cursor: pointer;
    text-decoration: none;
    color: white;
    transition: color 0.3s ease;

    
  }
`;

const Menu = styled.div`
  display: flex;
  gap: 40px;
  padding-right: 20px;
  font-size: 20px;

  a {
    text-decoration: none;
    color: white;
    transition: color 0.3s ease;

    &:hover {
      color: #0e2ba8; 
    }
  }
`;