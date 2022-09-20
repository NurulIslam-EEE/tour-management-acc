const mongoose = require("mongoose");

// schema design
const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product"],
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name too large"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't negative"],
    },
    image: {
      type: String,
      required: true,
    },
    viewCount:{
      type: Number,
      default:0
    }
 
  },
  {
    timestamps: true,
  }
);

// mongoose middleware fro saving data :pre/next
tourSchema.pre("save", function (next) {
  console.log("before saving data");
 
  next();
});
// tourSchema.post('save',function(doc,next){
//   console.log('after saving data')
//   next()
// })

tourSchema.methods.logger = function () {
  console.log(`data save for ${this.name}`);
};

// SCHEMA->MODEL->QUERY

const Tour = mongoose.model("Tour", tourSchema);
module.exports=Tour
