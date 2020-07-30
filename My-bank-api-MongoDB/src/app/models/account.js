const mongoose = require('../../database');

const accountSchema = mongoose.Schema({
  agencia: {
    type: Number,
    required: true
  },
  conta: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0)
        throw new Error("Não permite valor negativo");
    }
  },
  lastModified: {
    type: Date,
    required: true,
    default: Date.now()
  },
});

const account = mongoose.model('account', accountSchema, 'account');

module.exports = account;