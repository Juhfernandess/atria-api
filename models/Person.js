const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
  name: String,
  ra: Number,
  aprovado_atria: Boolean,
})

module.exports = Person