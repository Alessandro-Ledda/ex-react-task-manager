import { BrowserRouter, Routes, Route } from "react-router-dom"
import { NavLink } from "react-router-dom"

import AddTask from "./Page/AddTask"
import TaskList from "./Page/TaskList"
import { ContextApiProvider } from "./Context/ContextApi"

function App() {


  return (
    <BrowserRouter>
      <ContextApiProvider>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/addTask">Aggiungi Task</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<TaskList />}></Route>
          <Route path="/addtask" element={<AddTask />}></Route>
        </Routes>
      </ContextApiProvider>
    </BrowserRouter>
  )
}

export default App
