'use client';

import { Tab, TabList, Tabs, TabPanels, TabPanel } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface ObjectTabsProps {
  tabs: string[];
  tabContents: ReactNode[];
}

export const ObjectTabs: FC<ObjectTabsProps> = ({ tabs, tabContents }) => (
  <Tabs>
    <TabList>
      {tabs.map((tab) => (
        <Tab fontWeight="bold" _selected={{ color: '#2843B2' }} key={tab}>
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
