import React, { createContext, useReducer } from 'react';

export const AlertContext = createContext();

export const AlertContextProvider = ({ children }) => {
  const notifications = [];

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'ADD_NOTIFICATION':
        return [...state, action.payload];

      case 'DELETE_NOTIFICATION':
        return state.filter((n) => n.id !== action.payload);
      default:
        return;
    }
  }, notifications);

  return (
    <AlertContext.Provider value={{ state, dispatch }}>
      {children}
    </AlertContext.Provider>
  );
};
