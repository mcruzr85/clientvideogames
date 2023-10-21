import axios from "axios";
export const ADD_VIDEOGAME = "ADD_VIDEOGAME";
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const UPDATE_VIDEOGAMES = "UPDATE_VIDEOGAMES";
export const GET_DETAILS = "GET_DETAILS";
export const RESET_DETAILS = "RESET_DETAILS";
export const GET_GENRES = "GET_GENRES";
export const FILTER_GENRE = "FILTER_GENRE";
export const FILTER_ORIGEN = "FILTER_ORIGEN";
export const ORDER = "ORDER";
export const RESET_SEARCH = "RESET_SEARCH";
export const GET_VIDEOGAMES_NAME = "GET_VIDEOGAMES_NAME";

function addArrayGenres(array) {
  let final = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].Genres) {
      array[i].genres = array[i].Genres.map((e) => e.name).join("-");
    }
    final.push(array[i]);
  }
  return final;
}

//para agregar los generos cuando creo un nuevo videogame en la bd
function addVgGenres(vg) {
  vg.genres = vg.Genres.map((e) => e.name).join("-");
}

export const addVideogame = (obj) => async (dispatch) => {
  //payload es videogame, es para mandar info adicional
  try {
    const {
      name,
      description,
      released,
      rating,
      background_image,
      platforms,
      genres,
    } = obj;
    if (
      !name |
      !description |
      !released |
      !rating |
      !background_image |
      !platforms |
      !genres.length
    ) {
      throw new Error("Incomplete data");
    } else {
      const response = await axios.post("/videogames", obj);
      const data = await response.data;
      console.log("aqui mismo luego del axios la data es");
      addVgGenres(data.videogame); //agregando videogame.genres
      console.log(data.videogame);

      return dispatch({
        type: ADD_VIDEOGAME,
        payload: data.videogame,
      });
    }
  } catch (error) {
    console.log(error);
    //alert(error.message);
  }
};

export const getAllVideogames = (con, name) => async (dispatch) => {
  try {
    console.log(
      `desde la action getAllVideogames llego con name valor ${name}`
    );
    console.log(`desde la action getAllVideogames llego con  valor ${con}`);

    let response = "";
    if (name) {
      response = await axios.get(`/videogames?name=${name}`);
    } else {
      response = await axios.get(`/videogames?con=${con}`);
    }

    const data = await response.data;

    let dataGenres = addArrayGenres(data.videogames);

    if (data.Message) {
      alert("No results");
    }

    if (con === 2) {
      //estoy buscando sin name
      return dispatch({
        type: GET_VIDEOGAMES,
        payload: dataGenres,
      });
    }

    if (name) {
      return dispatch({
        type: GET_VIDEOGAMES_NAME,
        payload: dataGenres,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getGenres = (source) => async (dispatch) => {
  try {
    let response;
    if (source === "db") {
      //console.log(`el valor de source es ${source}`);
      //response = await fetch("/genresdb");
      response = await axios.get(`/genresdb`);
    } else if (source === "api") {
      // console.log(`el valor de source es ${source}`);
      //response = await fetch("/genres");
      response = await axios.get("/genres");
    }
    const data = response.data;
    // console.log("desde action getGenres imprimo la data y se a paso al payload");
    // console.log(data);
    return dispatch({
      type: GET_GENRES,
      payload: data.genres,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getDetails = (id, creado) => async (dispatch) => {
  try {
    const response = await axios.get(`/videogames/${id}?creado=${creado}`);
    const data = response.data;
    console.log(`desde la action getDetails imprimo lo que llega del server`);
    console.log(data);
    return dispatch({
      type: GET_DETAILS,
      payload: data.copyVideogame,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const resetDetails = () => {
  return {
    type: RESET_DETAILS,
  };
};

export function filterOrigen(criterio) {
  return {
    type: FILTER_ORIGEN,
    payload: criterio,
  };
}

export function filterGenre(criterio) {
  return {
    type: FILTER_GENRE,
    payload: criterio,
  };
}

export function orderVideogames(nameORating, criterio) {
  return {
    type: ORDER,
    payload: [nameORating, criterio],
  };
}

export function resetSearch() {
  return {
    type: RESET_SEARCH,
  };
}
