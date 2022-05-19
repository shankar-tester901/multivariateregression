"use strict";

var express = require("express");
var app = express();

//If you do not use the following line, then you will never receive any post data
app.use(express.json());

const ml = require('ml-regression');
const SLR = ml.SLR; // Simple Linear Regression

let csvData = [], // parsed Data
    X = [], // Input
    y = []; // Output

let regressionModel;

let csvToJson = require('convert-csv-to-json');
let json = csvToJson.fieldDelimiter(',').getJsonFromCsv("./data/Advertising_edited.csv");

app.get('/performRegression', async(req, res) => {
    //console.log('in performRegression ---------------->');
    for (let i = 0; i < json.length; i++) {
        csvData.push(json[i]);
        console.log('A row arrived: ', json[i]);
    }
    dressData(); // To get data points from JSON Objects
    performRegression();
    var resultString = predictOutput();
    res.send(resultString);
})

function performRegression() {
    regressionModel = new SLR(X, y); // Train the model on training data
    console.log(regressionModel.toString(3));
    //  return regressionModel.toString(3);
    predictOutput();
}

function dressData() {
    /**
     * One row of the data object looks like:
     * {
     *   TV: "10",
     *   Radio: "100",
     *   Newspaper: "20",
     *   "Sales": "1000"
     * }
     *
     * Hence, while adding the data points,
     * we need to parse the String value as a Float.
     */
    csvData.forEach((row) => {
        //   console.log(row.Radio);
        X.push(f(row.Radio));
        y.push(f(row.Sales));
    });
}

function f(s) {
    return parseFloat(s);
}

function predictOutput() {
    //  rl.question('Enter input X for prediction (Press CTRL+C to exit) : ', (answer) => {
    var resultString = regressionModel.toString(3) + '   Radio is X. Sales is Y .  So for  X=100 , y is ' + regressionModel.predict(parseFloat(100));
    console.log(resultString);
    return resultString;
}
module.exports = app;