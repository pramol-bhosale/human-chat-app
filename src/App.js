import Login from './pages/Login';
import './App.css';
import Signup from './pages/Signup';
import Home from './pages/Home';
import {
  BrowserRouter ,
  Switch,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { useContext } from 'react';
import {AuthContext} from './context/AuthContext'
function App() {
  const {currentUser} =useContext(AuthContext)
  console.log(currentUser)
  const ProtectedRoute=({children})=>{
    if(!currentUser){
      return (<Navigate to="/login"/>);
    }
    return children;
  }
  return (
    <BrowserRouter basename='/human-chat-app'>
    <Routes>
       <Route path='/'>
          <Route index element={<ProtectedRoute>
            <Home/>
          </ProtectedRoute>} />
          <Route path="login" element={<Login/>} />
          <Route path='register' element={<Signup/>} />
       </Route>
    </Routes>
    
    
    </BrowserRouter>
  );
}

export default App;
