import {
  useCallback,
  useMemo,
  createContext,
  ReactNode,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

type Step = 'Denunciante' | 'Agresor' | 'NNA' | 'Familia';

interface CaseContextInterface {
  stepsEdited: Step[];
  updateSteps: (step: Step) => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const CaseContext = createContext(null as unknown as CaseContextInterface);

export const CaseProvider = ({ children }: { children: ReactNode }) => {
  const [steps, setSteps] = useState<Step[]>([] as unknown as Step[]);
  const [isLoading, setIsLoading] = useState(false);

  const updateSteps = useCallback((step: Step) => {
    setSteps((prevState) => [...prevState, step]);
  }, []);

  const values = useMemo(
    () => ({
      stepsEdited: steps,
      updateSteps,
      isLoading,
      setIsLoading,
    }),
    [steps, updateSteps, isLoading]
  );

  return <CaseContext.Provider value={values}>{children}</CaseContext.Provider>;
};

export const useCase = () => useContext(CaseContext);
