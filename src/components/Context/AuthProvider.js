import React,{useState} from 'react'

export const AuthContext=React.createContext();

function AuthProvider({ children }){
    const [login,setLogin]=useState(false);
    function handleLoginState(){
        setLogin(true);
    }

    const value={
        login,
        handleLoginState
    }
    return (
        < AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider >
    )
}

export default AuthProvider;