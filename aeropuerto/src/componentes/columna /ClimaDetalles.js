import React from "react";
import TableroDetalles from "./TableroDetalles";


function ClimaDetalles(props) {
    return <TableroDetalles
        titulo="Detalles del Clima"
        dato1= "Presión:"
        dato1info= {props.presion + " inHg"}
        dato2="Humedad:"
        dato2info= {props.humedad + " %"}    
        dato3= "Velocidad de viento:"
        dato3info= {props.velocidadViento + " Km/h"}
    />
}

export default ClimaDetalles;