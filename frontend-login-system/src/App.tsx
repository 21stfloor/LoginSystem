import { BrowserRouter as Router } from "react-router-dom"
import { Register } from "./pages/auth/Register"

function App() {

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <Router>
          <Register />
        </Router>
      </div>
    </>
  )
}

export default App
