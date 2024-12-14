import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import EncryptButton from "../components/EncryptButton";
import { fadeIn } from "../components/utils/variants";
import { Reveal } from "../components/utils/Reveal";

import Logo360Img from "../assets/img/360.png";
import TecsuImg from "../assets/img/TecsupLima.png";
import AdverstingImg from "../assets/img/adversting.jpg";
import VisitImg from "../assets/img/visit.jpg";
import Frontend from "../assets/img/frontend.png";
import Backend from "../assets/img/backend.png";

import DoubtsImg from "../assets/img/doubt.jpg";
import ActivityImg from "../assets/img/activity.jpg";
import LabImg from "../assets/img/lab.jpg";
import CampusImg from "../assets/img/campus.png";
import CodeSvg from "../assets/svg/code.svg";

import Footer from "../components/Footer";
import Header from "../components/Header";
import SpecialtiesCount from "../components/SpecialtiesCount";

import "../App.css";

const Start = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const preloader = document.getElementById("preloader");

    const timer = setTimeout(() => {
      if (preloader) {
        preloader.classList.add("fade-out");
        setLoading(false); // Cambia el estado a false después del timeout
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

      {/* Renderiza el contenido solo si no está cargando */}
      {!loading && (
        <>
          <Header />
          <main>
            <section id="main-entrance" className="w-full">
              <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
                  {/* Primera columna  */}
                  <div className="text-left">
                    <Reveal>
                      <h1 className="text-4xl md:text-6xl text-white uppercase font-black">
                        Exploratec
                      </h1>
                    </Reveal>
                    <Reveal>
                      <h2 className="text-4xl md:text-6xl text-tecsup uppercase font-black">
                        Recorrido 360° del campus sede Lima Tecsup
                      </h2>
                    </Reveal>
                  </div>
                  {/* Segunda columna  */}
                  <div className="flex justify-center items-center md:my-0 my-6">
                    <Reveal>
                      <img
                        src={Logo360Img}
                        alt="Logo360°"
                        className="bouncing-image w-24 md:w-36 lg:w-48 xl:w-60 py-10"
                      />
                    </Reveal>
                  </div>
                </div>

                <div className="get-into-360 mt-3 flex justify-center">
                  <a href="https://benjaminveli.github.io/Exploratec-360/">
                    <Reveal>
                      <EncryptButton />
                    </Reveal>
                  </a>
                </div>
              </div>
            </section>

            <section
              id="explore"
              className="py-28 bg-white dark:bg-neutral-900"
            >
              <div className="container">
                <motion.div
                  variants={fadeIn("up", 0.2)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true, amount: 0.7 }}
                  className="text-center"
                >
                  <h2 className="text-4xl font-bold py-3 text-black dark:text-white">
                    En este recorrido virtual{" "}
                    <span className="text-tecsup">conocerás.</span>
                  </h2>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
                  {data.map((d) => (
                    <motion.div
                      variants={fadeIn("up", 0.2)}
                      initial="hidden"
                      whileInView={"show"}
                      viewport={{ once: true, amount: 0.2 }}
                      key={d.id}
                      className="flex justify-center items-center p-5"
                    >
                      <div className="w-64 bg-white dark:bg-neutral-950 rounded-3xl border border-gray-300 dark:border-neutral-950 overflow-hidden mb-5 hover:scale-105 transition-all duration-500 shadow-2xl">
                        <img className="w-full" src={d.img} alt={d.alt} />
                        <div className="p-5">
                          <h3 className="mb-2 text-xl font-bold tracking-tight text-slate-700">
                            {d.textH3}
                            <span className="text-tecsup">{d.textSpan}</span>
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <section id="TecsupLima">
              <img src={TecsuImg} alt="TecsupLima" className="w-full" />
            </section>

            <section
              id="information"
              className="py-16 bg-white dark:bg-neutral-900"
            >
              <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                <motion.div
                  variants={fadeIn("right", 0.3)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true, amount: 0.3 }}
                  className="font-light text-gray-500 sm:text-lg dark:text-gray-400"
                >
                  <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-black dark:text-white">
                    ¿Te gustaría participar en una visita guiada en persona?
                  </h2>
                  <p className="mb-4 font-medium">
                    Inscríbete a continuación para ser parte de nuestras visitas
                    presenciales y conocer más sobre nuestro campus.
                  </p>
                </motion.div>
                <motion.div
                  variants={fadeIn("up", 0.3)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true, amount: 0.3 }}
                  className="grid grid-cols-2 gap-4 mt-8"
                >
                  <img
                    src={VisitImg}
                    alt="VisitTecsup"
                    className="w-full rounded-lg  hover:scale-105 transition-all duration-500 shadow-2xl"
                  />
                  <img
                    src={AdverstingImg}
                    alt="AdverstingTecsup"
                    className="mt-4 w-full lg:mt-10 rounded-lg  hover:scale-105 transition-all duration-500 shadow-2xl"
                  />
                </motion.div>
              </div>
            </section>

            <section
              id="statistics"
              className="py-20 bg-neutral-900 dark:bg-neutral-950"
            >
              <div className="container">
                <div className="bg-glass flex flex-col xl:flex-row items-center md:items-center justify-center md:justify-between">
                  {/* Columna para el componente SpecialtiesCount */}
                  <div className="flex-1 w-full flex justify-center order-2 xl:order-1">
                    <SpecialtiesCount />
                  </div>

                  {/* Columna para el texto */}
                  <div className="mb-10 mt-10 flex-1 flex flex-col items-center text-center order-1 xl:order-2">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-tecsup">
                      ¿Por qué mostramos estas estadísticas?
                    </h2>
                    <p className="mb-4 text-black">
                      En esta sección, presentamos una estadística de las
                      carreras que nuestros visitantes han seleccionado al
                      inscribirse para nuestras visitas guiadas presenciales.
                      Esta información nos ayuda a entender mejor los intereses
                      de los futuros estudiantes de Tecsup y a preparar
                      experiencias más personalizadas y relevantes durante las
                      visitas.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="team" className="py-20 bg-slate-950">
              <div className="container mx-auto">
                <div className="text-center">
                  <h2 className="text-4xl font-bold py-3 text-white">
                    <span className="inline-block bg-indigo-600 px-1.5 py-0.5 mr-1 text-white">
                      <img src={CodeSvg} alt="svgCode" className="w-6" />
                    </span>
                    Nuestro Equipo
                  </h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Primera columna */}
                  <div className="group relative mx-auto w-full max-w-sm overflow-hidden rounded-lg bg-slate-800 p-0.5 transition-all duration-500 hover:bg-gradient-to-br from-indigo-200 via-indigo-200/0 to-indigo-200 mt-4 hover:scale-105">
                    <div className="relative z-10 flex flex-col items-center justify-center overflow-hidden rounded-[7px] bg-slate-900 p-8 transition-colors duration-500 group-hover:bg-slate-800">
                      <img src={Backend} alt="imgBackend" className="w-60" />
                      <h3 className="relative z-10 mb-1 w-full text-2xl font-bold text-slate-50 text-center">
                        William Postillos
                      </h3>
                      <h4 className="relative z-10 mb-4 w-full text-1xl font-bold text-red-500 text-center uppercase">
                        Backend
                      </h4>
                      <p className="relative z-10 text-slate-400">
                        Responsable de la gestión del proceso de visitas al
                        campus y de la administración de cuentas de usuarios.
                      </p>
                    </div>
                  </div>
                  {/* Segunda columna */}
                  <div className="group relative mx-auto w-full max-w-sm overflow-hidden rounded-lg bg-slate-800 p-0.5 transition-all duration-500 hover:bg-gradient-to-bl from-indigo-200 via-indigo-200/0 to-indigo-200 mt-4 hover:scale-105">
                    <div className="relative z-10 flex flex-col items-center justify-center overflow-hidden rounded-[7px] bg-slate-900 p-8 transition-colors duration-500 group-hover:bg-slate-800">
                      <img src={Frontend} alt="imgFrontend" className="w-60" />
                      <h3 className="relative z-10 mb-1 w-full text-2xl font-bold text-slate-50 text-center">
                        Benjamín Veli
                      </h3>
                      <h4 className="relative z-10 mb-4 w-full text-1xl font-bold text-red-500 text-center uppercase">
                        Frontend
                      </h4>
                      <p className="relative z-10 text-slate-400">
                        Responsable de la maquetación, la experiencia del
                        usuario, la interactividad y la creación del sitio web.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

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
];

export default Start;
