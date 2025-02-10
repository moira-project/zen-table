import { CoreTable } from '@core-table/core/table';
import { ColumnDef } from '@core-table/types';

type Person = {
  id: number;
  name: string;
  age: number;
};

export const SortingTable = () => {
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

  // ✅ CoreTable 인스턴스 생성
  const table = new CoreTable<Person>({
    columns,
    data,
    enableSorting: true, // ✅ 정렬 기능 활성화
    getRowId: row => `person-${row.id}`,
  });

  // ✅ 테이블 엘리먼트 생성
  const tableElement = document.createElement('table');
  tableElement.style.borderCollapse = 'collapse';
  tableElement.style.width = '100%';
  tableElement.style.border = '1px solid #ccc';

  // ✅ 테이블 헤더 생성
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  // ✅ 현재 정렬 상태 저장
  let currentSortKey: keyof Person | null = null;
  let currentSortDirection: 'asc' | 'desc' = 'asc';

  table.getHeaderModel().headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header.column.header;
    th.style.border = '1px solid #ccc';
    th.style.padding = '8px';
    th.style.textAlign = 'left';
    th.style.cursor = 'pointer';

    // ✅ 정렬 이벤트 추가
    th.addEventListener('click', () => {
      if (currentSortKey === header.column.key) {
        currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        currentSortKey = header.column.key as keyof Person;
        currentSortDirection = 'asc';
      }

      table.setSorting(currentSortKey, currentSortDirection); // ✅ 정렬 적용
      updateTableBody(); // ✅ 정렬 후 테이블 업데이트
    });

    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  tableElement.appendChild(thead);

  // ✅ 테이블 본문 생성
  const tbody = document.createElement('tbody');
  updateTableBody();
  tableElement.appendChild(tbody);

  // ✅ 테이블 본문 업데이트 함수
  function updateTableBody() {
    tbody.innerHTML = ''; // 기존 데이터 초기화
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
