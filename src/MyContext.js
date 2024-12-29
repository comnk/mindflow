import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [myVariable, setMyVariable] = useState('Initial Value');

  return (
    <MyContext.Provider value={[myVariable, setMyVariable]}>
      {children}
    </MyContext.Provider>
  );
};
