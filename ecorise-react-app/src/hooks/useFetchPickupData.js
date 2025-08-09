import { useState, useEffect } from "react";
import { fetchPickupInfo } from "../utils/fetchPickup";
import {fetchUsersInfo} from "../utils/fetchUserprofiles";
import {fetchMaterialsInfo} from "../utils/fetchMaterials";

function useFetchDashboardData() {
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const [pickupData, usersData, materialsData] = await Promise.all([
          fetchPickupInfo(),
          fetchUsersInfo(),
          fetchMaterialsInfo(),
        ]);

        const userMap = {};
        usersData.forEach(user => { userMap[user.user_id] = user; });

        const materialMap = {};
        materialsData.forEach(mat => { materialMap[mat.material_id] = mat; });

        const joined = pickupData.map(item => ({
          _id: item.request_id || item._id || null,
          material: materialMap[item.material]?.material_type || "Unknown",
          material_id: item.material,
          name: userMap[item.user_id]?.name || "Unknown",
          phone: userMap[item.user_id]?.phone_number || "N/A",
          location: item.market_location || "",
          status: item.pickup_status || "",
          createdAt: item.created_at || "",
          userId: item.user_id || null,
        }));

        setPickups(joined);
      } catch (err) {
        setError(err.message || "Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { pickups, loading, error };
}
export default useFetchDashboardData;