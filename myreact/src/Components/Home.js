import { Route, Routes, useNavigate, useParams } from 'react-router-dom'

function Home() {

    let navigate = useNavigate();

    return (
        <div className="home"> 
            <div style={{textAlign: "center"}}>
                <h1 style={{color: "white", paddingTop: "10px"}}> To Do List  </h1>    
            </div>
            <button type="submit" className="startButton" onClick={ () => {navigate('/list')}}>Start</button>
        </div>
    )
}

export default Home