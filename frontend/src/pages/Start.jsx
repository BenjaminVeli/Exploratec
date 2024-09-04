import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import EncryptButton from '../components/EncryptButton';
import { fadeIn } from '../variants';

import Logo360Img from '../assets/img/360.png'
import TecsuImg from '../assets/img/TecsupLima.png'
import AdverstingImg from '../assets/img/adversting.jpg'
import VisitImg from '../assets/img/visit.jpg'


import DoubtsImg from '../assets/img/doubt.jpg'
import ActivityImg from '../assets/img/activity.jpg'
import LabImg from '../assets/img/lab.jpg'
import CampusImg from '../assets/img/campus.png'

import Footer from "../components/Footer";
import Header from "../components/Header";
import Statitics from '../components/Statitics';


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
                            <div className="flex justify-center items-center my-6">
                                <img src={Logo360Img} alt="Logo360°" className="bouncing-image w-24 md:w-36 lg:w-48 xl:w-60"/>
                            </div>
                        </div>

                        <div className="get-into-360 mt-3">
                            <Link to="/tour">
                                <EncryptButton />
                            </Link>
                        </div>
                    </div>
                </section>

                <section id="information" className="py-16">
                    <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                        <motion.div 
                            variants={fadeIn("right",0.3)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{once: false, amount: 0.3}}
                            className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-black">
                                ¿Te gustaría participar en una visita guiada en persona?
                            </h2>
                            <p className="mb-4 font-medium">
                                Inscríbete a continuación para ser parte de nuestras visitas presenciales y conocer más sobre nuestro campus.
                            </p>
                        </motion.div>
                        <motion.div 
                            variants={fadeIn("up",0.3)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{once: false, amount: 0.3}}
                            className="grid grid-cols-2 gap-4 mt-8">
                            <img src={VisitImg} alt="VisitTecsup" className="w-full rounded-lg" />
                            <img src={AdverstingImg} alt="AdverstingTecsup" className="mt-4 w-full lg:mt-10 rounded-lg" />
                        </motion.div>
                    </div>

                </section>

                <section id="TecsupLima">
                    <img src={TecsuImg} alt="TecsupLima" className='w-full'/>
                </section>

                <section id="explore" className="py-28">
                    <div className="container">
                        <motion.div 
                            variants={fadeIn("up",0.2)}
                            initial="hidden"
                            whileInView={"show"}
                            viewport={{once: false, amount: 0.7}}
                            className="text-center">
                            <h2 className='text-4xl font-bold py-3'>En este recorrido virtual <span className='text-blue-400'>conocerás.</span></h2>
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
                            {data.map((d) => (
                                <motion.div 
                                variants={fadeIn("up",0.2)}
                                initial="hidden"
                                whileInView={"show"}
                                viewport={{once: false, amount: 0.4}}
                                key={d.id} className="flex justify-center items-center p-5"> 
                                    <div className="w-64 bg-white rounded-3xl border border-gray-300 overflow-hidden mb-5">
                                        <img className="w-full" src={d.img} alt={d.alt} />
                                        <div className="p-5">
                                            <h3 className="mb-2 text-xl font-bold tracking-tight text-slate-800">{d.textH3}<span className="text-blue-400">{d.textSpan}</span></h3>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="statistics" className="py-20 bg-neutral-900">
                    <div className="container">
                        <div className="mb-10 mt-10 flex flex-col items-center">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-blue-400">¿Por qué mostramos estas estadísticas?</h2>
                            <p className="mb-4 text-white"> En esta sección, presentamos las estadísticas de las carreras que nuestros visitantes han seleccionado al inscribirse para nuestras
                            visitas guiadas presenciales. Esta información nos ayuda a entender mejor los intereses de nuestros futuros estudiantes y a preparar
                            experiencias más personalizadas y relevantes durante las visitas.</p>
                        </div>
                        <Statitics />
                    </div>
                </section>
                
            </main>

            <Footer />
        </div>
    )
}

const data = [
    {
        id: 1,
        textH3: `Resuelve dudas `,
        textSpan: `y consultas`,
        img: DoubtsImg,
        alt: `DoubtImg`,
    },
    {
        id: 2,
        textH3: `Laboratorios y `,
        textSpan: `Talleres de Carreras`,
        img: LabImg,
        alt: `LabImg`,
    },
    {
        id: 3,
        textH3: `El campus sede `,
        textSpan: `Santa Anita`,
        img: CampusImg,
        alt: `CampusImg`,
    },
    {
        id: 4,
        textH3: `Cómo funciona cada `,
        textSpan: `lab y otras actividades`,
        img: ActivityImg,
        alt: `ActivityImg`,
    },    
]

export default Start;