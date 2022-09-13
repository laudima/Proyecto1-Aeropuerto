import {React, useState} from "react";
import Nubes from "../imagenes/nubes1.jpg" // Imagen provisional
import DatosGenerales from "./seccion_general/DatosGenerales";
import Columna from "./columna /Columna";
import Config from "../config.js"

/*
  El componente app tiene una imagen de fondo relacionada con el clima de la ciudad que se este mostrando y
  se divide en dos secciones, una principal en la que se muestran los detalles generales y otra  que
  es una columna con datos especificos y el buscador para cambiar de ciudad.
 */
function App() {

  const llave = Config.llave;
  const [ciudad, setCiudad] = useState("Monterrey");
  const [temperatura, setTemperatura] = useState("--");
  const [clima, setClima] = useState("");
  let URL = "https://api.checkwx.com/metar/lat/25.77/lon/-100.10/decoded";
  fetch(URL, {
    method: "GET",
    headers: {"X-API-Key": llave}
  })
    .then(response => response.json())
    .then(datos =>  {
      setTemperatura(datos.data[0].temperature.celsius.toString());
      let hayClima = false;
      if (datos.data.hasOwnProperty("conditions")){
        if (datos.data[0].conditions[0].startsWith("RA")){
          setClima = "Lluvioso";
          hayClima = true;
        }else if (datos.data[0].conditions[0].startsWith("TS")){
          setClima = "Tormenta Electrica";
          hayClima = true;
        }
      }
      if (!hayClima){
        if (datos.data[0].clouds[0].code === "CLR"){
          setClima("Soleado");
        }else{
          setClima("Nublado");
        }
      }
    });
    
  return (
  
    <div className="app" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${Nubes})`, backgroundSize:'cover'}}>
      
      <div className="columna-datos-generales">
        <DatosGenerales
          temperatura={temperatura}
          ciudad={ciudad}
          />
      </div>
      <div className="columna-detalles"><Columna /></div>
    </div>
  );
}

export default App;
