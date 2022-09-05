const mongoose = require("mongoose");

const grocerySchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [20, "max charachters is 20"],
    required: [true, "must provide a name"],
    trim: true,
  },
});

module.exports = mongoose.model("grocery", grocerySchema);
