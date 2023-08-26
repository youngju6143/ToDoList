import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'

function List() {
    let navigate = useNavigate();

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

            <h2 className='listTitle'> List 페이지예염 </h2>
            <div className='listBox'>
                {/* list니까 말 그대로 todo list 보여주는 페이지 만들어보아요
                근데 이제 내가 write에서 입력한 내용들을 보여줘야함 DB에서 가져와야 하나? */}
                <div className='listItem'></div>
                <div className='listItem'></div>
                <div className='listItem'></div>
                <div className='listItem'></div>
                <div className='listItem'></div>
                <div className='listItem'></div>
                <div className='listItem'></div>
                <div className='listItem'></div>
            </div>
                <button type="submit" className="submitButton" onClick={ () => {navigate('/write')}}> 작성하기 </button>

            
        </div>
    )
}

export default List