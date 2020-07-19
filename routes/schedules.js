const express = require('express');
const router = express.Router();
const db = require('../db');
const { Schedule } = db.models;

function asyncHandler(callback) {
    return async( req, res, next ) => {
        try{
            await callback(req, res, next);
        } catch(e) {
            res.status(500).render('error');
        }
    }
}


// Index Page for Schedule
router.get('/', asyncHandler( async( req, res ) => {
    res.render('index')
}));


// Login page for Admin
router.get('/login', asyncHandler( async( req, res ) => {
    res.render('password')
}))


// Enter Admin Page
router.get('/admin', asyncHandler( async( req, res ) => {
    const servers = await Schedule.findAll();
    // console.log(servers)
    res.render('update-schedule', { servers })
}))


// Authentication for Admin Page
router.post('/admin', asyncHandler( async( req, res ) => {
    const admin = await Schedule.findOne({
        where: { password: req.body.admin }
    })
    if(admin) {
        res.redirect('/schedules/admin')
    } else {
        res.redirect('/')
    }
}))

// Create Restaurant Server
router.post('/new', asyncHandler( async( req, res ) => {
    let server
    try{server = await Schedule.create({
        name: req.body.name
    })
    res.redirect('/schedules/admin')
    } catch(error) {
        if(error.name === "SequelizeValidationError") {
            server = await Schedule.build(req.body.name);
            res.render('update-schedule');
        } else {
            throw error;
        }
    }
}))

// Delete Restaurant Server
router.post('/:id/delete', asyncHandler( async( req, res ) => {
    const server = await Schedule.findByPk(req.params.id);
    if(server) {
        await server.destroy();
        res.rediect('/schedules/admin')
    } else {
        res.sendStatus(404)
    }
}))

module.exports = router;