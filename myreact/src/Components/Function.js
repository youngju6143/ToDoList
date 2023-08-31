import axios from "axios"

const changeTitle = (e, setTitle) => {
    setTitle(e.target.value) 
}
const changeDate = (e, setDate) => {
    setDate(e.target.value)
}
const addTodo = (title, date, writer, setTodo, setTitle, setDate, setWriter, navigate) => {
    const newTodo = {
        title: title,
        date: date,
        writer: writer
    };
    setTodo(prevTodo => [...prevTodo, newTodo]);
    setTitle('');
    setDate('');
    setWriter('')

    axios.post('http://localhost:8000/add', newTodo)
        .then((res) => {
            navigate('/list')
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
    })

    let input = document.querySelector('.inputDate')
    input.value = ''
    input = document.querySelector('.inputTitle')
    input.value = ''
}


export {changeDate, changeTitle, addTodo}