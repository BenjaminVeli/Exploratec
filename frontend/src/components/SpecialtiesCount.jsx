import { useState, useEffect } from "react";
import api from "../api";

const SpecialtiesCount = () => {
  const [stats, setStats] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const fetchSpecialties = async () => {
    try {
      const response = await api.get("/api/specialty-stats/");
      setStats(response.data);
    } catch (err) {
      setError("Error fetching stats: " + err.message);
    }
  };

  return (
    <div className="w-full">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="overflow-hidden border rounded-xl shadow-sm p-6 bg-neutral-800">
            <table className="min-w-full divide-y divide-neutral-700">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium uppercase text-blue-500"
                  >
                    Carreras
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium uppercase text-blue-500"
                  >
                    N° de usuarios
                  </th>
                </tr>
              </thead>
              <tbody className="min-w-full divide-y divide-neutral-700">
                {stats.map((stat, index) => (
                  <tr key={index} className="">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  text-white">
                      {stat.specialty__name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white text-center">
                      {stat.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialtiesCount;
