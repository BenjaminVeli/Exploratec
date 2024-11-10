import { useCallback, useState } from "react";
import api from "../../api";

import Header from "../../components/Header";
import { useEffect } from "react";

const AdminVisits = () => {
  const [visits, setVisits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(0);

  const fetchVisits = useCallback(async (page = 1) => {
    try {
      const response = await api.get('/api/visits-today/', {
        params: {
          page,
          page_size: recordsPerPage,
        },
      });
      setVisits(response.data.results);
      setTotalPages(Math.ceil(response.data.count / recordsPerPage));
    } catch (error) {
      console.error('Error getting visits:', error);
    }
  }, [recordsPerPage]);

  useEffect(() => {
    fetchVisits(currentPage);
  }, [currentPage, fetchVisits]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-slate-100 min-h-screen">
      <Header />
      <div className="pt-16 sm:pt-24 antialiased">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
          <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-center text-2xl font-bold md:text-4xl text-slate-900">Visits Today</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase bg-slate-900">
                  <tr>
                    <th scope="col" className="p-4">Id</th>
                    <th scope="col" className="p-4">Name</th>
                    <th scope="col" className="p-4">Lastname</th>
                    <th scope="col" className="p-4">Phone</th>
                    <th scope="col" className="p-4">Dni</th>
                    <th scope="col" className="p-4">Specialty</th>
                    <th scope="col" className="p-4">Visit</th>
                  </tr>
                </thead>
                <tbody>
                  {visits.length > 0 ? (
                    visits.map(visit => (
                      <tr key={visits.id} className="border-b dark:border-gray-300 dark:hover:bg-gray-300 transition-all duration-500">
                        <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900">{visit.id}</td>
                        <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900">{visit.name}</td>
                        <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900">{visit.lastname}</td>
                        <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900">{visit.phone}</td>
                        <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900">{visit.dni}</td>
                        <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900">{visit.specialty.name}</td>
                        <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900">{visit.visit_date}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-3">No results found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex justify-center py-4">
                <nav>
                  <ul className="flex list-none">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li key={index + 1}>
                        <span
                          onClick={() => paginate(index + 1)}
                          className={`py-2 px-3  ${currentPage === index + 1 ? 'bg-blue-700 text-white border border-blue-700' : 'bg-white text-blue-700 border border-blue-700'} hover:bg-blue-800 hover:text-white transition-all duration-500`}
                        >
                          {index + 1}
                        </span>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminVisits