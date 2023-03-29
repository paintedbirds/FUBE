'use client';

import { FC } from 'react';
import {
  TableContainer,
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

import { DataItem, MainActionButtonProps } from '@/app/types';
import { ObjectTableActionButtons } from './object-table-action-buttons';

interface ObjectTableProps {
  tableHeads: string[];
  data: DataItem[];
  actionButtons?: MainActionButtonProps[];
}

export const ObjectTable: FC<ObjectTableProps> = ({
  tableHeads,
  data,
  actionButtons,
}) => (
  <TableContainer marginTop="0.5rem">
    <Table variant="simple">
      <Thead>
        <Tr>
          {tableHeads.map((th) => (
            <Th fontWeight={500} color="#2843B2" key={th}>
              {th}
            </Th>
          ))}
          {actionButtons && <Th />}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((td, index) => (
          <Tr key={index}>
            {Object.values(td).map((value, i) => (
              <Td key={i}>{value}</Td>
            ))}
            {actionButtons && (
              <Td key={actionButtons.length}>
                {<ObjectTableActionButtons buttons={actionButtons} />}
              </Td>
            )}
          </Tr>
        ))}
      </Tbody>
    </Table>
  </TableContainer>
);
