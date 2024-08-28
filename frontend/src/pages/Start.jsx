import { useEffect } from 'react';
import { Link } from "react-router-dom";
import EncryptButton from '../components/EncryptButton';

import Logo360Img from '../assets/img/360.png'
import TecsuImg from '../assets/img/TecsupLima.png'
import AdverstingImg from '../assets/img/adversting.jpg'
import VisitImg from '../assets/img/visit.jpg'

import Footer from "../components/Footer";
import Header from "../components/Header";

import '../app.css'

function Start() {

    useEffect(() => {
        const preloader = document.getElementById('preloader');
        const content = document.getElementById('content');
        
        const timer = setTimeout(() => {
            if (preloader) {
                preloader.classList.add('fade-out');
            }
            if (content) {
                content.style.display = 'block';
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            
            <div id="preloader">
                <div className="loader">
                    <span className="loader--blue">Exploratec</span>
                </div>
            </div>

            <Header />

            <main>

                <section id="main-entrance" className="w-full">
                    <div className="container mx-auto">

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap4">
                            {/* Primera columna  */}
                            <div className="text-left">
                                <h1 className="text-4xl md:text-6xl text-white uppercase font-black">Exploratec</h1>
                                <h2 className="text-4xl md:text-6xl text-[rgb(0,171,236)] uppercase font-black">Recorrido 360° del campus sede Lima Tecsup</h2>
                            </div>
                            {/* Segunda columna  */}
                            <div className="flex justify-center items-center">
                                <img src={Logo360Img} alt="Logo360°" className="bouncing-image w-24 md:w-60"/>
                            </div>
                        </div>

                        <div className="get-into-360">
                            <Link to="/tour">
                                <EncryptButton />
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="bg-white">
                    <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                            <h3 className="mb-4 text-4xl tracking-tight font-extrabold text-black">
                                ¿Te gustaría participar en una visita guiada en persona?
                            </h3>
                            <p className="mb-4 font-medium">
                                Inscríbete a continuación para ser parte de nuestras visitas presenciales y conocer más sobre nuestro campus.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <img src={VisitImg} alt="VisitTecsup" className="w-full rounded-lg" />
                            <img src={AdverstingImg} alt="AdverstingTecsup" className="mt-4 w-full lg:mt-10 rounded-lg" />
                        </div>
                    </div>
                </section>

                <section>
                    <img src={TecsuImg} alt="TecsupLima" className='w-full'/>
                </section>
                
            </main>

            <Footer />
        </div>
    )
}

export default Start;