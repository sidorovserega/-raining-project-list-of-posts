import React, { useEffect, useState } from 'react'; 
import { BrowserRouter } from 'react-router-dom';
import './styles/App.css';
import Navbar from './components/UI/navbar/Navbar';
import AppRouter from './components/UI/AppRouter';
import { AuthContext } from './context';


function App() {
  //глобальный контекст
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true);
    }
  }, []);
 
  return (
    <AuthContext.Provider value={{
      isAuth: isAuth,
      setIsAuth: setIsAuth
    }}>
      <BrowserRouter>
        <Navbar/> 
        <AppRouter/>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;