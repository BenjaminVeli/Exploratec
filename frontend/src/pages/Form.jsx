import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import Header from "../components/Header";
import MinusCircle from "../assets/svg/minus-circle.svg"
import { formSchema } from "../schemas/auth";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Form() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [dni, setDni] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [gender, setGender] = useState("");
  const [family_name, setFamily_name] = useState("");
  const [family_lastname, setFamily_lastname] = useState("");
  const [family_dni, setFamily_dni] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [specialties, setSpecialties ] = useState([]);
  const [selectSpecialty, setSelectEspecialty] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  useEffect(() => {
    getSpecialties();
    getNotes();
  }, []);

  const getSpecialties = () => {
    api
        .get("/api/specialties/") 
        .then((res) => res.data)
        .then((data) => {
            setSpecialties(data);
            console.log(data);
        })
        .catch((err) => alert(err));  
  };


  const getNotes = () => {
    api
        .get("/api/note-list/")
        .then((res) => res.data)
        .then((data) => {
            setNotes(data);
            console.log(data);
        })
        .catch((err) => alert(err));
  }; 


  const createNote = () => {
    api
      .post("/api/note-create/", {
        name,
        lastname,
        dni,
        phone,
        reason,
        specialty: selectSpecialty,
        gender,
        family_name,
        family_lastname,
        family_dni,
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Formulario enviado correctamente.", {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(() => {
            navigate("/request");
          }, 2500);
    
        }else alert("No se pudo realizar el registro.");
        getNotes();
      })
      .catch((error) => {
        // Extraer mensajes de error del serializer
        if (error.response && error.response.data) {
            const errorMessages = error.response.data; // Esto debe ser un objeto con los errores del serializer

            // Muestra los errores específicos del serializer
            if (errorMessages.non_field_errors) {
                setErrorMessage(errorMessages.non_field_errors.join(", "));
            } else {
                const errorKeys = Object.keys(errorMessages);
                const messages = errorKeys.map(key => `${key}: ${errorMessages[key].join(", ")}`).join(", ");
                setErrorMessage(messages);
            }
        } else {
            console.error("Error desconocido:", error);
            setErrorMessage("Ocurrió un error al registrar.");
        }
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationResult = formSchema.safeParse({ name, lastname, dni, phone, specialty: selectSpecialty, reason, gender, family_name, family_lastname, family_dni, acceptTerms });
    if (!validationResult.success) {
      setErrorMessage(validationResult.error.errors[0].message);
      return;
    }

    createNote();
  };

  return (
    <div>
      <Header />

      <div className="bg-gray-500 md:pt-20 pt-24 lg:pt-8">
        <div className="w-full lg:w-8/12 px-4 mx-auto flex items-center justify-center min-h-[100vh]">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-slate-900 mb-0 px-6 py-6">
              <div className="text-center flex ">
                <h6 className="text-white text-xl font-bold uppercase">
                  Formulario de visita al campus
                </h6>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg-slate-200">
              <form onSubmit={handleSubmit}>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Información
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="title">
                        Nombres
                      </label>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="apellido">
                        Apellidos
                      </label>
                      <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="dni">
                        Dni
                      </label>
                      <input type="number" value={dni} onChange={(e) => setDni(e.target.value)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="title">
                        Género
                      </label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      >
                        <option value="" disabled>
                          Elige tu género
                        </option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="especialidad">
                        Especialidad
                      </label>
                      <select
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={selectSpecialty} 
                        onChange={(e) => setSelectEspecialty(e.target.value)}>
                        <option value="">Selecciona una especialidad</option>
                        {specialties.map((specialty) => (
                          <option key={specialty.id} value={specialty.id}>
                            {specialty.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="telefono">
                        Teléfono
                      </label>
                      <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                    </div>
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-gray-400" />
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Información del apoderado <span className="normal-case">(no es obligatorio)</span>
                </h6>
                <div className="flex flex-wrap">
                <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="title">
                        Nombres
                      </label>
                      <input type="text" value={family_name} onChange={(e) => setFamily_name(e.target.value)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="title">
                        Apellidos
                      </label>
                      <input type="text" value={family_lastname} onChange={(e) => setFamily_lastname(e.target.value)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="dni">
                        Dni
                      </label>
                      <input type="number" value={family_dni} onChange={(e) => setFamily_dni(e.target.value)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                    </div>
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-gray-400" />
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Motivo de la visita
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-8/12 px-4">
                    <div className="relative w-full mb-3">
                      <textarea value={reason} onChange={(e) => setReason(e.target.value)} onClick={() => alert("Antes de escribir el motivo de su visita, por favor indique también sus días y horarios de disponibilidad.")} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" rows="4"></textarea>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                    {errorMessage && 
                    <div className="message-error-layout flex items-center mt-4 bg-zinc-900">
                      <img src={MinusCircle} alt="MinusCircle" />
                      <strong className="text-sm pl-2 text-white">{errorMessage}</strong>
                    </div>
                  }
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 flex  items-center">
                      <div className="flex items-center">
                          <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} className="mr-2"/>
                          <label className="block text-blueGray-600" htmlFor="subtitle">Acepto las <Link to="/privacy-policies"  target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">Políticas de privacidad</Link></label>
                      </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4 flex justify-end">
                    <button type="submit" className="button--submit text-white font-bold py-2 px-4 rounded">
                      Enviar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />        
    </div>
  );
}

export default Form;
