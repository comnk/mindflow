import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [myVariable, setMyVariable] = useState({
    isAuthenticated: false,
    user: null,
  });

  const logOut = () => {
    setMyVariable({
      isAuthenticated: false,
      user: null,
    });
    localStorage.removeItem('token');
  };

  return (
    <MyContext.Provider value={[myVariable, setMyVariable, logOut]}>
      {children}
    </MyContext.Provider>
  );
};
