import React from "react";
import TableroDetalles from "./TableroDetalles";


function OtrasCiudades(props){
    return <TableroDetalles
        titulo="Otras Ciudades"
        dato1=  {props.data["MEX"].ciudad}
        dato1info= {props.data["MEX"].temperatura + "°C"} 
        dato2= {props.data["MZT"].ciudad}
        dato2info= {props.data["MZT"].temperatura + "°C"}
        dato3= {props.data["MTY"].ciudad}
        dato3info= {props.data["MTY"].temperatura + "°C"}
    />
}

export default OtrasCiudades;