import "./App.css"
import { useState } from "react";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
function App() {
  const [currentPage, setCurrentPage] = useState('register');
  
  return (
    <div className="app-layout">
      <Header onNavigate={setCurrentPage}/>
      {currentPage === 'register' ? <Register /> : <Login />}
      <Footer />
    </div>
  );
}

export default App;
