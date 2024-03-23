import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import CreateTask from './CreateTask'
import Tasks from './Tasks'
import ProfilePage from './ProfilePage'

export default function MainRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/register' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/addtask' element={<CreateTask/>}/>
            <Route path='/' element={<Tasks/>}/>
            <Route path="/profile" element={<ProfilePage/>} />
        </Routes>
    </div>
  )
}