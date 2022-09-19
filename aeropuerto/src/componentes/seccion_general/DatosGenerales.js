import React from "react";
import Datos from './Datos';
import Logo from './Logo';
/**
 * Componente con la estructura de la seccion general que contiene
 * los datos y el logo.
 * @param {*} props  - datos del clima
 */
function DatosGenerales(props){
    return (
    <div>
        <div className="datos-generales">
            <Logo />
            <Datos 
                temperatura={props.temperatura + "°"}
                ciudad={props.ciudad}
                clima={props.clima}
            />
        </div>
        
    </div>);
}

export default DatosGenerales;