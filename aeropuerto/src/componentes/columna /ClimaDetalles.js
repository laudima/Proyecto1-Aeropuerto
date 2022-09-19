import React from "react";
import TableroDetalles from "./TableroDetalles";

/**
 * Despliega la infomación de los detalles del clima; presion, humedad y velocidad del viento
 * @param {*} props 
 * @returns Clima Detalles
 */
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