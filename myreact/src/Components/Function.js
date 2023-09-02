import axios from "axios"

const changeTitle = (e, setTitle) => {
    setTitle(e.target.value) 
}
const changeDate = (e, setDate) => {
    setDate(e.target.value)
}
const addTodo = (title, date, completed, setTodo, setTitle, setDate, setCompleted, navigate) => {
    const regexTodo =  /^(?=.*[a-zA-Z0-9!@#$%^&*()_+])(.{1,12})$/
    const regexDate = /^(?!\s*$).+/

    const newTodo = {
        title: title,
        date: date,
        completed: false
    };
    setTodo(prevTodo => [...prevTodo, newTodo]);
    setTitle('');
    setDate('');

    if (regexTodo.test(newTodo.title) && regexDate.test(newTodo.date)) {
        axios.post('http://localhost:8000/add', newTodo)
        .then((res) => {
            navigate('/list')
        })
        .catch((err) => {
            console.log(err)
        })
    }
    else {
        alert('날짜 또는 todo를 입력하지 않았습니다!')
    }
    

    let input = document.querySelector('.inputDate')
    input.value = ''
    input = document.querySelector('.inputTitle')
    input.value = ''
}
const fetchChecked = (id , completed) => {
    axios.post(`http://localhost:8000/completed/${id}`, {
        id: id,
        completed : completed
    })
    .then((res) => {console.log('good check')})
    .catch((err) => {console.log(err)})
}

export {changeDate, changeTitle, addTodo, fetchChecked}