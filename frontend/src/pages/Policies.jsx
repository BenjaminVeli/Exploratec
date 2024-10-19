const Policies = () => {
  return (
    <section className="flex justify-center items-center min-h-screen p-6">
      <article className="container mx-auto border border-gray-300 p-6 max-w-3xl">
        <header className="text-center mb-4">
          <h2 className="font-bold text-2xl uppercase">Aviso de tratamiento de datos personales</h2>
        </header>
        <p className="mb-4">
          Al completar este formulario, autorizas expresamente a Exploratec a
          tratar tus datos personales que proporcionaste. Tus datos serán almacenados en una base de datos destinada a la
          gestión de visitas presenciales al campus, por un plazo indefinido
          hasta que decidas eliminar tu solicitud, debido a las finalidades
          informativas y estadísticas que se describen a continuación.
        </p>
        <p className="mb-4">Exploratec tratará tus datos personales para las siguientes finalidades:</p>
        <ol className="list-decimal list-inside mb-4">
          <li>Contactarte por algún medio virtual para brindarte información sobre la visita.</li>
          <li>Absolver tus dudas, reclamos y sugerencias.</li>
          <li>Generar estadísticas sobre las especialidades seleccionadas por los visitantes, de manera anonimizada.</li>
        </ol>
        <p className="mb-4">
          Los datos personales solicitados son necesarios para el cumplimiento de las finalidades descritas. Si decides no
          proporcionarlos, Exploratec no podrá cumplir con dichas finalidades.
        </p>
        <p className="mb-4">
          Las especialidades seleccionadas por los usuarios serán visibles para otros visitantes, pero no se compartirán
          datos personales como nombres o apellidos. Esta información se utilizará exclusivamente para fines estadísticos
          y para preparar experiencias personalizadas durante las visitas.
        </p>
        <p className="mb-4">
          El tratamiento de los datos personales se realizará conforme a la normativa de Protección de Datos Personales,
          asegurando las medidas de seguridad necesarias.
        </p>
        <p>
          Finalmente, Exploratec garantiza el ejercicio de tus derechos de Acceso, Cancelación y Oposición según la Ley de
          Protección de Datos Personales, Ley 29733, y su Reglamento, Decreto Supremo 003-2013-JUS.
        </p>
      </article>
    </section>
  );
};

export default Policies;
