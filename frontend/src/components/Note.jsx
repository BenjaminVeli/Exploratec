import {useState, useRef} from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Note = ({ note, onDelete }) => {
 
  const [loader, setLoader] = useState(false); 
  const noteRef = useRef(null);

  const downloadPDF = () => {
    const capture = noteRef.current; // Obtener el div específico de la nota
    capture.classList.add('pdf-capture'); // Añadir la clase para la captura
    setLoader(true);

    html2canvas(capture).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF('l', 'mm', 'a4');

        // Configura las dimensiones del PDF
        const pdfWidth = 297; // Ancho en mm para A4 horizontal
        const pdfHeight = 210; // Alto en mm para A4 horizontal

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const aspectRatio = imgWidth / imgHeight;

        let finalWidth, finalHeight;
        if (aspectRatio > 1) {
            finalWidth = pdfWidth;
            finalHeight = pdfWidth / aspectRatio;
        } else {
            finalHeight = pdfHeight;
            finalWidth = pdfHeight * aspectRatio;
        }

        const xPosition = (pdfWidth - finalWidth) / 2; // Centrar horizontalmente
        const yPosition = (pdfHeight - finalHeight) / 2; // Centrar verticalmente

        doc.addImage(imgData, 'PNG', xPosition, yPosition, finalWidth, finalHeight);
        setLoader(false);
        doc.save('Solicitud.pdf');

        capture.classList.remove('pdf-capture'); // Quitar la clase después de la captura
    });
};
    return (
      <div className='div-note md:mt-0 mt-12 bg-white dark:bg-neutral-900' ref={noteRef}>
        <div className="w-full lg:w-6/12 px-4 mx-auto flex items-center justify-center min-h-[100vh]">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-slate-900 mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-white text-xl font-bold uppercase">
                  Pase de visita al campus
                </h6>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg-slate-200">
              <div>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Información
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="title">
                        Nombres
                      </label>
                      <p className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">{note.name}</p>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="apellido">
                        Apellidos
                      </label>
                      <p className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">{note.lastname}</p>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="dni">
                        Dni
                      </label>
                      <p className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">{note.dni}</p>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="telefono">
                        Teléfono
                      </label>
                      <p className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">{note.phone}</p>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="fechaVisita">
                        Fecha de visita al campus
                      </label>
                      <p className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">{note.visit_date}</p>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="fechaCreación">
                        Fecha de creación de la solicitud
                      </label>
                      <p className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">{note.created_at}</p>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="fechaCreación">
                        Especialidad escogida
                      </label>
                      <p className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">{note.specialty.name}</p>
                    </div>
                  </div>
                </div>
              
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Motivo de la visita
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <p className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">{note.reason}</p>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      {note.is_accepted ? (
                        <p className="text-green-600">Solicitud de visita aceptada.</p>
                      ) : (
                        <p className="text-red-600">Solicitud de visita en espera.</p>
                      )}
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 flex justify-end">
                    <button className="button--submit text-white font-bold py-2 px-4 rounded mr-1" onClick={downloadPDF} disabled={!(loader===false)}>
                      {loader?(
                        <span>Descargando</span>
                      ):(
                        <span>Descargar</span>
                      )}
                      </button>
                    <button className="button--delete text-white font-bold py-2 px-4 rounded ml-1" onClick={() => onDelete(note.id)}>Eliminar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Note;