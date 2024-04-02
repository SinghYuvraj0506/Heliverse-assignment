import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  headerTitle: "Users",
  headerSubtitle: null,
  openPopup:false,
  popupType:null,        // team or user ------
  openDialogForm:false,
  DialogFormType:null,
  openDeleteAlert:{value:false,id:null}

};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    changeHeaderData: (state, action) => {
      state.headerSubtitle = action.payload.headerSubtitle ?? state.headerSubtitle
      state.headerTitle = action.payload.headerTitle ?? state.headerTitle
    },
    setPopupData:(state,action)=>{
      state.openPopup = action.payload.openPopup
      state.popupType = action.payload.popupType
    },
    setDialogFormData:(state,action) => {
      state.openDialogForm = action.payload.openDialogForm
      state.DialogFormType = action.payload.DialogFormType
    },
    setAlertData:(state,action)=>{
      state.openDeleteAlert = {...action.payload}
    }
  },
});

export default generalSlice.reducer;


export const {changeHeaderData,setPopupData,setDialogFormData,setAlertData} = generalSlice.actions
