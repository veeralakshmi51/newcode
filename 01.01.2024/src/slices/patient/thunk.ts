import axios from 'axios'
import { isLoading, setErrorMessage, setIsLoadingFalse, getPatientSuccess } from "./reducer"

const baseURL = 'http://47.32.254.89:7000/api'
const successCode = 'MHC - 0200'

export const getAllPatient = async (dispatch: any) => {
    dispatch(isLoading());
    try {
      const response = await axios.get(`${baseURL}/patient/get_all`);
  
      if (response.data.message.code === successCode) {
        dispatch(getPatientSuccess(response.data.data));
      } else {
        dispatch(setErrorMessage(response.data.message.description));
      }
    } catch (error) {
      dispatch(setIsLoadingFalse());
      console.error(error);
    }
};
  