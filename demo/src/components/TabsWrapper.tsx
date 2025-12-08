import React from 'react';
import { Tabs } from '../../../src';

interface TabsWrapperProps {
  props: Record<string, any>;
  setProps: (props: Record<string, any>) => void;
}

export const TabsWrapper: React.FC<TabsWrapperProps> = ({ props, setProps }) => {
  const tabs = props.tabs || [
    { id: '1', label: 'Tab 1', content: <div>Content for Tab 1</div> },
    { id: '2', label: 'Tab 2', content: <div>Content for Tab 2</div> },
    { id: '3', label: 'Tab 3', content: <div>Content for Tab 3</div> },
  ];

  return (
    <Tabs
      {...props}
      tabs={tabs}
      onTabChange={(tabId) => {
        setProps({ ...props, activeTab: tabId });
      }}
    />
  );
};

