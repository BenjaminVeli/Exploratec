import DisplacementImg from '../assets/img/displacement.png';
import MouseImg from '../assets/img/mouse.png';
import RectangleSvg from "../assets/rectangle-xmark.svg";

const Tour = () => {
  return (
      <div>

        <div id="ModalWelcome" className="modal flex justify-center pt-24">
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