import React, {useState} from "react";
import Nubes from "../imagenes/nubes1.jpg" // Imagen provisional
import DatosGenerales from "./seccion_general/DatosGenerales";
import Columna from "./columna /Columna";
<<<<<<< HEAD
import Config from "../config.js";
import Papa from 'papaparse';
import csv from "../dataset1.csv";
=======
import Config from "../config.js"
>>>>>>> 3ff4a692 (agregue un temporizador en el componente App para que reciba los datos y despues actue)

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

      if ("temperature" in datos.data[0]){
        datosClima.temperatura = datos.data[0].temperature.celsius;
      }
      
      if ("conditions" in datos.data[0]){
        if (datos.data[0].conditions[0].startsWith("RA")){
          datosClima.clima = "Lluvioso";
        }else if (datos.data[0].conditions[0].startsWith("TS")){
          datosClima.clima = "Tormenta Electrica";
        }
      }

      if (!("clima" in datosClima)){
        if (datos.data[0].clouds[0].code === "CLR"){
          datosClima.clima = "Soleado";
        }else{
          datosClima.clima = "Nublado";
        }
      }

      if ("barometer" in datos.data[0]){
        datosClima.presion = datos.data[0].barometer.hg;
      }

      if ("humidity" in datos.data[0]){
        datosClima.humedad = datos.data[0].humidity.percent;
      }

      if ("wind" in datos.data[0]){
        datosClima.viento = datos.data[0].wind.speed_kph;
      }

    });

  return datosClima;
}

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

  let datosClima = getClima(25.77,-100.10,llave);

  setTimeout(function()
{
  if ("temperatura" in datosClima){
    setTemperatura(datosClima.temperatura);
  }

  if ("clima" in datosClima){
    setClima(datosClima.clima);
  }

  console.log(JSON.parse(JSON.stringify(datosClima)));

}, 400);
    
  return (
  
    <div className="app" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${Nubes})`, backgroundSize:'cover'}}>
      
      <div className="columna-datos-generales">
        <DatosGenerales
          temperatura={temperatura}
          ciudad={ciudad}
          clima={clima}
          />
      </div>
      <div className="columna-detalles"><Columna /></div>
    </div>
  );
}

export default App;
