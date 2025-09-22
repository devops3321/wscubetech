let mongoose = require("mongoose");

let whychooseusSchema = new mongoose.Schema(
    {
        whychooseusTitle:{
            type:String,
            minLength:2,
            maxLength:30,
            unique:true,
            required:[true,"whychooseus Name is required"]    
        },
        whychooseusImage: String,
        whychooseusOrder: Number,
        whychooseusDescription:{
            type:String,
            minLength:2,
            maxLength:500,
            unique:true,
            required:[true,"whychooseus Description is required"]    
        },
        whychooseusStatus: {
            type: Boolean,
            default: true
        }
    }
)

let whychooseusModel = mongoose.model("whychooseus",whychooseusSchema);

module.exports = {whychooseusModel};