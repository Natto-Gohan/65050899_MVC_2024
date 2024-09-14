const express = require("express");
const app = express();
const logic = require("./logic");

//test server
app.get('/ping', (req, res) => {
    res.send('pong')
});

//
app.post('/searchCow', async (req, res) => {
    try {
        let result = await new logic().searchCow(req.body);
        res.status(200).json(result);
    } catch (error) {
        let messageError = {
            statusCode: error.statusCode || 400,
            message: error.message || error,
        };
        res.status(messageError.statusCode);
        res.json(messageError);
    }
});
//MilkingWhiteCow รีดนมวัวสีขาว
app.post('/MilkingWhiteCow', async (req, res) => {
    try {
        let result = await new logic().MilkingWhiteCow(req.body);
        res.status(200).json(result);
    } catch (error) {
        let messageError = {
            statusCode: error.statusCode || 400,
            message: error.message || error,
        };
        res.status(messageError.statusCode);
        res.json(messageError);
    }
});

//MilkingWhiteCow รีดนมวัวสีน้ำตาล
app.post('/MilkingBrownCow', async (req, res) => {
    try {
        let result = await new logic().MilkingBrownCow(req.body);
        res.status(200).json(result);
    } catch (error) {
        let messageError = {
            statusCode: error.statusCode || 400,
            message: error.message || error,
        };
        res.status(messageError.statusCode);
        res.json(messageError);
    }
});

//รีเซ็ตค่า BSOD
app.get('/resetBSOD', async (req, res) => {
    try {
        let result = await new logic().resetBSOD(req.body);
        res.status(200).json(result);
    } catch (error) {
        let messageError = {
            statusCode: error.statusCode || 400,
            message: error.message || error,
        };
        res.status(messageError.statusCode);
        res.json(messageError);
    }
});


module.exports = app;