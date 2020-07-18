const express = require('express');
const router = express.Router();
const db = require('../db');
const { Schedulce } = db.models;

function asyncHandler(callback) {
    return async( req, res, next ) => {
        try{
            await callback(req, res, next);
        } catch(e) {
            res.status(500).send(e)
        }
    }
}

router.get('/', asyncHandler( async( req, res ) => {
    res.render('index')
}))

module.exports = router;