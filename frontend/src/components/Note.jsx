
function Note({ note, onDelete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");
  
    return (
      <div>
        <div className="">
          <h2 className="">Formulario de visita al campus sede lima</h2>
        </div>
        <div className="border border-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <p className="">Nombre: {note.name}</p>
          <p className="">Apellido: {note.lastname}</p>
          <p className="">Dni: {note.dni}</p>
          <p className="">Teléfono: {note.phone}</p>
          <p className="">Especialidad: {note.specialty}</p>
          <p className="">Fecha Creación: {note.created_at}</p>
          <p className="col-span-1 md:col-span-2 lg:col-span-3">Motivo de la visita: {note.reason}</p>
          <p className="">{formattedDate}</p>
          <button className="button-delete" onClick={() => onDelete(note.id)}>
            <span>Delete</span>
          </button>
        </div>  
      </div>
    );
  }
  
  export default Note;