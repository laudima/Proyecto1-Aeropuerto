import {React, useState, useEffect} from "react";
import Nubes from "../imagenes/nubes1.jpg" // Imagen provisional
import DatosGenerales from "./seccion_general/DatosGenerales";
import Columna from "./columna /Columna";
import Config from "../config.js"
import Papa from 'papaparse';
import csv from "../dataset1.csv";

async function actualizaCache(ciudades, setCache, llave){
  let cache = {};
  for (let [ciudad, coordenadas] of Object.entries(ciudades)){
    const longitud = coordenadas.longitud, latitud = coordenadas.latitud;
    let datosClima = {}
    let URL = "https://api.checkwx.com/metar/lat/" + latitud + "/lon/" + longitud + "/decoded";
    await fetch(URL, {
        method: "GET",
        headers: {"X-API-Key": llave}
    })
      .then(response => response.json())
      .then(datos =>  {

        if ("conditions" in datos.data[0]){
          if (datos.data[0].conditions[0] === "RA"){
            datosClima.clima = "Lluvioso";
          }else if (datos.data[0].conditions[0] === "TS"){
            datosClima.clima = "Tormenta Electrica";
          }
        }

        if (!("clima" in datosClima)){
            datosClima.clima = datos.data[0].clouds[0].code.startsWith("CLR") || 
                               datos.data[0].clouds[0].code.startsWith("FEW") ? "Soleado" : "Nublado";
        }
        
        datosClima.temperatura = "temperature" in datos.data[0] ? datos.data[0].temperature.celsius : "--";
        datosClima.presion = "barometer" in datos.data[0] ? datos.data[0].barometer.hg : "--";
        datosClima.humedad = "humidity" in datos.data[0] ? datos.data[0].humidity.percent : "--";
        datosClima.viento = "wind" in datos.data[0] ? datos.data[0].wind.speed_kph : "--";
        datosClima.ciudad = "station" in datos.data[0] ? datos.data[0].station.location : "--";

      });
      cache[ciudad] = datosClima;
  }
  window.localStorage.setItem('cache', JSON.stringify(cache));
  setCache(cache);
}

/*
  El componente app tiene una imagen de fondo relacionada con el clima de la ciudad que se este mostrando y
  se divide en dos secciones, una princciudadipal en la que se muestran los detalles generales y otra  que
  es una columna con datos especificos y el buscador para cambiar de ciudad.
 */
function App() {
  const llave = Config.llave;
  const [datosClima, setDatosClima] = useState({});
  const [ciudad, setCiudad] = useState("MTY");
  const [contadorSegundos, setContadorSegundos] = useState(JSON.parse(localStorage.getItem('count')) || -10);
  const [cache, setCache] = useState(JSON.parse(localStorage.getItem('cache')) || {MTY:{
                                            ciudad: "Monterrey, MX",
                                            clima: "Nublado",
                                            humedad: 66,
                                            presion: 29.9,
                                            temperatura: 27,
                                            viento: 15
                                          }});

  var ciudades = {};
  useEffect(()=>{

    fetch(csv)
    .then(response => response.text())
    .then(v => Papa.parse(v,{header: true}))
    .then(tickets => {
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
    })
    .catch(err => console.log(err))

  },[])
  
  useEffect(()=>{
    setDatosClima({
      ciudad: cache[ciudad].ciudad,
      clima: cache[ciudad].clima,
      humedad: cache[ciudad].humedad,
      presion: cache[ciudad].presion,
      temperatura: cache[ciudad].temperatura,
      viento: cache[ciudad].viento
    });
  },[ciudad,cache]);

  useEffect(() => {
    window.localStorage.setItem('count', contadorSegundos);
    const interval = setInterval(()=>{
      if (contadorSegundos === 0){
        actualizaCache(ciudades,setCache,llave);
      }
      setContadorSegundos((contadorSegundos + 1) % 3600); 
    },1000);
    return () => clearInterval(interval); 
  }, [contadorSegundos]);

  return (
  
    <div className="app" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${Nubes})`, backgroundSize:'cover'}}>
      
      <div className="columna-datos-generales">
        <DatosGenerales
          temperatura={datosClima.temperatura}
          ciudad={datosClima.ciudad}
          clima={datosClima.clima}
          />
      </div>
      <div className="columna-detalles"><Columna datos={datosClima} datosCiudades={ciudades}/></div>
    </div>
  );
}

export default App;
