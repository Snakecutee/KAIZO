/** @format */

const initialState = {
  idUser: sessionStorage.getItem("id_user") || null,
};

const ReducerSession = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SESSION":
      console.log("idUser: ", action.data);

      return {
        ...state,
        idUser: action.data,
      };

    case "DELETE_SESSION":
      console.log("idUser: ", action.data);

      return {
        ...state,
        idUser: null,
      };

    default:
      return state;
  }
};

export default ReducerSession;
