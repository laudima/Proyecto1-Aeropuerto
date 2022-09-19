import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

/**
 * Barra buscador de ciudades, filtra la información qeu se le pone en el input 
 * y al picar enter se actualiza la ciudad
 * @param {*} param0 
 * @returns 
 */
function SearchBar({ placeholder, data, setCiudad}) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = ciudades.filter((value) => {
      return value.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const ciudades = Object.keys(data);

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon style={{ color: "white" }}/>
          ) : (
            <CloseIcon style={{ color: "white" }} id="clearBtn" onClick={clearInput} />
          )
          }
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, index) => {
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

export default SearchBar;