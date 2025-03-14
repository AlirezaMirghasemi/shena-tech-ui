import { ITag } from "@/interfaces/models/ITag";
import { fetchTags } from "@/services/tagsServices/TagsServices";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTagsAsync=createAsyncThunk('tags/fetchTags',async()=>{
    const response:ITag[]=await fetchTags();
    return response;
});
