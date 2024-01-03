import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  patientData: [],
  isOpen: false,
  errorMsg: "",
};

const PatientCreationSlice = createSlice({
  name: "patientData",
  initialState,
  reducers: {
    isLoading(state) {
      state.loading = true;
    },

    setIsLoadingFalse(state) {
      state.loading = false;
    },
    setErrorMessage(state, action) {
      state.loading = false;
      state.isOpen = true;
      state.errorMsg = action.payload;
    },

    closeErrorPopup(state) {
      state.isOpen = false;
      state.errorMsg = "";
    },

    getPatientSuccess(state, action) {
      state.loading = false;
      state.patientData = action.payload;
    },
  },
});

export const {
  isLoading,
  setIsLoadingFalse,
  setErrorMessage,
  closeErrorPopup,
  getPatientSuccess,
} = PatientCreationSlice.actions;

export default PatientCreationSlice.reducer;