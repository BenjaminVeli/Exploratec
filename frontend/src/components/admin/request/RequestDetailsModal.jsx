import { X } from 'lucide-react';

const RequestDetailsModal = ({ request, closeRequestDetailsModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-gray-800  border rounded-lg w-2/5">
        <div className="border-b border-gray-400 p-4">
          <button onClick={closeRequestDetailsModal} className="float-right hover:bg-gray-600 rounded-full transition-all duration-300 p-1">
            {<X size={20} className="text-white"/>}
          </button>
          <h3 className="text-2xl text-white uppercase">Request Details</h3>
        </div>
        <div className="p-4 text-base">          
          <p className="text-white">ID: {request.id}</p>
          <p className="text-white">Name: {request.name}</p>
          <p className="text-white">Lastname: {request.lastname}</p>
          <p className="text-white">Phone: {request.phone}</p>
          <p className="text-white">Motivo: {request.reason}</p>
          <p className="text-white">Especialidad: {request.specialty}</p>

          
          {request.is_accepted ? (
            <p className="text-white">The visit request was accepted.</p> 
          ): (
            <p className="text-white">The visit request is pending.</p> 
          )}

        </div>
        <div className="p-4 border-t border-gray-400"></div>
      </div>
    </div>
  )
}

export default RequestDetailsModal;
