"use strict";

var mongoose = require('mongoose');

var uniqueValidator = require("mongoose-unique-validator");

var categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    match: [/^[a-zA-Z0-9_ ]+$/, "es inválido, solo se aceptan letras"]
  },
  description: String,
  id_sector: {
    type: mongoose.Types.ObjectId,
    ref: "Sector",
    required: [true, 'Se debe indicar un Sector para la Categoria']
  },
  status: {
    type: Boolean,
    required: true,
    "default": true
  }
}, {
  timestamps: true
});
categorySchema.plugin(uniqueValidator, {
  message: "La categoria ya existe"
});
module.exports = mongoose.model("Category", categorySchema);