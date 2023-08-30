import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from "axios"

function Login() {
    let [id, setId] = useState("")
    let [pw, setPw] = useState("")
    let navigate = useNavigate()
    
    return (
        <div>
            <div className='title'>
                <h1 className='homeFont'> To Do List </h1>
            </div>

            <LoginForm id={id} setId={setId} pw={pw} setPw={setPw} />
        </div>
    )
}

export default Login

function LoginForm(props) {
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

                <button type="submit" className="submitButton" onClick={() => {
                    axios.post('http://localhost:8000/login', {id: props.id, pw: props.pw})
                    .then((res) => {
                        navigate('/list')
                        console.log(res.data)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                    }}> 로그인 </button>
            </div>
            <div>
                <div style={{padding: '10px'}}>
                    <h2> 회원가입 </h2>
                    <input onChange={(e) => {
                        props.setId(e.target.value) 
                    }}
                    type="text" 
                    placeholder="아이디" 
                    className='inputDate'></input>
                </div>

                <div style={{padding: '10px'}}>
                    <input onChange={(e) => {
                        props.setPw(e.target.value) 
                    }}
                    type="password" 
                    placeholder="비밀번호" 
                    className='inputDate'></input>
                </div>

                <button type="submit" className="submitButton" onClick={() => {
                    axios.post('http://localhost:8000/register', {id: props.id, pw: props.pw})
                    .then((res) => {
                        navigate('/list')
                        console.log(res.data)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                    }}> 회원가입 </button>
            </div>
            
        </div>
    )
}
