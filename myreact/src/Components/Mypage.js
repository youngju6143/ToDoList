import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';

import axios from "axios"

function Mypage() {

    let navigate = useNavigate();
    let [writer, setWriter] = useState([])
    let [todo, setTodo] = useState([])
    useEffect(() => {
        fetchUserData()
        fetchTodo()
    }, [])

    const fetchTodo = () => {
        axios.get('http://localhost:8000/add')  
            .then((res) => { 
                setTodo(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
        })
    }
    const fetchUserData = () => {
        axios.get(`http://localhost:8000/mypage/${writer}`)  
            .then((res) => { 
                setWriter(res.data)
                let copy = [...todo]
                copy.push(writer)
                setTodo(copy)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
        })
    }

    const filteredTodo = todo.filter(current => current.writer === writer) 
    return (
        
        <div> 
            <div className='title'>
                <h1 className='homeFont'> To Do List </h1>
            </div>

            <div className='container'>
                <div className='listBox'>
                    {
                        filteredTodo.map((a, i) => {
                            return (
                                <div className='listItem' key={i}>
                                    <input type='checkbox' />
                                        <div>
                                            <span style={{whiteSpace: "nowrap"}}>{a.title}</span>
                                            <span>{a.date}</span>
                                            <span>{a.writer}</span>
                                        </div>
                                    <button className='deleteButton' data-id={todo._id} onClick={() => {
                                        var id = a._id
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


export default Mypage