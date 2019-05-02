const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const DemographicSchema = new Schema({
    casetype:{ type: String },
    counselingagency: { type: String },
    clientfirstname: { type: String, required: true },
    clientmiddlename: { type: String },
    clientlastname: { type: String, required: true },
    clientSSN: { type: String },
    gender: { type: String },
    clientemailaddress: { type: String },
    clienthomephone: { type: String },
    clientcellphone: { type: String },
    clientworkphone: { type: String },
    streetaddress1: { type: String },
    streetaddress2: { type: String },
    streetaddress3: { type: String },
    city: { type: String },
    state: { type: String },
    zipcode: { type: String },
    county: { type: String },

    philacitycouncilname: { type: String },
    philacitycouncildistrict: { type: String },
    militarystatus: { type: String },
    race: { type: String },
    ethnicity: { type: String },
    preferredlanguage: { type: String },
    clientenglishproficient: { type: String },
    martialstatus: { type: String },
    ruralareastatus: { type: String },
    householdsize: { type: Number },
    numdependents: { type: Number },
    headofhousehold: { type: String },
    visitpurpose: { type: String },
    howhearofus: { type: String },
    livingstatus: { type: String },
    highesteducation: { type: String },
    disabled: { type: String },
    uscitizen:  { type: String },
    seniorcitizen: { type: String },
    migrantfarmworker: { type: String },
    amicategory: { type: String },
    creditscore: { type: Number },
    brtnumber: { type: String },
    internalreferencenum: { type: String },

    coborrowerfirstname: { type: String },
    coborrowerlastname: { type: String },
    coborrowerdob: { type: String }
  });
  
  const Demographic = mongoose.model("Demographic", DemographicSchema);
  
  module.exports = Demographic;
  