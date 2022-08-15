const mongoose = require('mongoose');

const TrackedAddressSchema = new mongoose.Schema({
    _id: String, 
    final_balance: Number,
    n_tx: Number,
    txs:[mongoose.Mixed]
})

module.exports = mongoose.model('TrackedAddressSchema', TrackedAddressSchema)