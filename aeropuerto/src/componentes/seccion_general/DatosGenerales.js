import React from "react";
import Datos from './Datos';
import Logo from './Logo';
function DatosGenerales(){
    return (
    <div>
        <div className="datos-generales">
            <Logo />
            <Datos 
                temperatura="16°"
                ciudad="Monterrey"
                clima="Nublado"
            />
        </div>
        
    </div>);
}

export default DatosGenerales;