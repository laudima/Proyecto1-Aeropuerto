import React from "react";
import Datos from './Datos';
import Logo from './Logo';
function DatosGenerales(props){
    
    return (
    <div>
        <div className="datos-generales">
            <Logo />
            <Datos 
                temperatura={props.temperatura + "°"}
                ciudad={props.ciudad}
                clima={props.clima}
                icono={props.icono}
            />
        </div>
        
    </div>);
}

export default DatosGenerales;