import { useState, useEffect } from 'react'
const App = () => {
  const [todos, setTodos] = useState(()=>{
          const saved = localStorage.getItem("todo")
          return saved ? JSON.parse(saved) : []
      })
      
      const [input, setInput] = useState("")
  
      useEffect(()=>{
          localStorage.setItem("todo", JSON.stringify(todos))
      },[todos])
      const addBtn = ()=>{
          if(!input.trim()) return
          setTodos([...todos, {id: Date.now(), text:input, completed:false}])
          setInput("")
      }
  
      const toggleBtn = (id)=>{
          setTodos(todos.map(todo=>
              todo.id === id
              ? {...todo, completed : !todo.completed}
              : todo
          ))
      }
  
      const delBtn = (id) => {
          setTodos(todos.filter(todo => todo.id !== id))
      }
  return (
    <div className='min-h-screen flex justify-center items-center bg-amber-500'>
        <div className='w-1000 max-w-md rounded bg-white p-5 shadow-lg'>
            <h1 className='text-center font-bold text-3xl mb-4'>Todo Application</h1>
            <div className='mb-4 flex gap-3'>
                <input type="text" 
                className='flex-1 rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-amber-400'
                placeholder='Add Todos'
                value={input}
                onChange={(e)=>setInput(e.target.value)}/>
                <button
                className='rounded px-4 py-2 font-semibold text-white bg-amber-500'
                onClick={addBtn}>
                    ADD
                </button>
            </div>
            <ul className='py-2'>
                {todos.map(todo => (
                    <li className='flex items-center justify-between rounded border-2 border-gray-500 px-3 py-2 italic m-3 '
                    key={todo.id}>
                    <span
                    onClick={()=>{toggleBtn(todo.id)}}
                    className={`cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""}`}
                    >
                        {todo.text}
                    </span>
                    <button
                    className='text-red-500 font-bold hover:text-red-700'
                    onClick={()=>delBtn(todo.id)}>
                        X
                    </button>
                    </li>
                ))}
            </ul>
            {todos.length === 0 &&
            <p className='text-center font-semibold
            text-2xl font-sans'>
                All Caught Up...
            </p>
            }
        </div>
    </div>
  )
}

export default App
