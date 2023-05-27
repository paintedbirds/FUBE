import { ReactNode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

export const theme = extendTheme({ colors });

interface CustomizedChakraProvidedProps {
  children: ReactNode;
}

// 3. Pass the `theme` prop to the `ChakraProvider`
export function CustomizedChakraProvider({
  children,
}: CustomizedChakraProvidedProps) {
  return <ChakraProvider theme={theme}>{children} </ChakraProvider>;
}
