import { Route, Routes, useNavigate, useParams } from 'react-router-dom'

function Home() {

    let navigate = useNavigate();

    return (
        <div className='wrapper'> 
            <div className="home">
                <h1 className='homeFont'> To Do List  </h1>    
                <button type="submit" className="startButton" onClick={ () => {navigate('/login')}}>Start</button>
            </div>
        </div>
    )
}
  
export default Home