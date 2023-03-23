'use client';

import {
  Tab,
  TabList,
  Tabs,
  TabPanels,
  TabPanel,
  TabsProps,
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface ObjectTabsProps extends Omit<TabsProps, 'children'> {
  tabs: string[];
  tabContents: ReactNode[];
}

export const ObjectTabs: FC<ObjectTabsProps> = ({
  tabs,
  tabContents,
  variant,
  ...tabsProps
}) => (
  <Tabs {...tabsProps} variant={variant}>
    <TabList>
      {tabs.map((tab) => (
        <Tab
          fontWeight="bold"
          _selected={{
            color: '#2843B2',
            ...(variant === 'enclosed' && {
              borderColor: '#E2E8F0',
              borderBottom: '0',
            }),
          }}
          key={tab}
        >
          {tab}
        </Tab>
      ))}
    </TabList>
    <TabPanels>
      {tabContents.map((content, index) => (
        <TabPanel p={0} key={index}>
          {content}
        </TabPanel>
      ))}
    </TabPanels>
  </Tabs>
);
