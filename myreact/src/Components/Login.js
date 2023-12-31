import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from "axios"

import Title from './Title';

const regexUser =  /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,12}$/

function Login() {
    let [id, setId] = useState("")
    let [pw, setPw] = useState("")
    let navigate = useNavigate()

    return (
        <div>
            <Title />
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
                    <input onChange={(e) => {
                        props.setId(e.target.value) 
                    }}
                    type="text" 
                    name="id"
                    placeholder="아이디" 
                    className='inputDate'></input>
                </div>

                <div style={{padding: '10px'}}>
                    <input onChange={(e) => {
                        props.setPw(e.target.value) 
                    }}
                    type="password" 
                    name="pw"
                    placeholder="비밀번호" 
                    className='inputDate'></input>
                </div>

                <button type="submit" className="submitButton" onClick={() => {
                    axios.post('/login', {id: props.id, pw: props.pw})
                    .then((result) => {
                        if (result.data == 'success to login') {
                            alert('로그인에 성공했습니다!')
                            navigate('/list')
                        }
                        else { 
                            alert('로그인 실패, 다시 입력해주세요.')
                        }
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
                    name="id"
                    placeholder="아이디" 
                    className='inputDate'></input>
                </div>

                <div style={{padding: '10px'}}>
                    <input onChange={(e) => {
                        props.setPw(e.target.value) 
                    }}
                    type="password" 
                    name="pw"
                    placeholder="비밀번호" 
                    className='inputDate'></input>
                </div>

                <button type="submit" className="submitButton" onClick={() => {

                    if(regexUser.test(props.id) && regexUser.test(props.pw)) {
                        axios.post('/register', {id: props.id, pw: props.pw})
                        .then((result2) => {
                            if (result2.data == 'success to register') {
                                alert('회원가입이 완료되었습니다!')
                            }
                            else {
                                alert('회원가입 실패 : 중복된 아이디가 존재합니다!')
                            }
                        }) 
                        .catch((err) => {
                            console.log(err)
                        })
                    } else {
                        alert('아이디와 비밀번호는 영문과 숫자를 포함한 4자 이상 12자 이하의 문자열이어야 합니다.')
                    }
                    }}> 회원가입 </button>
            </div>
        </div>
    )
}
