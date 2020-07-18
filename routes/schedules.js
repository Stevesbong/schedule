const express = require('express');
const router = express.Router();
const db = require('../db');
const { Schedule } = db.models;

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
}));

router.get('/login', asyncHandler( async( req, res ) => {
    res.render('password')
}))

router.post('/admin', asyncHandler( async(req, res ) => {
    console.log('hi')
    console.log(req.body.admin)
    const admin = await Schedule.findOne({
        where: { password: req.body.admin }
    })
    if(admin) {
        res.render('update-schedule')
    } else {
        res.redirect('/')
    }
}))

module.exports = router;