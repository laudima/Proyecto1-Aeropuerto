import React from "react";
import ClimaDetalles from "./ClimaDetalles";
import OtrasCiudades from "./OtrasCiudades";
import BarraBuscador from "./BarraBuscador";
/**
 * Información de la columna derecha del tablero, incluye el buscador, el clima y otras ciudades. 
 * @param {*} props 
 * @returns Columna
 */
function Columna(props) {
    return (
        <div className="columna"> 
            
            <BarraBuscador 
                placeholder="Buscar ciudad"
                data ={props.datosCiudades}
                setCiudad = {props.setCiudad}
            />
            
            <div className="columna-otras-ciudades">
            <OtrasCiudades
                data = {props.cache}
            />

            </div>
            <div className="columna-detalles-clima">
            <ClimaDetalles
                presion = {props.datos.presion}
                humedad = {props.datos.humedad}
                velocidadViento = {props.datos.viento}
            />
            </div>
        </div>
    );
}

export default Columna;