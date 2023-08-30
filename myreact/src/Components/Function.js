import axios from "axios"

const changeTitle = (e, setTitle) => {
    setTitle(e.target.value) 
}
const changeDate = (e, setDate) => {
    setDate(e.target.value)
}
const addTodo = (title, date, setTodo, setTitle, setDate, navigate) => {
    const newTodo = {
        title: title,
        date: date
    };
    setTodo(prevTodo => [...prevTodo, newTodo]);
    setTitle('');
    setDate('');

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