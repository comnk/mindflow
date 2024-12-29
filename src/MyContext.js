import React, { createContext, useState, useEffect } from 'react';

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  // Load authentication state from localStorage
  const [myVariable, setMyVariable] = useState(() => {
    const savedAuth = localStorage.getItem('myVariable');
    return savedAuth ? JSON.parse(savedAuth) : { isAuthenticated: false };
  });

  useEffect(() => {
    // Save the auth state to localStorage when it changes
    if (myVariable.isAuthenticated) {
      localStorage.setItem('myVariable', JSON.stringify(myVariable));
    } else {
      localStorage.removeItem('myVariable');
    }
  }, [myVariable]);

  const logOut = () => {
    setMyVariable({ isAuthenticated: false });
    localStorage.removeItem('myVariable');
  };

  return (
    <MyContext.Provider value={[myVariable, setMyVariable, logOut]}>
      {children}
    </MyContext.Provider>
  );
};
