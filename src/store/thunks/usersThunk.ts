import { IUser } from "@/interfaces/models/IUser";
import { createUser, fetchUsers } from "@/services/userServices/UserServices";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsersAsync=createAsyncThunk('users/fetchUsers',async()=>{
    const response:IUser[]=await fetchUsers();
    return response;
});
export const createUserAsync=createAsyncThunk('users/newUser',async(user:Omit<IUser,"id">,{rejectWithValue})=>{
try {
    const response = await createUser(user);
    return response;
} catch (error) {
    if(error  instanceof Error)
    return rejectWithValue(error.message);
return rejectWithValue("خطای ناشناخته در ایجاد کاربر");
}
})
