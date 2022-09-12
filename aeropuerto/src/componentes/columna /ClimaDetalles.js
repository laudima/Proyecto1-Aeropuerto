import React from "react";
import TableroDetalles from "./TableroDetalles";


function ClimaDetalles(props) {
    return <TableroDetalles
        titulo="Detalles del clima"
        dato1= "Presion: 1010 kpa" 
        dato2="Humedad: 80%"
        dato3= "Aeropuerto Benito Juarez"
    />
}

export default ClimaDetalles;