import img2 from '../assets/img/img-360/img2.png';
import img3 from '../assets/img/img-360/img3.png';
import img4 from '../assets/img/img-360/img4.png';
import img5 from '../assets/img/img-360/img5.png';

const dataScene = {
  entrada: {
    title: 'Entrada Principal',
    image: img2,
    plugins: [
      {
        id: "marker1",
        position: { pitch: 10, yaw: 110 },
        svgStyle: {
          fill: "rgba(0, 255, 0, 0.5)",
          stroke: "rgba(0, 255, 0, 1)",
        },
        text: "Marker en Entrada",
        nextScene: "biblioteca",
      },
    ],
  },
  biblioteca: {
    title: 'Biblioteca',
    image: img3,
    plugins: [
      {
        id: "marker2",
        pitch: 5,
        yaw: 45,
        svgStyle: {
          fill: "rgba(0, 0, 255, 0.5)",
          stroke: "rgba(0, 0, 255, 1)",
        },
        text: "Marker en Biblioteca",
        nextScene: "patio",
      },
    ],
  },
  patio: {
    title: 'Patio Central',
    image: img4,
    plugins: [
      {
        id: "marker3",
        pitch: -5,
        yaw: 90,
        svgStyle: {
          fill: "rgba(255, 0, 0, 0.5)",
          stroke: "rgba(255, 0, 0, 1)",
        },
        text: "Marker en Patio Central",
        nextScene: "entrada",
      },
    ],
  },
};

export default dataScene;
