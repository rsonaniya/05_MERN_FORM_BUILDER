const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://rajatsonaniya6:rajatsonaniya@form-builder.aijad.mongodb.net/form-builder?retryWrites=true&w=majority&appName=form-builder";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connection to mongodb is successful");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToMongo;
