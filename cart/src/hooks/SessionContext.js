import React from 'react';
// not used
const SessionContext = React.createContext();

export const useSessionContext = () => React.useContext(SessionContext);

export default SessionContext;