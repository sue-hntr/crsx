const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const CounselorSchema = new Schema({
    counselorfirstname: { type: String, required: true },
    counselorlastname: { type: String, required: true },
    appointment: {
        type: Schema.Types.ObjectId,
        ref: "Appointment"
      },
    consumer: {
        type: Schema.Types.ObjectId,
        ref: "Consumer"
      },
    admin: {
        type: Schema.Types.ObjectId,
        ref: "Admin"
    }
  });
  
  const Counselor = mongoose.model("Counselor", CounselorSchema);
  
  module.exports = Counselor;
  