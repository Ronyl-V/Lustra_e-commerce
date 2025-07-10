"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Deal {
  images: string[];
  name: string;
  description: string;
  endDate: Date;
}

interface DealContextType {
  deal: Deal | null;
  publishDeal: (deal: Deal) => void;
}

const DealContext = createContext<DealContextType | undefined>(undefined);

export const DealProvider = ({ children }: { children: ReactNode }) => {
  const [deal, setDeal] = useState<Deal | null>(null);

  // Chargement du deal depuis localStorage au démarrage
  useEffect(() => {
    const stored = localStorage.getItem("deal");
    if (stored) {
      const parsed = JSON.parse(stored);
      parsed.endDate = new Date(parsed.endDate); // convertir string → Date
      setDeal(parsed);
    }
  }, []);

  // Publication et sauvegarde du deal
  const publishDeal = (newDeal: Deal) => {
    setDeal(newDeal);
    localStorage.setItem("deal", JSON.stringify(newDeal));
  };

  return (
    <DealContext.Provider value={{ deal, publishDeal }}>
      {children}
    </DealContext.Provider>
  );
};

export const useDeal = (): DealContextType => {
  const context = useContext(DealContext);
  if (!context) {
    throw new Error("useDeal must be used within a DealProvider");
  }
  return context;
};
