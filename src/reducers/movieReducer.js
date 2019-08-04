import {
  FETCH_MOVIE,
  FETCH_ALL_MOVIES,
  FETCH_MOVIE_INFORMATION,
  BUY_MOVIE
} from "../actions/types";

export default (
  state = {
    movieID: null,
    moviesArray: [],
    movieInformation: ""
  },
  action
) => {
  switch (action.type) {
    case FETCH_MOVIE:
      return { ...state, movieID: action.payload };
    case FETCH_ALL_MOVIES:
      return { ...state, moviesArray: action.payload };
    case FETCH_MOVIE_INFORMATION:
      return { ...state, movieInformation: action.payload };
    case BUY_MOVIE:
      return { ...state, movieInformation: action.payload.movie };
    default:
      return { ...state };
  }
};
