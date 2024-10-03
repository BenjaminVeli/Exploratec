import { useState, useEffect } from 'react';
import { SquarePen, Trash2, Eye, Search } from 'lucide-react';
import Header from "../../components/Header";
import api from "../../api";

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(9); // Número de registros por página

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get('/api/request-list/');
        setRequests(response.data);
      } catch (error) {
        console.error('Error al obtener las solicitudes:', error);
      }
    };
  
    fetchRequests(); 
  }, []);

  // Calcular los índices de los registros a mostrar
  const indexOfLastRequest = currentPage * recordsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - recordsPerPage;
  const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el total de páginas
  const totalPages = Math.ceil(requests.length / recordsPerPage);

  return (
    <div>
      <Header />
      <div className="p-3 sm:p-5 antialiased mt-14">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
          {requests.length > 0 ? (
            <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="p-4">
                <h2 className="text-center text-2xl font-bold md:text-4xl">Request Administration</h2>
              </div>
              <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 pb-4">  
                
              <div className="flex px-4 py-2 items-center border-2 border-gray-300 rounded-lg">
                <input placeholder="Type name to search" className="outline-none text-sm"/>
                {<Search size={16} className=""/>}
              </div>

              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-white uppercase bg-stone-900">
                    <tr>
                      <th scope="col" className="p-4">Id</th>
                      <th scope="col" className="p-4">Name</th>
                      <th scope="col" className="p-4">Lastname</th>
                      <th scope="col" className="p-4">Dni</th>
                      <th scope="col" className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRequests.map(request => (
                      <tr key={request.id} className="border-b dark:border-gray-300 dark:hover:bg-gray-300 transition-all duration-500">
                        <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900">{request.id}</td>
                        <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900">{request.name}</td>
                        <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900">{request.lastname}</td>
                        <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900">{request.phone}</td>
                        <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900">
                          <div className="flex items-center justify-center space-x-4">
                            <button className="py-2 px-3 flex items-center text-sm font-medium text-center border border-yellow-700 rounded-lg text-yellow-700 hover:text-white bg-transparent hover:bg-yellow-700 transition-all duration-500">{<Eye size={15} className="mr-2"/>}Read</button>
                            <button className="py-2 px-3 flex items-center text-sm font-medium text-center border border-blue-700 rounded-lg text-blue-700 hover:text-white bg-transparent hover:bg-blue-700 transition-all duration-500">{<SquarePen size={15} className="mr-2"/>}Edit</button>
                            <button className="py-2 px-3 flex items-center text-sm font-medium text-center border border-red-700 rounded-lg text-red-700 hover:text-white bg-transparent hover:bg-red-700 transition-all duration-500">{<Trash2 size={15} className="mr-2"/>}Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginación */}
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

            </div>
          ) : (
            <p>No se encontraron resultados.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminRequests;
