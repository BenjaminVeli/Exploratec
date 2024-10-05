const RequestDeleteModal = ({ closeRequestDeleteModal, deleteRequest, requestId }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-gray-800 border rounded-lg w-2/5">
        <div className="border-b border-gray-400 p-4">
          <h3 className="text-2xl text-white">Delete Request</h3>
        </div>
        <div className="p-4">
          <p className="text-white text-base">Are you sure you want to delete this request?</p>
        </div>
        <div className="p-4 border-t border-gray-400 flex justify-end space-x-4">
          <button
            onClick={closeRequestDeleteModal}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={() => deleteRequest(requestId)}
            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition-all duration-300"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestDeleteModal;
