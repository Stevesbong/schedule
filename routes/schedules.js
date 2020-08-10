const express = require('express');
const router = express.Router();
const db = require('../db');
const { Schedule } = db.models;
const data = require('../dataHandler');

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
    const json = await data.getSchedule();
    res.render('index', { data: json });
}));


// Login page for Admin
router.get('/login', asyncHandler( async( req, res ) => {
    res.render('signin');
}))


// Enter Admin Page
router.get('/admin', asyncHandler( async( req, res ) => {
    const servers = await Schedule.findAll();
    res.render('update-schedule', { servers });
}))


// Authentication for Admin Page
router.post('/admin', asyncHandler( async( req, res ) => {
    const admin = await Schedule.findOne({
        where: { password: req.body.admin }
    })
    if(admin) {
        const json = await data.getSchedule();
        res.render('update-schedule', { data: json });
    } else {
        res.redirect('/');
    }
}))

router.post('/update', asyncHandler( async ( req, res ) => {
    let schedule = [];
    Object.entries(req.body).forEach( ( [key, value]) => {
        schedule.push(value);
    })
    let updateSchedule = {};
    updateSchedule.lunchFirst = schedule.slice(0,7);
    updateSchedule.lunchSecond = schedule.slice(7, 14);
    updateSchedule.dinnerFirst = schedule.slice(14, 21);
    updateSchedule.dinnerSecond = schedule.slice(21, 28);
    updateSchedule.dinnerThird = schedule.slice(28, 35);
    updateSchedule.dinnerFourth = schedule.slice(35, 43);
    
    await data.updateSchedule(updateSchedule);

    res.redirect('/');
}))

// // Create Restaurant Server
// router.post('/new', asyncHandler( async( req, res ) => {
//     let server
//     try{server = await Schedule.create({
//         name: req.body.name
//     })
//     res.redirect('/schedules/admin')
//     } catch(error) {
//         if(error.name === "SequelizeValidationError") {
//             server = await Schedule.build(req.body.name);
//             res.render('update-schedule');
//         } else {
//             throw error;
//         }
//     }
// }))

// // Delete Restaurant Server
// router.post('/:id/delete', asyncHandler( async( req, res ) => {
//     const server = await Schedule.findByPk(req.params.id);
//     if(server) {
//         await server.destroy();
//         res.rediect('/schedules/admin')
//     } else {
//         res.sendStatus(404)
//     }
// }))

module.exports = router;