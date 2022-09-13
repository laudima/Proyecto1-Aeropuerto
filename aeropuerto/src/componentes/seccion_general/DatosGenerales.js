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
                clima="Nublado"
            />
        </div>
        
    </div>);
}

export default DatosGenerales;