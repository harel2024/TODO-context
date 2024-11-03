import React from 'react'
import TodoList from './components/TodoList/TodoList'
import "./App.css"

const App:React.FC = () => {
  return (
    <div className='app'>
      <TodoList/>
    </div>
  )
}

export default App