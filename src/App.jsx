import { BrowserRouter, Routes, Route } from "react-router-dom"
import { NavLink } from "react-router-dom"

import AddTask from "./Page/AddTask"
import TaskList from "./Page/TaskList"
import { ContextApiProvider } from "./Context/ContextApi"
import TaskDetail from "./Page/TaskDetail"

function App() {


  return (
    <ContextApiProvider>
      <BrowserRouter>
        <nav>
          <NavLink to="/">Tasks</NavLink>
          <NavLink to="/addtask">Aggiungi Task</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<TaskList />}></Route>
          <Route path="/addtask" element={<AddTask />}></Route>
          <Route path="/task/:id" element={<TaskDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </ContextApiProvider>
  )
}

export default App
