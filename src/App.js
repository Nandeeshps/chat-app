import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Welcome from "./Pages/Welcome";
import Leftbar from "./Components/leftbar/Leftbar";
import ChatSection from "./Pages/All/ChatSection";
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

function App() {

  const {currentUser} = useContext(AuthContext)

const ProtectedRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate to = '/login'/>
    }
    return children;
}
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
        } />
        <Route
          path="/home/chats"
          element={
            <>
              <Leftbar />
              <ChatSection />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
