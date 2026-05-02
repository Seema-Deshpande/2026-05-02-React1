import "./App.css"
import { useState } from "react";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

function App() {
  const [currentPage, setCurrentPage] = useState('register');
  
  return (
    <div className="app-layout">
      {
        currentPage === 'register' ?
          <Register /> :
          <Login />
      }
    </div>
  );
}

export default App;
