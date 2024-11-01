import { BookOpenText, Building, Building2, CodeXml, Warehouse } from 'lucide-react';
import Sidebar, { SidebarItem } from '../components/Sidebar';
import Modal from '../components/Modal';

const Tour = () => {



  return (
    <div className="flex">
      <Sidebar>
        <SidebarItem icon={<Building2 size={20} />} text="Entrada Principal" active />
        <SidebarItem icon={<BookOpenText size={20} />} text="Biblioteca" />
        <SidebarItem icon={<Building size={20} />} text="Patio Central" alert />
        <SidebarItem icon={<CodeXml size={20} />} text="Patio Software" />
        <SidebarItem icon={<Warehouse size={20} />} text="Patio Mecánica" />
      </Sidebar>

      <Modal /> 





    </div>
  );
}

export default Tour;