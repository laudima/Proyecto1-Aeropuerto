import React from "react";

function TableroDetalles(props) {
    return (
        <div>
        <div> 
            <h2 style ={{fontSize:"18px",fontWeight:"800"}}>{props.titulo}</h2>
        </div>

        <div className="info">
            <h3 style ={{fontSize:"15px",fontWeight:"300"}}>{props.dato1}</h3>
        </div>

        <div className="info">
            <h3 style ={{fontSize:"15px",fontWeight:"300"}}>{props.dato2}</h3>
        </div>

        <div className="info">
            <h3 style ={{fontSize:"15px",fontWeight:"300"}}>{props.dato3}</h3>
        </div>

        </div>
    );
}

export default TableroDetalles;