import React from "react";

function TableroDetalles(props) {
    return (
        <div>
        <div className="tituloTablero"> 
            <h1>{props.titulo}</h1>
        </div>
        <h1>{props.dato1}</h1>
        <h2>{props.dato2}</h2>
        <h3>{props.dato3}</h3>
        </div>
    );
}

export default TableroDetalles;