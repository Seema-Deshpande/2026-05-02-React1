import "./App.css"
import { useState } from "react";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import ResetPassword from "./pages/Auth/ResetPassword";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
function App() {
  const [currentPage, setCurrentPage] = useState('register');

  const renderPage = () => {
    switch (currentPage) {
      case 'register':
        return <Register />;
      case 'login':
        return <Login />;
      case 'reset-password':
        return <ResetPassword onResetPassword={(data) => console.log('Password Reset Data:', data)} />;
      default:
        return <Register />;
    }
  };
  
  return (
    <div className="app-layout">
      <Header onNavigate={setCurrentPage}/>
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;
