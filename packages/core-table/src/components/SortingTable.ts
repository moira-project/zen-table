import { CoreTable } from '@core-table/core/table';
import { ColumnDef } from '@core-table/types';
import { SortingManager } from '@core-table/features/SortingManager';

type Person = {
  id: number;
  name: string;
  age: number;
};

export const SortingTable = () => {
  const data: Person[] = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 36 },
  ];

  const columns: ColumnDef<Person>[] = [
    { key: 'id', header: 'Id' },
    { key: 'name', header: 'Name' },
    {
      key: 'age',
      header: 'Age',
      sortingFn: (a, b, columnKey) => {
        const key = columnKey as keyof Person;
        return (a[key] as number) - (b[key] as number);
      },
    },
  ];

  const table = new CoreTable<Person>({
    columns,
    data,
    enableSorting: true,
    getRowId: row => `person-${row.id}`,
  });

  const tableElement = document.createElement('table');
  tableElement.style.borderCollapse = 'collapse';
  tableElement.style.width = '100%';
  tableElement.style.border = '1px solid #ccc';

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  let currentSortKey: keyof Person | null = null;
  let currentSortDirection: 'asc' | 'desc' = 'asc';

  table.getHeaderModel().headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header.column.header;
    th.style.border = '1px solid #ccc';
    th.style.padding = '8px';
    th.style.textAlign = 'left';
    th.style.cursor = 'pointer';

    th.addEventListener('click', () => {
      if (currentSortKey === header.column.key) {
        currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        currentSortKey = header.column.key as keyof Person;
        currentSortDirection = 'asc';
      }

      const sortingManager =
        table.getFeatureManager<SortingManager<Person>>(SortingManager);
      console.log(sortingManager, currentSortKey, currentSortDirection);
      sortingManager?.setSorting({
        columnKey: currentSortKey,
        direction: currentSortDirection,
      });
      updateTableBody();
    });

    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  tableElement.appendChild(thead);

  const tbody = document.createElement('tbody');
  updateTableBody();
  tableElement.appendChild(tbody);

  function updateTableBody() {
    tbody.innerHTML = '';
    table.getRowModel().rows.forEach(row => {
      const tr = document.createElement('tr');
      row.getCells().forEach(cell => {
        const td = document.createElement('td');
        td.textContent = String(cell.value);
        td.style.border = '1px solid #ccc';
        td.style.padding = '8px';
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  }

  return tableElement;
};
