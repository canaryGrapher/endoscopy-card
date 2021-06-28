import React, { useReducer } from "react";
import { AuthReducer, initialState } from './reducer'; 

const EndoscopyStateContext = React.createContext();
const EndoscopyDispatchContext = React.createContext();

export function useEndoscopyState() {
  const context = React.useContext(EndoscopyStateContext);
  if (context === undefined) {
    throw new Error("useEndoscopyState must be used within a EndoscopyProvider");
  }
 
  return context;
}
 
export function useEndoscopyDispatch() {
  const context = React.useContext(EndoscopyDispatchContext);
  if (context === undefined) {
    throw new Error("useEndoscopyDispatch must be used within a EndoscopyProvider");
  }
 
  return context;
}

export const EndoscopyProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);
 
  return (
    <EndoscopyStateContext.Provider value={user}>
      <EndoscopyDispatchContext.Provider value={dispatch}>
        {children}
      </EndoscopyDispatchContext.Provider>
    </EndoscopyStateContext.Provider>
  );
};