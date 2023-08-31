import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from "axios"

import {changeDate, changeTitle, addTodo} from './Function'

function List() {
    let [id, setId] = useState("")
    let [date, setDate] = useState("")
    let [title, setTitle] = useState("")
    let [todo, setTodo] = useState([])
    let [writer, setWriter] = useState("")
    let [inputValue, setInputValue] = useState('');

    let navigate = useNavigate()

    useEffect(() => {
        fetchTodo()
    }, [])

    const fetchTodo = () => {
        axios.get('http://localhost:8000/add')  
            .then((res) => { 
                setId(res.data)
                setTodo(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
        })
    }
    
    
    const deleteTodo = (id, i) => {
        if(window.confirm('정말 삭제할까요?')) {
            let copy = [...todo]
            copy.splice(i,1)
            setTodo(copy)
            alert('삭제되었습니다.')

            axios.delete(`http://localhost:8000/delete/${id}`)
            .then((res) => { 
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
    
    return (
        <div> 
            <div className='title'>
                <h1 className='homeFont'> To Do List </h1>
            </div>

            <div className='container'>
                <div className='inputBox'>
                    <InputToDo style={{justifyContent: "space-between"}} title={title} setTitle={setTitle} date={date} setDate={setDate} writer={writer} setWriter={setWriter} todo={todo} setTodo={setTodo}></InputToDo> 
                </div>
                <div className='listBox'>
                    {
                        todo.map((a, i) => {
                            return (
                                <div className='listItem' key={i}>
                                    <input type='checkbox' />
                                    <div>
                                        <span style={{whiteSpace: "nowrap"}}>{a.title}</span>
                                        <span>{a.date}</span>
                                    </div>
                                    <button className='deleteButton' data-id={todo._id} onClick={() => {
                                        var id = a._id
                                        deleteTodo(id, i)
                                        
                                    }} > 🗑️ </button>
                                </div>
                            )
                        })
                    }
                   
                </div>
            </div>
            <div className="container">
                <ul className="list-group">
                
                    
                </ul>
            </div>
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
            addTodo(props.title, props.date, props.writer, props.setTodo, props.setTitle, props.setDate, props.setWriter, navigate)
        }}>todo!</button>
       

        <button type="submit" className="submitButton" onClick={() => {navigate('/mypage')
        }}> mypage </button>
      </div>
    );
  }
  
export default List

