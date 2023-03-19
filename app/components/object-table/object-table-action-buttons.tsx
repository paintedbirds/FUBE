'use client';

import { FC } from 'react';
import { Flex } from '@chakra-ui/react';

import { ObjectMainActionButton } from '../object-main-action-button';
import { MainActionButtonProps } from '@/app/types';

interface ObjectTableActionButtons {
  buttons: MainActionButtonProps[];
}

export const ObjectTableActionButtons: FC<ObjectTableActionButtons> = ({
  buttons,
}) => {
  return (
    <Flex gap="2">
      {buttons.map(({ icon, label, onClick, color }, i) => (
        <ObjectMainActionButton
          key={i}
          icon={icon}
          label={label}
          onClick={onClick}
          borderRadius="lg"
          color={color}
        />
      ))}
    </Flex>
  );
};
