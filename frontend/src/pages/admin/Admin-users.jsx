import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { SquarePen, Eye, Search } from 'lucide-react';
import api from "../../api";

import UserDetailsModal from "../../components/admin/user/UserDetailsModal.jsx";
import UserEditModal from "../../components/admin/user/UserEditModal.jsx";

import Header from "../../components/Header";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null);

  const fetchUsers = useCallback(async (page = 1) => {
    try {
      const response = await api.get('/api/user-list/', {
        params: {
          page,
          page_size: recordsPerPage,
          search: searchQuery,
        },
      });
      setUsers(response.data.results);
      setTotalPages(Math.ceil(response.data.count / recordsPerPage));
    } catch (error) {
      console.error('Error getting users:', error);
    }
  }, [recordsPerPage, searchQuery]);

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, fetchUsers]);

  const handleSearchChange = useCallback(
    debounce((value) => {
      setSearchQuery(value);
      setCurrentPage(1);
    }, 50),
    []
  );

  const onSearchInputChange = (e) => {
    handleSearchChange(e.target.value);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const updateUser = async (updatedUser) => {
    try {
      await api.patch(`/api/user-update/${updatedUser.id}/`, updatedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? { ...user, ...updatedUser } : user
        )
      );
      closeModal();
    } catch (error) {
      console.error('Error al actualizar la solicitud:', error);
    }
  };

  const openModal = (user, type) => {
    setSelectedUser(user);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalType(null);
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <Header />
      <div className="pt-16 sm:pt-24 antialiased">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
          <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-center text-2xl font-bold md:text-4xl text-slate-900">User Administration</h2>
            </div>
            <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 pb-4">  
              <div className="flex px-4 py-2 items-center border-2 border-gray-300 rounded-lg w-80">
                <input placeholder="Type a username or email to search" className="outline-none text-sm w-full" value={searchQuery} onChange={onSearchInputChange} />
                <Search size={16} />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase bg-slate-900">
                  <tr>
                    <th scope="col" className="p-4">Id</th>
                    <th scope="col" className="p-4">Username</th>
                    <th scope="col" className="p-4">Emails</th>
                    <th scope="col" className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map(user => (
                      <tr key={user.id} className="border-b dark:border-gray-300 dark:hover:bg-gray-300 transition-all duration-500">
                        <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900">{user.id}</td>
                        <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900">{user.username}</td>
                        <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900">{user.email}</td>                        
                        <td className="px-4 py-3 font-medium whitespace-nowrap text-stone-900">
                          <div className="flex items-center justify-center space-x-4">
                            <button
                              onClick={() => openModal(user, 'view')}
                              className="py-2 px-3 flex items-center text-sm font-medium text-center border border-yellow-700 rounded-lg text-yellow-700 hover:text-white bg-transparent hover:bg-yellow-700 transition-all duration-500"
                            >
                              <Eye size={15} className="mr-2" /> Read
                            </button>
                            {modalType === 'view' && selectedUser && (
                              <UserDetailsModal user={selectedUser} closeUserDetailsModal={closeModal} />
                            )}
                            <button
                              onClick={() => openModal(user, 'edit')}
                              className="py-2 px-3 flex items-center text-sm font-medium text-center border border-blue-700 rounded-lg text-blue-700 hover:text-white bg-transparent hover:bg-blue-700 transition-all duration-500"
                            >
                              <SquarePen size={15} className="mr-2" /> Edit
                            </button>
                            {modalType === 'edit' && selectedUser && (
                              <UserEditModal user={selectedUser} closeUserEditModal={closeModal} onUserUpdated={updateUser} />
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
                          className={`py-2 px-3 ${currentPage === index + 1 ? 'bg-blue-700 text-white border border-blue-700' : 'bg-white text-blue-700 border border-blue-700'} hover:bg-blue-800 hover:text-white transition-all duration-500`}
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

export default AdminUsers;
