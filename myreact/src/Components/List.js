import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from "axios"
import { MdDone } from 'react-icons/md'

import {changeDate, changeTitle, addTodo, fetchChecked} from './Function'


function List() {
    let [date, setDate] = useState("")
    let [title, setTitle] = useState("")
    let [todo, setTodo] = useState([])
    let [completed, setCompleted] = useState()
    let [writer, setWriter] = useState('');

    let navigate = useNavigate()

    useEffect(() => {
        fetchTodo()
    }, [])
    

    const fetchTodo = () => {
        axios.get('http://localhost:8000/add')  
            .then((res) => { 
                setTodo(res.data[0])
                setWriter(res.data[1]) //req.user.id 가져옴
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err) 
        })
    }



    return (
        <div> 
            <div className='title'>
                <h1 className='homeFont'> To Do List </h1>
            </div>
            {/* <p className='listTitle'> My List </p> */}
            <div className='container'>
                <div className='inputBox'>
                    <InputToDo style={{justifyContent: "space-between"}} title={title} setTitle={setTitle} date={date} setDate={setDate} todo={todo} setTodo={setTodo} completed={completed} setCompleted={setCompleted}></InputToDo> 
                </div>  
                
                <div className='listBox'>
                    {
                        todo.map((a, i) => {
                            if (writer == a.writer) {
                                return (
                                    <ListItem item={a} index={i} todo={todo} setTodo={setTodo}/>
                                )
                            }
                        })
                    }
                    <div className='listItem'></div>
                </div>
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
            addTodo(props.title, props.date, props.completed, props.setTodo, props.setTitle, props.setDate, props.setCompleted, navigate)
        }}>todo!</button>
      </div>
    );
}

function ListItem({item, index, todo, setTodo}) {

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
    let [isCompleted, setIsCompleted] = useState(item.completed)
    useEffect(() => {
        fetchChecked(item._id, isCompleted)
    }, [isCompleted])

        return (
            <div className='listItem' key={index}>
                <button className={isCompleted ? 'completedButton' : 'incompletedButton'}
                onClick={() => {
                    setIsCompleted(!isCompleted)
                    console.log(isCompleted)
                }}
                >{isCompleted ? <MdDone/> : null}</button>
                <div>
                    <span style={{whiteSpace: "nowrap"}}>{item.title}</span>
                    <span>{item.date}</span>
                </div>
                <button className='deleteButton' data-id={todo._id} onClick={() => {
                    var id = item._id
                    deleteTodo(id, index)
                }} > 🗑️ </button>
            </div> 
        )
}

export default List

