import axios from "axios";
import {
  PERSON_CREATE_FAIL, PERSON_CREATE_REQUEST,
  PERSON_CREATE_SUCCESS, PERSON_DELETE_FAIL,
  PERSON_DELETE_REQUEST,
  PERSON_DELETE_SUCCESS, PERSON_LIST_FAIL,
  PERSON_LIST_REQUEST,
  PERSON_LIST_SUCCESS
} from "../actionTypes";

export const listPersons = () => async (dispatch) => {
  try {
    dispatch({
      type: PERSON_LIST_REQUEST,
    });

    const { data } = await axios.get("http://localhost:3001/persons");

    dispatch({
      type: PERSON_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PERSON_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const createPerson=(person)=> async (dispatch)=>{

  try {
    dispatch({
      type: PERSON_CREATE_REQUEST,
    });

    const { data } = await axios.post(
      "http://localhost:3001/persons", person
      );

    dispatch({
      type: PERSON_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PERSON_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }


}


export const deletePerson=(id)=> async (dispatch)=>{

  try {
    dispatch({
      type: PERSON_DELETE_REQUEST,
    });

    const { data } = await axios.delete(
      `http://localhost:3001/persons/${id}`);

    dispatch({
      type: PERSON_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PERSON_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }


}