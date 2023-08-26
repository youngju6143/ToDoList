import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from "axios"


function List() {
    let navigate = useNavigate();

    let [date, setDate] = useState("")
    let [title, setTitle] = useState("")

    return (
        <div> 
            <nav className="navbar">
                <ul className='navbarMenu'>
                <Link className='navbarMenu' to="/list"> home </Link>
                <Link className='navbarMenu' to="/login"> login </Link>
                <Link className='navbarMenu' to="/mypage"> mypage </Link>
                </ul> 
            </nav>

            <div className='title'>
                <p style={{fontSize: "30px", color : "white"}}> To Do List </p>
            </div>

            <div className='container'>
                {/* <h2 className='listTitle'> List 페이지예염 </h2> */}
                <div className='inputBox'>
                    {/* <input type='text' className='listInput'/> */}
                    <InputToDo style={{justifyContent: "space-between"}}title={title} setTitle={setTitle} date={date} setDate={setDate}></InputToDo> 
                </div>
                
                <div className='listBox'>
                    <div className='listItem'></div>
                    <div className='listItem'></div>
                    <div className='listItem'></div>
                    <div className='listItem'></div>
                    <div className='listItem'></div>
                    <div className='listItem'></div>
                    <div className='listItem'></div>
                    <div className='listItem'></div>
                </div>
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
            <input onChange={(e) => {
                props.setDate(e.target.value)
            }} type="text" name="date" placeholder="언제까지 완료할 건가요?" className='inputDate'></input>
        </div>

        <div style={{padding: '10px'}}>
            <input onChange={(e) => {
                props.setTitle(e.target.value)
            }} type="text" name="title" placeholder="할 일을 입력하세요" className='inputContent'></input>
        </div>

        <button type="submit" className="submitButton" onClick={() => {
            axios.post('http://localhost:8000/add', {title: props.title, date: props.date})
            .then((res) => {
                navigate('/list')
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }}>todo!</button>
      </div>
    );
  }
  
export default List

