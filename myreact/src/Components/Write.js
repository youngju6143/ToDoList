import axios from "axios"
import { useState, useEffect } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'

function Write() {

    let [date, setDate] = useState("")
    let [title, setTitle] = useState("")
    let [modal, setModal] = useState(false)


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

        <div className="todo">            
            <InputToDo title={title} setTitle={setTitle} date={date} setDate={setDate}></InputToDo>            
        </div>
    </div>
    )
}

function InputToDo(props) {
    
    let navigate = useNavigate()

    return (
      <div>
        <div style={{padding: '10px'}}>
            <label style={{fontSize: "20px", color : "black"}}> todo </label>
            <input type="text" name="title" placeholder="할 일을 입력하세요" onChange={(e) => {
                props.setTitle(e.target.value)
            }}></input>
        </div>

        <div style={{padding: '10px'}}>
            <label style={{fontSize: "20px", color : "black"}} name="date"> 날짜 </label>
            <input type="text" name="date" placeholder="언제까지 완료할 건가요?"onChange={(e) => {
                props.setDate(e.target.value)
            }}></input>
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
        }}>Submit</button>
            {/* axios 사용해서 서버로 넘기는 코드를 작성할 예정임 : 8/26에 할 예정 */}
      </div>
    );
  }

export default Write

