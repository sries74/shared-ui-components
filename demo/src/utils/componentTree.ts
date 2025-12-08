export interface ComponentNode {
  name: string;
  path?: string;
  children?: ComponentNode[];
}

export const componentTree: ComponentNode[] = [
  {
    name: 'Common',
    children: [
      { name: 'Button', path: '/component/common/button' },
      { name: 'SearchBar', path: '/component/common/searchbar' },
    ],
  },
  {
    name: 'Forms',
    children: [
      { name: 'FormInput', path: '/component/forms/forminput' },
      { name: 'FormTextarea', path: '/component/forms/formtextarea' },
      { name: 'FormSelect', path: '/component/forms/formselect' },
      { name: 'TagInput', path: '/component/forms/taginput' },
    ],
  },
  {
    name: 'Data Display',
    children: [
      { name: 'Card', path: '/component/datadisplay/card' },
      { name: 'Badge', path: '/component/datadisplay/badge' },
      { name: 'DataTable', path: '/component/datadisplay/datatable' },
    ],
  },
  {
    name: 'Feedback',
    children: [
      { name: 'Toast', path: '/component/feedback/toast' },
      { name: 'LoadingSpinner', path: '/component/feedback/loadingspinner' },
    ],
  },
  {
    name: 'Overlay',
    children: [
      { name: 'Modal', path: '/component/overlay/modal' },
    ],
  },
  {
    name: 'Navigation',
    children: [
      { name: 'Tabs', path: '/component/navigation/tabs' },
    ],
  },
];

