import { useState, useEffect } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css';

import Write from './Components/Write'
import Home from './Components/Home'
import List from './Components/List'


function App() {
  return (
    <div>
    <Routes>
      <Route path='/' element={<Home></Home>} />
      <Route path='/write' element={<Write></Write>} />
      <Route path='/list' element={<List></List>} />
    </Routes>
    </div>
  );
}

export default App;
