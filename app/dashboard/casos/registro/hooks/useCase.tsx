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
import { CreateCaseDTO } from '@/networking/services/case';
import { useToast } from '@chakra-ui/react';

type Step = 'Denunciante' | 'Agresor' | 'NNA' | 'Familia';

interface CaseContextInterface {
  stepsEdited: Step[];
  updateSteps: (step: Step) => void;
  updateCase: (propsToAdd: Partial<CaseRequestBuilder>) => void;
  saveFirstMeeting: () => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  caseRequest: CaseRequestBuilder;
}

interface CaseRequestBuilder extends CreateCaseDTO {
  denunciante_id: number | undefined;
  agresor_id: number | undefined;
}

const CaseContext = createContext(null as unknown as CaseContextInterface);

export const CaseProvider = ({ children }: { children: ReactNode }) => {
  const [steps, setSteps] = useState<Step[]>([] as unknown as Step[]);
  const [isLoading, setIsLoading] = useState(false);
  const [caseRequest, setCase] = useState<CaseRequestBuilder>(
    {} as CaseRequestBuilder
  );
  const toast = useToast();

  const updateSteps = useCallback((step: Step) => {
    setSteps((prevState) => [...prevState, step]);
  }, []);

  const updateCase = useCallback((propsToAdd: Partial<CaseRequestBuilder>) => {
    setCase((prevState) => ({ ...prevState, ...propsToAdd }));
  }, []);

  const saveFirstMeeting = useCallback(async () => {
    console.log('save first meeting', { caseRequest });

    if (!caseRequest.denunciante_id) {
      toast({
        position: 'top',
        title: 'Denunciante no ingresado',
        description:
          'Debe ingresar al menos el nombre del denunciante para guardar',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });

      return;
    }

    if (!caseRequest.agresor_id) {
      toast({
        position: 'top',
        title: 'Agresor no ingresado',
        description:
          'Debe ingresar al menos el nombre del agresor para guardar',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });

      return;
    }

    if (caseRequest.denunciante_id && caseRequest.agresor_id) {
      // create denuncia
    }
  }, [caseRequest, toast]);

  const values: CaseContextInterface = useMemo(
    () => ({
      stepsEdited: steps,
      updateSteps,
      updateCase,
      saveFirstMeeting,
      isLoading,
      setIsLoading,
      caseRequest,
    }),
    [steps, updateSteps, updateCase, saveFirstMeeting, isLoading, caseRequest]
  );

  return <CaseContext.Provider value={values}>{children}</CaseContext.Provider>;
};

export const useCase = () => useContext(CaseContext);
