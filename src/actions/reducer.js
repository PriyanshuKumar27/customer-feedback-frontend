import { LOADING, SUCCESS, FAILURE } from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    case FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
  }
};
