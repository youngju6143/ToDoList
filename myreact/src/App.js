import { useState, useEffect } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css';

import Home from './Components/Home'
import List from './Components/List'
import Login from './Components/Login'


function App() {
  return (
    <div>
    <Routes>
      <Route path='/' element={<Home></Home>} />
      <Route path='/login' element={<Login></Login>} />
      <Route path='/list' element={<List></List>} />
      <Route path='/fail' element={<div> fail to login </div>} />
      <Route path="*" element={<div> 404 Not Found </div>}/>     
    </Routes>
    </div>
  );
}

export default App;
