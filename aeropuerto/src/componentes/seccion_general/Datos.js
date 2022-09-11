import React from "react";

function Datos(props){
    const {temperatura,ciudad,clima} = props;
    const configuracionFecha = {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };

    return (<div>
            <div clasName="datos">
                <h1>{temperatura}</h1>
                <div>
                    <h2>{ciudad}</h2>
                    <p>{new Date().toLocaleString('es-ES',configuracionFecha)}</p>
                </div>
                
                <div className="clima">
                    <img></img>
                    <p>{clima}</p>
                </div>
            </div>
            
        </div>);
}

export default Datos;