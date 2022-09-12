import React from "react";
import Datos from './Datos';
import Logo from './Logo';
function DatosGenerales(){
    return (
    <div>
        <div className="datos-generales">
            <Logo />
            <Datos 
                temperatura="16"
                ciudad="Sinaloa"
                clima="Soleado"
            />
        </div>
        
    </div>);
}

export default DatosGenerales;