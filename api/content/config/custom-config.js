const express = require('express');
const bodyParser = require('body-parser');
const consign = require('consign');
const expressVal = require('express-validator');

module.exports = () => {

    const app = express();
    
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(expressVal());

    consign()
        .include('controllers')
        .then('database')
        .into(app)

    return app
}