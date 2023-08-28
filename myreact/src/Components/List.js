import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from "axios"

// import {data, addData} from './Data'

const changeTitle = (e, setTitle) => {
    setTitle(e.target.value) 
}
const changeDate = (e, setDate) => {
    setDate(e.target.value)
}
const addTodo = (title, date, setTodo, setTitle, setDate, navigate) => {
    const newTodo = {
      title: title,
      date: date
    };
    setTodo(prevTodo => [...prevTodo, newTodo]);
    setTitle('');
    setDate('');

    axios.post('http://localhost:8000/add', newTodo)
        .then((res) => {
            navigate('/list')
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
    })

    let input = document.querySelector('.inputDate')
    input.value = ''
    input = document.querySelector('.inputTitle')
    input.value = ''
  }

function List() {
    let [date, setDate] = useState("")
    let [title, setTitle] = useState("")
    let [todo, setTodo] = useState([])
    let [inputValue, setInputValue] = useState('');

    let navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8000/add')  
            .then((res) => { 
                setTodo(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
        })
    }, [])

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

            <div className='container'>
                <div className='inputBox'>
                    <InputToDo style={{justifyContent: "space-between"}} title={title} setTitle={setTitle} date={date} setDate={setDate} todo={todo} setTodo={setTodo}></InputToDo> 
                </div>
                
                <div className='listBox'>
                    {
                        todo.map((a, i) => (
                            <div className='listItem' key={i}>
                                <input type='checkbox' />
                                <div>
                                    <span style={{whiteSpace: "nowrap"}}>{a.title}</span>
                                    <span style={{}}>{a.date}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="container">
                <ul className="list-group">
                
                    
                </ul>
            </div>
                
                    {/* <button type="submit" className="submitButton" onClick={ () => {navigate('/write')}}> 작성하기 </button> */}
                    {/* <button type="submit" className="submitButton" onClick={console.log(',')}> 작성하기 </button> */}
        </div>
    )
}


function InputToDo(props) {
    let navigate = useNavigate()

    return (
      <div>
        <div style={{padding: '10px'}}>
            <input onChange={(e) => 
            changeDate(e, props.setDate)} 
            type="date" 
            className='inputDate'></input>
        </div>

        <div style={{padding: '10px'}}>
            <input onChange={(e) => 
            changeTitle(e, props.setTitle)} 
            type="text" 
            placeholder="할 일을 입력하세요" 
            className='inputTitle'></input>
        </div>

        <button type="submit" className="submitButton" onClick={() => {
            addTodo(props.title, props.date, props.setTodo, props.setTitle, props.setDate, navigate)
        }}>todo!</button>
       

        
      </div>
    );
  }
  
export default List

