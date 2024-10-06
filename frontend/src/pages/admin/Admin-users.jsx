import { useState, useEffect } from 'react';
import { SquarePen, Eye, Search } from 'lucide-react';
import api from "../../api";

import UserDetailsModal from "../../components/admin/user/UserDetailsModal.jsx";
import UserEditModal from "../../components/admin/user/UserEditModal.jsx";

import Header from "../../components/Header";


const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(8);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null);

  const indexOfLastUser = currentPage * recordsPerPage;
  const indexOfFirstUser = indexOfLastUser - recordsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(users.length / recordsPerPage);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/api/user-list/');
        setUsers(response.data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };
    fetchUsers(); 
  }, []);


  const updateUser = async (updatedUser) => {
    try {
      // Realiza la solicitud PATCH para actualizar al usuario
      await api.patch(`/api/user-update/${updatedUser.id}/`, updatedUser);
      // Actualiza la lista de usuarios
      setUsers((prevUsers) => 
        prevUsers.map((user) => 
          user.id === updatedUser.id ? { ...user, ...updatedUser } : user
        )
      );
      // Cierra el modal después de la actualización
      closeModal();
    } catch (error) {
      console.error('Error al actualizar la solicitud:', error);
    }
  };

    // Abrir modal
    const openModal = (user, type) => {
      setSelectedUser(user); // Almacena la solicitud seleccionada
      setModalType(type); // Define qué tipo de modal abrir
    };
  
    // Cerrar modal
    const closeModal = () => {
      setSelectedUser(null);
      setModalType(null); // Limpia el tipo de modal
    };

  return (
    <div>
      <Header />
      <div className="p-3 sm:p-5 antialiased mt-14">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
          {users.length > 0 ? (
            <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="p-4">
                <h2 className="text-center text-2xl font-bold md:text-4xl">User Administration</h2>
              </div>
              <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 pb-4">  
                <div className="flex px-4 py-2 items-center border-2 border-gray-300 rounded-lg">
                  <input placeholder="Type name to search" className="outline-none text-sm" />
                  <Search size={16} />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-white uppercase bg-stone-900">
                    <tr>
                      <th scope="col" className="p-4">Id</th>
                      <th scope="col" className="p-4">Username</th>
                      <th scope="col" className="p-4">Emails</th>
                      <th scope="col" className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map(user => (
                      <tr key={user.id} className="border-b dark:border-gray-300 dark:hover:bg-gray-300 transition-all duration-500">
                        <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900">{user.id}</td>
                        <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900">{user.username}</td>
                        <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900">{user.email}</td>                        
                        <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900">
                          <div className="flex items-center justify-center space-x-4">
                            {/* Botón para abrir modal de detalles */}
                            <button
                              onClick={() => openModal(user, 'view')}
                              className="py-2 px-3 flex items-center text-sm font-medium text-center border border-yellow-700 rounded-lg text-yellow-700 hover:text-white bg-transparent hover:bg-yellow-700 transition-all duration-500"
                            >
                              <Eye size={15} className="mr-2" /> Read
                            </button>

                            {modalType === 'view' && selectedUser && (
                              <UserDetailsModal user={selectedUser} closeUserDetailsModal={closeModal} />
                            )}
                            {/* Botón para abrir modal de edición */}
                            <button
                              onClick={() => openModal(user, 'edit')}
                              className="py-2 px-3 flex items-center text-sm font-medium text-center border border-blue-700 rounded-lg text-blue-700 hover:text-white bg-transparent hover:bg-blue-700 transition-all duration-500"
                            >
                              <SquarePen size={15} className="mr-2" /> Edit
                            </button>

                            {modalType === 'edit' && selectedUser && (
                              <UserEditModal user={selectedUser} closeUserEditModal={closeModal} onUserUpdated={updateUser}/>
                            )}

                          
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

export default AdminUsers