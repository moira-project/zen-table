// ✅ Storybook 메타 데이터

import { SortingTable } from '@zen-table/core-table';
export default {
  title: 'Vanilla/Sorting',
};
export const Default = () => {
  return document.createElement('div');
};

Default.play = async ({ canvasElement }) => {
  const tableElement = SortingTable();
  canvasElement.appendChild(tableElement);
};
