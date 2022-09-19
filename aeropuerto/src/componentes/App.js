import {React, useState, useEffect} from "react";
import Nubes from "../imagenes/nubes1.jpg" // Imagen provisional
import Lluvia from "../imagenes/lluvia.jpg" // Imagen provisional
import Soleado from "../imagenes/soleado.jpg";
import Tormenta from "../imagenes/tormenta.jpg";
import LluviaIcono from "../imagenes/lluvia.svg";
import NubesIcono from "../imagenes/nube-i.svg";
import SoleadoIcono from "../imagenes/soleado.svg";
import TormentaIcono from "../imagenes/tormenta.svg";
import DatosGenerales from "./seccion_general/DatosGenerales";
import Columna from "./columna /Columna";
import Config from "../config.js"
import Papa from 'papaparse';
import csv from "../dataset1.csv";


function actualizaClima(clima,setImagen, setIcono){
  switch(clima){
    case "Nublado":
      setImagen(Nubes);
      setIcono(NubesIcono);
      return;
    case "Lluvioso":
      setImagen(Lluvia);
      setIcono(LluviaIcono);
      return;
    case "Soleado":
      setImagen(Soleado);
      setIcono(SoleadoIcono);
      return;
    case "Tormenta Electrica":
      setImagen(Tormenta);
      setIcono(TormentaIcono);
      return;
    default:
      setImagen(Nubes);
      setIcono(NubesIcono);
      return;
  }
}

/**
 * Funcion para actualizar el cache y guardarlo en el almacenamiento local.
 * Recibe un objeto con nombres de ciudades y para cada una de ellas realiza una peticion fetch asincrona
 * para obtener los datos del clima de la api CheckWeather y los guarda en el nuevo cache.
 * 
 * @param {*} ciudades - diccionario de ciudades a consultar 
 * @param {*} setCache - funcion setter para actualizar el cache
 * @param {string} llave - llave de la api 
 */
async function actualizaCache(ciudades, setCache, llave){
  let cache = {};
  for (let [ciudad, coordenadas] of Object.entries(ciudades)){
    const longitud = coordenadas.longitud, latitud = coordenadas.latitud;
    let datosClima = {} // Datos de cada ciudad
    let URL = "https://api.checkwx.com/metar/lat/" + latitud + "/lon/" + longitud + "/decoded";
    await fetch(URL, {
        method: "GET",
        headers: {"X-API-Key": llave}
    })
      .then(response => response.json())
      .then(datos =>  {
        /* 
          Algunos datos del clima pueden o no estar presentes en la respuesta de la api, por eso
          primero verifica existencia y despues asigna, el valor por defecto siempre sera --.
        */
        if ("conditions" in datos.data[0]){
          if (datos.data[0].conditions[0].code === "RA"){
            datosClima.clima = "Lluvioso";
          }else if (datos.data[0].conditions[0].code === "TS"){
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
  window.localStorage.setItem('cache', JSON.stringify(cache)); // Guarda el cache en el almacenamiento local
  setCache(cache); // Actualiza el cache de la aplicacion.
}

/** 
 * El componente app tiene una imagen de fondo relacionada con el clima de la ciudad que se este mostrando y
 * se divide en dos secciones, una principal en la que se muestran los detalles generales y otra  que
 * es una columna con datos especificos y el buscador para cambiar de ciudad.
 */
function App() {
  const llave = Config.llave; 
  const [datosClima, setDatosClima] = useState({}); // Datos de la ciudad seleccionada
  // Contador del tiempo para actualizar el cache
  const [contadorSegundos, setContadorSegundos] = useState(JSON.parse(localStorage.getItem('count')) || -10); 
  const [cache, setCache] = useState(JSON.parse(localStorage.getItem('cache')) || {MTY:{
                                            ciudad: "Monterrey, MX",
                                            clima: "--",
                                            humedad: "--",
                                            presion: "--",
                                            temperatura: "--",
                                            viento: "--"
                                          }});

  const [ciudad, setCiudad] = useState("MTY"); // Ciudad seleccionada
  // Diccionario de ciudades
  const [ciudades, setCiudades] = useState({MTY:{longitud: -100.3167, latitud: 25.6667}});
  const [imagen, setImagen] = useState(Nubes);
  const [icono, setIcono] = useState(NubesIcono);

  useEffect(()=>{
    /**
     * Crea un objeto con los datos de los 3000 tickets, los atributos son los codigos IATA y los valores
     * las coordenadas de los aeropuertos. Se ejecuta una unica vez al renderizar la aplicacion por primera vez.
     */
    let diccionarioCiudades = {};

      fetch(csv)
     .then(response => response.text()) 
     .then(v => Papa.parse(v,{header: true})) // Convierte el texto plano del csv a JSON
     .then(tickets => {
          for (let i = 0; i < tickets.data.length; i++){
            // Solo se agrega un atributo si no existe, para evitar repetidos.
            if (!(tickets.data[i].origin in diccionarioCiudades)){
              diccionarioCiudades[tickets.data[i].origin] = {latitud: tickets.data[i].origin_latitude,
                                                             longitud:tickets.data[i].origin_longitude};
            }
        
            if (!(tickets.data[i].destination in diccionarioCiudades)){
              diccionarioCiudades[tickets.data[i].destination] = {latitud: tickets.data[i].destination_latitude,
                                                                  longitud:tickets.data[i].destination_longitude};
            }
          }
        setCiudades(diccionarioCiudades); 
    })
     .catch(err => console.log(err))
  },[])
  
  useEffect(()=>{
    /**
     * Este hook cambia los datos de la ciudad actual cada que se selecciona una nueva o se actualiza
     * el cache, por eso tiene estas dos dependencias.
     */
    setDatosClima({
      ciudad: cache[ciudad].ciudad,
      clima: cache[ciudad].clima,
      humedad: cache[ciudad].humedad,
      presion: cache[ciudad].presion,
      temperatura: cache[ciudad].temperatura,
      viento: cache[ciudad].viento
    });
    actualizaClima(cache[ciudad].clima, setImagen, setIcono);
  },[ciudad,cache]);
  
  useEffect(() => {
    /**
     * Este hook incrementa el contador de segundos para que se actualice el cache cada hora y lo
     * guarda en el almacenamiento local para que no se reinicie al recargar la pagina.
     */
    window.localStorage.setItem('count', contadorSegundos);
    const interval = setInterval(()=>{
      if (contadorSegundos === 0){
        actualizaCache(ciudades,setCache,llave); // Actualiza el cache cada hora
      }
      setContadorSegundos((contadorSegundos + 1) % 3600); 
    },1000);
    return () => clearInterval(interval); 
  }, [contadorSegundos]);

  return (
  
    <div className="app" style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imagen})`, backgroundSize:'cover'}}>
      
      <div className="columna-datos-generales">
        <DatosGenerales
          temperatura={datosClima.temperatura}
          ciudad={datosClima.ciudad}
          clima={datosClima.clima}
          icono={icono}
          />
      </div>
      <div className="columna-detalles"><Columna datos={datosClima} datosCiudades={ciudades} setCiudad={setCiudad} cache={cache}/></div>
    </div>
  );
}

export default App;
