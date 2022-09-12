import React from "react";
import Buscador from "./Buscador";
import ClimaDetalles from "./ClimaDetalles";
import OtrasCiudades from "./OtrasCiudades";


function Columna(props) {
    return (
        <div className="columna"> 
            <Buscador />
            <OtrasCiudades/>
            <ClimaDetalles/>
        </div>
    );
}

export default Columna;