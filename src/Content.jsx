import Login from "./pages/Auth/Login";
import "./App.css"
import Register from "./pages/Auth/Register";

function Content({currentPage}) {
  
 if (currentPage === 'login') {
    return <Login />;
  } else {
    return <Register />;
  }
}

export default Content;
