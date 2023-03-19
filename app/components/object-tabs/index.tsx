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
        <Tab fontWeight={700} key={tab}>
          {tab}
        </Tab>
      ))}
    </TabList>
    <TabPanels>
      {tabContents.map((content, index) => (
        <TabPanel key={index}>{content}</TabPanel>
      ))}
    </TabPanels>
  </Tabs>
);
