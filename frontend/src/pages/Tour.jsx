import { useState } from 'react';
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";

import img4 from '../assets/img/img-360/img4.png';
import img5 from '../assets/img/img-360/img5.png';

import { BookOpenText, Building, Building2, CodeXml, Warehouse } from 'lucide-react';
import Sidebar, { SidebarItem } from '../components/Sidebar';
import Modal from '../components/Modal';

const Tour = () => {
  
  const [panorama, setPanorama] = useState(img4);

  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem icon={<Building2 size={20} />} text="Entrada Principal" active />
        <SidebarItem icon={<BookOpenText size={20} />} text="Biblioteca" />
        <SidebarItem icon={<Building size={20} />} text="Patio Central" alert />
        <SidebarItem icon={<CodeXml size={20} />} text="Patio Software" />
        <SidebarItem icon={<Warehouse size={20} />} text="Patio Mecánica" />
      </Sidebar>

      {/* <Modal />  */}


      <div style={{ position: 'absolute', width: '100vw', height: '100vh' }}>
        <ReactPhotoSphereViewer
          src={panorama}
          width="100%"
          height="100%"
        ></ReactPhotoSphereViewer>
      </div>

      {/* Botones para cambiar la imagen */}
      <div style={{ position: 'relative', top: '10px', left: '10px' }}>
        <button onClick={() => setPanorama(img4)}>Ver Imagen 4</button>
        <button onClick={() => setPanorama(img5)}>Ver Imagen 5</button>
      </div>




    </div>
  );
}

export default Tour;