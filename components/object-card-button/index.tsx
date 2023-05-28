import { Flex, VStack, IconProps, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { MouseEventHandler } from 'react';

export interface ObjectCardButtonProps {
  label: string;
  icon: IconProps;
  onClick?: MouseEventHandler;
  path?: string;
}

export const ObjectCardButton = ({
  label,
  icon,
  onClick,
  path,
}: ObjectCardButtonProps) => {
  const router = useRouter();

  const onClickHandler = () => {
    if (onClick) {
      return onClick;
    }

    if (path) {
      router.push(path);
    }
  };

  return (
    <VStack
      minWidth={230}
      background="white"
      borderRadius="5px"
      alignItems="flex-start"
      p={5}
      borderWidth="1px"
      role="button"
      onClick={onClickHandler}
      _hover={{ cursor: 'pointer', background: '#2843B21A' }}
    >
      <Flex
        p="0.5rem"
        background="#2843B21A"
        color=""
        borderRadius="full"
        alignItems="center"
        gap="22px"
      >
        <>{icon}</>
      </Flex>
      <Text>{label}</Text>
    </VStack>
  );
};
