const express = require('express');
const app = express();
const createError = require('http-errors');
const path = require('path');
const bodyParser = require('body-parser');
const schedules = require('./routes/schedules');
// const db = require('./db');
// const {Schedule} = db.models;

app.set('view engine', 'pug');
app.set('views', path.join( __dirname, 'views' ));

app.use('/static', express.static( path.join( __dirname, 'public')));
app.use(bodyParser.urlencoded( { extended:false } ) );


require('./routes/index')(app);
app.use('/schedules', schedules);

// (async () => {
//     await db.sequelize.sync({force:true})
//     const movie = await Schedule.create({
//         name: "admin",
//         password: 21515
//     })

// })();

app.use( (req, res, next) => {
    next(createError(404))
  });
  
// error handler
app.use( (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    if (err.status === 404) {
        res.status(404).render('page-not-found')
    } else {
        err.message = err.message || 'Oops! It looks like someting went wrong';
        res.status(err.status || 500).render('error', { err })
    }
});

let port = process.env.PORT ? process.env.PORT : 3000;
app.listen( port, () => console.log(`listening port on ${port}`))