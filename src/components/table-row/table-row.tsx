import React from 'react';

interface TableRowProps<T extends Record<string, any>> {
  data: T;
  selectable?: boolean;
  showCheckbox?: boolean;
  isSelected?: boolean;
  onRowSelect?: (row: T) => void;
}

const TableRows = <T extends Record<string, any>>({
  data,
  selectable,
  isSelected,
  onRowSelect,
}: TableRowProps<T>) => {
  const handleCheckboxChange = () => {
    if (onRowSelect) {
      onRowSelect(data);
    }
  };

  return (
    <tr>
      {Object.keys(data).map((key, index) => (
        <td key={index}>
          {key === 'id' && selectable ? (
            <>
              <input
                type="checkbox"
                checked={isSelected}
                onChange={handleCheckboxChange}
              />
              {data[key]}
            </>
          ) : (
            data[key]
          )}
        </td>
      ))}
    </tr>
  );
};

export default TableRows;

