import { ITag } from "@/interfaces/models/ITag";
import { createTag, fetchTags } from "@/services/tagsServices/TagsServices";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTagsAsync=createAsyncThunk('tags/fetchTags',async()=>{
    const response:ITag[]=await fetchTags();
    return response;
});
export const createTagAsync=createAsyncThunk('tags/newTag',async(tag:Omit<ITag,"id">,{rejectWithValue})=>{
try {
    const response = await createTag(tag);
    return response;
} catch (error) {
    if(error  instanceof Error)
    return rejectWithValue(error.message);
return rejectWithValue("خطای ناشناخته در ایجاد تگ");
}
})
