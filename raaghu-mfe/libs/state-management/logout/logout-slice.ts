import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginService } from "../../proxy";

type LogoutStateType = {
    error: string,
    loading: boolean,
    Logout: any[],
}

const LogoutState: LogoutStateType = {
    error: "",
    loading: false,
    Logout: [],
}

export const logoutRequest = createAsyncThunk(
    "Logoutcall/logoutRequest", async () => {
        return await
            // LoginService.getLogout().then((result: any) => {
            //     return result
            fetch("https://raaghu-react.azurewebsites.net/api/account/logout").then((res)=>{
               return res})
           
    })



const logoutSlice = createSlice({
    name: "Logoutcall",
    initialState: LogoutState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(logoutRequest.pending, (state) => {
            state.loading = true
        });
        builder.addCase(logoutRequest.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false,
                state.Logout = action.payload
        });
        builder.addCase(logoutRequest.rejected, (state, action: PayloadAction<any>) => {
            state.loading = false,
                state.error = action.payload?.message || "Something went wrong";
        })
    }
})

export default logoutSlice.reducer