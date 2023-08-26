import { Route, Routes, useNavigate, useParams } from 'react-router-dom'

function Home() {

    let navigate = useNavigate();

    return (
        <div className="home"> 
            <div>
                <h1 style={{color: "white", paddingTop: "10px",textAlign: "center"}}> To Do List  </h1>    
            </div>
            <button type="submit" className="startButton" onClick={ () => {navigate('/list')}}>Start</button>
        </div>
    )
}

export default Home