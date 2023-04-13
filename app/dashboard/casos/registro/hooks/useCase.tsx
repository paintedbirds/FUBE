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
import { CreateCaseDTO, CreateReporterDTO } from '@/networking/services/case';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { createReporter } from '@/networking/services/case';

type Step = 'Denunciante' | 'Agresor' | 'NNA' | 'Familia';

interface CaseContextInterface {
  stepsEdited: Step[];
  updateSteps: (step: Step) => void;
  updateCase: (propsToAdd: Partial<CaseRequestBuilder>) => void;
  saveFirstMeeting: () => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

interface CaseRequestBuilder extends CreateCaseDTO {
  denunciante_id: number | undefined;
  agresor_id: number | undefined;
  denuncianteValues: CreateReporterDTO | undefined;
}

const CaseContext = createContext(null as unknown as CaseContextInterface);

export const CaseProvider = ({ children }: { children: ReactNode }) => {
  const [steps, setSteps] = useState<Step[]>([] as unknown as Step[]);
  const [isLoading, setIsLoading] = useState(false);
  const [caseRequest, setCase] = useState<CaseRequestBuilder>(
    {} as CaseRequestBuilder
  );
  const toast = useToast();

  console.log({ caseRequest });

  const updateSteps = useCallback((step: Step) => {
    setSteps((prevState) => [...prevState, step]);
  }, []);

  const updateCase = useCallback((propsToAdd: Partial<CaseRequestBuilder>) => {
    setCase((prevState) => ({ ...prevState, ...propsToAdd }));
  }, []);

  const { mutate: createReporterMutate } = useMutation(createReporter, {
    onSuccess: (response) => {
      updateCase({ denunciante_id: response.data.codigo_denunciante });
    },
    onError: () => {
      toast({
        position: 'top',
        title: 'Error al crear denunciante',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const saveFirstMeeting = useCallback(async () => {
    console.log('save first meeting', { caseRequest });

    if (caseRequest.denuncianteValues) {
      await createReporterMutate(caseRequest.denuncianteValues);
    }

    console.log('save first meeting', { caseRequest });

    if (caseRequest.denunciante_id && !caseRequest.agresor_id) {
      toast({
        position: 'top',
        title: 'Agresor no ingresado',
        description:
          'Debe ingresar al menos el nombre del agresor para continuar',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });

      return;
    }

    if (!caseRequest.denunciante_id && caseRequest.agresor_id) {
      toast({
        position: 'top',
        title: 'Denunciante no ingresado',
        description:
          'Debe ingresar al menos el nombre del denunciante para continuar',
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

  const values = useMemo(
    () => ({
      stepsEdited: steps,
      updateSteps,
      updateCase,
      saveFirstMeeting,
      isLoading,
      setIsLoading,
    }),
    [steps, updateSteps, updateCase, saveFirstMeeting, isLoading]
  );

  return <CaseContext.Provider value={values}>{children}</CaseContext.Provider>;
};

export const useCase = () => useContext(CaseContext);
