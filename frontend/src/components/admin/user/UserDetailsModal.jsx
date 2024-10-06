import { X } from 'lucide-react';

const UserDetailsModal = ({ user, closeUserDetailsModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-gray-800  border rounded-lg w-2/5">
        <div className="border-b border-gray-400 p-4">
          <button onClick={closeUserDetailsModal} className="float-right hover:bg-gray-600 rounded-full transition-all duration-300 p-1">
            {<X size={20} className="text-white"/>}
          </button>
          <h3 className="text-2xl text-white uppercase">User Details</h3>
        </div>
        <div className="p-4 text-base">          
          <p className="text-white">ID: {user.id}</p>
          <p className="text-white">Username: {user.username}</p>
          <p className="text-white">Email: {user.email}</p>
          
          {user.is_active ? (
            <p className="text-white">The user is active.</p> 
          ): (
            <p className="text-white">The user is disabled.</p> 
          )}

        </div>
        <div className="p-4 border-t border-gray-400"></div>
      </div>
    </div>
  )
}

export default UserDetailsModal;
