import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from "axios"


function Login() {
    let navigate = useNavigate()

    return (
        <div> 
            <nav className="navbar">
                <ul className='navbarMenu'>
                <Link className='navbarMenu' to="/list"> home </Link>
                <Link className='navbarMenu' to="/mypage"> mypage </Link>
                </ul> 
            </nav>

            <div className='title'>
                <p style={{fontSize: "30px", color : "white"}}> To Do List </p>
            </div>

            <LoginForm></LoginForm>
        </div>
    )
}

export default Login


function LoginForm() {
    let navigate = useNavigate()

    return (
        <div className='loginContainer'>
            <div>
                <div style={{padding: '10px'}}>
                    <h2> 로그인 </h2>
                    <input 
                    type="text" 
                    placeholder="아이디" 
                    className='inputDate'></input>
                </div>

                <div style={{padding: '10px'}}>
                    <input
                    type="password" 
                    placeholder="비밀번호" 
                    className='inputDate'></input>
                </div>

                <button type="submit" className="submitButton" onClick={() => {navigate('/list')}}> 로그인 </button>
            </div>

            <div>
                <div style={{padding: '10px'}}>
                    <h2> 회원가입 </h2>
                    <input 
                    type="text" 
                    placeholder="아이디" 
                    className='inputDate'></input>
                </div>

                <div style={{padding: '10px'}}>
                    <input
                    type="password" 
                    placeholder="비밀번호" 
                    className='inputDate'></input>
                </div>

                <button type="submit" className="submitButton" onClick={() => {navigate('/list')}}> 회원가입 </button>
            </div>
            
        </div>
    )
}
