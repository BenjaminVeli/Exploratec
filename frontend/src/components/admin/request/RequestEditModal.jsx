import { useState } from "react";

const RequestEditModal = ({ request, closeRequestEditModal, onRequestUpdated }) => {
  const [isAccepted, setIsAccepted] = useState(request.is_accepted);
  const [visitDate, setVisitDate] = useState(request.visit_date);

  const handleIsAcceptedChange = (e) => {
    setIsAccepted(e.target.checked);
  };

  const handleVisitDateChange = (e) => {
    setVisitDate(e.target.value);
  };

  const handleConfirmEdit = () => {

    
    if (!isAccepted) {
      alert("Confirme la solicitud de visita para continuar.");
      return;
    }

    if (!visitDate) {
      alert("Es necesario rellenar la fecha de visita.");
      return; 
    }
    
    // Llama a la función onRequestUpdated con el nuevo estado
    onRequestUpdated({ ...request, is_accepted: isAccepted, visit_date: visitDate });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-gray-800 border rounded-lg w-2/5">
        <div className="border-b border-gray-400 p-4">
          <h3 className="text-2xl text-white">Request Edit</h3>
        </div>
        <div className="p-4 flex items-center justify-center">
          <p className="text-white text-base pr-4">Status of the request:</p>
          <label className="flex items-center text-white space-x-3">
            <input
              type="checkbox"
              checked={isAccepted}
              onChange={handleIsAcceptedChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span>{isAccepted ? 'Aceptada' : 'No aceptada'}</span>
          </label>          
        </div>
        <div className="p-4">
          <label className="text-white text-base pr-4">Campus visit date:</label>
          <input type="datetime-local" value={visitDate} onChange={handleVisitDateChange} name="dateVisit" className="outline-none"/>
        </div>
        <div className="p-4 border-t border-gray-400 flex justify-end space-x-4">
          <button onClick={closeRequestEditModal} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all duration-300">
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

export default RequestEditModal;
