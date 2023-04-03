import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Error from "../../pages/Error";
import { routes } from "../../router/router";
import { publicRoutes, privateRoutes } from "../../router/router";
import Login from "../../pages/Login";
import Posts from "../../pages/Posts";
import { AuthContext } from "../../context";
import Loader from "./Loader/Loader";

const AppRouter = () => {
//заглушка для флага авторизации
    const {isAuth, setAuth, isLoader} = useContext(AuthContext);
    
    return (
        isAuth ? <Routes>
                    {privateRoutes.map((route, index) => 
                        <Route 
                            key={route.path} 
                            path={route.path} 
                            element={route.component}
                        />
                    )}
                    <Route path="*" element={<Posts/>}/>
                </Routes>
                : isLoader ? <Loader/>
                           : <Routes>
                                {publicRoutes.map((route) => 
                                    <Route 
                                        key={route.path} 
                                        path={route.path} 
                                        element={route.component}
                                    />
                                )}
                                <Route path="*" element={<Login/>}/>
                            </Routes>
    )
}
export default AppRouter;