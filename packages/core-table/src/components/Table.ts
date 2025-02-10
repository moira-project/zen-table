import { CoreTable } from '@core-table/core/table';
import { ColumnDef } from '@core-table/types';

type Person = {
  id: number;
  name: string;
  age: number;
};

export const Table = () => {
  const data: Person[] = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 },
  ];

  const columns: ColumnDef<Person>[] = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'age', header: 'Age' },
  ];

  // Initialize TableCore instance
  const table = new CoreTable<Person>({
    columns,
    data,
    getRowId: row => `person-${row.id}`,
  });

  // Get header and row models
  const headerModel = table.getHeaderModel();
  const rowModel = table.getRowModel();
  console.log(rowModel);
  // Create table element
  const tableElement = document.createElement('table');
  tableElement.style.borderCollapse = 'collapse';
  tableElement.style.width = '100%';
  tableElement.style.border = '1px solid #ccc';

  // Create header row
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headerModel.headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header.column.header;
    th.style.border = '1px solid #ccc';
    th.style.padding = '8px';
    th.style.textAlign = 'left';
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  tableElement.appendChild(thead);

  // Create body rows
  const tbody = document.createElement('tbody');
  rowModel.rows.forEach(row => {
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
  tableElement.appendChild(tbody);

  return tableElement;
};
