
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type AiAnalystContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const AiAnalystContext = createContext<AiAnalystContextType | undefined>(undefined);

export const AiAnalystProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <AiAnalystContext.Provider value={{ open, setOpen }}>
      {children}
    </AiAnalystContext.Provider>
  );
};

export const useAiAnalyst = () => {
  const context = useContext(AiAnalystContext);
  if (context === undefined) {
    throw new Error('useAiAnalyst must be used within an AiAnalystProvider');
  }
  return context;
};
