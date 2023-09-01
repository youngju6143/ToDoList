import axios from "axios"

const changeTitle = (e, setTitle) => {
    setTitle(e.target.value) 
}
const changeDate = (e, setDate) => {
    setDate(e.target.value)
}
const addTodo = (title, date, completed, setTodo, setTitle, setDate, setCompleted, navigate) => {
    const newTodo = {
        title: title,
        date: date,
        completed: false
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
const getChecked = (id , completed) => {
    console.log(id)
    axios.post(`http://localhost:8000/completed/${id}`, {
        id: id,
        completed : completed
    })
    .then((res) => {console.log(res.data)})
    .catch((err) => {console.log(err)})
}

const getUnchecked = (id , completed) => {
    console.log(id)
    axios.post(`http://localhost:8000/incompleted/${id}`, {
        id: id,
        completed : completed
    })
    .then((res) => {console.log(res.data)})
    .catch((err) => {console.log(err)})
}


export {changeDate, changeTitle, addTodo, getChecked, getUnchecked}