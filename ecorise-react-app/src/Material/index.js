import React, { useState } from "react";
import useFetchMaterial from "../hooks/useFetchMaterial"
import "./index.css";

function MaterialPricing() {
  const { materials, loading, error, editMaterial, removeMaterial, addMaterial } = useFetchMaterial();

  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ material_type: "", price_per_kg: "" });

  const [showAddForm, setShowAddForm] = useState(false);
  const [newMaterial, setNewMaterial] = useState({ material_type: "", price_per_kg: "" });
  
  const [searchTerm, setSearchTerm] = useState("");

  const startEdit = (mat) => {
    setEditingId(mat.material_id);
    setEditValues({ material_type: mat.material_type, price_per_kg: mat.price_per_kg });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({ material_type: "", price_per_kg: "" });
  };

  const saveEdit = async (id) => {
    if (!editValues.material_type.trim() || !editValues.price_per_kg.toString().trim()) {
      alert("Please fill all fields");
      return;
    }
    try {
      await editMaterial(id, {
        material_type: editValues.material_type.trim(),
        price_per_kg: editValues.price_per_kg.trim(),
      });
      cancelEdit();
    } catch (err) {
      alert("Save failed: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this material?")) {
      try {
        await removeMaterial(id);
      } catch (err) {
        alert("Delete failed: " + err.message);
      }
    }
  };

  const handleAddMaterial = async () => {
    if (!newMaterial.material_type.trim() || !newMaterial.price_per_kg.toString().trim()) {
      alert("Please fill all fields to add new material");
      return;
    }
    try {
      await addMaterial({
        material_type: newMaterial.material_type.trim(),
        price_per_kg: newMaterial.price_per_kg.trim(),
      });
      setNewMaterial({ material_type: "", price_per_kg: "" });
      setShowAddForm(false);
    } catch (err) {
      alert("Failed to add material: " + err.message);
    }
  };

  const filteredMaterials = materials.filter((mat) => {
    const lowerTerm = searchTerm.toLowerCase();

    const createdAtStr = mat.created_at ? new Date(mat.created_at).toLocaleString() : "";

    return (
      mat.material_type.toLowerCase().includes(lowerTerm) ||
      mat.price_per_kg.toString().toLowerCase().includes(lowerTerm) ||
      createdAtStr.toLowerCase().includes(lowerTerm) ||

      (mat.material_id?.toString().toLowerCase().includes(lowerTerm) ?? false)
    );
  });


  const sortedMaterials = [...filteredMaterials].sort(
    (a, b) => Number(a.material_id) - Number(b.material_id)
  );

  return (
    <div className="pickup-main-container">
      
      <div className="pickup-table-container">
        <header className="pickup-header">
          <div className="title">ECORISE</div>


          <div className="search-container">
            <input
              className="search-input"
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search materials"
              autoComplete="off"
            />
          </div>
        </header>

        <div className="pickup-request-bar">
          <p>Material Pricing</p>
        </div>

        <section className="pickup-section">
          {loading && <div className="loading">Loading materials...</div>}
          {error && <div className="error">Error: {error}</div>}

          {!loading && !error && (
            <>
              <table className="pickup-table" aria-label="Material Pricing Table">
                <thead>
                  <tr>
                    <th>Number</th>
                    <th>Material Type</th>
                    <th>Price per Kg (Kshs)</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedMaterials.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="no-data-cell">
                        No materials found.
                      </td>
                    </tr>
                  ) : (
                    sortedMaterials.map((mat, idx) => {
                      const isEditing = editingId === mat.material_id;
                      return (
                        <tr key={mat.material_id} className={idx % 2 === 0 ? "even-row" : "odd-row"}>
                          <td>{idx + 1}</td>
                          <td>
                            {isEditing ? (
                              <input
                                type="text"
                                value={editValues.material_type}
                                onChange={(e) =>
                                  setEditValues((prev) => ({
                                    ...prev,
                                    material_type: e.target.value,
                                  }))
                                }
                                aria-label="Edit Material Type"
                                className="edit-input"
                              />
                            ) : (
                              mat.material_type
                            )}
                          </td>
                          <td>
                            {isEditing ? (
                              <input
                                type="number"
                                value={editValues.price_per_kg}
                                onChange={(e) =>
                                  setEditValues((prev) => ({
                                    ...prev,
                                    price_per_kg: e.target.value,
                                  }))
                                }
                                step="0.01"
                                min="0"
                                aria-label="Edit Price per Kg"
                                className="edit-input"
                              />
                            ) : (
                              `${mat.price_per_kg}`
                            )}
                          </td>
                          <td>{mat.created_at ? new Date(mat.created_at).toLocaleString() : "N/A"}</td>
                          <td>
                            {isEditing ? (
                              <>
                                <button className="material-btn" onClick={() => saveEdit(mat.material_id)}>
                                  Save
                                </button>
                                <button className="material-btn cancel-btn" onClick={cancelEdit}>
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <button className="edit-btn" onClick={() => startEdit(mat)}>
                                  Edit
                                </button>
                                <button className="delete-btn" onClick={() => handleDelete(mat.material_id)}>
                                  Delete
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>


              <div className="add-material-btn-wrapper">
                <button className="add-material-btn" onClick={() => setShowAddForm((prev) => !prev)}>
                  + Add New Material
                </button>
              </div>

              {showAddForm && (
                <div className="add-material-form">
                  <input
                    type="text"
                    placeholder="Material Type"
                    value={newMaterial.material_type}
                    onChange={(e) => setNewMaterial((prev) => ({ ...prev, material_type: e.target.value }))}
                    className="add-input"
                    aria-label="New Material Type"
                  />
                  <input
                    type="number"
                    placeholder="Price per Kg"
                    value={newMaterial.price_per_kg}
                    onChange={(e) => setNewMaterial((prev) => ({ ...prev, price_per_kg: e.target.value }))}
                    step="0.01"
                    min="0"
                    className="add-input price-input"
                    aria-label="New Price per Kg"
                  />
                  <button className="material-btn add-submit-btn" onClick={handleAddMaterial}>
                    Add
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default MaterialPricing;
