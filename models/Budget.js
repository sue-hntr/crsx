const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const BudgetSchema = new Schema({
    monthlyrentmortage:  { type: Number },
    taxinsincluded:  { type: Number },
    taxifnot:  { type: Number },
    insifnot:  { type: Number },
    monthlydebts:  { type: Number },
    assets:  { type: Number },
    monthlyincome:  { type: Number },
    remainderafterexpenses:  { type: Number },
    yearlyincome:  { type: Number }
  });
  
  const Budget = mongoose.model("Budget", BudgetSchema);
  
  module.exports = Budget;
  