import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/login";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from "./pages/register";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="about" element={<div>About Page</div>} />
        <Route path="urls" element={<div>URLs Page</div>} />
        <Route path="logs" element={<div>Logs Page</div>} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Route>

      <Route path="/login" element={<Login></Login>} />
      <Route path="/register" element={<Register></Register>} />
      
    </Routes>
    <ToastContainer />
    </>
  );
}

export default App;
