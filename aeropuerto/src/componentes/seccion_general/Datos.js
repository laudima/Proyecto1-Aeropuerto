import {React, useState, useEffect} from "react";

/**
 * El componente datos recibe como props la temperatura, la ciudad y el clima que se va a mostrar
 * en la aplicacion y renderiza dinamicamente un icono dependiendo del clima que haya en el momento.
 * @param {*} props - datos del clima
 */
    
function Datos(props){
    
    const {temperatura,ciudad,clima} = props;
    const configuracionFecha = {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
    const [fecha, setFecha] = useState(new Date().toLocaleString('es-ES',configuracionFecha));

    useEffect(() => {
        // Hook para actualizar la fecha cada segundo
        var timer = setInterval(() => tick(), 1000);
        return function limpia() {clearInterval(timer);};
    });
      
    function tick() {
        setFecha(new Date().toLocaleString('es-ES',configuracionFecha));
    }

    return (
        <div className="datos">

                <h1 style={{fontSize:"120px", fontWeight:"bold"}}>{temperatura}</h1>

                <div className="lugar-fecha" style={{margin:"0 20px"}}>
                    <h2 style={{fontSize: "50px", fontWeight:"bold"}}>{ciudad}</h2>
                    <p style={{fontSize:"18px", fontWeight:"300"}}>{fecha}</p>
                </div>
                
                <div className="clima">
                    <img style={{width:"60px", height:"60px",filter: "invert(100%) sepia(54%) saturate(2%) hue-rotate(74deg) brightness(110%) contrast(101%)"}} 
                    src={props.icono} alt="imagen_clima"/>
                    <p style={{fontSize:"20px", fontWeight:"300"}}>{clima}</p>
                </div>
            
            
        </div>);
}

export default Datos;