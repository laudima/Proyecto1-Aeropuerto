import React from "react";
import Nubes from "../imagenes/nubes1.jpg" // Imagen provisional
import DatosGenerales from "./seccion_general/DatosGenerales";

/*
  El componente app tiene una imagen de fondo relacionada con el clima de la ciudad que se este mostrando y
  se divide en dos secciones, una principal en la que se muestran los detalles generales y otra  que
  es una columna con datos especificos y el buscador para cambiar de ciudad.
 */
function App() {
  return (
  
    <div className="app" style={{backgroundImage: `url(${Nubes})`, backgroundSize:'cover'}}>
      <DatosGenerales />
    </div>
  );
}

export default App;