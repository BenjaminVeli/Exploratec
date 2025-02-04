import { useState, useEffect, useCallback } from 'react';
import { SquarePen, Trash2, Eye, Search } from 'lucide-react';
import api from "../../api";

import Header from "../../components/Header";
import RequestDetailsModal from "../../components/admin/request/RequestDetailsModal";
import RequestEditModal from '../../components/admin/request/RequestEditModal';
import RequestDeleteModal from '../../components/admin/request/RequestDeleteModal';




const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalType, setModalType] = useState(null); // 'view' para ver detalles, 'edit' para editar

  const fetchRequests = useCallback(async (page = 1) => {
    try {
      const response = await api.get('/api/request-list/', {
        params: {
          page,
          page_size: recordsPerPage,
          search: searchQuery,
        },
      });
      setRequests(response.data.results);
      setTotalPages(Math.ceil(response.data.count / recordsPerPage));
    } catch (error) {
      console.error('Error getting requests:', error);
    }
  }, [recordsPerPage, searchQuery]);
  
  useEffect(() => {
    fetchRequests(currentPage);
  }, [currentPage, fetchRequests]);

  const onSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteRequest = async (id) => {
    try {
      await api.delete(`/api/request-delete/${id}/`);
      // Filtra las solicitudes después de eliminar la nota
      setRequests(requests.filter((request) => request.id !== id));
      closeModal();
    } catch (error) {
      console.error('Error al eliminar la solicitud:', error);
    }
  };

  const updateRequest = async (updatedRequest) => {
    try {
      // Realiza la solicitud PATCH para actualizar la solicitud
      await api.patch(`/api/request-update/${updatedRequest.id}/`, updatedRequest);
      // Actualiza la lista de solicitudes
      setRequests((prevRequests) => 
        prevRequests.map((request) => 
          request.id === updatedRequest.id ? { ...request, ...updatedRequest } : request
        )
      );
      // Cierra el modal después de la actualización
      closeModal();
    } catch (error) {
      console.error('Error al actualizar la solicitud:', error);
    }
  };

  // Abrir modal
  const openModal = (request, type) => {
    setSelectedRequest(request); // Almacena la solicitud seleccionada
    setModalType(type); // Define qué tipo de modal abrir
  };

  // Cerrar modal
  const closeModal = () => {
    setSelectedRequest(null);
    setModalType(null); // Limpia el tipo de modal
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <Header />
      <div className="pt-16 sm:pt-24 antialiased">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
            <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="p-4">
                <h2 className="text-center text-2xl font-bold md:text-4xl text-slate-900">Request Administration</h2>
              </div>
              <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 pb-4">  
                <div className="flex px-4 py-2 items-center border-2 border-gray-300 rounded-lg w-80">
                  <input placeholder="Type a name or last name to search" className="outline-none text-sm w-full" value={searchQuery} onChange={onSearchInputChange}/>
                  <Search size={16} />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-white uppercase bg-slate-900">
                    <tr>
                      <th scope="col" className="p-4">Id</th>
                      <th scope="col" className="p-4">Name</th>
                      <th scope="col" className="p-4">Lastname</th>
                      <th scope="col" className="p-4">Dni</th>
                      <th scope="col" className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.length > 0 ? (
                      requests.map(request => (
                        <tr key={request.id} className="border-b dark:border-gray-300 dark:hover:bg-gray-300 transition-all duration-500">
                          <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900">{request.id}</td>
                          <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900">{request.name}</td>
                          <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900">{request.lastname}</td>
                          <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900">{request.phone}</td>
                          <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900">
                            <div className="flex items-center justify-center space-x-4">
                              {/* Botón para abrir modal de detalles */}
                              <button
                                onClick={() => openModal(request, 'view')}
                                className="py-2 px-3 flex items-center text-sm font-medium text-center border border-yellow-700 rounded-lg text-yellow-700 hover:text-white bg-transparent hover:bg-yellow-700 transition-all duration-500"
                              >
                                <Eye size={15} className="mr-2" /> Read
                              </button>

                              {modalType === 'view' && selectedRequest && (
                                <RequestDetailsModal request={selectedRequest} closeRequestDetailsModal={closeModal} />
                              )}

                              {/* Botón para abrir modal de edición */}
                              <button
                                onClick={() => openModal(request, 'edit')}
                                className="py-2 px-3 flex items-center text-sm font-medium text-center border border-blue-700 rounded-lg text-blue-700 hover:text-white bg-transparent hover:bg-blue-700 transition-all duration-500"
                              >
                                <SquarePen size={15} className="mr-2" /> Edit
                              </button>

                              {modalType === 'edit' && selectedRequest && (
                                <RequestEditModal request={selectedRequest} closeRequestEditModal={closeModal} onRequestUpdated={updateRequest}/>
                              )}

                              <button onClick={() => openModal(request, 'delete')} className="py-2 px-3 flex items-center text-sm font-medium text-center border border-red-700 rounded-lg text-red-700 hover:text-white bg-transparent hover:bg-red-700 transition-all duration-500">
                                <Trash2 size={15} className="mr-2" /> Delete
                              </button>
                              
                              {modalType === 'delete' && selectedRequest && (
                                <RequestDeleteModal requestId={selectedRequest.id} deleteRequest={deleteRequest} closeRequestDeleteModal={closeModal}/>
                              )}
                            </div>
                          </td>
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
  );
};

export default AdminRequests;
