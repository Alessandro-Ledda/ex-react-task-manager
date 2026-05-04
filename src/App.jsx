import { BrowserRouter, Routes, Route } from "react-router-dom"
import { NavLink } from "react-router-dom"

function App() {


  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/addTask">Aggiungi Task</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<TaskList />}></Route>
        <Route path="/addtask" element={<AddTask />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
