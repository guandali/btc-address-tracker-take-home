const express = require('express');
const TrackedAddressSchema = require('../models/TrackedAddressSchema');
const router = express.Router();
const axios = require('axios');

//Create a new BTC addres for tracking.
router.post('/trackedAddresses', async (req, res) => {
    const data = new TrackedAddressSchema({
        _id: req.body.address
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get a tracked BTC addres by address.
router.get('/trackedAddresses/:address', async (req, res) => {
    try {
        const data = await TrackedAddressSchema.findById(req.params.address);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Remove a tracked BTC addres.
router.delete('/trackedAddresses/:address', async (req, res) => {
    try {
        const id = req.params.address;
        const data = await TrackedAddressSchema.findByIdAndDelete(id);
        res.send(`Document with ${data.name} has been deleted..`);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Sync a tracked BTC addres.
router.post('/syncTrackedAddresses/:address', async (req, res) => {
    try {
        const address = req.params.address;
        const getResponse = await axios.get('https://blockchain.info/rawaddr/' + address);
        // Update the address with new balance and txs.
        const data = await TrackedAddressSchema.findByIdAndUpdate(address, 
            {
                final_balance: getResponse.data.final_balance, 
                txs: getResponse.data.txs
            });
        res.status(200).json(data);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Sync a tracked BTC addres.
router.post('/syncTrackedAddresses', async (req, res) => {
    try {
        const data = await TrackedAddressSchema.find(); 
        for(let i = 0; i < data.length; i++){
            console.log(data[i]._id);
            var getResponse = await axios.get('https://blockchain.info/rawaddr/' +  data[i]._id);
            await TrackedAddressSchema.findByIdAndUpdate(data[i]._id, 
                {
                    final_balance: getResponse.data.final_balance, 
                    txs: getResponse.data.txs
                });
        }
        
        res.status(200).json("All address have been updated");
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;