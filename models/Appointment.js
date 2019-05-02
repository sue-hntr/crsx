
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    userID: {type:String},
    firstname: { 
        type: String,
        required: true,
        trim: true
    },
    lastname:{ type: String },
    phone:{ type: String },
    email: { type: String },
    address1: { type: String },
    address2: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    
    timeforappt: { type: String },
    
    prepurchaseworkshop: { type: Boolean},
    creditcounseling: { type: Boolean},
    postpurchase: { type: Boolean},
    prebankruptcy: { type: Boolean},
    taxdelinquency: { type: Boolean},
    defaultdelinquency: { type: Boolean},
    discussinperson: { type: Boolean},
    contactbyphone: { type: Boolean },
    contactbyemail: { type: Boolean },
    movetoconsumer: { type: Boolean},
    counselor: {
        type: Schema.Types.ObjectId,
        ref: "Counselor"
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: "Admin"
    },
    consumer: {
        type: Schema.Types.ObjectId,
        ref: "Consumer"
    }
});
  

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;
    