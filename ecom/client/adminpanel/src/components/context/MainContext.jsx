import React, { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';
import Cookies from 'js-cookie';


export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [id, setId] = useState(Cookies.get('ID') ??  '');

    useEffect(() => {
        Cookies.set('ID',id);
    },[id])

    let obj = {
        id,
        setId
    }
    return (
        <LoginContext.Provider value={obj}>
            {children}
        </LoginContext.Provider>
    );
};