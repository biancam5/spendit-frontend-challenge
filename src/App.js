import React, { useState } from "react";
import DataTable from "./components/custom/data-table";
import "./App.css";
import data from "./components/custom/data.json";

function App() {
  const columns = ["ID", "Name", "Last Name", "Age"];

  const [showCheckbox, setShowCheckbox] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newItem, setNewItem] = useState({
    id: "",
    name: "",
    lastName: "",
    age: "",
  });

  const [tableData, setTableData] = useState(data);

  const headerHtml = (
    <tr>
      {columns.map((columnName, index) => (
        <th key={index} className="custom-header">
          {columnName}
        </th>
      ))}
    </tr>
  );

  const handlePageChange = (pageNumber) => {
    console.log(`Page changed to ${pageNumber}`);
  };

  const translateMetaData = (metaData) => {
    return metaData;
  };

  const toggleCheckbox = () => {
    setShowCheckbox(!showCheckbox);
  };

  const handleRowSelect = (row) => {
    if (selectedRows.includes(row)) {
      setSelectedRows(selectedRows.filter((r) => r !== row));
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };
  const handleEditClick = () => {
    if (selectedRows.length >= 1) {
      const selectedRowToEdit = selectedRows[selectedRows.length - 1];
      setEditingItem(selectedRowToEdit);
      setIsEditing(true);
    }
  };

  const handleCreateClick = () => {
    setIsCreating(true);
    setNewItem({
      id: "",
      name: "",
      lastName: "",
      age: "",
    });
  };

  const handleDeleteClick = () => {
    const newData = tableData.filter((row) => !selectedRows.includes(row));
    setTableData(newData);
    setIsEditing(false);
    setSelectedRows([]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (isEditing) {
      setEditingItem({
        ...editingItem,
        [name]: value,
      });
    } else if (isCreating) {
      setNewItem({
        ...newItem,
        [name]: value,
      });
    }
  };
  const handleEditSubmit = (event) => {
    event.preventDefault();
    const updatedData = tableData.map((item) =>
      item.id === editingItem.id ? editingItem : item
    );
    setTableData(updatedData);
    setIsEditing(false);
  };

  const handleCreateSubmit = (event) => {
    event.preventDefault();
    setTableData([...tableData, newItem]);
    setIsCreating(false);
  };

  return (
    <div className="App">
      <button className="checkbox-button" onClick={toggleCheckbox}>
        {showCheckbox ? "View selected table" : "View normal table"}
      </button>
      <button onClick={handleCreateClick}>Create</button>
      <button onClick={handleEditClick}>Edit</button>
      <button onClick={handleDeleteClick}>Delete</button>
      {isEditing && (
        <div className="modal-overlay">
          <div className="modal">
            <button
              className="close-button"
              onClick={() => setIsEditing(false)}
            >
              &times;
            </button>
            <h2>Edit element</h2>
            <form onSubmit={handleEditSubmit}>
              {editingItem && (
                <>
                  <label>ID:</label>
                  <input
                    type="text"
                    name="id"
                    value={editingItem.id}
                    readOnly
                  />
                  <label>Name :</label>
                  <input
                    type="text"
                    name="name"
                    value={editingItem.name}
                    onChange={handleInputChange}
                  />
                  <label>Last name:</label>
                  <input
                    type="text"
                    name="lastName"
                    value={editingItem.lastName}
                    onChange={handleInputChange}
                  />
                  <label>Age:</label>
                  <input
                    type="text"
                    name="age"
                    value={editingItem.age}
                    onChange={handleInputChange}
                  />
                  <button type="submit" className="save-button">
                    Save changes
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}
      {isCreating && (
        <div className="modal-overlay">
          <div className="modal">
            <button
              className="close-button"
              onClick={() => setIsCreating(false)}
            >
              &times;
            </button>
            <h2>Create new element</h2>
            <form onSubmit={handleCreateSubmit}>
              <label>ID:</label>
              <input
                type="text"
                name="id"
                value={newItem.id}
                onChange={handleInputChange}
              />
              <label>Name :</label>
              <input
                type="text"
                name="name"
                value={newItem.name}
                onChange={handleInputChange}
              />
              <label>Last name:</label>
              <input
                type="text"
                name="lastName"
                value={newItem.lastName}
                onChange={handleInputChange}
              />
              <label>Age :</label>
              <input
                type="text"
                name="age"
                value={newItem.age}
                onChange={handleInputChange}
              />
              <button type="submit" className="save-button">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
      <DataTable
        data={tableData}
        customHeaderHtml={headerHtml}
        columns={columns}
        showCheckbox={showCheckbox}
        onPageChange={handlePageChange}
        translateMetaData={translateMetaData}
        selectedRows={selectedRows}
        onRowSelect={handleRowSelect}
        isEditing={isEditing}
      />
    </div>
  );
}

export default App;
