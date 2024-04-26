import { BrowserRouter as Router } from "react-router-dom"
import { Register } from "./pages/auth/Register"
import { Slide, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <Router>
          <Register />
        </Router>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={2}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </>
  )
}

export default App
