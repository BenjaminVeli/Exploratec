import { useState } from 'react';
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";

import img2 from '../assets/img/img-360/img2.png';
import img3 from '../assets/img/img-360/img3.png';
import img4 from '../assets/img/img-360/img4.png';
import img5 from '../assets/img/img-360/img5.png';

import { BookOpenText, Building, Building2, CodeXml, Warehouse } from 'lucide-react';
import Sidebar, { SidebarItem } from '../components/Sidebar';
import Modal from '../components/Modal';

const Tour = () => {

  const plugins =  [
    [
      MarkersPlugin,
      {
        markers: [
          {
            id: "polygon",
            polygonPixels: [ 
              2941, 1413, 3042, 1402, 3222, 1419, 3433, 1463, 3480, 1505, 3438,
              1538, 3241, 1543, 3041, 1555, 2854, 1559, 2739, 1516, 2775, 1469,
              2941, 1413,
            ],
            svgStyle: {
              fill: "rgba(255,0,0,0.2)",
              stroke: "rgba(255, 0, 50, 0.8)",
              strokeWidth: "2px",
            },
            data: { compass: "rgba(255, 0, 50, 0.8)" },
          },
        ],
      },
    ],
  ];

  const [panorama, setPanorama] = useState(img2);

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
          // littlePlanet = { true }  --> Imagén esférica 360
          width="100%"
          height="100%"
          defaultZoomLvl={0}
          plugins = { plugins }
        ></ReactPhotoSphereViewer>
      </div>

      {/* Botones para cambiar la imagen */}
      <div style={{ position: 'relative', top: '10px', left: '10px' }}>
      <button onClick={() => setPanorama(img2)}>Ver Imagen 2</button>
        <button onClick={() => setPanorama(img3)}>Ver Imagen 3</button>
        <button onClick={() => setPanorama(img4)}>Ver Imagen 4</button>
        <button onClick={() => setPanorama(img5)}>Ver Imagen 5</button>
      </div> 




    </div>
  );
}

export default Tour;