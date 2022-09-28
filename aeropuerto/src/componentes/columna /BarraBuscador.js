import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

/**
 * Barra buscador de ciudades, filtra la información qeu se le pone en el input 
 * y al picar enter se actualiza la ciudad. 
 * Referencia: https://www.youtube.com/watch?v=x7niho285qs&t=787s
 * @author machadop1407 
 * @param {*} param0 
 * @returns 
 */
function BarraBuscador({ placeholder, data, setCiudad}) {

  const [DataFiltrada, setDataFiltrada] = useState([]);//Guarda la infomación filtrada
  const [PalabraUsuario, setPalabraUsuario] = useState("");//Guarda la palabra que el usuario escoge
  
  //Función que filtra la información que se le pone en el input
  const manejaFiltro = (evento) => {
    const palabraBuscada = evento.target.value;
    setPalabraUsuario(palabraBuscada);
    const nuevoFiltro = ciudades.filter((value) => {
      return value.toLowerCase().includes(palabraBuscada.toLowerCase());
    });

    if (palabraBuscada === "") {
        setDataFiltrada([]);
    } else {
        setDataFiltrada(nuevoFiltro);
    }
  };

  //Limpia el input
  const nuevoInput = () => {
    setDataFiltrada([]);
    setPalabraUsuario("");
  };

  const ciudades = Object.keys(data); //Guarda las ciudades en un arreglo

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={PalabraUsuario}
          onChange={manejaFiltro}
        />
        <div className="searchIcon">
          {DataFiltrada.length === 0 ? (
            <SearchIcon style={{ color: "white" }}/>
          ) : (
            <CloseIcon style={{ color: "white" }} id="clearBtn" onClick={nuevoInput} />
          )
          }
        </div>
      </div>
      {DataFiltrada.length !== 0 && (
        <div className="dataResult">
          {DataFiltrada.slice(0, 15).map((value, index) => {
            return (
              <span key={index} className="dataItem" onClick={()=>setCiudad(value)}>
                <p style={{fontSize:"15px", fontWeight:"200",color:"black"}}>{value} </p>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BarraBuscador;