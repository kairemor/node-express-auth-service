const cors = require('cors');
const express = require('express');
const app = express();
const whiteList = ['http://localhost:3000'];

const corsOptionPara = (req, callback) => {
    var corsOptions;
    if (whiteList.indexOf(req.header('Origin') !== -1)) {
        corsOptions = {
            origin: true
        };
    } else {
        corsOptions = {
            origin: false
        };
    }
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsOption = cors(corsOptionPara);