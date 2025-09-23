let mongoose = require("mongoose");

let sliderSchema = new mongoose.Schema(
    {
        sliderTitle:{
            type:String,
            minLength:2,
            maxLength:30,
            unique:true,
            required:[true,"Slider Title is required"]    
        },
        sliderImage: String,
        sliderOrder: Number,
        sliderStatus: {
            type: Boolean,
            default: true
        }
    }
)

let sliderModel = mongoose.model("slider",sliderSchema);

module.exports = { sliderModel };