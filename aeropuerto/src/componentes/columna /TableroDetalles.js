import React from "react";

function TableroDetalles(props) {
    return (
        <div className="tablero">
        <div className="titulo-tablero"> 
            <h3 style={{fontSize:"15px", fontWeight:"200",color:"white"}}>{props.titulo}</h3>
        </div>
        <div className="tablero-detalles">
            <h3 style={{fontSize:"15px", fontWeight:"200",color:"white"}}>{props.dato1}</h3>
            <h3 style={{fontSize:"15px", fontWeight:"bold", color:"white"}}>{props.dato1info}</h3>
        </div>
        <div className="tablero-detalles">
            <h3 style={{fontSize:"15px", fontWeight:"200",color:"white"}}>{props.dato2}</h3>
            <h3 style={{fontSize:"15px", fontWeight:"bold",color:"white"}}>{props.dato2info}</h3>
        </div>
        <div className="tablero-detalles">
            <h3 style={{fontSize:"15px", fontWeight:"200",color:"white"}}>{props.dato3}</h3>
            <h3 style={{fontSize:"15px", fontWeight:"bold",color:"white"}}>{props.dato3info}</h3>
        </div>
        </div>
    );
}

export default TableroDetalles;