import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    try{
    const res = await axios.post("http://localhost:8081/auth/login", inputs, {
        withCredentials: true,
    })
    setCurrentUser(res.data);
    
  } catch (error) {
    console.log("Login error:", error)
  }
  };

  const logout = async () => {
try{
    localStorage.removeItem("user")
    await axios.post("http://localhost:8081/auth/logout");
    setCurrentUser(null);
    window.location.href ="/daycarelist";
    
  } catch (error) {
    console.log("Logout error:", error)
  }
  };

  // {
  //   await axios.post("http://localhost:8081/auth/logout");
  //   setCurrentUser(null, () =>{
  //   window.location.href ="/" })
  // } catch (error) {
  //   console.log("Logout error:", error)
  // }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};