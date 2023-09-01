import { useState, useEffect } from 'react';

function Title() {
    let [clock, setClock] = useState('')

    const startInterval = (seconds, callback) => {
        callback()
        return setInterval(callback, seconds * 1000)
    }
    useEffect(() => {
        const Clock = startInterval(1, () => {
            let time = new Date()
            setClock(time.getHours() + " : " + time.getMinutes() + " : " + time.getSeconds())
        })
        
    }, [])

    return (
        <div className='title'>
            <div className='clock'></div>
            <h1 className='homeFont'> To Do List </h1>
            <div className='clock'>{clock}</div>
        </div>
    )

}

export default Title