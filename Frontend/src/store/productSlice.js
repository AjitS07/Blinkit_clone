import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    allCategory : [],
    AllsubCategory : [],
    product : []
}

const productSlice = createSlice({
    name : 'product',
    initialState : initialValue,
    reducers:{
        setAllCategory : (state,action)=>{
            state.allCategory = [...action.payload]
        },
        setAllsubCategory : (state,action)=>{
            state.allSubCategory = [...action.payload]
        }
    }
})

export const {setAllCategory,setAllsubCategory} = productSlice.actions
export default productSlice.reducer