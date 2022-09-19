import React from "react";
import ClimaDetalles from "./ClimaDetalles";
import OtrasCiudades from "./OtrasCiudades";

import SearchBar from "./SearchBar";

function Columna(props) {
    return (
        <div className="columna"> 
            
            {/*<Buscador 
                datosCiudades={props.datosCiudades}
            />*/}
            
            <SearchBar
                placeholder="Buscar ciudad"
                data = {props.datosCiudades}
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