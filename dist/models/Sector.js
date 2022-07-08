"use strict";

var mongoose = require('mongoose');

var uniqueValidator = require("mongoose-unique-validator");

var sectorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Se debe indicar un nombre para el sector"],
    index: true,
    unique: true,
    match: [/^[a-zA-Z0-9_ ]+$/, "es inválido, solo se aceptan letras"]
  },
  description: String,
  status: {
    type: Boolean,
    required: true,
    "default": true
  }
}, {
  timestamps: true
});
sectorSchema.plugin(uniqueValidator, {
  message: "Ya existe un sector con este nombre"
});
module.exports = mongoose.model("Sector", sectorSchema);