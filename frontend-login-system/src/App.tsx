import { BrowserRouter as Router } from "react-router-dom"
import { Login } from "./pages/auth/Login"

function App() {

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <Router>
          <Login />
        </Router>
      </div>
    </>
  )
}

export default App
