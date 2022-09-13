import React from "react";
import Buscador from "./Buscador";
import ClimaDetalles from "./ClimaDetalles";
import OtrasCiudades from "./OtrasCiudades";


function Columna(props) {
    return (
        <div className="columna"> 
            <Buscador />
            <div className="tablero-otras-ciudades">
                <OtrasCiudades/>
            </div> 
            <div  className="tablero-detalles-clima"> 
                <ClimaDetalles/>
            </div>
        </div>
    );
}

export default Columna;