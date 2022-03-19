import {
  PERSON_CREATE_FAIL, PERSON_CREATE_REQUEST,
  PERSON_CREATE_SUCCESS, PERSON_DELETE_FAIL,
  PERSON_DELETE_REQUEST,
  PERSON_DELETE_SUCCESS, PERSON_LIST_FAIL,
  PERSON_LIST_REQUEST,
  PERSON_LIST_SUCCESS
} from "../actionTypes";

export const personsReducer = (state = { persons: [] }, action) => {
  switch (action.type) {
    case PERSON_LIST_REQUEST:
      return {
        loading: true,
        persons: [],
      };
    case PERSON_LIST_SUCCESS:
      return {
        loading: false,
        persons: action.payload,
      };

    case PERSON_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};


export const createPersonReducer = (state = { }, action) => {
  switch (action.type) {
    case PERSON_CREATE_REQUEST:
      return {
        loading: true
      };
    case PERSON_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        persons: state.persons,
      };

    case PERSON_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};


export const deletePersonReducer = (state = { }, action) => {
  switch (action.type) {
    case PERSON_DELETE_REQUEST:
      return {
        loading: true
      };
    case PERSON_DELETE_SUCCESS:
      console.log(state.persons);
      return {
        ...state,
        loading: false,
        success: true,
        persons: state.persons,
      };

    case PERSON_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};


