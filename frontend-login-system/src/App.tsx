import { BrowserRouter as Router } from "react-router-dom"
import { Register } from "./pages/auth/Register"
import { Toaster } from "./components/ui/toaster"

function App() {

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <Router>
          <Register />
        </Router>
      </div>
      <Toaster />
    </>
  )
}

export default App
