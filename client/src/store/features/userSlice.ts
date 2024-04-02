import { createSlice } from "@reduxjs/toolkit";
import { createUser, deleteUser, fetchUsers, getUserData, updateUser } from "../actions/userActions";

const initialState = {
    isLoading : false,
    data : null,
    error : null,
    selectedUserData:null
}


const userSlice = createSlice({
    name:"User",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending , (state,action) => {
            state.isLoading = true
            state.data = null
            state.error = null
        }),
        builder.addCase(fetchUsers.fulfilled , (state,action) =>{
            state.isLoading = false
            state.data = action.payload
            state.error = null
        }),
        builder.addCase(fetchUsers.rejected , (state,action) =>{
            state.isLoading = false
            state.data = null
            state.error = action.payload.message
        })
        builder.addCase(getUserData.pending , (state,action) => {
            state.isLoading = true
            state.selectedUserData = null
            state.error = null
        }),
        builder.addCase(getUserData.fulfilled , (state,action) =>{
            state.isLoading = false
            state.selectedUserData = action.payload
            state.error = null
        }),
        builder.addCase(getUserData.rejected , (state,action) =>{
            state.isLoading = false
            state.selectedUserData = null
            state.error = action.payload.message
        })
        builder.addCase(createUser.pending , (state,action) => {
            state.isLoading = true
            state.error = null
        }),
        builder.addCase(createUser.fulfilled , (state,action) =>{
            state.isLoading = false
            state.error = null
        }),
        builder.addCase(createUser.rejected , (state,action) =>{
            state.isLoading = false
            state.error = action.payload.message
        })
        builder.addCase(updateUser.pending , (state,action) => {
            state.isLoading = true
            state.error = null
        }),
        builder.addCase(updateUser.fulfilled , (state,action) =>{
            state.isLoading = false
            state.error = null
        }),
        builder.addCase(updateUser.rejected , (state,action) =>{
            state.isLoading = false
            state.error = action.payload.message
        })
        builder.addCase(deleteUser.pending , (state,action) => {
            state.isLoading = true
            state.error = null
        }),
        builder.addCase(deleteUser.fulfilled , (state,action) =>{
            state.isLoading = false
            state.error = null
        }),
        builder.addCase(deleteUser.rejected , (state,action) =>{
            state.isLoading = false
            state.error = action.payload.message
        })
    }

})



export default userSlice.reducer;