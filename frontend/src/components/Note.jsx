
function Note({ note, onDelete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");
  
    return (
        <div className="note-container">
          <h2 className="">Formulario de visita al campus sede lima</h2>
          <p className="">Nombre: {note.name}</p>
          <p className="">Apellido: {note.lastname}</p>
          <p className="">Dni: {note.dni}</p>
          <p className="">Teléfono: {note.phone}</p>
          <p className="">Especialidad: {note.specialty}</p>
          <p className="">Motivo de la visita: {note.reason}</p>
          <p className="">{formattedDate}</p>
  
          <button className="" onClick={() => onDelete(note.id)}>
            Delete
          </button>
        </div>
    );
  }
  
  export default Note;