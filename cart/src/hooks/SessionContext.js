import React from 'react';

const SessionContext = React.createContext();

export const useSessionContext = () => React.useContext(SessionContext);

export default SessionContext;