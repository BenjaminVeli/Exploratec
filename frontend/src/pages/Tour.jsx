import { BookOpenText, Building, Building2, CodeXml, Warehouse } from 'lucide-react';
import DisplacementImg from '../assets/img/displacement.png';
import MouseImg from '../assets/img/mouse.png';
import RectangleSvg from "../assets/rectangle-xmark.svg";
import Sidebar,{SidebarItem} from '../components/Sidebar';

const Tour = () => {
  return (
      <div className="flex">
        
        <Sidebar>
            <SidebarItem icon={<Building2 size={20} />} text="Entrada Principal" active />
            <SidebarItem icon={<BookOpenText size={20} />} text="Biblioteca"  />
            <SidebarItem icon={<Building  size={20} />} text="Patio Central" alert />
            <SidebarItem icon={<CodeXml size={20} />} text="Patio Software"  />
            <SidebarItem icon={<Warehouse  size={20} />} text="Patio Mecánica"  />
        </Sidebar>

        <div id="ModalWelcome" className="modal">
          <div className="modal-content">
            <div className="grid grid-cols-3">
              <h2 className="modal-title col-span-2">Bienvenido al <span className="text-blue-500">tour virtual </span>de tecsup</h2>
              <div className="relative">
                <img src={RectangleSvg} className="modal-close" alt="RectangleSvg"/>
              </div>
            </div>
            <div className="flex items-center">
              <div className="modal-line"></div>
              <h3 className="text-white pl-2 md:pl-4 text-base md:text-2xl">Campus Lima</h3>
            </div>
            <div className="grid grid-cols-2 mt-2 md:mt-10">
              <div className="instruction pc-instruction">
                <h4 className="title-instruction-text">Si ingresas en pc</h4>
                <div className="grid grid-cols-4 my-2 items-center">
                  <img src={MouseImg} alt="Mouse" className="w-6 md:w-14"/>
                  <p className="instruction-text col-span-3">Haz clic y arrastra para ver a tu alrededor.</p>              
                </div>
              </div>
              <div className="instruction mobile-instruction">
                <h4 className="title-instruction-text">Si ingresas en celular</h4>
                <div className="grid grid-cols-4 my-1 md:my-2 items-center">  
                  <img src={DisplacementImg} alt="Displacement" className="w-6 md:w-14"/>
                  <p className="instruction-text col-span-3">Arrastra con el dedo para ver a tu alrededor.</p>              
                </div>
              </div>
            </div>

          </div>  
        </div>    


      </div>
  );
}

export default Tour;