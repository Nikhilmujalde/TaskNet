import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import './index.css'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";


function App() {
  const [todo, settodo] = useState("")
  // it is a array which will hold all our arrays
  const [todos, settodos] = useState([])
  const [showFinish, setshowFinish] = useState(true)
  useEffect(() => {
    // localStorage.removeItem("todos");

    let todoString = localStorage.getItem("todos");
    console.log(todoString);
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos);
    }
  }, [])
  const saveToLS = (newTodo) =>{
    localStorage.setItem("todos",JSON.stringify(newTodo));
    console.log("After save")
    console.log(todos);
  }

  
  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("");
    console.log(todos);
    saveToLS(todos);
  }
  const handledelete = async (e, id) => {
    // const confirmDelete = window.confirm('Are you sure you want to delete this item?')
      // console.log(id);
      
      let newTodo = todos.filter(item => {
        return item.id !== id;
      })
      settodos(newTodo);
      console.log(newTodo)
      saveToLS(newTodo)   

  }
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    console.log(t[0].todo);
    settodo(t[0].todo);
    // handledelete(e, id);
    let newTodo = todos.filter(item => {
      return item.id !== id;
    })
    settodos(newTodo);
    saveToLS(newTodo);
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    console.log(id);
    // const newId = todos.filter(element => element.id == id);
    // finding the index of the todo with the id we click
    let index = todos.findIndex(item => {
      return item.id === id
    })
    console.log(index);
    // agar aisa karenge to naya array nhi banega bas uska reference banega or change nhi hoga
    // let newTodo = todos;
    let newTodo = [...todos]
    // console.log("Here are the newTodo")
    // console.log(newTodo);
    todos[index].isCompleted = !todos[index].isCompleted;
    settodos(newTodo);
    saveToLS(newTodo);
    // console.log(newId);
  }
  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const toggleFinish = (e)=>{
    setshowFinish(!showFinish);
  }
  const check = (to)=>{
    let length = to.length
    for (const i of to) {
      if(i.match(' '))
        length--;
    }
    return !length>0;
  }
  return (
    <>
      <Navbar />
      <div className="md:container mx-3  md:mx-auto my-5 rounded-xl p-4 bg-amber-300 min-h-[80vh] md:w-[50%]">
      <h1 className='font-bold text-center text-xl '>TaskNest - Manage your Todo's</h1>
        <div className="addTodo my-5 ">
          <h2 className='text-xl font-bold'>Add Todo</h2>
          <div className="in flex justify-center my-3">

          <input onChange={handleChange} value={todo} type="text" className='w-10/12 inp  text-gray-900 text-sm rounded-lg    p-2.5 py-1' placeholder="Type to Add your Todo's" />
          <button onClick={handleAdd} disabled={check(todo)} className='bg-amber-500 p-3 py-1 rounded-md text-white disabled:bg-amber-200
              mx-3 text-sm font-bold hover:bg-amber-600'>Add</button>
              </div>
        </div>
        <input onChange={toggleFinish} type="checkbox" checked={showFinish} name="" id="show" />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className='text-xl font-bold'>Your Todo</h2>

        <div className="todos">
          {todos.length === 0 && <div className='m-5'> No todos to display </div>}
          {todos.map(item => {

            return (showFinish || !item.isCompleted) && <div key={item.id} className="todo flex  my-3  justify-between">
              <div className="flex gap-5 word-break: break-word ">

                <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                <div style={{wordBreak: 'break-word'}} className={`${!item.isCompleted ? "" : "line-through"} `} >
                  {item.todo}
                </div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-amber-500 p-3 py-1 rounded-md text-white
              mx-3 text-sm font-bold hover:bg-amber-600'><FaEdit /></button>
                <button onClick={(e) => { handledelete(e, item.id) }} className='bg-amber-500 p-3 py-1 rounded-md text-white
              mx-3 text-sm font-bold hover:bg-amber-600'><AiFillDelete /></button>
              </div>
            </div>
          })}
        </div>

      </div>
    </>
  )
}

export default App
