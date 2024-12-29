import React, { createContext, useState, useEffect } from 'react';

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [myVariable, setMyVariable] = useState(() => {
    const savedAuth = localStorage.getItem('myVariable');
    return savedAuth ? JSON.parse(savedAuth) : { isAuthenticated: false, token: null };
  });

  useEffect(() => {
    if (myVariable.isAuthenticated) {
      localStorage.setItem('myVariable', JSON.stringify(myVariable));
    } else {
      localStorage.removeItem('myVariable');
    }
  }, [myVariable]);

  const logOut = () => {
    setMyVariable({ isAuthenticated: false, token: null });
    localStorage.removeItem('myVariable');
  };

  return (
    <MyContext.Provider value={[myVariable, setMyVariable, logOut]}>
      {children}
    </MyContext.Provider>
  );
};
