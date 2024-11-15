import { X } from 'lucide-react';

const RequestDetailsModal = ({ request, closeRequestDetailsModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-gray-800 border rounded-lg max-w-2xl w-full">
        <div className="border-b border-gray-400 p-4">
          <button
            onClick={closeRequestDetailsModal}
            className="float-right hover:bg-gray-600 rounded-full transition-all duration-300 p-1"
          >
            {<X size={20} className="text-white" />}
          </button>
          <h3 className="text-2xl text-white">Request Details</h3>
        </div>
        <div className="p-4 text-base text-white">
          <div className="grid grid-cols-1 gap-2">
            <div className="grid grid-cols-4 gap-2">
              <p className="text-right col-span-1 font-medium">Name:</p>
              <p className="pl-2 text-left col-span-3">{request.name}</p>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <p className="text-right col-span-1 font-medium">Lastname:</p>
              <p className="pl-2 text-left col-span-3">{request.lastname}</p>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <p className="text-right col-span-1 font-medium">Phone:</p>
              <p className="pl-2 text-left col-span-3">{request.phone}</p>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <p className="text-right col-span-1 font-medium">Reason:</p>
              <p className="pl-2 text-left col-span-3 break-words overflow-hidden whitespace-normal">{request.reason}</p>
            </div>
          </div>
          <div className="pt-2">
            {request.is_accepted ? (
              <p className="text-white">The visit request was accepted.</p>
            ) : (
              <p className="text-white">The visit request is pending.</p>
            )}
          </div>
        </div>
        <div className="p-4 border-t border-gray-400"></div>
      </div>
    </div>
  );
};

export default RequestDetailsModal;