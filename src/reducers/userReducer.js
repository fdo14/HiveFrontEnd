import { GET_TOKENS, BUY_TOKENS, BUY_MOVIE } from "../actions/types";

export default (
  state = {
    tokens: null
  },
  action
) => {
  switch (action.type) {
    case GET_TOKENS:
      return { ...state, tokens: action.payload[0].Tokens };
    case BUY_TOKENS:
      return { ...state, tokens: action.payload };
    case BUY_MOVIE:
      return { ...state, tokens: action.payload.user.Tokens };
    default:
      return { ...state };
  }
};
