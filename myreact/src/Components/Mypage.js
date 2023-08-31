import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';

import axios from "axios"

function Mypage() {

    let navigate = useNavigate();
    let [writer, setWriter] = useState([])
    let [todo, setTodo] = useState([])
    useEffect(() => {
        fetchTodo()
    }, [])
    useEffect(() => {
        fetchUserData()
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
    const deleteTodo = (id, i) => {
        if(window.confirm('정말 삭제할까요?')) {
            axios.delete(`http://localhost:8000/delete/${id}`)
            .then((res) => { 
                let copy = [...todo]
                copy.splice(i,1)
                setTodo(copy)
                alert('삭제되었습니다.')
                console.log('res.data : ' + res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
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


export default Mypage