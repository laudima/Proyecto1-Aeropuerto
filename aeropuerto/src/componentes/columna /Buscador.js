import React from "react";
import iconoBuscar from "../../imagenes/search-i.svg";
function Buscador(props) {
    return (
        <div className="search">
            <div className="searchInputs">
                <input type="text" placeholder="Buscar ciudad" />
                <div className="searchIcon">
                    <img style={{width:"20px", height:"20px"}} src={iconoBuscar} alt="icono_buscar" />
                </div>
            </div>
            <div className="searchResults"> //falta agregar los resultados de la busqueda   
            </div>
        </div>
    );
}

export default Buscador;