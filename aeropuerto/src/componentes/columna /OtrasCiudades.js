import React from "react";
import TableroDetalles from "./TableroDetalles";


function OtrasCiudades(props){
    return <TableroDetalles
        titulo="Otras Ciudades"
        dato1= "Ciudad de Mexico"
        dato1info= {props.ciudad1}
        dato2="Guadalajara"
        dato2info= {props.ciudad2}
        dato3= "Monterrey"
        dato3info= {props.ciudad3}
    />
}

export default OtrasCiudades;