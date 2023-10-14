export const LOADING = "LOADING";
export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";

export const load = () => {
  return {
    type: LOADING,
  };
};

export const success = () => {
  return {
    type: SUCCESS,
  };
};

export const failure = () => {
  return {
    type: FAILURE,
  };
};
