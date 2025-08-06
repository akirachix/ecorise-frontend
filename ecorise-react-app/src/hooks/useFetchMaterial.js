import { useState, useEffect } from "react";
import { fetchMaterialsInfo, createMaterial,updateMaterial,deleteMaterial } from "../utils/fetchMaterials";

function useMaterialFetch() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    loadMaterials();
  }, []);

 
  const loadMaterials = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMaterialsInfo();
      setMaterials(data);
    } catch (err) {
      setError(err.message || "Failed to load materials");
    } finally {
      setLoading(false);
    }
  };

  
  const addMaterial = async (materialData) => {
    setLoading(true);
    setError(null);
    try {
      const created = await createMaterial(materialData);
      setMaterials((prev) => [...prev, created]);
      return created;
    } catch (err) {
      setError(err.message || "Failed to create material");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  
  const editMaterial = async (materialId, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateMaterial(materialId, updatedData);
      setMaterials((prev) =>
        prev.map((mat) => (mat.material_id === materialId ? updated : mat))
      );
      return updated;
    } catch (err) {
      setError(err.message || "Failed to update material");
      throw err;
    } finally {
      setLoading(false);
    }
  };


  const removeMaterial = async (materialId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteMaterial(materialId);
      setMaterials((prev) => prev.filter((mat) => mat.material_id !== materialId));
    } catch (err) {
      setError(err.message || "Failed to delete material");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    materials,
    loading,
    error,
    reloadMaterials: loadMaterials,
    addMaterial,
    editMaterial,
    removeMaterial,
  };
}

export default useMaterialFetch;
