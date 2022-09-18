import {React, useState, useEffect} from "react";
import Nubes from "../imagenes/nubes1.jpg" // Imagen provisional
import DatosGenerales from "./seccion_general/DatosGenerales";
import Columna from "./columna /Columna";
import Config from "../config.js"
import Papa from 'papaparse';
import csv from "../dataset1.csv";

function actualizaCache(){

}

function getClima(latitud, longitud, llave){
  let datosClima = {};
  let URL = "https://api.checkwx.com/metar/lat/" + latitud + "/lon/" + longitud + "/decoded";
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
        if (datos.data[0].clouds[0].code.startsWith("CLR") || datos.data[0].clouds[0].code.startsWith("FEW")){
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

      if ("station" in datos.data[0]){
        datosClima.ciudad = datos.data[0].station.location;
      }

    });

  return datosClima;
}

/*
  El componente app tiene una imagen de fondo relacionada con el clima de la ciudad que se este mostrando y
  se divide en dos secciones, una princciudadipal en la que se muestran los detalles generales y otra  que
  es una columna con datos especificos y el buscador para cambiar de ciudad.
 */
function App() {
  const llave = Config.llave;
  const [datosClima, setDatosClima] = useState();
  const [temperatura, setTemperatura] = useState("--");
  
  const [nombreCiudad, setNombreCiudad] = useState("--")
  const [clima, setClima] = useState("");
  const [cache, setCache] = useState({MTY:{
                                            ciudad: "Monterrey, MX",
                                            clima: "Nublado",
                                            humedad: 66,
                                            presion: 29.9,
                                            temperatura: 27
                                          }});

  const [ciudad, setCiudad] = useState("MTY");
  
  actualizaCache();
  
  useEffect(()=>{
    setTemperatura(cache[ciudad].temperatura);
    setClima(cache[ciudad].clima);
    setNombreCiudad(cache[ciudad].ciudad);
  },[ciudad]);
  
let ciudades = {};

const response = fetch(csv)
   .then(response => response.text())
   .then(v => Papa.parse(v,{header: true}))
   .then(data => tickets = data)
   .catch(err => console.log(err))

let ciudades = {};

setTimeout(()=>{
  for (let i = 0; i < tickets.data.length; i++){
    if (!(tickets.data[i].origin in ciudades)){
      ciudades[tickets.data[i].origin] = {latitud: tickets.data[i].origin_latitude,
                                          longitud:tickets.data[i].origin_longitude};
    }

    if (!(tickets.data[i].destination in ciudades)){
      ciudades[tickets.data[i].destination] = {latitud: tickets.data[i].destination_latitude,
                                          longitud:tickets.data[i].destination_longitude};
    }

  }
},400);
    console.log(datosClima);
  return (
  
    <div className="app" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${Nubes})`, backgroundSize:'cover'}}>
      
      <div className="columna-datos-generales">
        <DatosGenerales
          temperatura={temperatura}
          ciudad={nombreCiudad}
          clima={clima}
          />
      </div>
      <div className="columna-detalles"><Columna datos={datosClima} datosCiudades={datosCiudades}/></div>
    </div>
  );
}

export default App;
