const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    _id: String, 
    final_balance: Number,
    n_tx: Number,

})

module.exports = mongoose.model('TrackedAddressSchema', TrackedAddressSchema)