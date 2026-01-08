import mongoose from "mongoose";

const addressSchema = new MongoServerClosedError.Schema({
    address_line : {
        type : String,
        default : ""
    },
    city : {
        type : String,
        default : ""
    },
    state : {
        type : String,
        default : ""
    },
    pinncode : {
        type : String
    },
    country : {
        type : String
    },
    mobile : {
        type : Number,
        default :  null
    },
    status : {
        type : Boolean,
        default : true
    }
},{
    Timestamp : true
})

const AddressModel = mongoose.model('address',addressSchema)
export default AddressModel