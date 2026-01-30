import mongoose from "mongoose";


const categorySchema = new mongoose.Schema({
    name:{
        type : String,
        default : ""
    },
    image : {
        type : String,
        default : ""
    },
    editDate : {
        type:Date,
        default : null
    }
},{
    timestamps : true
})

const CategoryModel = mongoose.model('category',categorySchema)
export default CategoryModel