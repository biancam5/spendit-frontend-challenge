import React, { useState, useEffect } from 'react';
import TableRows from '../table-row/table-row';

interface DataTableProps<T extends Record<string, any>> {
  data: T[] | Promise<Paginated<T>>;
  customHeaderHtml?: React.ReactNode;
  showCheckbox?: boolean;
  onPageChange?: (pageNumber: number) => void;
  translateMetaData?: (metaData: any) => Paginated<T>;
  selectedRows: T[];
  onRowSelect: (row: T) => void;
}

interface Paginated<T> {
  data: T[];
  total: number;
  skip: number;
  take: number;
  metaData?: any;
}

const DataTable = <T extends object>({
  data,
  customHeaderHtml,
  showCheckbox = true,
  onPageChange,
  translateMetaData,
  selectedRows,
  onRowSelect,
}: DataTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState<T[]>([]);

  useEffect(() => {
    if (data instanceof Promise) {
      data.then((resolvedData) => {
        if (translateMetaData) {
          const translatedData = translateMetaData(resolvedData.metaData);
          setTableData(translatedData.data);
        } else {
          setTableData(resolvedData.data);
        }
      });
    } else {
      setTableData(data);
    }
  }, [data, translateMetaData]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0) {
      setCurrentPage(pageNumber);
      if (onPageChange) {
        onPageChange(pageNumber);
      }
    }
  };

  const handleRowClick = (row: T) => {
    onRowSelect(row);
  };

  const renderTableHeaders = () => {
    return <thead>{customHeaderHtml}</thead>;
  };

  const renderTableRows = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return (
      <tbody>
        {tableData.slice(startIndex, endIndex).map((item, index) => (
          <TableRows
            key={index}
            data={item}
            selectable={showCheckbox}
            onRowSelect={handleRowClick}
            isSelected={selectedRows.includes(item)}
          />
        ))}
      </tbody>
    );
  };

  const renderPagination = () => {
    return (
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div>
      <table>
        {renderTableHeaders()}
        {renderTableRows()}
      </table>
      {totalPages > 1 && renderPagination()}
    </div>
  );
};

export default DataTable;
