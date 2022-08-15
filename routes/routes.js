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
         axios
        .get('https://blockchain.info/rawaddr/' + address)
        .then(getResponse => {
            const data = new TrackedAddressSchema({
                final_balance: getResponse.data.final_balance,
                n_tx: getResponse.data.n_tx,
                txs: getResponse.data.txs
            });
            console.log(address);
            console.log(typeof(getResponse.data.final_balance));
            TrackedAddressSchema.findByIdAndUpdate(address, {
                final_balance: getResponse.data.final_balance,
                n_tx: getResponse.data.n_tx,
                txs: getResponse.data.txs
            });
            TrackedAddressSchema.findByIdAndUpdate(address, {
                final_balance: 1000000
            });
            res.status(200).json(data);
        })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;