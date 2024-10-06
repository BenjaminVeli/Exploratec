import { useState } from "react";

const UserEditModal = ({ user, closeUserEditModal, onUserUpdated }) => {
  const [isActive, setIsActive] = useState(user.is_active);

  const handleIsAcceptedChange = (e) => {
    setIsActive(e.target.checked);
  };

  const handleConfirmEdit = () => {
    // Llama a la función onRequestUpdated con el nuevo estado
    onUserUpdated({ ...user, is_active: isActive });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-gray-800 border rounded-lg w-2/5">
        <div className="border-b border-gray-400 p-4">
          <h3 className="text-2xl text-white">User Edit</h3>
        </div>
        <div className="p-4 flex items-center justify-center">
          <p className="text-white text-base pr-4">Status of the user:</p>
          <label className="flex items-center text-white space-x-3">
            <input
              type="checkbox"
              checked={isActive}
              onChange={handleIsAcceptedChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span>{isActive ? 'Enabled' : 'Disabled'}</span>
          </label>
        </div>
        <div className="p-4 border-t border-gray-400 flex justify-end space-x-4">
          <button onClick={closeUserEditModal} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all duration-300">
            Cancel
          </button>
          <button onClick={handleConfirmEdit} className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition-all duration-300">
            Confirm Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserEditModal;
