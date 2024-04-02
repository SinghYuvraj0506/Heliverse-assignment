import { createSlice } from "@reduxjs/toolkit";
import { createTeam, getTeamData } from "../actions/teamActions";

const initialState = {
    isLoading : false,
    data : null,
    error : null,
    selectedTeamData:null
}


const teamSlice = createSlice({
    name:"Team",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(createTeam.pending , (state,action) => {
            state.isLoading = true
            state.data = null
            state.error = null
        }),
        builder.addCase(createTeam.fulfilled , (state,action) =>{
            state.isLoading = false
            state.data = action.payload
            state.error = null
        }),
        builder.addCase(createTeam.rejected , (state,action) =>{
            state.isLoading = false
            state.data = null
            state.error = action.payload.message
        })
        builder.addCase(getTeamData.pending , (state,action) => {
            state.isLoading = true
            state.selectedTeamData = null
            state.error = null
        }),
        builder.addCase(getTeamData.fulfilled , (state,action) =>{
            state.isLoading = false
            state.selectedTeamData = action.payload
            state.error = null
        }),
        builder.addCase(getTeamData.rejected , (state,action) =>{
            state.isLoading = false
            state.selectedTeamData = null
            state.error = action.payload.message
        })
    }

})



export default teamSlice.reducer;