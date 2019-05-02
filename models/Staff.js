const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const StaffSchema = new Schema({
    tafffirstname: { type: String, required: true },
    stafflastname: { type: String, required: true },
    appointment: {
        type: Schema.Types.ObjectId,
        ref: "Appointment"
      },

    consumer: {
        type: Schema.Types.ObjectId,
        ref: "Consumer"
      },
    counselor: {
        type: Schema.Types.ObjectId,
        ref: "Counselor"
    }
  });
  
  const Staff = mongoose.model("Staff", StaffSchema);
  
  module.exports = Staff;
  