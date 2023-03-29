import {
  useCallback,
  useMemo,
  createContext,
  ReactNode,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';

interface FormTabsContextInterface {
  onTabsChange: (index: number) => void;
  onNextTab: () => void;
  tabIndex: number;
}

const FormTabsContext = createContext(
  null as unknown as FormTabsContextInterface
);

export const FormTabsProvider = ({
  children,
  setTabIndex,
  tabIndex,
}: {
  children: ReactNode;
  setTabIndex: Dispatch<SetStateAction<number>>;
  tabIndex: number;
}) => {
  const onTabsChange = useCallback(
    (index: number) => {
      setTabIndex(index);
    },
    [setTabIndex]
  );

  const onNextTab = useCallback(() => {
    setTabIndex(tabIndex + 1);
  }, [tabIndex, setTabIndex]);

  const values = useMemo(
    () => ({
      tabIndex,
      onTabsChange,
      onNextTab,
    }),
    [tabIndex, onTabsChange, onNextTab]
  );

  return (
    <FormTabsContext.Provider value={values}>
      {children}
    </FormTabsContext.Provider>
  );
};

export const useFormTabs = () => useContext(FormTabsContext);
