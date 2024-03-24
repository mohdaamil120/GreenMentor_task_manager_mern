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


















// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';

// export default function Navbar() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false); // Assuming initial state is not authenticated

//   useEffect(() => {
//     // Check if the user is authenticated (e.g., check if token exists in local storage)
//     const token = localStorage.getItem('token');
//     setIsAuthenticated(!isAuthenticated); // Update isAuthenticated based on token existence
//   }, [localStorage.getItem('token'), localStorage.removeItem("token")]);





//   return (
//     <NavbarContainer>
//       <Logo>
//         <Link to={"/"}><h1>Tasks Management App</h1></Link>
//       </Logo>
//       <Menu>
//         <Link to={"/"}>Tasks</Link>
//         {isAuthenticated && <Link to={"/profile"}>Profile</Link>}
//         {!isAuthenticated && <Link to={"/login"}>Login</Link>}
//         {!isAuthenticated && <Link to={"/register"}>Register</Link>}
//         {isAuthenticated && <Link to={"/addtask"}>Add New Task</Link>}
//       </Menu>
//     </NavbarContainer>
//   );
// }

// const NavbarContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background-color: #4caf50;
//   color: white;
//   padding: 10px 40px 10px 40px;
//   border: 2px solid #4caf50;
//   border-radius: 5px;
// `;

// const Logo = styled.div`
//   font-size: 40px;
//   h1 {
//     cursor: pointer;
//     text-decoration: none;
//     color: white;
//     transition: color 0.3s ease;
//   }
// `;

// const Menu = styled.div`
//   display: flex;
//   gap: 40px;
//   padding-right: 20px;
//   font-size: 20px;

//   a {
//     text-decoration: none;
//     color: white;
//     transition: color 0.3s ease;

//     &:hover {
//       color: #0e2ba8;
//     }
//   }
// `;
