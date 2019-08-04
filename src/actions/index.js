import axios from "axios";
import {
  FETCH_MOVIE,
  FETCH_ALL_MOVIES,
  FETCH_MOVIE_INFORMATION,
  GET_TOKENS,
  BUY_TOKENS,
  BUY_MOVIE
} from "./types";

export function fetchMovie(id) {
  return { type: FETCH_MOVIE, payload: id };
}

export const fetchAllMovies = () => async dispatch => {
  const res = await axios.get("http://localhost:4000/get-movies");
  dispatch({ type: FETCH_ALL_MOVIES, payload: res.data });
};

export const fetchMovieInformation = finder => async dispatch => {
  const res = await axios.post("http://localhost:4000/get-movie-information", {
    data: {
      finder
    }
  });
  dispatch({ type: FETCH_MOVIE_INFORMATION, payload: res.data[0] });
};

export const getTokens = () => async dispatch => {
  const res = await axios.get("http://localhost:4000/get-tokens");
  dispatch({ type: GET_TOKENS, payload: res.data });
};

export const buyTokens = tokenAmount => async dispatch => {
  const res = await axios.post("http://localhost:4000/buy-tokens", {
    Tokens: tokenAmount
  });
  let amt = res.data.Tokens + tokenAmount;
  dispatch({ type: BUY_TOKENS, payload: amt });
};

export const buyMovie = Finder => async dispatch => {
  const res = await axios.post("http://localhost:4000/buy-movie", {
    Finder: Finder,
    Tokens: 2
  });
  res.data.user.Tokens -= 2;
  dispatch({ type: BUY_MOVIE, payload: res.data });
};
