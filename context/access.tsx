import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';

interface AccessContextType {
  access: boolean;
  setAccess: (access: boolean) => void;
}

const AccessContext = createContext<AccessContextType | undefined>(undefined);

interface AccessProviderProps {
  children: ReactNode;
}

export const AccessProvider = ({ children }: AccessProviderProps): ReactNode => {
  const [access, setAccess] = useState(false);

  // 🛠️ Prevent unnecessary re-renders by memoizing context value
  const value = useMemo(() => ({ access, setAccess }), [access]);

  return (
    <AccessContext.Provider value={value}>
      {children}
    </AccessContext.Provider>
  );
};

export const useAccess = (): AccessContextType => {
  const context = useContext(AccessContext);
  if (!context) {
    throw new Error('useAccess must be used within an AccessProvider');
  }
  return context;
};
