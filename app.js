const express = require('express');
const app = express();
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

let port = process.env.PORT ? process.env.PORT : 3000;
app.listen( port, () => console.log(`listening port on ${port}`))