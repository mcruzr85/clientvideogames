import React, { useEffect, useState } from "react";
//import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";
import { FilterDiv } from "../styled";

const Filter = () => {
  let genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [selectValue, setSelectValue] = useState("");

  useEffect(() => {
    //if (genres.length === 0) {

    const serverConection = async () => {
      await dispatch(actions.getGenres());
    };
    serverConection();
  }, [dispatch]);

  function handleFilters(e) {
    const { name, value } = e.target;

    if (value !== "title") {
      if (name === "filterOrigen") {
        //****estoy en este */
        console.log("estoy en comp Filter origen ");
        return dispatch(actions.filterOrigen(value));
      }

      if (name === "filterGenre") {
        return dispatch(actions.filterGenre(value));
      }

      console.log("estoy en el order asc o desc ");
      setVisible(false);
      return dispatch(actions.orderVideogames(selectValue, value));
    } else {
      return alert("Please select a correct option");
    }
  }

  function activarOrderSelect(value) {
    if (value !== "title") {
      setVisible(true);
      setSelectValue(value);
    } else {
      return alert("Please select a correct option");
    }
  }

  return (
    <>
      <FilterDiv>
        <select name="filterOrigen" onChange={handleFilters}>
          <option value="title">-Created-</option>
          <option value="all">All</option>
          <option value="api">API</option>
          <option value="db">DB</option>
        </select>

        <select name="filterGenre" id="filterGenre" onChange={handleFilters}>
          <option value="title">-Genres-</option>
          {genres.length &&
            genres.map((g) => {
              return (
                <option key={g.name} value={g.name}>
                  {g.name}
                </option>
              );
            })}
        </select>

        <select
          name="orderRN"
          onChange={(e) => activarOrderSelect(e.target.value)}
        >
          <option value="title">-Sort by-</option>
          <option value="rating">Rating</option>
          <option value="name">Name</option>
        </select>

        {visible ? (
          <select name="orderAD" onChange={handleFilters}>
            <option value="title">-Sort by-</option>
            <option value="asc">Asc</option>
            <option value="des">Des</option>
          </select>
        ) : null}
      </FilterDiv>
    </>
  );
};

export default Filter;
/**
 * if(videogames.length !== 0  ){//&&  videogames.length !== 100
      con = 1; //solo se conecta a la bd
      const serverConection = async () => { 
        setLoading(true);
        //const obj = {con: 1, name: null} //se conecta solo a la bd o a la bd
        await  dispatch(actions.getAllVideogames(con, null)) ;
        setLoading(false);
      };
      serverConection();  
    }  
 */
