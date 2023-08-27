import { Route, Routes, useNavigate, useParams } from 'react-router-dom'

function Home() {

    let navigate = useNavigate();

    return (
        <div className='wrapper'> 
            <div className="home">
                <h1 style={{color: "white", paddingTop: "8px",textAlign: "center"}}> To Do List  </h1>    
                <button type="submit" className="startButton" onClick={ () => {navigate('/list')}}>Start</button>
            </div>
        </div>
    )
}

export default Home