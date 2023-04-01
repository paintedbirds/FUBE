import { FC } from 'react';
import { Button, Flex } from '@chakra-ui/react';

import { MainActionButtonProps } from '@/utils/types';

export const ObjectMainActionButton: FC<MainActionButtonProps> = ({
  icon,
  label,
  onClick,
  ...props
}) => (
  <Button onClick={onClick} {...props}>
    <Flex gap="2">
      {label}
      {icon}
    </Flex>
  </Button>
);
